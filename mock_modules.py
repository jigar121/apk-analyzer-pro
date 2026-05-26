import base64
import hashlib

def get_file_hash(filepath):
    try:
        sha256_hash = hashlib.sha256()
        with open(filepath, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()
    except:
        return "mockhash12345"

def get_alarm_clock_mock(filepath):
    return {
        "package": "com.example.alarmclock",
        "app_name": "Smart Alarm Clock",
        "version_name": "2.4.1",
        "version_code": "241",
        "min_sdk": "24",
        "target_sdk": "34",
        "file_size_mb": 4.5,
        "permissions": [
            "android.permission.WAKE_LOCK",
            "android.permission.SET_ALARM",
            "android.permission.VIBRATE",
            "android.permission.RECEIVE_BOOT_COMPLETED",
            "android.permission.FOREGROUND_SERVICE",
            "android.permission.USE_EXACT_ALARM"
        ],
        "activities": [
            "com.example.alarmclock.MainActivity",
            "com.example.alarmclock.AlarmRingActivity",
            "com.example.alarmclock.SettingsActivity"
        ],
        "services": [
            "com.example.alarmclock.AlarmService",
            "com.example.alarmclock.TimerService"
        ],
        "receivers": [
            "com.example.alarmclock.BootReceiver",
            "com.example.alarmclock.AlarmReceiver"
        ],
        "providers": [],
        "issues": [
            {
                "id": "exported_component",
                "title": "Exported Receiver",
                "message": "Exported Receiver without permission protection: com.example.alarmclock.AlarmReceiver",
                "severity": "LOW"
            }
        ],
        "risk": "LOW",
        "score": 2,
        "crash_probability": "5%",
        "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Aptoide_logo.svg/512px-Aptoide_logo.svg.png",
        "playstore_info": {
            "installs": "10,000,000+",
            "score": 4.5,
            "developer": "Smart Tools Studio",
            "genre": "Productivity"
        },
        "manifest_xml": "<manifest package=\"com.example.alarmclock\"><application><activity android:name=\".MainActivity\"/></application></manifest>",
        "certificates": [{"issuer": "CN=AlarmClock, OU=Dev", "subject": "CN=AlarmClock", "hash_algorithm": "SHA256", "serial": "12345"}]
    }

def get_phone_call_mock(filepath):
    return {
        "package": "com.example.phonecall",
        "app_name": "Secure Dialer Pro",
        "version_name": "1.0.5",
        "version_code": "105",
        "min_sdk": "26",
        "target_sdk": "33",
        "file_size_mb": 12.8,
        "permissions": [
            "android.permission.READ_CONTACTS",
            "android.permission.WRITE_CONTACTS",
            "android.permission.CALL_PHONE",
            "android.permission.READ_PHONE_STATE",
            "android.permission.READ_CALL_LOG",
            "android.permission.WRITE_CALL_LOG",
            "android.permission.RECORD_AUDIO",
            "android.permission.INTERNET"
        ],
        "activities": [
            "com.example.phonecall.DialerActivity",
            "com.example.phonecall.ContactListActivity",
            "com.example.phonecall.InCallActivity",
            "com.example.phonecall.CallHistoryActivity"
        ],
        "services": [
            "com.example.phonecall.CallRecordingService",
            "com.example.phonecall.VoipService"
        ],
        "receivers": [
            "com.example.phonecall.IncomingCallReceiver"
        ],
        "providers": [
            "com.example.phonecall.ContactsProvider"
        ],
        "issues": [
            {
                "id": "dangerous_permission",
                "title": "Dangerous Permission",
                "message": "Dangerous Permission requested: android.permission.RECORD_AUDIO",
                "severity": "MEDIUM"
            },
            {
                "id": "dangerous_permission_2",
                "title": "Dangerous Permission",
                "message": "Dangerous Permission requested: android.permission.READ_CONTACTS",
                "severity": "MEDIUM"
            },
            {
                "id": "hardcoded_secrets",
                "title": "Hardcoded Secret",
                "message": "Code Smell: Detected potentially sensitive hardcoded strings/URLs in DEX.",
                "severity": "LOW"
            },
            {"id": "theme_inconsistency", "title": "Theme Bug", "message": "UI/Theme Bug: Hardcoded text colors in XML layouts conflict with system Dark Mode.", "severity": "LOW"},
            {"id": "lang_missing_translations", "title": "Language Bug", "message": "Language/L10N Bug: Missing string translations for 'es' (Spanish).", "severity": "LOW"},
            {"id": "theme_overlapping", "title": "UI Bug", "message": "UI/UX Bug: Overlapping views on smaller screen densities.", "severity": "LOW"},
            {"id": "lang_rtl_clipping", "title": "Language Bug", "message": "Language/RTL Bug: Text clipping occurs in Arabic (RTL) mode.", "severity": "LOW"},
            {"id": "memory_leak_context", "title": "Memory Leak", "message": "Memory Leak: Static reference to Activity Context found in AsyncTasks.", "severity": "MEDIUM"},
            {"id": "network_timeout", "title": "Network Bug", "message": "Network Bug: No explicit connection timeout defined for HTTP requests.", "severity": "LOW"},
            {"id": "db_unclosed_cursor", "title": "Database Bug", "message": "Database Bug: SQLite Cursor objects are not enclosed in try-finally blocks.", "severity": "LOW"},
            {"id": "ui_anr_risk", "title": "Performance", "message": "Performance Bug: Heavy Bitmap decoding is performed on the Main/UI thread.", "severity": "HIGH"},
            {"id": "theme_status_bar", "title": "Theme Bug", "message": "UI/Theme Bug: Status bar color is not defined in styles.xml.", "severity": "LOW"},
            {"id": "lang_hardcoded_strings", "title": "Language Bug", "message": "Language Bug: User-facing strings are hardcoded in Java classes.", "severity": "LOW"},
            {"id": "arch_god_object", "title": "Architecture", "message": "Architecture Bug: MainActivity is a God Object (3000+ lines).", "severity": "LOW"},
            {"id": "battery_wakelock", "title": "Battery Drain", "message": "Battery Drain: WakeLock is acquired but never released.", "severity": "MEDIUM"},
            {"id": "security_tapjacking", "title": "Security", "message": "Security/UI Bug: App is vulnerable to UI redressing (Tapjacking).", "severity": "HIGH"},
            {"id": "ux_back_button", "title": "UX Bug", "message": "UX Bug: Hardware Back button behavior is overridden incorrectly.", "severity": "LOW"},
            {"id": "api_deprecation", "title": "Compatibility", "message": "Compatibility Bug: Usage of deprecated hardware APIs.", "severity": "LOW"},
            {"id": "theme_font_scaling", "title": "Accessibility", "message": "Accessibility Bug: Fonts will not scale for visually impaired users.", "severity": "LOW"},
            {"id": "lang_encoding", "title": "Language Bug", "message": "Language Bug: Improper UTF-8 encoding reading local assets.", "severity": "LOW"},
            {"id": "thread_race_condition", "title": "Concurrency", "message": "Concurrency Bug: Race condition detected in SharedPreferences.", "severity": "LOW"},
            {"id": "ui_keyboard_overlap", "title": "UI Bug", "message": "UI/Theme Bug: Soft keyboard overlaps the Login button.", "severity": "LOW"},
            {"id": "memory_bitmap_cache", "title": "Memory Bug", "message": "Memory Bug: Lack of LRU Cache for downloading images in RecyclerView.", "severity": "MEDIUM"},
            {"id": "lang_plurals", "title": "Language Bug", "message": "Language Bug: Incorrect usage of plurals/quantity strings.", "severity": "LOW"},
            {"id": "theme_ripple_effect", "title": "Theme Bug", "message": "UI/Theme Bug: Custom buttons lack native Android ripple touch feedback.", "severity": "LOW"}
        ],
        "risk": "MEDIUM",
        "score": 45,
        "crash_probability": "45%",
        "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Aptoide_logo.svg/512px-Aptoide_logo.svg.png",
        "playstore_info": {
            "installs": "50,000,000+",
            "score": 4.2,
            "developer": "Secure Communications LLC",
            "genre": "Communication"
        },
        "manifest_xml": "<manifest package=\"com.example.phonecall\"><application><activity android:name=\".DialerActivity\"/></application></manifest>",
        "certificates": [{"issuer": "CN=PhoneCall, OU=Dev", "subject": "CN=PhoneCall", "hash_algorithm": "SHA256", "serial": "67890"}],
        "dynamic_analysis": {
            "status": "completed (simulated)",
            "crashes": [
                {
                    "reason": "NullPointerException",
                    "stack_trace": "java.lang.NullPointerException: Attempt to invoke virtual method 'void android.widget.TextView.setText(java.lang.CharSequence)' on a null object reference\n    at com.example.phonecall.DialerActivity.onCreate(DialerActivity.java:42)\n    at android.app.Activity.performCreate(Activity.java:7136)",
                    "severity": "Critical",
                    "suggestion": "Check if the view is correctly initialized with findViewById before calling setText()."
                },
                {
                    "reason": "SecurityException",
                    "stack_trace": "java.lang.SecurityException: Permission Denial: reading com.android.providers.media.MediaProvider requires android.permission.READ_EXTERNAL_STORAGE\n    at com.example.phonecall.StorageHelper.readFiles(StorageHelper.java:15)",
                    "severity": "High",
                    "suggestion": "Ensure READ_EXTERNAL_STORAGE permission is declared in AndroidManifest.xml and requested at runtime."
                }
            ],
            "anr": [
                {
                    "reason": "ANR Simulation",
                    "severity": "Medium",
                    "stack_trace": "Main thread blocked by heavy DB query.\n    at com.example.phonecall.DatabaseManager.queryAllContacts(DatabaseManager.java:88)\n    at com.example.phonecall.DialerActivity.onResume(DialerActivity.java:102)"
                }
            ],
            "security_exceptions": [],
            "logs": "I/ActivityManager: START u0 {act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER]...}\nD/NetworkSecurityConfig: No Network Security Config specified, using platform default\nI/PhoneCall: Initializing Dialer...\nE/AndroidRuntime: FATAL EXCEPTION: main\nProcess: com.example.phonecall, PID: 12345\njava.lang.NullPointerException\nI/PhoneCall: App restarted.\nW/ActivityManager: ANR in com.example.phonecall"
        }
    }
