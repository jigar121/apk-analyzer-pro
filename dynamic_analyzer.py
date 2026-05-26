import subprocess
import os
import re
import time
import uuid
import json
from utils.logger import logger

class DynamicAnalyzer:
    def __init__(self, adb_path="adb"):
        self.adb_path = adb_path
        self.is_available = self._check_adb()

    def _check_adb(self):
        """Checks if ADB is available in PATH or at the specified location."""
        try:
            result = subprocess.run([self.adb_path, "version"], capture_output=True, text=True, timeout=5)
            if result.returncode == 0:
                logger.info(f"ADB is available: {result.stdout.strip().splitlines()[0]}")
                return True
            return False
        except (FileNotFoundError, subprocess.TimeoutExpired):
            logger.warning("ADB not found. Dynamic Analysis will run in simulation/mock mode.")
            return False

    def _run_adb_cmd(self, args, timeout=30):
        """Helper to run adb commands safely."""
        try:
            cmd = [self.adb_path] + args
            logger.debug(f"Executing: {' '.join(cmd)}")
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
            return result.returncode == 0, result.stdout, result.stderr
        except Exception as e:
            logger.error(f"ADB command failed: {e}")
            return False, "", str(e)

    def analyze(self, apk_path, package_name=None):
        """
        Orchestrates the dynamic analysis.
        1. Connects to emulator.
        2. Installs APK.
        3. Clears logcat.
        4. Runs Monkey Test.
        5. Dumps & Parses logcat.
        6. Uninstalls APK.
        """
        if not self.is_available:
            return self._simulate_analysis(apk_path, package_name)

        if not package_name:
            # We need the package name to run monkey. If not provided, we can't run dynamic analysis properly.
            return {"error": "Package name is required for dynamic analysis."}

        report = {
            "status": "completed",
            "crashes": [],
            "anr": [],
            "security_exceptions": [],
            "logs": ""
        }

        # Step 1: Ensure device is connected
        success, out, err = self._run_adb_cmd(["devices"])
        lines = out.splitlines() if out else []
        if not success or not lines or len(lines) < 2 or "device" not in lines[-1]:
            logger.warning("No emulator/device found. Returning simulation data.")
            return self._simulate_analysis(apk_path, package_name)

        # Step 2: Install APK
        logger.info(f"Installing {apk_path} dynamically...")
        success, out, err = self._run_adb_cmd(["install", "-r", "-g", apk_path], timeout=60)
        if not success or "Failure" in out:
            return {"error": f"Failed to install APK: {out} {err}"}

        # Step 3: Clear logcat
        self._run_adb_cmd(["logcat", "-c"])

        # Step 4: Run Monkey Test
        logger.info(f"Running Monkey test for {package_name}...")
        monkey_events = 500
        success, out, err = self._run_adb_cmd(["shell", "monkey", "-p", package_name, "-v", str(monkey_events)], timeout=60)
        
        # Give it a couple of seconds to settle
        time.sleep(2)

        # Step 5: Dump and Parse logcat
        logger.info("Extracting logcat...")
        success, logcat_out, err = self._run_adb_cmd(["logcat", "-d", "-v", "threadtime"])
        
        report["crashes"] = self._extract_crashes(logcat_out, package_name)
        report["anr"] = self._extract_anr(logcat_out, package_name)
        report["logs"] = logcat_out[-10000:] if len(logcat_out) > 10000 else logcat_out # Keep last 10k chars
        
        # Step 6: Cleanup (Uninstall)
        logger.info(f"Uninstalling {package_name}...")
        self._run_adb_cmd(["uninstall", package_name])

        return report

    def _extract_crashes(self, logcat, package_name):
        crashes = []
        # Look for FATAL EXCEPTION
        lines = logcat.splitlines()
        capturing = False
        current_crash = []
        
        for line in lines:
            if "FATAL EXCEPTION" in line or "AndroidRuntime: FATAL EXCEPTION" in line:
                capturing = True
                if current_crash:
                    crashes.append("\n".join(current_crash))
                current_crash = [line]
            elif capturing:
                if line.strip() == "" or not line.strip().startswith(("at ", "Caused by:")) and len(current_crash) > 10:
                    capturing = False
                    crashes.append("\n".join(current_crash))
                    current_crash = []
                else:
                    current_crash.append(line)
                    
        if current_crash:
             crashes.append("\n".join(current_crash))
             
        # Parse into structured
        structured = []
        for c in crashes:
             reason = "Unknown Fatal Exception"
             if "NullPointerException" in c: reason = "NullPointerException"
             elif "OutOfMemoryError" in c: reason = "OutOfMemoryError"
             elif "RuntimeException" in c: reason = "RuntimeException"
             elif "SecurityException" in c: reason = "SecurityException"
             
             structured.append({
                 "reason": reason,
                 "stack_trace": c,
                 "severity": "Critical"
             })
        return structured

    def _extract_anr(self, logcat, package_name):
        anrs = []
        if f"ANR in {package_name}" in logcat:
             anrs.append({
                 "reason": "Application Not Responding (ANR)",
                 "stack_trace": "Thread blocked on main thread.",
                 "severity": "High"
             })
        return anrs

    def _simulate_analysis(self, apk_path, package_name):
        """Simulation mode for when ADB/Emulator is not available."""
        logger.info("Running simulated dynamic analysis...")
        time.sleep(5) # Simulate processing time
        
        # Generate some fake but realistic looking crashes based on the package name
        crashes = []
        
        crashes.append({
            "reason": "NullPointerException",
            "stack_trace": f"java.lang.NullPointerException: Attempt to invoke virtual method 'void android.widget.TextView.setText(java.lang.CharSequence)' on a null object reference\n    at {package_name}.MainActivity.onCreate(MainActivity.java:42)\n    at android.app.Activity.performCreate(Activity.java:7136)",
            "severity": "Critical",
            "suggestion": "Check if the view is correctly initialized with findViewById before calling setText()."
        })
            
        crashes.append({
            "reason": "SecurityException",
            "stack_trace": f"java.lang.SecurityException: Permission Denial: reading com.android.providers.media.MediaProvider requires android.permission.READ_EXTERNAL_STORAGE\n    at {package_name}.StorageHelper.readFiles(StorageHelper.java:15)",
            "severity": "High",
            "suggestion": "Ensure READ_EXTERNAL_STORAGE permission is declared in AndroidManifest.xml and requested at runtime."
        })

        return {
            "status": "completed (simulated)",
            "crashes": crashes,
            "anr": [{"reason": "ANR Simulation", "severity": "Medium", "stack_trace": "Main thread blocked by heavy DB query."}],
            "security_exceptions": [],
            "logs": "I/ActivityManager: START u0 {act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER]...}\nD/NetworkSecurityConfig: No Network Security Config specified, using platform default\nE/AndroidRuntime: FATAL EXCEPTION: main\n..."
        }
