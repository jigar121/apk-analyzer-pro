def generate_test_cases(apk_data):
    """
    Generates a beautiful HTML string containing custom test cases based on the provided APK data.
    """
    app_name = apk_data.get("app_name", "Unknown Application")
    package_name = apk_data.get("package", "unknown.package")
    permissions = apk_data.get("permissions", [])
    activities = apk_data.get("activities", [])
    services = apk_data.get("services", [])
    receivers = apk_data.get("receivers", [])
    issues = apk_data.get("issues", [])

    # Include custom CSS for animation
    html = """
    <style>
    @keyframes testFadeInUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    .anim-test-card {
        animation: testFadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        opacity: 0;
    }
    .test-card-hover:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        border-color: rgba(56, 189, 248, 0.4);
    }
    .wrap-code code {
        word-break: break-all;
        white-space: pre-wrap;
        background-color: rgba(15, 23, 42, 0.5);
        padding: 0.125rem 0.375rem;
        border-radius: 0.25rem;
        border: 1px solid rgba(56, 189, 248, 0.2);
    }
    </style>
    """

    html += f"""
    <div class="mb-8 anim-test-card" style="animation-delay: 0.1s;">
        <h2 class="text-3xl font-black text-white flex items-center mb-4"><i class="fa-solid fa-flask text-brand-400 mr-3"></i> Automated Test Strategy: <span class="text-brand-300 ml-2">{app_name}</span></h2>
        
        <div class="flex flex-wrap items-center gap-4 mb-6">
            <div class="inline-flex items-center bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-2 text-sm font-mono text-brand-400 shadow-inner break-all">
                <i class="fa-solid fa-box text-gray-500 mr-2"></i> {package_name}
            </div>
            <div class="inline-flex items-center bg-brand-900/20 border border-brand-500/30 rounded-lg px-4 py-2 text-sm text-gray-300">
                <i class="fa-solid fa-robot text-brand-400 mr-2"></i> Auto-generated AI Testing Plan
            </div>
        </div>
    </div>
    """

    def create_card(title, action, result, icon, delay):
        return f"""
        <div class="bg-gray-800/40 border border-gray-700 p-5 rounded-2xl test-card-hover transition-all duration-300 mb-4 anim-test-card" style="animation-delay: {delay}s;">
            <h4 class="text-lg font-bold text-white mb-4 flex items-center break-all"><i class="{icon} text-brand-400 mr-3 text-xl"></i> {title}</h4>
            <div class="flex flex-col gap-4">
                <div class="bg-gray-900/60 p-4 rounded-xl border border-gray-800/80 overflow-hidden wrap-code">
                    <span class="block text-gray-500 text-xs font-black uppercase tracking-widest mb-3"><i class="fa-solid fa-hand-pointer mr-1"></i> Action Steps</span>
                    <div class="text-gray-300 text-sm leading-relaxed">{action}</div>
                </div>
                <div class="bg-brand-900/10 p-4 rounded-xl border border-brand-900/30 overflow-hidden wrap-code">
                    <span class="block text-brand-500 text-xs font-black uppercase tracking-widest mb-3"><i class="fa-solid fa-eye mr-1"></i> Expected Result</span>
                    <div class="text-gray-300 text-sm leading-relaxed">{result}</div>
                </div>
            </div>
        </div>
        """

    # --- POSITIVE TEST CASES ---
    html += """
    <div class="glass-panel p-6 rounded-3xl mb-10 border-l-4 border-green-500 anim-test-card shadow-2xl relative overflow-hidden" style="animation-delay: 0.2s;">
        <div class="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10"></div>
        <h3 class="text-2xl font-black text-green-400 mb-4 flex items-center uppercase tracking-wider"><i class="fa-solid fa-circle-check mr-3"></i> Positive Flow Tests</h3>
        <p class="text-gray-400 text-sm mb-6 bg-gray-900/50 p-4 rounded-xl border border-gray-800 leading-relaxed">
            <strong class="text-white">Approach:</strong> Behave like a normal user. Provide valid inputs, grant necessary permissions, and follow the standard user journey. Ensure the application successfully completes its intended functions without errors or crashes.
        </p>
        <div class="space-y-2">
    """
    
    delay = 0.3
    # Installation
    html += create_card("App Installation", "Install the APK on supported Android device", "App should install successfully and its icon should appear in the device launcher.", "fa-solid fa-download", delay)
    delay += 0.1

    # Activities (UI load)
    if activities:
        main_activities = [act for act in activities if "Main" in act or "Splash" in act or "Login" in act]
        if not main_activities:
            main_activities = activities[:1]
        for act in main_activities:
            act_name = act.split('.')[-1]
            html += create_card(f"Launch Component: {act_name}", f"User taps icon to launch <code>{act}</code>", "UI should render completely and smoothly without crashing or ANR.", "fa-solid fa-mobile-screen", delay)
            delay += 0.1

    # Services
    if services:
        for srv in services[:2]:
            srv_name = srv.split('.')[-1]
            html += create_card(f"Background Service: {srv_name}", f"System or App starts the <code>{srv}</code> service", "Service should run smoothly in the background without causing high battery drain or memory leaks.", "fa-solid fa-server", delay)
            delay += 0.1

    # Permissions (Positive)
    if permissions:
        html += create_card("Grant Standard Permissions", "User accepts all requested permissions upon prompt.", "App features relying on these permissions (e.g., Storage, Camera) should function correctly.", "fa-solid fa-check-double", delay)
        delay += 0.1

    html += """
        </div>
    </div>
    """

    # --- NEGATIVE TEST CASES ---
    html += """
    <div class="glass-panel p-6 rounded-3xl mb-8 border-l-4 border-red-500 anim-test-card shadow-2xl relative overflow-hidden" style="animation-delay: 0.4s;">
        <div class="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -z-10"></div>
        <h3 class="text-2xl font-black text-red-400 mb-4 flex items-center uppercase tracking-wider"><i class="fa-solid fa-bug mr-3"></i> Negative Edge Cases</h3>
        <p class="text-gray-400 text-sm mb-6 bg-gray-900/50 p-4 rounded-xl border border-gray-800 leading-relaxed">
            <strong class="text-white">Approach:</strong> Intentionally break the rules. Deny permissions, disrupt network connectivity, input invalid data, and simulate unexpected behaviors. Verify that the app handles these gracefully with proper error messages instead of crashing.
        </p>
        <div class="space-y-2">
    """
    
    delay = 0.5
    # Permissions (Negative)
    if permissions:
        html += create_card("Deny Critical Permissions", "User explicitly denies requested permissions (e.g., Location/Storage) when prompted.", "App should display a user-friendly warning message explaining why it's needed, and NOT crash.", "fa-solid fa-ban", delay)
        delay += 0.1

        html += create_card("Revoke Permission Mid-Session", "User goes to Android Settings and revokes a permission while the app is in the background.", "App should handle the state gracefully upon resume, typically restarting the activity or prompting again.", "fa-solid fa-user-shield", delay)
        delay += 0.1

    # Activities (Negative)
    if len(activities) > 1:
        html += create_card("Rapid UI Navigation", "User rapidly taps buttons and navigates back and forth between activities.", "App should ignore duplicate rapid touches, not create infinite duplicate screens, and avoid Out Of Memory crashes.", "fa-solid fa-bolt", delay)
        delay += 0.1
        
        html += create_card("Screen Rotation Stress", "User rotates the device from Portrait to Landscape repeatedly during a heavy task.", "UI layout should adjust correctly without losing input data or crashing the underlying Activity.", "fa-solid fa-rotate", delay)
        delay += 0.1

    # Security Issues (Negative/Exploits)
    if issues:
        for issue in issues:
            issue_id = issue.get("id", "")
            title = issue.get("message", issue_id.replace('_', ' ').title())
            desc = issue.get("description", "Simulate the vulnerability conditions")
            
            bug_ref = f"<br><br><span class='text-xs text-red-400 bg-red-900/20 px-2 py-1 rounded border border-red-900/30'>Target: {title}</span>"
            
            if issue_id == "exported_component":
                html += create_card("Unauthorized Component Access", "Third-party malicious app attempts to send a direct Intent to an exported component.", f"Request should be blocked, validated, or handled safely without leaking data.{bug_ref}", "fa-solid fa-unlock-keyhole", delay)
            elif issue_id == "debuggable":
                html += create_card("Production Debugging Attempt", "Attacker attempts to attach a Java Debugger (<code>jdb</code>) to the running release build.", f"App should reject the connection or implement anti-debugging checks.{bug_ref}", "fa-solid fa-bug-slash", delay)
            elif issue_id == "hardcoded_secrets":
                html += create_card("Exposed Secrets Extraction", "Attacker decompiles APK and extracts hardcoded secrets from DEX strings.", f"The extracted API keys or URLs should have restricted server-side permissions causing zero impact.{bug_ref}", "fa-solid fa-user-secret", delay)
            else:
                # Dynamic/AI insights fallback
                clean_title = title.replace("AI Insight:", "").strip()
                if not clean_title: clean_title = "Vulnerability Exploit"
                html += create_card(f"{clean_title} Exploit", desc, f"App should have runtime checks to mitigate this flaw and not crash or leak data.{bug_ref}", "fa-solid fa-biohazard", delay)
            delay += 0.1
    else:
        html += create_card("Invalid Input / Form Handling", "User inputs malformed data, emojis, or SQL injection strings into text fields.", "App should validate the input, show a red error outline/message, and not crash.", "fa-solid fa-keyboard", delay)
        delay += 0.1
        
        html += create_card("No Network Connectivity", "User attempts to perform data-heavy actions while Airplane mode is ON.", "A proper 'Offline' or 'No Connection' error message should be displayed.", "fa-solid fa-wifi", delay)
        delay += 0.1

    html += """
        </div>
    </div>
    """

    return html

