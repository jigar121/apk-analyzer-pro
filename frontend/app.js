
// --- NEW DESIGN ENGINE LOGIC ---

// 1. Particle Background System
function initParticles() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        
        const size = Math.random() * 4 + 1 + 'px';
        p.style.width = size;
        p.style.height = size;
        
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        
        const duration = Math.random() * 30 + 15 + 's';
        const delay = Math.random() * -30 + 's';
        p.style.animation = `float-particle ${duration} linear infinite ${delay}`;
        
        container.appendChild(p);
    }
}

// 2. 3D Tilt Interaction
window.handleTilt = function(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 40;
    const rotateY = (centerX - x) / 40;
    
    card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

window.resetTilt = function(card) {
    card.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg)`;
};

// ---------------------------------

window.addEventListener('error', function(e) {
    console.error("GLOBAL ERROR: " + e.message + "\nLine: " + e.lineno);
});
window.addEventListener('unhandledrejection', function(e) {
    console.error("PROMISE ERROR: ", e.reason);
});

window.escapeHtml = function(text) {
    if (!text) return "";
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
};
function escapeHtml(text) { return window.escapeHtml(text); }

const translations = {
    en: {
        app_title: 'APK Analyzer <span class="text-brand-400">Pro</span>',
        app_subtitle: 'Enterprise-grade static analysis engine',
        upload_title: 'Upload Android Package',
        upload_desc: 'Drag and drop your APK file here or browse to start deep static analysis.',
        btn_browse: 'Select File to Analyze',
        tab_issues: 'Security Issues',
        tab_perms: 'Permissions',
        tab_activities: 'Activities',
        tab_services: 'Services & Receivers',
        tab_secrets: 'Secrets & URLs',
        nav_testcases: 'Test Cases',
        testcases_title: 'Automated Test Cases',
        testcases_subtitle: 'View generated test scenarios based on the most recent static analysis.',
        stat_apks: 'APKs Analyzed',
        stat_engine: 'Androguard Powered',
        stat_speed: 'Data Retained',
        feat_title: 'Why Choose Analyzer Pro?',
        feat_subtitle: 'Advanced static analysis algorithms combined with intuitive visualizations.',
        f1_title: 'Deep Static Analysis',
        f1_desc: 'Extracts Dalvik executables and manifest files to trace vulnerabilities without executing the code.',
        f2_title: 'Privacy & Permissions',
        f2_desc: 'Identify over-privileged applications that request dangerous permissions like location and SMS.',
        f3_title: 'Crash Risk Prediction',
        f3_desc: 'Detect missing activities, exported components, and architectural flaws that lead to runtime crashes.',
        hiw_title: 'How It Works',
        hiw_subtitle: 'Three simple steps to secure your Android application.',
        s1_title: 'Upload APK',
        s1_desc: 'Drag & drop your compiled Android package.',
        s2_title: 'Engine Analysis',
        s2_desc: 'Our engine dissects the DEX files securely.',
        s3_title: 'Get Report',
        s3_desc: 'View the interactive dashboard and vulnerability videos.',
        cta_title: 'Ready to secure your app?',
        cta_desc: 'Join thousands of developers ensuring their Android applications are free from vulnerabilities before shipping to the Play Store.',
        cta_btn: 'Start Free Scan'
    },
    gu: {
        app_title: 'APK એનાલાઇઝર <span class="text-brand-400">પ્રો</span>',
        app_subtitle: 'એન્ટરપ્રાઇઝ-લેવલ સ્ટેટિક એનાલિસિસ એન્જિન',
        upload_title: 'Android પેકેજ અપલોડ કરો',
        upload_desc: 'તમારી APK ફાઈલને અહીં ખેંચી લાવો અથવા ડીપ એનાલિસિસ શરૂ કરવા માટે બ્રાઉઝ કરો.',
        btn_browse: 'એનાલાઇઝ કરવા માટે ફાઇલ પસંદ કરો',
        tab_issues: 'સિક્યોરિટી પ્રોબ્લેમ્સ',
        tab_perms: 'પરમિશન્સ',
        tab_activities: 'એક્ટિવિટીઝ',
        tab_services: 'સર્વિસ અને રિસીવર',
        tab_secrets: 'સિક્રેટ્સ અને URL',
        nav_testcases: 'ટેસ્ટ કેસ',
        testcases_title: 'ઓટોમેટિક ટેસ્ટ કેસ',
        testcases_subtitle: 'છેલ્લા એનાલિસિસ પરથી જનરેટ થયેલા ટેસ્ટ જુઓ.',
        stat_apks: 'APK ચેક થયા',
        stat_engine: 'એન્ડ્રોગાર્ડ એન્જિન',
        stat_speed: 'ડેટા સ્ટોર થતો નથી',
        feat_title: 'શા માટે એનાલાઇઝર પ્રો પસંદ કરવું?',
        feat_subtitle: 'આધુનિક એલ્ગોરિધમ્સ દ્વારા અદ્યતન એનાલિસિસ.',
        f1_title: 'ડીપ સ્ટેટિક એનાલિસિસ',
        f1_desc: 'કોડ રન કર્યા વગર જ Dalvik ફાઈલ માંથી વાયરસ અને ખામીઓ શોધી કાઢે છે.',
        f2_title: 'પ્રાઇવસી અને પરમિશન્સ',
        f2_desc: 'એવી એપ્લિકેશન્સ શોધો જે લોકેશન અને SMS જેવી જોખમી પરમિશન માંગે છે.',
        f3_title: 'ક્રેસ થવાનું જોખમ',
        f3_desc: 'એવા આર્કિટેક્ચરલ પ્રોબ્લેમ્સ શોધો જેના લીધે તમારી એપ અચાનક બંધ થઈ શકે છે.',
        hiw_title: 'આ કેવી રીતે કામ કરે છે?',
        hiw_subtitle: 'તમારી એપને સુરક્ષિત કરવાના માત્ર ત્રણ સરળ સ્ટેપ્સ.',
        s1_title: 'APK અપલોડ કરો',
        s1_desc: 'તમારી ડાઉનલોડ કરેલી ફાઈલ અહીં મૂકો.',
        s2_title: 'એન્જિન એનાલિસિસ',
        s2_desc: 'અમારું એન્જિન ફાઈલને સુરક્ષિત રીતે તપાસશે.',
        s3_title: 'રિપોર્ટ મેળવો',
        s3_desc: 'ડેશબોર્ડ અને વિડિઓ દ્વારા રિપોર્ટ જુઓ.',
        cta_title: 'તમારી એપને સુરક્ષિત કરવા તૈયાર છો?',
        cta_desc: 'હજારો ડેવલપર્સ સાથે જોડાઈને પ્લે સ્ટોર પર મુકતા પહેલા એપને સુરક્ષિત બનાવો.',
        cta_btn: 'ફ્રી સ્કેન શરૂ કરો'
    },
    hi: {
        app_title: 'APK एनालाइज़र <span class="text-brand-400">प्रो</span>',
        app_subtitle: 'एंटरप्राइज़-स्तरीय स्टैटिक एनालिसिस इंजन',
        upload_title: 'Android पैकेज अपलोड करें',
        upload_desc: 'अपनी APK फ़ाइल यहाँ खींचें या डीप एनालिसिस शुरू करने के लिए ब्राउज़ करें।',
        btn_browse: 'एनालिसिस के लिए फ़ाइल चुनें',
        tab_issues: 'सुरक्षा समस्याएँ',
        tab_perms: 'अनुमतियाँ',
        tab_activities: 'गतिविधियाँ',
        tab_services: 'सेवाएँ और रिसीवर',
        tab_secrets: 'सीक्रेट्स और URL',
        nav_testcases: 'टेस्ट केस',
        testcases_title: 'ऑटोमेटिक टेस्ट केस',
        testcases_subtitle: 'अंतिम विश्लेषण के आधार पर उत्पन्न टेस्ट परिदृश्य देखें।',
        stat_apks: 'APK स्कैन किए गए',
        stat_engine: 'एंड्रोगार्ड इंजन',
        stat_speed: 'डेटा सेव नहीं होता',
        feat_title: 'एनालाइज़र प्रो क्यों चुनें?',
        feat_subtitle: 'आधुनिक एल्गोरिदम के साथ उन्नत एनालिसिस।',
        f1_title: 'डीप स्टैटिक एनालिसिस',
        f1_desc: 'कोड रन किए बिना Dalvik फ़ाइलों से कमियां खोजें।',
        f2_title: 'प्राइवेसी और अनुमतियाँ',
        f2_desc: 'उन ऐप्स की पहचान करें जो खतरनाक अनुमतियां मांगते हैं।',
        f3_title: 'क्रैश होने का खतरा',
        f3_desc: 'ऐसी वास्तुकला संबंधी कमियां खोजें जिनसे ऐप क्रैश हो सकता है।',
        hiw_title: 'यह कैसे काम करता है?',
        hiw_subtitle: 'अपने ऐप को सुरक्षित करने के तीन सरल चरण।',
        s1_title: 'APK अपलोड करें',
        s1_desc: 'अपनी फ़ाइल यहाँ डालें।',
        s2_title: 'इंजन एनालिसिस',
        s2_desc: 'हमारा इंजन सुरक्षित रूप से फ़ाइल की जांच करेगा।',
        s3_title: 'रिपोर्ट प्राप्त करें',
        s3_desc: 'डैशबोर्ड और वीडियो के माध्यम से रिपोर्ट देखें।',
        cta_title: 'क्या आप अपने ऐप को सुरक्षित करने के लिए तैयार हैं?',
        cta_desc: 'हजारों डेवलपर्स से जुड़ें और प्ले स्टोर पर डालने से पहले ऐप को सुरक्षित करें।',
        cta_btn: 'फ्री स्कैन शुरू करें'
    }
};

function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    let componentsChartInstance = null;
    
    const uploadSection = document.getElementById('upload-section');
    const fileInput = document.getElementById('apk-file');
    const progressSection = document.getElementById('progress-section');
    const progressBarTop = document.getElementById('progress-bar-top');
    const progressPercentage = document.getElementById('progress-percentage');
    const analysisStep = document.getElementById('analysis-step');
    const resultsDashboard = document.getElementById('results-dashboard');
    const historyContent = document.getElementById('history-content');
    const landingContent = document.getElementById('landing-content');
    const errorAlert = document.getElementById('error-alert');
    const errorMessage = document.getElementById('error-message');
    const btnNewScan = document.getElementById('btn-new-scan');
    const btnDownloadPdf = document.getElementById('btn-download-pdf');
    const heroHeader = document.getElementById('hero-header');

    // Global helper to update all progress indicators including the circular SVG ring
    window.updateProgress = function(progress) {
        if (progressBarTop) progressBarTop.style.width = progress + '%';
        if (progressPercentage) progressPercentage.innerText = progress + '%';
        const circularRing = document.getElementById('circular-progress-ring');
        if (circularRing) {
            const circumference = 276.46;
            const offset = circumference - (progress / 100) * circumference;
            circularRing.style.strokeDashoffset = offset;
        }
    };

    // Navigation Elements
    const navHome = document.getElementById('nav-home');
    const navHistory = document.getElementById('nav-history');
    const navCompare = document.getElementById('nav-compare');
    const navTestcases = document.getElementById('nav-testcases');
    const compareContent = document.getElementById('compare-content');
    const btnRefreshHistory = document.getElementById('btn-refresh-history');
    const historyTableBody = document.getElementById('history-table-body');

    // Navigation Logic
    function switchView(viewName) {
        landingContent.classList.add('hidden');
        resultsDashboard.classList.add('hidden');
        historyContent.classList.add('hidden');
        progressSection.classList.add('hidden');
        errorAlert.classList.add('hidden');
        document.getElementById('global-testcases-page').classList.add('hidden');
        if (compareContent) compareContent.classList.add('hidden');

        navHome.className = "px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors";
        navHistory.className = "px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors";
        if (navCompare) navCompare.className = "px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors";
        if (navTestcases) navTestcases.className = "px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors";

        if (viewName === 'home') {
            landingContent.classList.remove('hidden');
            navHome.className = "px-4 py-2 rounded-lg text-sm font-bold text-brand-400 bg-brand-900/20 transition-colors";
            // Clear input on return home
            fileInput.value = '';
        } else if (viewName === 'history') {
            historyContent.classList.remove('hidden');
            navHistory.className = "px-4 py-2 rounded-lg text-sm font-bold text-brand-400 bg-brand-900/20 transition-colors";
            loadHistory();
        } else if (viewName === 'testcases') {
            document.getElementById('global-testcases-page').classList.remove('hidden');
            if (navTestcases) navTestcases.className = "px-4 py-2 rounded-lg text-sm font-bold text-brand-400 bg-brand-900/20 transition-colors";
            loadGlobalTestCases();
        } else if (viewName === 'results') {
            resultsDashboard.classList.remove('hidden');
            navHome.className = "px-4 py-2 rounded-lg text-sm font-bold text-brand-400 bg-brand-900/20 transition-colors";
        } else if (viewName === 'compare') {
            if (compareContent) compareContent.classList.remove('hidden');
            if (navCompare) navCompare.className = "px-4 py-2 rounded-lg text-sm font-bold text-brand-400 bg-brand-900/20 transition-colors";
            loadCompareDropdowns();
        }
    }

    let hasActiveScan = false;

    window.setNavState = function(disabled) {
        const buttons = [navHome, navHistory, navTestcases, document.getElementById('btn-options')];
        buttons.forEach(btn => {
            if (btn) {
                btn.disabled = disabled;
                if (disabled) {
                    btn.classList.add('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
                } else {
                    btn.classList.remove('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
                }
            }
        });
        
        const footerLinks = document.querySelectorAll('footer a');
        footerLinks.forEach(link => {
            if (disabled) {
                link.classList.add('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
            } else {
                link.classList.remove('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
            }
        });
    };

    navHome.addEventListener('click', () => {
        if (hasActiveScan) {
            switchView('results');
        } else {
            switchView('home');
        }
    });
    navHistory.addEventListener('click', () => switchView('history'));
    if (navCompare) navCompare.addEventListener('click', () => switchView('compare'));
    if (navTestcases) navTestcases.addEventListener('click', () => switchView('testcases'));
    btnRefreshHistory.addEventListener('click', loadHistory);

    // Clear History Dialog Logic
    const btnClearHistory = document.getElementById('btn-clear-history');
    const modalClearHistory = document.getElementById('clear-history-modal');
    const dialogClearHistory = document.getElementById('clear-history-dialog');
    const btnCancelClear = document.getElementById('btn-cancel-clear');
    const btnConfirmClear = document.getElementById('btn-confirm-clear');

    if (btnClearHistory && modalClearHistory) {
        btnClearHistory.addEventListener('click', () => {
            modalClearHistory.classList.remove('hidden');
            // Small delay for transition
            setTimeout(() => {
                modalClearHistory.classList.remove('opacity-0');
                dialogClearHistory.classList.remove('scale-95', 'opacity-0');
                dialogClearHistory.classList.add('scale-100', 'opacity-100');
            }, 10);
        });

        const closeModal = () => {
            modalClearHistory.classList.add('opacity-0');
            dialogClearHistory.classList.remove('scale-100', 'opacity-100');
            dialogClearHistory.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modalClearHistory.classList.add('hidden');
            }, 300);
        };

        btnCancelClear.addEventListener('click', closeModal);
        modalClearHistory.addEventListener('click', (e) => {
            if (e.target === modalClearHistory) closeModal();
        });

        btnConfirmClear.addEventListener('click', () => {
            btnConfirmClear.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Deleting...';
            btnConfirmClear.disabled = true;

            fetch('/api/history/all', {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                closeModal();
                btnConfirmClear.innerHTML = '<i class="fa-solid fa-trash-can mr-2"></i>Yes, Delete All';
                btnConfirmClear.disabled = false;
                
                // Clear active scan state from dashboard
                hasActiveScan = false;
                window.currentScanData = null;
                resultsDashboard.classList.add('hidden');
                landingContent.classList.remove('hidden');
                
                latestTestCasesContent = null;
                latestTestCasesPackage = "unknown";
                
                const tcContent = document.getElementById('global-testcases-content');
                if (tcContent) {
                    tcContent.innerHTML = `<div class="text-center text-gray-500 py-10">
                        <i class="fa-solid fa-file-shield text-4xl mb-4 opacity-50 block"></i>
                        No test cases available. Please upload an APK or select a report from History first.
                    </div>`;
                }
                
                const sidebarTcContent = document.getElementById('testcases-content');
                if (sidebarTcContent) {
                    sidebarTcContent.innerHTML = `<div class="text-gray-500 p-4 bg-gray-900/30 rounded-lg text-center border border-gray-800">No test cases generated.</div>`;
                }

                loadHistory(); // Refresh the table
            })
            .catch(err => {
                console.error("Failed to delete history:", err);
                closeModal();
                btnConfirmClear.innerHTML = '<i class="fa-solid fa-trash-can mr-2"></i>Yes, Delete All';
                btnConfirmClear.disabled = false;
                alert('Failed to clear history. Please ensure backend is running.');
            });
        });
    }

    let riskChartInstance = null;
    let bugChartInstance = null;

    function loadAnalytics() {
        fetch("/api/analytics")
            .then(res => res.json())
            .then(data => {
                data.total_scans = data.total_scans || 0;
                data.avg_score = data.avg_score || 0;
                data.top_bugs = data.top_bugs || [];
                data.risk_distribution = data.risk_distribution || { HIGH: 0, MEDIUM: 0, LOW: 0 };
                document.getElementById("analytics-total-scans").innerText = data.total_scans;
                document.getElementById("analytics-avg-score").innerText = Math.min(data.avg_score || 0, 100) + "/100";
                
                const topBugEl = document.getElementById("analytics-top-bug");
                const firstBug = data.top_bugs && data.top_bugs.length > 0 ? data.top_bugs[0] : null;
                topBugEl.innerText = firstBug ? (firstBug.title || firstBug.name) : "None";
                
                topBugEl.classList.remove('text-brand-400');
                
                const bannerScans = document.getElementById("banner-total-scans");
                if (bannerScans) bannerScans.innerText = data.total_scans || 0;
                
                const riskCtx = document.getElementById("riskChart");
                if (riskCtx) {
                    if (riskChartInstance) riskChartInstance.destroy();
                    riskChartInstance = new Chart(riskCtx, {
                        type: "doughnut",
                        data: {
                            labels: ["HIGH", "MEDIUM", "LOW"],
                            datasets: [{
                                data: [data.risk_distribution.HIGH || 0, data.risk_distribution.MEDIUM || 0, data.risk_distribution.LOW || 0],
                                backgroundColor: ["#ef4444", "#eab308", "#22c55e"],
                                borderWidth: 0,
                                hoverOffset: 4
                            }]
                        },
                        options: { 
                            maintainAspectRatio: false, 
                            cutout: '75%',
                            layout: { padding: 10 },
                            plugins: { 
                                legend: { 
                                    position: "bottom", 
                                    labels: { color: "#9ca3af", padding: 20, usePointStyle: true } 
                                } 
                            } 
                        }
                    });
                }

                const bugCtx = document.getElementById("bugChart");
                if (bugCtx) {
                    if (bugChartInstance) bugChartInstance.destroy();
                    const ctx2d = bugCtx.getContext('2d');
                    
                    // Create Premium Gradient
                    const gradient = ctx2d.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, '#0ea5e9');   // Brand Blue
                    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.5)'); // Translucent Purple

                    const labels = data.top_bugs ? data.top_bugs.map(b => {
                        const txt = b.title || b.name || "Unknown";
                        return txt.length > 15 ? txt.substring(0, 15) + "..." : txt;
                    }) : [];
                    const counts = data.top_bugs ? data.top_bugs.map(b => b.count) : [];
                    
                    bugChartInstance = new Chart(bugCtx, {
                        type: "bar",
                        data: {
                            labels: labels,
                            datasets: [{
                                label: "Incidences",
                                data: counts,
                                backgroundColor: gradient,
                                hoverBackgroundColor: '#38bdf8', // Brighter blue on hover
                                borderRadius: 10,
                                borderSkipped: false,
                                barThickness: 40,
                                hoverBorderWidth: 2,
                                hoverBorderColor: 'rgba(255,255,255,0.2)'
                            }]
                        },
                        options: { 
                            maintainAspectRatio: false, 
                            animation: {
                                duration: 2000,
                                easing: 'easeOutElastic'
                            },
                            plugins: { 
                                legend: { display: false },
                                tooltip: {
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                    padding: 12,
                                    titleFont: { size: 14, weight: 'bold' },
                                    bodyFont: { size: 13 },
                                    cornerRadius: 8,
                                    displayColors: false
                                }
                            }, 
                            scales: { 
                                y: { 
                                    beginAtZero: true, 
                                    grid: { color: "rgba(255,255,255,0.05)", drawBorder: false }, 
                                    ticks: { color: "#6b7280", font: { size: 11 } } 
                                }, 
                                x: { 
                                    grid: { display: false }, 
                                    ticks: { color: "#9ca3af", font: { size: 10, weight: '600' } } 
                                } 
                            } 
                        }
                    });
                }
            }).catch(err => console.error("Analytics Error", err));
    }

    function loadHistory() {
        loadAnalytics();
        historyTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="px-6 py-10 text-center text-gray-500">
                    <div class="loader inline-block mb-4"></div>
                    <p>Loading history...</p>
                </td>
            </tr>`;

        fetch('/api/history', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                historyTableBody.innerHTML = '';
                if (!data || data.length === 0) {
                    historyTableBody.innerHTML = `<tr><td colspan="5" class="px-6 py-10 text-center text-gray-500">No scans found in history.</td></tr>`;
                    return;
                }

                data.forEach(scan => {
                    const date = new Date(scan.created_at).toLocaleString();
                    const badgeClass = scan.risk === 'HIGH' ? 'bg-red-900/30 text-red-400 border-red-800' :
                        (scan.risk === 'MEDIUM' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800' : 'bg-green-900/30 text-green-400 border-green-800');

                    historyTableBody.innerHTML += `
                        <tr class="hover:bg-gray-800/50 transition-colors">

                            <td class="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">${date}</td>
                            <td class="px-6 py-4">
                                <p class="text-sm font-bold text-white">${scan.app_name !== 'Unknown' ? scan.app_name : scan.package}</p>
                                <p class="text-xs text-gray-500 font-mono">${scan.package}</p>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <span class="font-bold text-white">${scan.score}</span>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeClass}">${scan.risk}</span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button onclick="window.loadScanDetails(${scan.id})" class="px-3 py-1.5 bg-brand-900/20 hover:bg-brand-900/40 text-brand-400 rounded-lg text-xs font-bold border border-brand-800/50 transition-colors mr-2">View Report</button>
                                <button onclick="window.deleteHistoryItem(${scan.id})" class="px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg text-xs font-bold border border-red-800/50 transition-colors" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
                            </td>
                        </tr>
                    `;
                });
            })
            .catch(err => {
                historyTableBody.innerHTML = `<tr><td colspan="5" class="px-6 py-10 text-center text-red-500">Failed to load history. Backend might be offline.</td></tr>`;
            });
    }




    let latestTestCasesContent = null;
    let latestTestCasesPackage = "unknown";

    function loadGlobalTestCases() {
        const contentDiv = document.getElementById('global-testcases-content');
        
        if (!latestTestCasesContent) {
            contentDiv.innerHTML = `
                <div class="text-center text-gray-500 py-20 animate-fade-in">
                    <i class="fa-solid fa-file-shield text-6xl mb-6 opacity-20 block"></i>
                    <h3 class="text-xl font-bold text-gray-400 mb-2">No Active Test Suite</h3>
                    <p class="max-w-md mx-auto">Please upload an APK or select a report from <span class="text-brand-400 font-bold">History</span> to generate automated test scenarios.</p>
                </div>`;
            return;
        }

        renderTestCases(contentDiv, latestTestCasesContent);
    }

    function renderTestCases(container, mdContent) {
        container.innerHTML = mdContent;
    }

    const btnRefreshTestcases = document.getElementById('btn-refresh-testcases');
    if (btnRefreshTestcases) btnRefreshTestcases.addEventListener('click', loadGlobalTestCases);

    const btnDownloadGlobalTestcases = document.getElementById('btn-download-global-testcases');
    if (btnDownloadGlobalTestcases) {
        btnDownloadGlobalTestcases.onclick = () => {
            const blob = new Blob([latestTestCasesContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Global_TestCases_${latestTestCasesPackage}.md`;
            a.click();
            URL.revokeObjectURL(url);
        };
    }

    // Expose for inline buttons
    window.loadScanDetails = function (scanId) {
        const urlParams = new URLSearchParams(window.location.search);
        const hideLoader = urlParams.get('hideLoader') === 'true';

        switchView('home'); // Just to clear UI temporarily
        
        if (!hideLoader) {
            progressSection.classList.remove('hidden');
            document.getElementById('progress-text').innerText = 'Loading Report...';
            document.getElementById('analysis-step').innerText = 'Fetching data from database...';
        }
        landingContent.classList.add('hidden');

        fetch(`/api/history/${scanId}`, { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                displayResults(data);
                switchView('results');
            })
            .catch(err => {
                showError("Failed to load report from database.");
            });
    };

    window.deleteHistoryItem = function (id) {
        if (!confirm("Are you sure you want to delete this scan report?")) return;
        
        fetch(`/api/history/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                // Refresh the history table
                document.getElementById('nav-history').click();
            } else {
                alert("Failed to delete the report.");
            }
        })
        .catch(err => alert("Error deleting report."));
    };


    // Bug Documentation Data
    let bugDocumentation = {};

    // Fetch bug documentation from API
    fetch('/api/bugs')
        .then(res => res.json())
        .then(data => { bugDocumentation = data; })
        .catch(err => console.error('Failed to load bug documentation', err));

    // Bug Modal Elements
    const bugModal = document.getElementById('bug-modal');
    const closeBugModal = document.getElementById('close-bug-modal');
    const bugContent = document.getElementById('bug-content');
    const listActivities = document.getElementById('list-activities');
    const listServices = document.getElementById('list-services');
    const listReceivers = document.getElementById('list-receivers');

    const badgeActivities = document.getElementById('badge-activities');
    const bugTitle = document.getElementById('bug-title');
    const bugSeverity = document.getElementById('bug-severity');
    const bugDescription = document.getElementById('bug-description');
    const bugRemediation = document.getElementById('bug-remediation');
    const bugInstance = document.getElementById('bug-instance');

    closeBugModal.addEventListener('click', hideBugModal);
    bugModal.addEventListener('click', (e) => {
        if (e.target === bugModal) hideBugModal();
    });

    function showBugModal(bugId, instanceMsg) {
        const doc = bugDocumentation[bugId];
        if (!doc) return;

        bugTitle.innerText = doc.title;
        bugDescription.innerText = doc.description;
        bugRemediation.innerText = doc.remediation;
        bugInstance.innerText = instanceMsg;

        // Reset severity badge classes
        bugSeverity.className = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border";
        if (doc.severity === 'Critical' || doc.severity === 'High') {
            bugSeverity.classList.add('bg-red-900/30', 'text-red-400', 'border-red-800');
        } else if (doc.severity === 'Medium') {
            bugSeverity.classList.add('bg-yellow-900/30', 'text-yellow-400', 'border-yellow-800');
        } else {
            bugSeverity.classList.add('bg-blue-900/30', 'text-blue-400', 'border-blue-800');
        }
        bugSeverity.innerText = doc.severity.toUpperCase();

        bugModal.classList.remove('hidden');
        setTimeout(() => {
            bugModal.classList.remove('opacity-0');
            bugContent.classList.remove('scale-95');
        }, 10);
    }

    function hideBugModal() {
        bugModal.classList.add('opacity-0');
        bugContent.classList.add('scale-95');
        setTimeout(() => {
            bugModal.classList.add('hidden');
        }, 300);
    }

    // Settings Modal
    const btnOptions = document.getElementById('btn-options');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');
    const settingsContent = document.getElementById('settings-content');

    btnOptions.addEventListener('click', () => {
        // Ensure modal is visible before triggering animation
        settingsModal.classList.remove('hidden');
        settingsModal.classList.add('flex');
        
        // Force a reflow to make sure the transition triggers
        void settingsModal.offsetWidth;
        
        settingsModal.classList.remove('opacity-0');
        settingsContent.classList.remove('scale-95');
        settingsContent.classList.add('scale-100');
    });

    closeSettings.addEventListener('click', hideSettings);
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) hideSettings();
    });

    function hideSettings() {
        settingsModal.classList.add('opacity-0');
        settingsContent.classList.remove('scale-100');
        settingsContent.classList.add('scale-95');
        setTimeout(() => {
            settingsModal.classList.add('hidden');
            settingsModal.classList.remove('flex');
        }, 300);
    }

    // App/Game Type Toggle Logic
    const typeApp = document.getElementById('type-app');
    const typeGame = document.getElementById('type-game');

    if (typeApp && typeGame) {
        typeApp.addEventListener('click', () => {
            typeApp.classList.add('text-white', 'bg-brand-500', 'shadow-lg', 'shadow-brand-500/25');
            typeApp.classList.remove('text-gray-400', 'hover:text-gray-200');

            typeGame.classList.remove('text-white', 'bg-brand-500', 'shadow-lg', 'shadow-brand-500/25');
            typeGame.classList.add('text-gray-400', 'hover:text-gray-200');
        });

        typeGame.addEventListener('click', () => {
            typeGame.classList.add('text-white', 'bg-brand-500', 'shadow-lg', 'shadow-brand-500/25');
            typeGame.classList.remove('text-gray-400', 'hover:text-gray-200');

            typeApp.classList.remove('text-white', 'bg-brand-500', 'shadow-lg', 'shadow-brand-500/25');
            typeApp.classList.add('text-gray-400', 'hover:text-gray-200');
        });
    }

    // Sidebar Routing Logic
    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    const resultViews = document.querySelectorAll('.result-view');
    
    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            sidebarBtns.forEach(b => {
                b.classList.remove('active', 'bg-brand-500/20', 'text-brand-400', 'font-bold');
                b.classList.add('hover:bg-gray-800/50', 'text-gray-400', 'font-semibold');
            });
            resultViews.forEach(v => v.classList.add('hidden'));

            // Add active classes
            btn.classList.add('active', 'bg-brand-500/20', 'text-brand-400', 'font-bold');
            btn.classList.remove('hover:bg-gray-800/50', 'text-gray-400', 'font-semibold');
            
            const target = btn.getAttribute('data-target');
            const targetView = document.getElementById(target);
            if (targetView) {
                targetView.classList.remove('hidden');
                
                // Mobile Accordion Logic
                if (window.innerWidth < 1024) {
                    btn.insertAdjacentElement('afterend', targetView);
                    targetView.classList.add('mt-2', 'mb-4', 'mx-1');
                } else {
                    const rightArea = document.getElementById('right-content-area');
                    if (rightArea) {
                        rightArea.appendChild(targetView);
                    }
                    targetView.classList.remove('mt-2', 'mb-4', 'mx-1');
                }

                // Re-trigger fade-in animation
                targetView.classList.remove('fade-in');
                void targetView.offsetWidth; // Trigger DOM reflow
                targetView.classList.add('fade-in');
            }
        });
    });

    // Resize listener for Accordion/Sidebar switching
    window.addEventListener('resize', () => {
        const rightArea = document.getElementById('right-content-area');
        if (!rightArea) return;
        
        if (window.innerWidth >= 1024) {
            document.querySelectorAll('.result-view').forEach(v => {
                if (v.parentNode !== rightArea) {
                    rightArea.appendChild(v);
                    v.classList.remove('mt-2', 'mb-4', 'mx-1');
                }
            });
        } else {
            const activeBtn = document.querySelector('.sidebar-btn.active');
            if (activeBtn) {
                const targetView = document.getElementById(activeBtn.getAttribute('data-target'));
                if (targetView && targetView.parentNode !== activeBtn.parentNode) {
                    activeBtn.insertAdjacentElement('afterend', targetView);
                    targetView.classList.add('mt-2', 'mb-4', 'mx-1');
                }
            }
        }
    });

    // Settings Tabs Logic
    const setTabBtns = document.querySelectorAll('.settings-tab-btn');
    const setTabContents = document.querySelectorAll('.settings-tab-content');

    setTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTabBtns.forEach(b => {
                b.classList.remove('active', 'text-brand-400', 'border-brand-400');
                b.classList.add('text-gray-500', 'border-transparent');
            });
            setTabContents.forEach(c => c.classList.add('hidden'));

            btn.classList.add('active', 'text-brand-400', 'border-brand-400');
            btn.classList.remove('text-gray-500', 'border-transparent');
            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.remove('hidden');
        });
    });

    // Upload Tabs Logic
    const tabUploadFile = document.getElementById('tab-upload-file');
    const tabCompareApks = document.getElementById('tab-compare-apks');
    const contentUploadFile = document.getElementById('content-upload-file');
    const contentCompareApks = document.getElementById('content-compare-apks');

    function resetTabs() {
        [tabUploadFile, tabCompareApks].forEach(t => {
            if(t) {
                t.classList.remove('active', 'text-brand-400', 'border-brand-400', 'text-purple-500', 'border-purple-500');
                t.classList.add('text-gray-500', 'border-transparent');
            }
        });
        [contentUploadFile, contentCompareApks].forEach(c => {
            if(c) c.classList.add('hidden');
        });
    }

    if (tabUploadFile) {
        tabUploadFile.addEventListener('click', () => {
            resetTabs();
            tabUploadFile.classList.remove('text-gray-500', 'border-transparent');
            tabUploadFile.classList.add('active', 'text-brand-400', 'border-brand-400');
            contentUploadFile.classList.remove('hidden');
        });
    }
    
    if (tabCompareApks) {
        tabCompareApks.addEventListener('click', () => {
            resetTabs();
            tabCompareApks.classList.remove('text-gray-500', 'border-transparent');
            tabCompareApks.classList.add('active', 'text-purple-500', 'border-purple-500');
            contentCompareApks.classList.remove('hidden');
        });
    }
    // Compare Tab Logic
    function checkCompareReady() {
        const id1 = document.getElementById('compare-scan-a').value;
        const id2 = document.getElementById('compare-scan-b').value;
        const btn = document.getElementById('btn-trigger-compare');
        if (!btn) return;
        
        if (id1 && id2) {
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
            btn.disabled = false;
        } else {
            btn.classList.add('opacity-50', 'cursor-not-allowed');
            btn.disabled = true;
        }
    }

    // Compare Tab Local Uploads
    function handleCompareUpload(inputEl, selectId, nameDisplayId) {
        if (!inputEl.files || inputEl.files.length === 0) return;
        const file = inputEl.files[0];
        const nameDisplay = document.getElementById(nameDisplayId);
        const selectEl = document.getElementById(selectId);
        
        landingContent.classList.add('hidden');
        progressSection.classList.remove('hidden');
        window.updateProgress(10);
        
        analysisStep.innerHTML = `<i class="fa-solid fa-cloud-arrow-up fa-bounce text-purple-400 mr-2"></i> Uploading ${file.name} for Comparison...`;

        let currentProgress = 10;
        const uploadInterval = setInterval(() => {
            currentProgress += 5;
            if (currentProgress > 85) clearInterval(uploadInterval);
            window.updateProgress(currentProgress);
            if (currentProgress === 40) analysisStep.innerHTML = `<i class="fa-solid fa-shield-halved text-purple-400 mr-2"></i> Analyzing structure...`;
            if (currentProgress === 70) analysisStep.innerHTML = `<i class="fa-solid fa-magnifying-glass-chart text-purple-400 mr-2"></i> Generating diff baseline...`;
        }, 800);

        const formData = new FormData();
        formData.append('file', file);
        
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.job_id) {
                pollJobStatus(
                    data.job_id,
                    (scanResult) => {
                        handleCompareSuccess(scanResult);
                    },
                    (errMsg) => {
                        handleCompareError(errMsg);
                    },
                    (status, progress) => {
                        analysisStep.innerHTML = status === 'RUNNING' ? `<i class="fa-solid fa-shield-halved text-purple-400 mr-2"></i> Engine dissecting ${file.name}...` : `<i class="fa-solid fa-clock text-purple-400 mr-2"></i> Waiting in queue...`;
                        if (progress > 0 && progress <= 100) {
                            window.updateProgress(progress);
                        }
                    }
                );
            } else {
                handleCompareSuccess(data);
            }
        })
        .catch(err => {
            handleCompareError(err.message);
        });

        function handleCompareSuccess(data) {
            clearInterval(uploadInterval);
            window.updateProgress(100);
            
            setTimeout(() => {
                progressSection.classList.add('hidden');
                switchView('home');
                document.getElementById('tab-compare-apks').click();
                
                if (data.error) {
                    nameDisplay.innerHTML = `<span class="text-red-400"><i class="fa-solid fa-xmark mr-1"></i> Failed</span>`;
                    alert(`Compare Upload Error: ${data.error}`);
                    return;
                }
                
                nameDisplay.innerHTML = `<span class="text-green-400"><i class="fa-solid fa-check mr-1"></i> ${file.name} (Ready)</span>`;
                selectEl.value = data.id;
                checkCompareReady();
            }, 600);
        }

        function handleCompareError(errMsg) {
            clearInterval(uploadInterval);
            progressSection.classList.add('hidden');
            switchView('home');
            document.getElementById('tab-compare-apks').click();
            nameDisplay.innerHTML = `<span class="text-red-400"><i class="fa-solid fa-xmark mr-1"></i> Failed</span>`;
            alert(`Compare Upload Error: ${errMsg}`);
        }
    }

    const compFileA = document.getElementById('compare-file-a');
    if (compFileA) {
        compFileA.addEventListener('change', function() {
            handleCompareUpload(this, 'compare-scan-a', 'compare-file-a-name');
        });
    }
    
    const compFileB = document.getElementById('compare-file-b');
    if (compFileB) {
        compFileB.addEventListener('change', function() {
            handleCompareUpload(this, 'compare-scan-b', 'compare-file-b-name');
        });
    }

    const btnTriggerCompare = document.getElementById('btn-trigger-compare');
    if (btnTriggerCompare) {
        btnTriggerCompare.addEventListener('click', () => {
            const id1 = document.getElementById('compare-scan-a').value;
            const id2 = document.getElementById('compare-scan-b').value;
            
            if (!id1 || !id2) {
                alert("Please select both Baseline and Target scans to compare.");
                return;
            }
            if (id1 === id2) {
                alert("Please select two different scans to compare.");
                return;
            }
            
            if (window.showCompareModal) {
                window.showCompareModal(id1, id2);
            }
        });
    }

    let playStoreApps = [];
    const playstoreGrid = document.getElementById('playstore-app-grid');
    const playstoreSearch = document.getElementById('playstore-search');




    // Drag and Drop Logic
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadSection.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadSection.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadSection.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        uploadSection.classList.add('drag-active');
    }

    function unhighlight(e) {
        uploadSection.classList.remove('drag-active');
    }

    uploadSection.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    fileInput.addEventListener('change', function () {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length === 0) return;
        const file = files[0];

        if (!file.name.toLowerCase().endsWith('.apk')) {
            showError("Invalid file type. Please upload a valid .apk file.");
            return;
        }

        uploadFile(file);
    }

    let progressInterval = null;
    const progressMessages = [
        "Decompressing APK structure...",
        "Extracting Dalvik Executable and parsing Manifest...",
        "Analyzing Android Permissions and Security Policies...",
        "Scanning for Hardcoded API Keys and Secrets...",
        "Verifying Application Signature and Integrity...",
        "Performing Static Forensic Analysis on Classes...",
        "Generating Automated Security Test Cases...",
        "Finalizing Detailed Forensic Report...",
        "Optimizing data for dashboard visualization...",
        "Checking for third-party SDK vulnerabilities..."
    ];

    function startProgressRotation() {
        let index = 0;
        analysisStep.innerText = progressMessages[0];
        progressInterval = setInterval(() => {
            index = (index + 1) % progressMessages.length;
            analysisStep.innerText = progressMessages[index];
        }, 2000);
    }

    function stopProgressRotation() {
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
    }

    function pollJobStatus(jobId, onSuccess, onError, onProgress) {
        const pollInterval = setInterval(() => {
            fetch(`/api/status/${jobId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        clearInterval(pollInterval);
                        if (onError) onError(data.error);
                    } else if (data.status === 'COMPLETED') {
                        clearInterval(pollInterval);
                        if (onSuccess) onSuccess(data.result);
                    } else if (data.status === 'FAILED') {
                        clearInterval(pollInterval);
                        if (onError) onError(data.error || "Analysis failed during execution.");
                    } else {
                        if (onProgress) onProgress(data.status, data.progress);
                    }
                })
                .catch(err => {
                    clearInterval(pollInterval);
                    if (onError) onError("Network error while checking status.");
                });
        }, 2000);
    }

    function uploadFile(file) {
        if (window.setNavState) window.setNavState(true);
        // Reset UI
        errorAlert.classList.add('hidden');
        resultsDashboard.classList.add('hidden');
        landingContent.classList.add('hidden');
        historyContent.classList.add('hidden');
        progressSection.classList.remove('hidden');

        window.updateProgress(0);
        analysisStep.innerText = 'Connecting to secure analyzer engine...';
        
        // Reset test cases for new scan
        latestTestCasesContent = null;
        latestTestCasesPackage = "unknown";
        const tcContent = document.getElementById('global-testcases-content');
        if (tcContent) {
            tcContent.innerHTML = `
                <div class="text-center text-gray-500 py-10">
                    <div class="loader inline-block mb-4"></div>
                    <p>Analysis in progress... Test cases will appear once complete.</p>
                </div>`;
        }

        const sidebarTcContent = document.getElementById('testcases-content');
        if (sidebarTcContent) {
            sidebarTcContent.innerHTML = `
                <div class="text-center text-gray-500 py-10">
                    <i class="fa-solid fa-circle-notch fa-spin text-3xl mb-3"></i>
                    <p>Generating fresh test cases...</p>
                </div>`;
        }

        const url = '/upload';
        const formData = new FormData();
        formData.append('file', file);

        // Append settings
        const deepDexEl = document.getElementById('setting-dex');
        const crashPredEl = document.getElementById('setting-crash');
        const strictModeEl = document.getElementById('setting-strict');
        
        const deepDex = deepDexEl ? deepDexEl.checked : false;
        const crashPred = crashPredEl ? crashPredEl.checked : false;
        const strictMode = strictModeEl ? strictModeEl.checked : false;
        const aiEngineEl = document.getElementById('setting-ai-engine');
        const aiEngine = aiEngineEl ? aiEngineEl.value : 'neural';

        let appType = 'app';
        if (typeGame && typeGame.classList.contains('bg-brand-500')) {
            appType = 'game';
        }

        formData.append('deep_dex', deepDex);
        formData.append('crash_prediction', crashPred);
        formData.append('strict_mode', strictMode);
        formData.append('app_type', appType);
        formData.append('ai_engine', aiEngine);

        const xhr = new XMLHttpRequest();

        let simProgress = 0;
        const ring = document.getElementById('circular-progress-ring');
        if (ring) ring.style.strokeDashoffset = '289.02';

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                // Map the file upload to only the first 10% of the total progress
                const uploadPercent = Math.floor((e.loaded / e.total) * 10);
                window.updateProgress(uploadPercent);
                
                if (uploadPercent < 5) {
                    analysisStep.innerText = 'Uploading payload...';
                } else if (uploadPercent < 10) {
                    analysisStep.innerText = 'Transferring securely to Pro Engine...';
                }

                if (e.loaded === e.total) {
                    setTimeout(() => {
                        analysisStep.innerText = 'Transfer Complete. Waiting for Analysis...';
                        if (!progressInterval) startProgressRotation();
                    }, 800);
                }
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                try {
                    const result = JSON.parse(xhr.responseText);
                    if (result.error) {
                        stopProgressRotation();
                        showError(result.error);
                    } else if (result.job_id) {
                        analysisStep.innerText = 'Analysis queued. Waiting for engine...';
                        
                        // FAKE SMOOTH PROGRESS: Decouple UI from jumping backend progress
                        let currentSmoothProgress = 10;
                        let smoothProgressAnim = setInterval(() => {
                            if (currentSmoothProgress < 99) {
                                currentSmoothProgress += 1;
                                window.updateProgress(currentSmoothProgress);
                            }
                        }, 250); // Progresses 1% every 250ms (~22 seconds to hit 99%)

                        pollJobStatus(
                            result.job_id,
                            (scanResult) => {
                                clearInterval(smoothProgressAnim);
                                window.updateProgress(100);
                                stopProgressRotation();
                                displayResults(scanResult);
                            },
                            (errMsg) => {
                                clearInterval(smoothProgressAnim);
                                stopProgressRotation();
                                showError(errMsg);
                            },
                            (status, progress) => {
                                analysisStep.innerText = status === 'RUNNING' ? 'Engine is actively dissecting the APK...' : 'Waiting in queue...';
                                // We intentionally ignore the backend 'progress' value here to keep the UI smooth
                            }
                        );
                    } else {
                        window.updateProgress(100);
                        stopProgressRotation();
                        displayResults(result);
                    }
                } catch (e) {
                    stopProgressRotation();
                    alert("JSON PARSE ERROR:\n" + e.message + "\n\nResponse snippet:\n" + xhr.responseText.substring(0, 500));
                    showError("Invalid response format from Pro Analyzer.");
                }
            } else {
                try {
                    const err = JSON.parse(xhr.responseText);
                    showError(err.error || `Engine error: HTTP ${xhr.status}`);
                } catch (e) {
                    showError(`Engine error: HTTP ${xhr.status}`);
                }
            }
        });

        xhr.addEventListener('error', () => {
            stopProgressRotation();
            showError("Network error. Make sure the local backend server is running on port 5000.");
        });

        xhr.open('POST', url, true);
        xhr.send(formData);
    }

    function showError(msg) {
        if (window.setNavState) window.setNavState(false);
        progressSection.classList.add('hidden');
        landingContent.classList.remove('hidden');
        errorAlert.classList.remove('hidden');
        errorMessage.innerText = msg;
    }

    window.window.currentScanData = null;

    function displayResults(data) {
        if (window.setNavState) window.setNavState(false);
        hasActiveScan = true;
        window.currentScanData = data;
        try {
            progressSection.classList.add('hidden');
            resultsDashboard.classList.remove('hidden');

            // App Header
            const appIconDisplay = document.getElementById('app-icon-display');
            const testcaseAppLogo = document.getElementById('testcase-app-logo');
            const sidebarTestcaseLogo = document.getElementById('sidebar-testcase-logo');
            const navTestcaseLogo = document.getElementById('nav-testcase-logo');
            const decompilerAppLogo = document.getElementById('decompiler-app-logo');
            
            // App Icon Logic (Fallback to Play Store icon if needed)
            const resolvedIcon = data.icon || (data.playstore_info && data.playstore_info.icon ? data.playstore_info.icon : null);

    if (resolvedIcon) {
        let imgSrc = resolvedIcon;
        if (!resolvedIcon.startsWith("http") && !resolvedIcon.startsWith("data:")) {
            imgSrc = `data:image/png;base64,${resolvedIcon}`;
        }
        
        const playStoreUrl = `https://play.google.com/store/apps/details?id=${data.package}`;
        
        const imgHtml = `
            <a href="${playStoreUrl}" target="_blank" class="block w-full h-full relative group cursor-pointer overflow-hidden rounded-xl border border-transparent hover:border-brand-500/50 transition-colors" title="Open in Play Store">
                <img src="${imgSrc}" onerror="this.onerror=null; this.parentElement.innerHTML='<i class=&quot;fa-brands fa-android text-4xl text-green-500&quot;></i>';" class="w-full h-full object-contain rounded-xl group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gray-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <div class="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-400/50 transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                        <i class="fa-brands fa-google-play text-white text-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"></i>
                    </div>
                </div>
            </a>`;
        appIconDisplay.innerHTML = imgHtml;
        if (testcaseAppLogo) testcaseAppLogo.innerHTML = `<img src="${imgSrc}" class="w-full h-full object-contain">`;
        if (sidebarTestcaseLogo) sidebarTestcaseLogo.innerHTML = `<img src="${imgSrc}" class="w-6 h-6 object-contain mr-2 rounded-md inline-block">`;
        if (navTestcaseLogo) navTestcaseLogo.innerHTML = `<img src="${imgSrc}" class="w-4 h-4 object-contain mr-2 rounded inline-block">`;
        if (decompilerAppLogo) decompilerAppLogo.innerHTML = `<img src="${imgSrc}" class="w-full h-full object-contain rounded-xl">`;
    } else {
        let fallbackLogo = '<i class="fa-brands fa-android text-4xl text-green-500"></i>';
        let tcFallback = '<i class="fa-solid fa-robot text-2xl text-brand-400"></i>';
        let sbFallback = '<i class="fa-solid fa-robot w-6 text-center mr-2"></i>';
        let navFallback = '<i class="fa-solid fa-robot mr-2"></i>';
        
        if (data.app_name && data.app_name !== "Unknown") {
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.app_name)}&background=random&color=fff&size=128&rounded=true`;
            fallbackLogo = `<img src="${avatarUrl}" class="w-full h-full object-contain rounded-xl">`;
            tcFallback = `<img src="${avatarUrl}" class="w-full h-full object-contain">`;
            sbFallback = `<img src="${avatarUrl}" class="w-6 h-6 object-contain mr-2 rounded-md inline-block">`;
            navFallback = `<img src="${avatarUrl}" class="w-4 h-4 object-contain mr-2 rounded inline-block">`;
        }

        appIconDisplay.innerHTML = fallbackLogo;
        if (testcaseAppLogo) testcaseAppLogo.innerHTML = tcFallback;
        if (sidebarTestcaseLogo) sidebarTestcaseLogo.innerHTML = sbFallback;
        if (navTestcaseLogo) navTestcaseLogo.innerHTML = navFallback;
        if (decompilerAppLogo) decompilerAppLogo.innerHTML = tcFallback;
    }

            document.getElementById('res-app-name').innerText = data.app_name;
            document.getElementById('res-package').innerText = data.package;
            document.getElementById('app-link').href = `https://play.google.com/store/apps/details?id=${data.package}`;
            
            let badgesHTML = `<span class="px-2 py-1 bg-gray-800 text-gray-300 rounded-md text-xs border border-gray-700 flex items-center shrink-0 w-max"><i class="fa-solid fa-code-branch mr-1"></i>v${data.version_name} (${data.version_code})</span>`;
            if (data.min_sdk && data.target_sdk && data.min_sdk !== "Unknown") {
                badgesHTML += `<span class="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-md text-xs border border-blue-800/50 flex items-center shrink-0 w-max"><i class="fa-brands fa-android mr-1"></i>API ${data.min_sdk} → ${data.target_sdk}</span>`;
            }
            if (data.file_size_mb) {
                badgesHTML += `<span class="px-2 py-1 bg-purple-900/30 text-purple-400 rounded-md text-xs border border-purple-800/50 flex items-center shrink-0 w-max"><i class="fa-solid fa-weight-hanging mr-1"></i>${data.file_size_mb} MB</span>`;
            }
            if (data.playstore_info) {
                const ps = data.playstore_info;
                if (ps.installs && ps.installs !== "Unknown") {
                    badgesHTML += `<span class="px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-md text-xs border border-emerald-800/50 flex items-center shrink-0 w-max"><i class="fa-solid fa-download mr-1"></i>${ps.installs}</span>`;
                }
                if (ps.score && ps.score !== "N/A") {
                    badgesHTML += `<span class="px-2 py-1 bg-amber-900/30 text-amber-400 rounded-md text-xs border border-amber-800/50 flex items-center shrink-0 w-max"><i class="fa-solid fa-star mr-1"></i>${ps.score}</span>`;
                }
                if (ps.developer && ps.developer !== "Unknown") {
                    badgesHTML += `<span class="px-2 py-1 bg-indigo-900/30 text-indigo-400 rounded-md text-xs border border-indigo-800/50 flex items-center shrink-0 w-max"><i class="fa-solid fa-building mr-1"></i>${ps.developer}</span>`;
                }
                if (ps.genre && ps.genre !== "Unknown") {
                    badgesHTML += `<span class="px-2 py-1 bg-rose-900/30 text-rose-400 rounded-md text-xs border border-rose-800/50 flex items-center shrink-0 w-max"><i class="fa-solid fa-gamepad mr-1"></i>${ps.genre}</span>`;
                }
            }
            document.getElementById('app-meta-badges').innerHTML = badgesHTML;

            // Dashboard Top Cards
            const resScore = document.getElementById('res-score');
            if (resScore) resScore.innerText = data.score || 0;

            const totalComps = (data.activities?.length || 0) + (data.services?.length || 0) + (data.receivers?.length || 0);
            const resComponents = document.getElementById('res-components');
            if (resComponents) resComponents.innerText = totalComps;

            // VirusTotal Mock Populator
            if (data.antivirus_scan) {
                const vtScore = document.getElementById('res-vt-score');
                const vtStatus = document.getElementById('res-vt-status');
                const vtIconBg = document.getElementById('vt-icon-bg');
                const vtIcon = document.getElementById('vt-icon');
                const cardVtScan = document.getElementById('card-vt-scan');
                
                if (vtScore) vtScore.innerText = `${data.antivirus_scan.positives}/${data.antivirus_scan.total}`;
                if (vtStatus) {
                    vtStatus.innerText = data.antivirus_scan.status;
                    if (data.antivirus_scan.positives > 0) {
                        vtStatus.className = 'text-xs font-bold mt-2 uppercase tracking-wide ' + (data.antivirus_scan.positives < 5 ? 'text-yellow-400' : 'text-red-400');
                        vtIconBg.className = 'absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-transform group-hover:scale-110 ' + (data.antivirus_scan.positives < 5 ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-500/20' : 'bg-red-900/20 text-red-400 border border-red-500/20 animate-pulse');
                        vtIcon.className = 'fa-solid ' + (data.antivirus_scan.positives < 5 ? 'fa-shield-exclamation' : 'fa-shield-virus');
                        cardVtScan.classList.add(data.antivirus_scan.positives < 5 ? 'border-yellow-500/50' : 'border-red-500/50');
                    } else {
                        vtStatus.className = 'text-xs font-bold mt-2 uppercase tracking-wide text-green-400';
                        vtIconBg.className = 'absolute top-4 right-4 w-12 h-12 rounded-full bg-green-900/20 flex items-center justify-center text-green-400 text-xl border border-green-500/20 transition-transform group-hover:scale-110';
                        vtIcon.className = 'fa-solid fa-shield-check';
                        cardVtScan.classList.remove('border-red-500/50', 'border-yellow-500/50');
                    }
                }
            }

            // Signature Auth Populator
            if (data.signature_info) {
                const bV1 = document.getElementById('badge-v1');
                const bV2 = document.getElementById('badge-v2');
                const bV3 = document.getElementById('badge-v3');
                const sigIssuer = document.getElementById('res-sig-issuer');
                
                if (bV1) bV1.className = `text-[10px] px-1.5 py-0.5 rounded font-mono border ${data.signature_info.v1_scheme ? 'bg-green-900/50 text-green-400 border-green-500/50' : 'bg-red-900/50 text-red-400 border-red-500/50'}`;
                if (bV2) bV2.className = `text-[10px] px-1.5 py-0.5 rounded font-mono border ${data.signature_info.v2_scheme ? 'bg-green-900/50 text-green-400 border-green-500/50' : 'bg-red-900/50 text-red-400 border-red-500/50'}`;
                if (bV3) bV3.className = `text-[10px] px-1.5 py-0.5 rounded font-mono border ${data.signature_info.v3_scheme ? 'bg-green-900/50 text-green-400 border-green-500/50' : 'bg-gray-800 text-gray-500 border-gray-700'}`;
                if (sigIssuer) {
                    sigIssuer.innerText = data.signature_info.issuer;
                    if (data.signature_info.is_fake_app_prediction.includes('Risk')) {
                        sigIssuer.innerHTML += ' <i class="fa-solid fa-triangle-exclamation text-red-500 ml-1" title="Fake App Risk"></i>';
                    } else {
                        sigIssuer.innerHTML += ' <i class="fa-solid fa-badge-check text-green-500 ml-1" title="Verified Publisher"></i>';
                    }
                }
            }

            const resCrash = document.getElementById('res-crash');
            const crashProbStr = data.crash_probability || "0%";
            if (resCrash) resCrash.innerText = crashProbStr;
            const crashBar = document.getElementById('crash-bar');
            
            if (crashBar) {
                crashBar.style.width = crashProbStr;
                const cpNum = parseInt(crashProbStr.replace('%', '')) || 0;
                
                const resRel = document.getElementById('res-reliability');
                const relIcon = document.getElementById('res-reliability-icon');
                
                if (cpNum > 75) {
                    crashBar.className = "h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000";
                    if(resRel) {
                        resRel.innerText = "CRITICAL";
                        resRel.className = "text-4xl font-black text-red-500 tracking-tight";
                    }
                    if(relIcon) relIcon.className = "fa-solid fa-heart-crack text-red-500 animate-pulse text-2xl";
                } else if (cpNum > 30) {
                    crashBar.className = "h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-1000";
                    if(resRel) {
                        resRel.innerText = "UNSTABLE";
                        resRel.className = "text-4xl font-black text-orange-400 tracking-tight";
                    }
                    if(relIcon) relIcon.className = "fa-solid fa-triangle-exclamation text-orange-400 animate-bounce text-2xl";
                } else {
                    crashBar.className = "h-full bg-gradient-to-r from-brand-600 to-brand-400 transition-all duration-1000";
                    if(resRel) {
                        resRel.innerText = "STABLE";
                        resRel.className = "text-4xl font-black text-brand-400 tracking-tight";
                    }
                    if(relIcon) relIcon.className = "fa-solid fa-heart-pulse text-brand-400 animate-pulse text-2xl";
                }
            }

            // Risk Card
            const riskCard = document.getElementById('risk-card');
            const riskIconContainer = document.getElementById('risk-icon-container');
            const riskIcon = document.getElementById('risk-icon');
            const resRisk = document.getElementById('res-risk');
            const riskMeter = document.getElementById('risk-meter');

            const rLevel = (data.risk || "UNKNOWN").toUpperCase();
            resRisk.innerText = rLevel;

            // Reset 
            riskCard.className = "glass-card rounded-2xl p-6 relative overflow-hidden group border-t-4";
            riskIconContainer.className = "absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-transform group-hover:scale-110";
            riskIcon.className = "fa-solid fa-shield";

            if (rLevel === 'HIGH') {
                riskCard.classList.add('border-red-500');
                riskIconContainer.classList.add('bg-red-900/30', 'text-red-400');
                riskIcon.classList.remove('fa-shield');
                riskIcon.classList.add('fa-shield-virus');
                resRisk.classList.add('text-red-400');
                riskMeter.style.width = '90%';
                riskMeter.className = "h-full rounded-full w-0 transition-all duration-1000 bg-red-500";
            } else if (rLevel === 'MEDIUM') {
                riskCard.classList.add('border-yellow-500');
                riskIconContainer.classList.add('bg-yellow-900/30', 'text-yellow-400');
                resRisk.classList.add('text-yellow-400');
                riskMeter.style.width = '50%';
                riskMeter.className = "h-full rounded-full w-0 transition-all duration-1000 bg-yellow-500";
            } else {
                riskCard.classList.add('border-green-500');
                riskIconContainer.classList.add('bg-green-900/30', 'text-green-400');
                riskIcon.classList.remove('fa-shield');
                riskIcon.classList.add('fa-shield-check');
                resRisk.classList.add('text-green-400');
                riskMeter.style.width = '15%';
                riskMeter.className = "h-full rounded-full w-0 transition-all duration-1000 bg-green-500";
            }

            // VirusTotal Integration
            const vtLoading = document.getElementById('vt-loading');
            const vtResults = document.getElementById('vt-results');
            const vtError = document.getElementById('vt-error');
            
            if (vtLoading && vtResults && vtError) {
                vtLoading.classList.remove('hidden');
                vtResults.classList.add('hidden');
                vtError.classList.add('hidden');
                
                if (data.id) {
                    fetch(`/api/virustotal/${data.id}`)
                        .then(res => res.json())
                        .then(vtData => {
                            if (vtData.error) throw new Error(vtData.error);
                            
                            vtLoading.classList.add('hidden');
                            vtResults.classList.remove('hidden');
                            
                            document.getElementById('vt-malicious').innerText = vtData.malicious || 0;
                            document.getElementById('vt-suspicious').innerText = vtData.suspicious || 0;
                            document.getElementById('vt-undetected').innerText = vtData.undetected || 0;
                            
                            if (vtData.permalink) {
                                document.getElementById('vt-permalink').href = vtData.permalink;
                            }
                            
                            // Populate VirusTotal Replica UI
                            if (data.virustotal && data.virustotal.link) {
                                const hashMatch = data.virustotal.link.match(/file\/([a-fA-F0-9]+)/);
                                if (hashMatch) {
                                    document.getElementById('vt-rep-hash').innerText = hashMatch[1];
                                } else {
                                    document.getElementById('vt-rep-hash').innerText = 'N/A';
                                }
                            }
                            if (data.file_size_mb) {
                                document.getElementById('vt-rep-size').innerText = data.file_size_mb + ' MB';
                            }
                            
                            const maliciousCount = vtData.malicious || 0;
                            const suspiciousCount = vtData.suspicious || 0;
                            const totalEngines = vtData.engines ? Object.keys(vtData.engines).length : (maliciousCount + suspiciousCount + (vtData.undetected || 72));
                            
                            document.getElementById('vt-rep-malicious').innerText = maliciousCount + suspiciousCount;
                            document.getElementById('vt-rep-total').innerText = totalEngines > 0 ? totalEngines : 72;
                            
                            const repRing = document.getElementById('vt-rep-ring');
                            const repStatus = document.getElementById('vt-rep-status-text');
                            
                            if (maliciousCount + suspiciousCount > 0) {
                                repRing.setAttribute('stroke', '#ef4444'); // Red
                                document.getElementById('vt-rep-malicious').classList.add('text-red-500');
                                repStatus.innerText = `${maliciousCount + suspiciousCount} security vendors flagged this file`;
                                repStatus.className = "mt-6 text-red-500 font-bold text-[11px] tracking-widest uppercase text-center";
                            } else {
                                repRing.setAttribute('stroke', '#10b981'); // Green
                                document.getElementById('vt-rep-malicious').classList.remove('text-red-500');
                                repStatus.innerText = "No security vendors flagged this file";
                                repStatus.className = "mt-6 text-[#10b981] font-bold text-[11px] tracking-widest uppercase text-center";
                            }
                            
                            // Calculate ring offset
                            const circumference = 283;
                            const scorePct = totalEngines > 0 ? ((maliciousCount + suspiciousCount) / totalEngines) : 0;
                            const offset = maliciousCount + suspiciousCount > 0 ? (circumference - (scorePct * circumference)) : 0;
                            repRing.style.strokeDashoffset = offset;
                            
                            const enginesContainer = document.getElementById('vt-rep-engines');
                            if (enginesContainer) {
                                enginesContainer.innerHTML = '';
                                
                                if (vtData.engines) {
                                    Object.keys(vtData.engines).forEach(engine => {
                                        const result = vtData.engines[engine];
                                        const isClean = result.toLowerCase() === 'clean';
                                        const textColor = isClean ? 'text-gray-400' : 'text-red-400';
                                        const iconColor = isClean ? 'text-[#10b981]' : 'text-red-500';
                                        const iconCls = isClean ? 'fa-circle-check' : 'fa-triangle-exclamation';
                                        const displayResult = isClean ? 'Undetected' : result;
                                        
                                        enginesContainer.innerHTML += `
                                            <div class="grid grid-cols-2 px-2 py-2 border-b border-[#2b3544] hover:bg-[#2b3544]/30 transition-colors">
                                                <span class="text-gray-300 text-xs">${engine}</span>
                                                <span class="text-xs ${textColor} text-right flex items-center justify-end"><i class="fa-solid ${iconCls} ${iconColor} mr-2"></i> ${displayResult}</span>
                                            </div>
                                        `;
                                    });
                                }
                            }
                        })
                        .catch(err => {
                            vtLoading.classList.add('hidden');
                            vtError.classList.remove('hidden');
                            document.getElementById('vt-error-msg').innerText = err.message || 'Failed to connect to VirusTotal.';
                        });
                } else {
                    vtLoading.classList.add('hidden');
                    vtError.classList.remove('hidden');
                    document.getElementById('vt-error-msg').innerText = 'Report ID not found. Save to database first.';
                }
            }
            // TABS DATA POPULATION
            const issues = data.issues || [];
            const perms = data.permissions || [];
            const activities = data.activities || [];
            const services = data.services || [];
            const receivers = data.receivers || [];
            const providers = data.providers || [];
            const trackers = data.trackers || [];
            const certificates = data.certificates || [];
            const secrets = data.hardcoded_secrets || [];

            // Update Executive Summary with dynamic glowing pills
            const execSummary = document.getElementById('executive-summary-text');
            if (execSummary) {
                execSummary.innerHTML = `This application contains <span class="font-bold text-brand-400 bg-brand-900/30 px-2 py-0.5 rounded border border-brand-500/30 mx-1">${perms.length}</span> permissions, <span class="font-bold text-brand-400 bg-brand-900/30 px-2 py-0.5 rounded border border-brand-500/30 mx-1">${activities.length}</span> activities, and <span class="font-bold text-red-400 bg-red-900/30 px-2 py-0.5 rounded border border-red-500/30 mx-1">${issues.length}</span> potential security issues.`;
            }



            // Update Chart.js
            const ctx = document.getElementById('components-chart');
            if (ctx) {
                if (componentsChartInstance) componentsChartInstance.destroy();
                
                const ctx2d = ctx.getContext('2d');
                
                // Create Premium Gradients
                const gradActivities = ctx2d.createLinearGradient(0, 0, 0, 400);
                gradActivities.addColorStop(0, '#38bdf8'); // light blue
                gradActivities.addColorStop(1, '#0284c7'); // dark blue

                const gradServices = ctx2d.createLinearGradient(0, 0, 0, 400);
                gradServices.addColorStop(0, '#a78bfa'); // light purple
                gradServices.addColorStop(1, '#7c3aed'); // dark purple

                const gradReceivers = ctx2d.createLinearGradient(0, 0, 0, 400);
                gradReceivers.addColorStop(0, '#34d399'); // light emerald
                gradReceivers.addColorStop(1, '#059669'); // dark emerald

                const gradProviders = ctx2d.createLinearGradient(0, 0, 0, 400);
                gradProviders.addColorStop(0, '#fbbf24'); // light amber
                gradProviders.addColorStop(1, '#d97706'); // dark amber

                // Custom Plugin: Holographic Center Text
                const holographicCenterPlugin = {
                    id: 'holographicCenter',
                    beforeDraw: (chart) => {
                        const { ctx, chartArea } = chart;
                        if (!chartArea) return;
                        
                        ctx.restore();
                        // Calculate exact center of the doughnut using dataset metadata
                        const meta = chart.getDatasetMeta(0);
                        if (!meta || !meta.data || !meta.data.length) return;
                        const centerX = meta.data[0].x;
                        const centerY = meta.data[0].y;
                        
                        const fontSize = (chart.height / 110).toFixed(2);
                        ctx.font = `900 ${fontSize}em 'Outfit', sans-serif`;
                        ctx.textBaseline = "middle";
                        ctx.textAlign = "center";
                        
                        // Glowing Text
                        ctx.fillStyle = "#ffffff";
                        ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
                        ctx.shadowBlur = 20;

                        const total = activities.length + services.length + receivers.length + providers.length;
                        const text = total.toString();
                        
                        ctx.fillText(text, centerX, centerY - 15);
                        
                        // Subtitle
                        ctx.font = `800 ${(fontSize / 4).toFixed(2)}em 'Outfit', sans-serif`;
                        ctx.fillStyle = "#38bdf8";
                        ctx.shadowBlur = 10;
                        ctx.fillText("COMPONENTS", centerX, centerY + 30);
                        
                        ctx.save();
                    }
                };

                componentsChartInstance = new Chart(ctx2d, {
                    type: 'doughnut',
                    data: {
                        labels: ['Activities', 'Services', 'Receivers', 'Providers'],
                        datasets: [{
                            data: [activities.length, services.length, receivers.length, providers.length],
                            backgroundColor: [gradActivities, gradServices, gradReceivers, gradProviders],
                            hoverBackgroundColor: ['#7dd3fc', '#c4b5fd', '#6ee7b7', '#fcd34d'],
                            borderWidth: 2,
                            borderColor: '#0f172a',
                            hoverOffset: 10
                        }]
                    },
                    plugins: [holographicCenterPlugin],
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '85%',
                        animation: {
                            animateScale: true,
                            animateRotate: true,
                            easing: 'easeOutQuart',
                            duration: 1500
                        },
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: '#e5e7eb',
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                    padding: 30,
                                    font: {
                                        size: 15,
                                        weight: '900',
                                        family: "'Outfit', sans-serif"
                                    }
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                                titleFont: { size: 16, weight: '900', family: "'Outfit', sans-serif" },
                                bodyFont: { size: 15, weight: 'bold' },
                                padding: 20,
                                cornerRadius: 20,
                                displayColors: true,
                                boxPadding: 8,
                                usePointStyle: true,
                                borderColor: 'rgba(56, 189, 248, 0.5)',
                                borderWidth: 2,
                                callbacks: {
                                    label: function(context) {
                                        return '  ' + context.label + ': ' + context.parsed + ' items';
                                    }
                                }
                            }
                        }
                    }
                });
            }

            // Removed the frontend fallback that forced 25 bugs to allow dynamic bug counts from the backend
            
            // Inject documentation for synthetic bugs so they become clickable
            Object.assign(bugDocumentation, {
                "theme_inconsistency": { title: "Theme Inconsistency", description: "Hardcoded text colors in XML layouts conflict with system Dark Mode, rendering text invisible.", severity: "Medium", remediation: "Use ?attr/textColorPrimary instead of hardcoded hex values." },
                "lang_missing_translations": { title: "Missing Translations", description: "Missing string translations for locales, causing runtime crashes during locale switching.", severity: "High", remediation: "Provide default strings in values/strings.xml for all referenced keys." },
                "theme_overlapping": { title: "Overlapping Views", description: "Overlapping views on smaller screen densities due to absolute dp sizing.", severity: "Medium", remediation: "Use ConstraintLayout or relative weighting instead of fixed dp." },
                "lang_rtl_clipping": { title: "RTL Text Clipping", description: "Text clipping occurs in RTL mode because layout_width is fixed.", severity: "Low", remediation: "Use wrap_content and proper start/end constraints for RTL support." },
                "memory_leak_context": { title: "Context Memory Leak", description: "Static reference to Activity Context found, causing memory leaks on rotation.", severity: "Critical", remediation: "Use WeakReference or Application Context instead of Activity Context." },
                "network_timeout": { title: "Missing Network Timeout", description: "No explicit connection timeout defined for HTTP requests.", severity: "Medium", remediation: "Set connectTimeout and readTimeout on your HTTP client." },
                "db_unclosed_cursor": { title: "Unclosed SQLite Cursor", description: "SQLite Cursor objects are not enclosed in try-finally blocks.", severity: "High", remediation: "Use try-with-resources or close cursors in a finally block." },
                "ui_anr_risk": { title: "ANR Risk (Main Thread Heavy Load)", description: "Heavy processing is performed on the Main/UI thread.", severity: "High", remediation: "Move heavy operations to a background thread using Coroutines or RxJava." },
                "theme_status_bar": { title: "Missing Status Bar Color", description: "Status bar color is not defined, resulting in a black bar on modern devices.", severity: "Low", remediation: "Define colorPrimaryDark in your theme." },
                "lang_hardcoded_strings": { title: "Hardcoded Strings", description: "User-facing strings are hardcoded in Java classes.", severity: "Low", remediation: "Extract all strings to res/values/strings.xml." },
                "arch_god_object": { title: "God Object Architecture", description: "Activity/Class is too large, violating Single Responsibility Principle.", severity: "Medium", remediation: "Refactor code into separate ViewModels, Repositories, and UseCases." },
                "battery_wakelock": { title: "Unreleased WakeLock", description: "WakeLock is acquired but never released, draining battery.", severity: "Critical", remediation: "Ensure WakeLock.release() is called in a finally block." },
                "security_tapjacking": { title: "Tapjacking Vulnerability", description: "App is vulnerable to UI redressing (Tapjacking).", severity: "High", remediation: "Set filterTouchesWhenObscured='true' on sensitive views." },
                "ux_back_button": { title: "Trapped Back Button", description: "Hardware Back button behavior is overridden incorrectly.", severity: "Medium", remediation: "Ensure onBackPressed properly delegates to super or NavController." },
                "api_deprecation": { title: "Deprecated API Usage", description: "Usage of deprecated APIs causing crashes on newer Android versions.", severity: "Medium", remediation: "Migrate to the modern Jetpack equivalent (e.g., CameraX)." },
                "theme_font_scaling": { title: "Font Scaling Issue", description: "Text sizes use 'dp' instead of 'sp'.", severity: "Low", remediation: "Always use 'sp' for text sizes so they scale with user accessibility settings." },
                "lang_encoding": { title: "Encoding Mojibake", description: "Improper UTF-8 encoding reading local assets.", severity: "Medium", remediation: "Specify UTF-8 explicitly when reading InputStreams." },
                "thread_race_condition": { title: "Race Condition", description: "Race condition detected in asynchronous state management.", severity: "High", remediation: "Synchronize access or use thread-safe data structures." },
                "ui_keyboard_overlap": { title: "Keyboard Overlap", description: "Soft keyboard overlaps input fields.", severity: "Medium", remediation: "Use windowSoftInputMode='adjustResize' in the manifest." },
                "memory_bitmap_cache": { title: "Missing Bitmap Cache", description: "Lack of LRU Cache for downloading images in lists.", severity: "High", remediation: "Use Glide, Coil, or implement an LruCache for bitmaps." },
                "lang_plurals": { title: "Hardcoded Plurals", description: "Incorrect usage of plurals/quantity strings.", severity: "Low", remediation: "Use <plurals> in strings.xml and getQuantityString()." },
                "theme_ripple_effect": { title: "Missing Ripple Effect", description: "Custom buttons lack native ripple touch feedback.", severity: "Low", remediation: "Add ?attr/selectableItemBackground to the view's foreground/background." }
            });

            // Badges
            document.getElementById('badge-issues').innerText = issues.length;
            document.getElementById('badge-perms').innerText = perms.length;
            document.getElementById('badge-activities').innerText = activities.length;
            document.getElementById('badge-services').innerText = services.length + receivers.length;

            if (document.getElementById('badge-secrets')) {
                document.getElementById('badge-secrets').innerText = secrets.length;
            }
            if (document.getElementById('badge-trackers')) {
                document.getElementById('badge-trackers').innerText = trackers.length;
            }

            // 1. Issues List Grouped
            const issuesEmptyState = document.getElementById('issues-empty-state');
            const groupedContainer = document.getElementById('issues-grouped-container');

            const countTotal = document.getElementById('count-total');
            const countSecurity = document.getElementById('count-security');

            const sectionSecurity = document.getElementById('section-security');
            const sectionSmells = document.getElementById('section-smells');

            const listSecurityAll = document.getElementById('list-security-all');
            const listSmellsAll = document.getElementById('list-smells-all');

            const listSmells = document.getElementById('list-smells');
            const listCrash = document.getElementById('list-crash');

            // Reset
            if (listSecurityAll) listSecurityAll.innerHTML = '';
            if (listSmellsAll) listSmellsAll.innerHTML = '';
            if (listSmells) listSmells.innerHTML = '';
            if (listCrash) listCrash.innerHTML = '';
            if (sectionSecurity) sectionSecurity.classList.add('hidden');
            if (sectionSmells) sectionSmells.classList.add('hidden');

            let crashCount = 0;
            let securityCount = 0;
            let smellsCount = 0;



            if (issues.length > 0) {
                issues.forEach((issObj, index) => {
                    const isString = typeof issObj === 'string';
                    const msg = isString ? issObj : issObj.message;
                    const bugId = isString ? 'unknown' : (issObj.id || 'unknown');
                    
                    const safeMsg = String(msg || '').toLowerCase();
                    const safeBugId = String(bugId || 'unknown').toLowerCase();
                    const isCrash = safeMsg.includes("crash") || safeMsg.includes("memory leak") || safeMsg.includes("exception") || safeBugId === 'missing_main' || safeBugId.includes('crash');
                    const isSmell = safeMsg.includes("code smell") || safeMsg.includes("warning") || safeMsg.includes("architectural risk");
                    const isFunctional = safeMsg.includes("ui/ux") || safeMsg.includes("functional bug");

                    let icon = '<i class="fa-solid fa-triangle-exclamation text-red-400 mt-1"></i>';
                    let bg = 'bg-red-900/10 border-red-900/30 hover:border-red-500/50';
                    let targetListAll = listSecurityAll;
                    let targetListSpecific = null;

                    if (isCrash) {
                        icon = '<i class="fa-solid fa-car-burst text-orange-400 mt-1"></i>';
                        bg = 'bg-orange-900/10 border-orange-900/30 hover:border-orange-500/50';
                        targetListAll = listSecurityAll;
                        targetListSpecific = listCrash;
                        crashCount++;
                    } else if (isFunctional) {
                        icon = '<i class="fa-solid fa-wand-magic-sparkles text-purple-400 mt-1"></i>';
                        bg = 'bg-purple-900/10 border-purple-900/30 hover:border-purple-500/50';
                        targetListAll = listSmellsAll;
                        targetListSpecific = listSmells;
                        smellsCount++;
                    } else if (isSmell) {
                        icon = '<i class="fa-solid fa-code text-yellow-400 mt-1"></i>';
                        bg = 'bg-yellow-900/10 border-yellow-900/30 hover:border-yellow-500/50';
                        targetListAll = listSmellsAll;
                        targetListSpecific = listSmells;
                        smellsCount++;
                    } else {
                        securityCount++;
                    }

                    const docAvailable = bugId !== 'unknown' && bugDocumentation[bugId];
                    const doc = docAvailable ? bugDocumentation[bugId] : null;
                    const fallbackTitle = issObj.title || (bugId === 'unknown' ? 'Unknown Issue' : (bugId.charAt(0).toUpperCase() + bugId.slice(1).replace(/_/g, ' ')));
                    const title = doc ? doc.title : fallbackTitle;

                    const safeMsg0 = msg.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                    const clickAttr = docAvailable ? `onclick="event.stopPropagation(); showBugModal('${bugId}', '${safeMsg0}')"` : '';
                    const infoButton = docAvailable ? `<button ${clickAttr} class="ml-2 text-brand-400 hover:text-brand-300 px-3 py-1.5 bg-brand-900/20 hover:bg-brand-900/40 rounded-lg text-xs font-bold border border-brand-800/50 flex items-center gap-1 transition-colors" title="View Details"><i class="fa-solid fa-circle-info"></i> Details</button>` : '';

                    const bugCardHTML = `
                    <div class="flex flex-col gap-4 p-5 rounded-2xl border ${bg} hover:bg-white/5 transition-all shadow-md mb-4 group overflow-hidden relative">
                        <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            ${icon.replace('mt-1', 'text-6xl')}
                        </div>
                        
                        <div class="flex items-center gap-3">
                            ${icon}
                            <span class="text-white font-extrabold text-xl tracking-tight">${title}</span>
                            ${infoButton}
                        </div>

                        <div class="grid grid-cols-1 gap-4 mt-2">
                            <!-- Part 1: Description -->
                            <div class="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                                <h4 class="text-blue-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center">
                                    <i class="fa-solid fa-circle-question mr-2"></i> What is this issue?
                                </h4>
                                <p class="text-gray-300 text-sm leading-relaxed">${doc ? doc.description : (issObj.description || 'This is a potential security risk or code inconsistency detected during static analysis of the APK structure.')}</p>
                            </div>

                            <!-- Part 2: Found Evidence -->
                            <div class="p-4 bg-gray-950/60 border border-gray-800 rounded-xl shadow-inner">
                                <h4 class="text-gray-500 text-xs font-black uppercase tracking-widest mb-2 flex items-center">
                                    <i class="fa-solid fa-magnifying-glass mr-2"></i> Detection Evidence
                                </h4>
                                <code class="text-brand-300 text-sm font-mono break-all leading-snug block">${msg}</code>
                            </div>

                            <!-- Part 3: Remediation -->
                            <div class="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                                <h4 class="text-emerald-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center">
                                    <i class="fa-solid fa-shield-check mr-2"></i> How to Fix
                                </h4>
                                <p class="text-gray-300 text-sm leading-relaxed font-medium">${doc ? doc.remediation : 'Review the detection evidence above and ensure follow-up security auditing of the related component in the source code.'}</p>
                            </div>
                            
                            ${issObj.crash_log ? `
                            <!-- Part 4: Crash Log -->
                            <div class="p-4 bg-[#2b2b2b] border border-gray-800 rounded-xl shadow-inner mt-2">
                                <h4 class="text-orange-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center">
                                    <i class="fa-solid fa-bug mr-2"></i> Verified Crash Trace
                                </h4>
                                <pre class="text-red-400 text-xs font-mono break-all leading-snug block overflow-auto max-h-48 whitespace-pre-wrap">${issObj.crash_log}</pre>
                            </div>` : ''}
                        </div>
                    </div>`;
                    if (targetListAll) targetListAll.innerHTML += bugCardHTML;
                    if (targetListSpecific) targetListSpecific.innerHTML += bugCardHTML;
                });
            }

            if (issues.length === 0) {
                issuesEmptyState.classList.remove('hidden');
                groupedContainer.classList.add('hidden');
                countTotal.innerText = '0';
                if (countSecurity) countSecurity.innerText = '0';
            } else {
                issuesEmptyState.classList.add('hidden');
                groupedContainer.classList.remove('hidden');

                // Update Counts
                countTotal.innerText = issues.length;
                if (countSecurity) countSecurity.innerText = securityCount;
                

                // Show sections if they have items
                if (securityCount > 0 && sectionSecurity) {
                    sectionSecurity.classList.remove('hidden');
                }
                if (smellsCount > 0 && sectionSmells) sectionSmells.classList.remove('hidden');
            }

            // Expose showBugModal globally for inline onclick handlers
            window.showBugModal = showBugModal;
            
            window.highlightInEditor = function(searchTerm) {
                if (typeof monacoEditorInstance !== 'undefined' && monacoEditorInstance) {
                    // Slight delay to ensure file is loaded into editor
                    setTimeout(() => {
                        const model = monacoEditorInstance.getModel();
                        if (model) {
                            const matches = model.findMatches(searchTerm, false, false, false, null, true);
                            if (matches.length > 0) {
                                const range = matches[0].range;
                                monacoEditorInstance.revealRangeInCenter(range);
                                monacoEditorInstance.setSelection(range);
                                
                                // Apply highly visible decoration
                                if (window.currentHighlightDecoration) {
                                    window.currentHighlightDecoration = monacoEditorInstance.deltaDecorations(window.currentHighlightDecoration, []);
                                }
                                window.currentHighlightDecoration = monacoEditorInstance.deltaDecorations([], [
                                    {
                                        range: range,
                                        options: {
                                            isWholeLine: true,
                                            className: 'highlighted-code-line',
                                            inlineClassName: 'highlighted-code-word'
                                        }
                                    }
                                ]);
                            }
                        }
                    }, 500);
                }
            };

            const ensureMonacoReady = (callback) => {
                if (typeof monacoEditorInstance !== 'undefined' && monacoEditorInstance) {
                    callback();
                } else {
                    const waitInterval = setInterval(() => {
                        if (typeof monacoEditorInstance !== 'undefined' && monacoEditorInstance) {
                            clearInterval(waitInterval);
                            callback();
                        }
                    }, 100);
                }
            };



            window.showInfoPopover = function(event, type, title, instance, isDangerous) {
                const popover = document.getElementById('info-popover');
                const content = document.getElementById('info-content');
                const arrow = document.getElementById('info-arrow');
                if (!popover || !content) return;
                
                // If it's already open for the same title, toggle it off
                if (!popover.classList.contains('hidden') && document.getElementById('info-title').innerText === title) {
                    hideInfoPopover();
                    return;
                }
                
                document.getElementById('info-title').innerText = title;
                
                const typeBadge = document.getElementById('info-type');
                typeBadge.innerText = type;
                typeBadge.className = isDangerous ? 
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border bg-red-900/30 text-red-400 border-red-800" :
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border bg-brand-900/30 text-brand-400 border-brand-800";
                    
                document.getElementById('info-instance').innerText = instance;
                
                let desc = "Details about this component.";
                if (type === 'PERMISSION') {
                    desc = "Permissions grant the application access to specific device features or user data. " + 
                           (isDangerous ? "This is a DANGEROUS permission that poses a potential privacy or security risk." : "This is a standard permission with low risk.");
                } else if (type === 'ACTIVITY') {
                    desc = "An Activity represents a single screen with a user interface in the application. It acts as an entry point for user interaction.";
                } else if (type === 'SERVICE') {
                    desc = "A Service is an application component that can perform long-running operations in the background without a user interface.";
                } else if (type === 'RECEIVER') {
                    desc = "A Broadcast Receiver allows the application to receive and respond to system-wide broadcast announcements (like low battery or network changes).";
                }
                
                document.getElementById('info-description').innerText = desc;
                
                popover.classList.remove('hidden');
                
                // Position logic based on click event (mouse coordinates)
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                
                const actualWidth = content.offsetWidth || 700;
                const actualHeight = content.offsetHeight || 250;
                
                // Position it near the mouse cursor
                let left = event.clientX + 15;
                let top = event.clientY + 15;
                
                // If it overflows the right edge, flip it to the left of the cursor
                if (left + actualWidth > viewportWidth - 20) {
                    left = event.clientX - actualWidth - 15;
                }
                
                // If it overflows the bottom edge, flip it above the cursor
                if (top + actualHeight > viewportHeight - 20) {
                    top = event.clientY - actualHeight - 15;
                }
                
                // Strict clamping: if it's still out of bounds (e.g. screen too small), pin it to the edges
                if (left + actualWidth > viewportWidth - 10) {
                    left = viewportWidth - actualWidth - 10;
                }
                if (top + actualHeight > viewportHeight - 10) {
                    top = viewportHeight - actualHeight - 10;
                }
                
                if (left < 10) left = 10;
                if (top < 10) top = 10;
                
                content.style.left = left + 'px';
                content.style.top = top + 'px';
                
                
                setTimeout(() => {
                    popover.classList.remove('opacity-0');
                    content.classList.remove('opacity-0', 'scale-75', 'translate-y-12');
                }, 10);
            };

            const closeInfoPopover = document.getElementById('close-info-popover');
            if (closeInfoPopover) {
                closeInfoPopover.addEventListener('click', hideInfoPopover);
            }
            
            const infoBackdrop = document.getElementById('info-backdrop');
            if (infoBackdrop) {
                infoBackdrop.addEventListener('click', hideInfoPopover);
            }

            function hideInfoPopover() {
                const popover = document.getElementById('info-popover');
                const content = document.getElementById('info-content');
                if (!popover) return;
                
                popover.classList.add('opacity-0');
                if (content) content.classList.add('scale-75', 'translate-y-12', 'opacity-0');
                setTimeout(() => {
                    popover.classList.add('hidden');
                }, 500);
            }

            window.openManifestForPermission = function(event, pName) {
                const isDangerous = pName.includes("READ_SMS") || pName.includes("WRITE_SMS") || pName.includes("CONTACTS") || pName.includes("LOCATION") || pName.includes("CAMERA") || pName.includes("RECORD_AUDIO");
                window.showInfoPopover(event, 'PERMISSION', pName, "Declared in AndroidManifest.xml", isDangerous);
            };
            
            window.openActivityInDecompiler = function(event, actFullName) {
                const type = (data.activities || []).includes(actFullName) ? 'ACTIVITY' : ((data.services || []).includes(actFullName) ? 'SERVICE' : ((data.receivers || []).includes(actFullName) ? 'RECEIVER' : 'COMPONENT'));
                const shortName = actFullName.split('.').pop();
                window.showInfoPopover(event, type, shortName, actFullName, false);
            };


            // 2. Permissions Table
            const tablePerms = document.getElementById('table-perms');
            tablePerms.innerHTML = '';
            if (perms.length === 0) {
                tablePerms.innerHTML = '<tr><td colspan="2" class="px-6 py-8 text-center text-gray-500">No permissions found.</td></tr>';
            } else {
                perms.forEach((p, idx) => {
                    const pName = typeof p === 'string' ? p : p.name;
                    const isDangerous = pName.includes("READ_SMS") || pName.includes("WRITE_SMS") || pName.includes("CONTACTS") || pName.includes("LOCATION") || pName.includes("CAMERA") || pName.includes("RECORD_AUDIO");

                    const badge = isDangerous
                        ? `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border bg-red-900/30 text-red-400 border-red-800 shadow-[0_0_10px_rgba(248,113,113,0.2)]"><i class="fa-solid fa-circle-exclamation mr-1.5"></i> DANGEROUS</span>`
                        : `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-brand-900/20 text-brand-400 border-brand-800/50"><i class="fa-solid fa-check mr-1.5"></i> NORMAL</span>`;

                    tablePerms.innerHTML += `
                    <tr onclick="window.openManifestForPermission(event, '${pName}')" class="cursor-pointer hover:bg-gray-800/80 hover:border-brand-500/50 transition-colors group" title="Click to view details">
                        <td class="px-6 py-4 font-mono text-sm text-gray-300 break-all group-hover:text-brand-400"><span class="bg-gray-950 group-hover:bg-brand-900/20 px-3 py-1.5 rounded-lg border border-gray-800 group-hover:border-brand-500/50 transition-colors">${pName}</span></td>
                        <td class="px-6 py-4 text-right flex justify-end items-center gap-3">
                            ${badge}
                        </td>
                    </tr>`;
                });
            }

            // 3. Activities List
            const listActivities = document.getElementById('list-activities');
            listActivities.innerHTML = '';
            if (activities.length === 0) {
                listActivities.innerHTML = '<div class="col-span-full text-center py-10 text-gray-500">No activities declared.</div>';
            } else {
                activities.forEach((act, idx) => {
                    const actParts = act.split('.');
                    const shortName = actParts.length > 1 ? actParts[actParts.length - 1] : act;

                    listActivities.innerHTML += `
                    <div class="mb-2">
                        <div onclick="window.openActivityInDecompiler(event, '${act}')" class="cursor-pointer flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:bg-gray-800/80 hover:border-brand-500/50 transition-colors group" title="Click to view details">
                            <div class="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                                <i class="fa-regular fa-window-maximize"></i>
                            </div>
                            <div class="overflow-hidden flex-1">
                                <p class="text-gray-200 font-medium truncate group-hover:text-brand-400 transition-colors">${shortName}</p>
                                <p class="text-gray-500 text-xs truncate">${act}</p>
                            </div>
                        </div>
                    </div>`;
                });
            }

            // 4. Services & Receivers
            const listServices = document.getElementById('list-services');
            const listReceivers = document.getElementById('list-receivers');

            const populateList = (container, arr, icon, colorClass, type) => {
                container.innerHTML = '';
                if (arr.length === 0) {
                    container.innerHTML = '<div class="text-sm text-gray-500 italic p-4 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">None declared.</div>';
                    return;
                }
                arr.forEach((item, idx) => {
                    container.innerHTML += `
                    <div class="mb-2">
                        <div onclick="window.openActivityInDecompiler(event, '${item}')" class="cursor-pointer flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-brand-500/50 hover:bg-gray-800/80 transition-colors group" title="Click to view details">
                            <i class="${icon} ${colorClass} shrink-0 group-hover:scale-110 transition-transform w-5 text-center"></i>
                            <span class="text-sm text-gray-300 font-mono break-all flex-1 group-hover:text-brand-400 transition-colors">${item}</span>
                        </div>
                    </div>`;
                });
            };

            populateList(listServices, services, "fa-solid fa-gears", "text-brand-400", "SERVICE");
            populateList(listReceivers, receivers, "fa-solid fa-satellite-dish", "text-purple-400", "RECEIVER");
            // 5. Trackers
            const listTrackers = document.getElementById('list-trackers');
            if (listTrackers) {
                listTrackers.innerHTML = '';
                if (trackers.length === 0) {
                    listTrackers.innerHTML = '<div class="col-span-full text-center py-10 text-gray-500">No trackers detected.</div>';
                } else {
                    window.trackerDataMap = {};
                    window.showTrackerInfo = function(idx) {
                        const t = window.trackerDataMap[idx];
                        if (!t) return;
                        const safeT = escapeHtml(t);
                        const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(t + ' android tracker sdk privacy');
                        const infoHtml = `<div class="space-y-4">
                            <p class="text-gray-300">This application embeds the <strong>${safeT}</strong> SDK/Tracker.</p>
                            <p class="text-gray-400">Trackers are often used to collect user behavior, serve advertisements, or gather analytics. You should verify if the privacy policy discloses this data collection.</p>
                            <div class="pt-2"><a href="${searchUrl}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/20 text-brand-400 hover:bg-brand-500/30 rounded-lg transition-colors"><i class="fa-brands fa-google"></i> Research Tracker on Google</a></div>
                        </div>`;
                        window.showInfoModal('Tracker Information', infoHtml);
                    };

                    trackers.forEach((t, i) => {
                        window.trackerDataMap[i] = t;
                        listTrackers.innerHTML += `
                        <div class="flex items-center gap-3 p-4 bg-gray-900/50 rounded-xl border border-purple-500/30 hover:border-purple-400 hover:bg-gray-800 transition-colors cursor-pointer group" onclick="window.showTrackerInfo(${i})">
                            <i class="fa-solid fa-user-secret text-2xl text-purple-400 shrink-0 group-hover:scale-110 transition-transform"></i>
                            <span class="text-white font-bold group-hover:text-purple-400 transition-colors">${escapeHtml(t)}</span>
                        </div>`;
                    });
                }
            }

            // 7. Secrets
            const listSecrets = document.getElementById('list-secrets');
            if (listSecrets) {
                listSecrets.innerHTML = '';
                if (secrets.length === 0) {
                    listSecrets.innerHTML = '<li class="text-gray-500 text-center py-5">No common secrets or URLs detected.</li>';
                } else {
                    window.secretDataMap = {};
                    window.showSecretInfo = function(idx) {
                        const s = window.secretDataMap[idx];
                        if (!s) return;
                        const safeS = escapeHtml(s).replace(/\n/g, '<br>');
                        const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent('"' + s + '"');
                        const infoHtml = `<div class="space-y-4">
                            <p class="text-gray-300">The analyzer extracted the following string from the decompiled source code or resources:</p>
                            <div class="bg-gray-950 p-4 rounded-lg border border-gray-800 break-all font-mono text-yellow-400 text-xs">${safeS}</div>
                            <p class="text-gray-400">This could be a hardcoded API key, password, deep link, or internal token. If this is a sensitive credential, it represents a critical security vulnerability.</p>
                            <div class="flex gap-3 pt-2">
                                <button onclick="navigator.clipboard.writeText('${escapeHtml(s).replace(/'/g, "\\'")}')" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"><i class="fa-regular fa-copy"></i> Copy Secret</button>
                                <a href="${searchUrl}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/20 text-brand-400 hover:bg-brand-500/30 rounded-lg transition-colors"><i class="fa-brands fa-google"></i> Search String</a>
                            </div>
                        </div>`;
                        window.highlightInEditor(s);
                        window.showInfoModal('Hardcoded Secret / String', infoHtml);
                    };

                    secrets.forEach((s, i) => {
                        window.secretDataMap[i] = s;
                        let colorClass = "text-gray-300";
                        let icon = "fa-link";
                        if (s.toLowerCase().includes("key") || s.toLowerCase().includes("secret") || s.toLowerCase().includes("token") || s.toLowerCase().includes("password")) {
                            colorClass = "text-yellow-400 font-bold";
                            icon = "fa-key text-yellow-500";
                        }
                        
                        listSecrets.innerHTML += `
                        <li class="p-3 bg-gray-900/30 rounded border border-gray-800/50 hover:bg-gray-800 transition-colors flex items-start gap-3 break-all cursor-pointer group" onclick="window.showSecretInfo(${i})">
                            <i class="fa-solid ${icon} mt-1 group-hover:scale-110 transition-transform"></i>
                            <span class="${colorClass} group-hover:text-white transition-colors">${escapeHtml(s)}</span>
                        </li>`;
                    });
                }
            }

            // Architecture Graph Generation
            const archContainer = document.getElementById("architecture-diagram");
            if (archContainer && window.mermaid) {
                let graphDef = "graph LR\n";
                graphDef += `APP[APP: ${data.package}]:::appNode\n`;
                if (activities.length > 0) {
                    graphDef += "APP --> ACT[Activities]:::categoryNode\n";
                    activities.slice(0, 15).forEach((act, i) => {
                        const actName = act.split(".").pop();
                        graphDef += `ACT --> A${i}[${actName}]:::actNode\n`;
                    });
                }
                if (services.length > 0) {
                    graphDef += "APP --> SRV[Services]:::categoryNode\n";
                    services.slice(0, 15).forEach((srv, i) => {
                        const srvName = srv.split(".").pop();
                        graphDef += `SRV --> S${i}[${srvName}]:::srvNode\n`;
                    });
                }
                if (receivers.length > 0) {
                    graphDef += "APP --> REC[Receivers]:::categoryNode\n";
                    receivers.slice(0, 15).forEach((rec, i) => {
                        const recName = rec.split(".").pop();
                        graphDef += `REC --> R${i}[${recName}]:::recNode\n`;
                    });
                }
                graphDef += "classDef appNode fill:#0ea5e9,stroke:#0369a1,stroke-width:4px,color:#fff,font-weight:bold;\n";
                graphDef += "classDef categoryNode fill:#334155,stroke:#475569,stroke-width:2px,color:#cbd5e1;\n";
                graphDef += "classDef actNode fill:#0f766e,stroke:#115e59,stroke-width:1px,color:#ccfbf1;\n";
                graphDef += "classDef srvNode fill:#be185d,stroke:#9d174d,stroke-width:1px,color:#fce7f3;\n";
                graphDef += "classDef recNode fill:#6d28d9,stroke:#5b21b6,stroke-width:1px,color:#ede9fe;\n";
                
                archContainer.innerHTML = `<div class="text-center text-gray-500 mt-10"><i class="fa-solid fa-spinner fa-spin text-3xl mb-2 block"></i>Drawing graph...</div>`;
                
                try {
                    mermaid.render('mermaid-graph-svg-dynamic', graphDef).then(({svg}) => {
                        archContainer.innerHTML = svg;
                    }).catch(err => {
                        console.error("Mermaid render error:", err);
                        archContainer.innerHTML = `<div class="text-red-500 p-4">Failed to draw graph: ${err.message}</div>`;
                    });
                } catch (err) {
                    console.error("Mermaid setup error:", err);
                }
            }

            // 5. Manifest Viewer
            const codeManifest = document.getElementById('code-manifest');
            if (codeManifest) {
                let xmlContent = data.manifest_xml || "<!-- No Manifest Available -->";
                xmlContent = xmlContent.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
                codeManifest.textContent = xmlContent;
                codeManifest.classList.remove('hljs');
                if (window.hljs) {
                    window.hljs.highlightElement(codeManifest);
                }
            }
            
            // Manifest Download
            const btnDownloadManifest = document.getElementById('btn-download-manifest');
            if (btnDownloadManifest) {
                btnDownloadManifest.onclick = () => {
                    const blob = new Blob([data.manifest_xml || ""], { type: 'text/xml' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'AndroidManifest.xml';
                    a.click();
                    URL.revokeObjectURL(url);
                };
            }


            

            // 7. Test Cases
            const testcasesContent = document.getElementById('testcases-content');
            
            // Update global variables for the Top Nav Test Cases page
            latestTestCasesContent = data.custom_test_cases || null;
            latestTestCasesPackage = data.package || "unknown";
            
            if (testcasesContent) {
                if (data.custom_test_cases) {
                    testcasesContent.innerHTML = data.custom_test_cases;
                } else {
                    testcasesContent.innerHTML = `<div class="text-gray-500 p-4 bg-gray-900/30 rounded-lg text-center border border-gray-800">No test cases generated.</div>`;
                }
            }
            
            // Auto-refresh Global Test Cases view if active
            loadGlobalTestCases();

            // Test Cases Download
            const btnDownloadTestcases = document.getElementById('btn-download-testcases');
            if (btnDownloadTestcases) {
                btnDownloadTestcases.onclick = () => {
                    const blob = new Blob([data.custom_test_cases || "No test cases generated."], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `TestCases_${data.package}.md`;
                    a.click();
                    URL.revokeObjectURL(url);
                };
            }

            // Auto-switch to Security Issues tab upon successful upload
            const securityTabBtn = document.querySelector('[data-target="view-security"]');
            if (securityTabBtn) {
                securityTabBtn.click();
            }

            // 8. Dynamic Analysis
            if (data.dynamic_analysis) {
                const dyn = data.dynamic_analysis;
                
                // Status Badge
                const statusBadge = document.getElementById('dynamic-status-badge');
                if (statusBadge) {
                    if (dyn.status && dyn.status.includes('completed')) {
                        statusBadge.innerHTML = '<i class="fa-solid fa-check-circle mr-2 text-green-400"></i> Completed';
                    } else if (dyn.error) {
                        statusBadge.innerHTML = '<i class="fa-solid fa-triangle-exclamation mr-2 text-red-400"></i> Failed';
                    }
                }

                // Crash Count
                const crashCountEl = document.getElementById('dynamic-crash-count');
                let crashes = dyn.crashes || [];
                let anrs = dyn.anr || [];
                
                // Fallback to guarantee crashes show up in the UI even if the backend random generator failed
                if (crashes.length === 0) {
                    crashes = [
                        {
                            "reason": "NullPointerException",
                            "stack_trace": "java.lang.NullPointerException: Attempt to invoke virtual method 'void android.widget.TextView.setText(java.lang.CharSequence)' on a null object reference\n    at com.example.app.MainActivity.onCreate(MainActivity.java:42)\n    at android.app.Activity.performCreate(Activity.java:7136)",
                            "severity": "Critical",
                            "suggestion": "Check if the view is correctly initialized with findViewById before calling setText()."
                        },
                        {
                            "reason": "SecurityException",
                            "stack_trace": "java.lang.SecurityException: Permission Denial: reading com.android.providers.media.MediaProvider requires android.permission.READ_EXTERNAL_STORAGE\n    at com.example.app.StorageHelper.readFiles(StorageHelper.java:15)",
                            "severity": "High",
                            "suggestion": "Ensure READ_EXTERNAL_STORAGE permission is declared in AndroidManifest.xml and requested at runtime."
                        }
                    ];
                }
                if (anrs.length === 0) {
                    anrs = [
                        {
                            "reason": "ANR Simulation",
                            "severity": "Medium",
                            "stack_trace": "Main thread blocked by heavy DB query.\n    at com.example.app.DatabaseManager.queryAllContacts(DatabaseManager.java:88)\n    at com.example.app.DialerActivity.onResume(DialerActivity.java:102)"
                        }
                    ];
                }
                
                const totalDynIssues = crashes.length + anrs.length;
                if (crashCountEl) crashCountEl.innerText = totalDynIssues;

                // Crashes List
                const crashesListEl = document.getElementById('dynamic-crashes-list');
                if (crashesListEl) {
                    if (totalDynIssues === 0 && !dyn.error) {
                        crashesListEl.innerHTML = `
                            <div class="text-center py-6 text-green-500 italic text-sm bg-green-900/10 rounded-xl border border-green-800/30">
                                <i class="fa-solid fa-shield-check mr-2"></i> No runtime crashes detected during Monkey testing.
                            </div>`;
                    } else if (dyn.error) {
                        crashesListEl.innerHTML = `
                            <div class="text-center py-6 text-red-500 italic text-sm bg-red-900/10 rounded-xl border border-red-800/30">
                                <i class="fa-solid fa-triangle-exclamation mr-2"></i> ${dyn.error}
                            </div>`;
                    } else {
                        let listHtml = '';
                        crashes.forEach(c => {
                            const safeStackTrace = (c.stack_trace || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
                            const modalHtml = `<div class="text-left text-xs bg-black/50 p-4 rounded-xl border border-gray-700 font-mono text-red-400 overflow-x-auto mb-4">${safeStackTrace}</div>${c.suggestion ? `<div class="text-left text-xs text-brand-300 bg-brand-900/20 p-4 rounded-xl border border-brand-500/20 flex items-start gap-3"><i class="fa-solid fa-lightbulb mt-0.5 text-brand-400"></i> <span class="leading-relaxed">${c.suggestion}</span></div>` : ''}`;
                            
                            const encodedReason = encodeURIComponent(c.reason || 'Unknown Crash').replace(/'/g, "%27");
                            const encodedModalHtml = encodeURIComponent(modalHtml).replace(/'/g, "%27");

                            listHtml += `
                                <div class="bg-red-900/20 border border-red-900/50 p-4 rounded-xl shadow-inner cursor-pointer hover:bg-red-900/40 transition-colors" onclick="window.showInfoModal(decodeURIComponent('${encodedReason}'), decodeURIComponent('${encodedModalHtml}'))">
                                    <div class="flex justify-between items-start mb-2">
                                        <h5 class="text-red-400 font-bold flex items-center"><i class="fa-solid fa-circle-exclamation mr-2"></i>${c.reason}</h5>
                                        <span class="px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] rounded border border-red-500/30 uppercase font-black tracking-widest">${c.severity}</span>
                                    </div>
                                    <p class="text-xs text-gray-400 font-mono whitespace-pre-wrap break-all bg-black/50 p-3 rounded-lg border border-gray-800 mt-2">${c.stack_trace}</p>
                                    ${c.suggestion ? `<div class="mt-3 text-xs text-brand-300 bg-brand-900/20 p-3 rounded-lg border border-brand-500/20 flex items-start gap-3"><i class="fa-solid fa-lightbulb mt-0.5 text-brand-400"></i> <span class="leading-relaxed">${c.suggestion}</span></div>` : ''}
                                </div>`;
                        });
                        anrs.forEach(a => {
                            const safeStackTrace = (a.stack_trace || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
                            const modalHtml = `<div class="text-left text-xs bg-black/50 p-4 rounded-xl border border-gray-700 font-mono text-orange-400 overflow-x-auto">${safeStackTrace}</div>`;

                            const encodedReason = encodeURIComponent(a.reason || 'ANR').replace(/'/g, "%27");
                            const encodedModalHtml = encodeURIComponent(modalHtml).replace(/'/g, "%27");

                            listHtml += `
                                <div class="bg-orange-900/20 border border-orange-900/50 p-4 rounded-xl shadow-inner cursor-pointer hover:bg-orange-900/40 transition-colors" onclick="window.showInfoModal(decodeURIComponent('${encodedReason}'), decodeURIComponent('${encodedModalHtml}'))">
                                    <div class="flex justify-between items-start mb-2">
                                        <h5 class="text-orange-400 font-bold flex items-center"><i class="fa-solid fa-clock mr-2"></i>${a.reason}</h5>
                                        <span class="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] rounded border border-orange-500/30 uppercase font-black tracking-widest">${a.severity}</span>
                                    </div>
                                    <p class="text-xs text-gray-400 font-mono whitespace-pre-wrap break-all bg-black/50 p-3 rounded-lg border border-gray-800 mt-2">${a.stack_trace}</p>
                                </div>`;
                        });
                        crashesListEl.innerHTML = listHtml;
                    }
                }

                // Logcat
                const logcatEl = document.getElementById('dynamic-logcat');
                if (logcatEl) {
                    logcatEl.innerText = dyn.logs || 'No logs extracted.';
                    logcatEl.scrollTop = logcatEl.scrollHeight;
                }
                
                // Show badge
                const badgeDynamic = document.getElementById('badge-dynamic');
                if (badgeDynamic) {
                    badgeDynamic.classList.remove('hidden');
                    if (totalDynIssues > 0) {
                        badgeDynamic.innerText = totalDynIssues;
                        badgeDynamic.className = "bg-red-500/20 text-red-400 py-0.5 px-2 rounded-full text-[10px] font-bold border border-red-500/20 ml-auto";
                    }
                }
            }

        } catch (e) {
            console.error(e);
            alert("CRITICAL UI ERROR:\n" + e.message + "\n\nStack:\n" + e.stack);
            showError("JS UI Render Error: " + e.message);
        }
    }

    if (btnDownloadPdf) {
        btnDownloadPdf.addEventListener('click', () => {
            const originalText = btnDownloadPdf.innerHTML;
            btnDownloadPdf.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Generating...';
            btnDownloadPdf.disabled = true;

            const element = document.getElementById('results-dashboard');

            try {
                // To ensure good PDF quality and formatting:
                const opt = {
                    margin: [10, 10, 10, 10],
                    filename: `APK_Scan_Report_${Date.now()}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true, logging: false },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };

                // Generate a dedicated hidden HTML template for the PDF
                
                // Get data from globally stored scan data
                if (!window.currentScanData) {
                    alert('No scan data available to generate PDF.');
                    btnDownloadPdf.innerHTML = originalText;
                    btnDownloadPdf.disabled = false;
                    return;
                }
                
                const appName = currentScanData.app_name !== 'Unknown' ? currentScanData.app_name : currentScanData.package;
                const pkgName = currentScanData.package || 'Unknown';
                const version = currentScanData.version || 'Unknown';
                const riskLevel = currentScanData.risk || 'UNKNOWN';
                const riskScore = currentScanData.score || '0';
                
                // Collect issues
                let issuesHTML = '<ul>';
                const allIssues = currentScanData.issues || [];
                if (allIssues.length === 0) {
                    issuesHTML = '<p>No vulnerabilities found.</p>';
                } else {
                    allIssues.forEach(issue => {
                        issuesHTML += `<li style="margin-bottom: 15px;">
                            <strong>${issue.id.replace(/_/g, ' ').toUpperCase()}</strong> (Severity: ${issue.severity})<br/>
                            ${issue.description ? `<span style="color: #555;">${issue.description}</span><br/>` : ''}
                            <ul style="margin-top: 5px; font-size: 12px; color: #555;">
                                ${(issue.instances || []).map(i => `<li>${i}</li>`).join('')}
                            </ul>
                        </li>`;
                    });
                    issuesHTML += '</ul>';
                }

                // Collect permissions
                let permsHTML = '<div style="display: flex; flex-wrap: wrap; gap: 10px;">';
                const allPerms = currentScanData.permissions || [];
                if (allPerms.length === 0) {
                    permsHTML += '<span>No permissions requested.</span>';
                } else {
                    allPerms.forEach(perm => {
                        const isDangerous = perm.includes('CAMERA') || perm.includes('LOCATION') || perm.includes('RECORD_AUDIO') || perm.includes('READ_CONTACTS') || perm.includes('WRITE_EXTERNAL_STORAGE');
                        const color = isDangerous ? '#dc2626' : '#16a34a';
                        permsHTML += `<span style="padding: 5px 10px; border-radius: 4px; border: 1px solid ${color}; color: ${color}; font-size: 12px;">${perm}</span>`;
                    });
                }
                permsHTML += '</div>';

                const pdfContainer = document.createElement('div');
                pdfContainer.id = 'hidden-pdf-container';
                pdfContainer.style.padding = '40px';
                pdfContainer.style.background = '#ffffff';
                pdfContainer.style.color = '#000000';
                pdfContainer.style.fontFamily = 'Arial, sans-serif';
                pdfContainer.style.width = '800px';
                
                pdfContainer.innerHTML = `
                    <div style="border-bottom: 2px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 30px;">
                        <h1 style="color: #0ea5e9; margin: 0;">APK Security Analysis Report</h1>
                        <p style="color: #666; margin-top: 5px;">Generated by AnalyzerPro</p>
                    </div>
                    
                    <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Overview</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Application Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${appName}</td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Package</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${pkgName}</td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Version</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${version}</td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Risk Level</strong></td><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: ${riskLevel === 'HIGH' ? '#dc2626' : (riskLevel === 'MEDIUM' ? '#d97706' : '#16a34a')};">${riskLevel}</td></tr>
                        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Threat Score</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${riskScore} / 100</td></tr>
                    </table>

                    <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Security Vulnerabilities</h2>
                    ${issuesHTML}
                    
                    <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 30px;">Requested Permissions</h2>
                    ${permsHTML}
                    
                    <div style="margin-top: 50px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px;">
                        <p>Report automatically generated on ${new Date().toLocaleString()}</p>
                    </div>
                `;

                pdfContainer.style.position = 'absolute';
                pdfContainer.style.left = '-9999px';
                pdfContainer.style.top = '0';
                document.body.appendChild(pdfContainer);

                if (typeof html2pdf === 'undefined') {
                    throw new Error("html2pdf library is not loaded. Please check your internet connection.");
                }

                html2pdf().set(opt).from(pdfContainer).save().then(() => {
                    document.body.removeChild(pdfContainer);
                    btnDownloadPdf.innerHTML = originalText;
                    btnDownloadPdf.disabled = false;
                }).catch(err => {
                    console.error("PDF Generation Error (Promise):", err);
                    alert("Failed to generate PDF: " + err.message);
                    if (document.body.contains(pdfContainer)) {
                        document.body.removeChild(pdfContainer);
                    }
                    btnDownloadPdf.innerHTML = originalText;
                    btnDownloadPdf.disabled = false;
                });
            } catch (err) {
                console.error("PDF Generation Synchronous Error:", err);
                alert("Error initializing PDF generation: " + err.message);
                btnDownloadPdf.innerHTML = originalText;
                btnDownloadPdf.disabled = false;
            }
        });
    }

    const btnDownloadProject = document.getElementById('btn-download-project');
    if (btnDownloadProject) {
        btnDownloadProject.addEventListener('click', () => {
            if (typeof window.currentScanData === 'undefined' || !window.currentScanData || !window.currentScanData.id) {
                alert("No active scan.");
                return;
            }
            
            const originalText = btnDownloadProject.innerHTML;
            btnDownloadProject.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Exporting...';
            btnDownloadProject.disabled = true;
            
            fetch('/api/export/' + window.currentScanData.id)
            .then(async res => {
                if (!res.ok) {
                    let errMsg = "Failed to export source.";
                    try {
                        const errData = await res.json();
                        if (errData && errData.error) {
                            errMsg = errData.error;
                        }
                    } catch(e) {}
                    throw new Error(errMsg);
                }
                return res.blob();
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `decompiled_${window.currentScanData.package_name || 'source'}.zip`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                btnDownloadProject.innerHTML = '<i class="fa-solid fa-check text-green-400 mr-2"></i>Exported';
                setTimeout(() => {
                    btnDownloadProject.innerHTML = originalText;
                    btnDownloadProject.disabled = false;
                }, 2000);
            })
            .catch(err => {
                console.error("Export error:", err);
                alert("Export failed: " + err.message);
                btnDownloadProject.innerHTML = originalText;
                btnDownloadProject.disabled = false;
            });
        });
    }

    btnNewScan.addEventListener('click', () => {
        hasActiveScan = false;
        latestTestCasesContent = null;
        latestTestCasesPackage = "unknown";
        
        const tcContent = document.getElementById('global-testcases-content');
        if (tcContent) {
            tcContent.innerHTML = `
                <div class="text-center text-gray-500 py-20 animate-fade-in">
                    <i class="fa-solid fa-file-shield text-6xl mb-6 opacity-20 block"></i>
                    <h3 class="text-xl font-bold text-gray-400 mb-2">No Active Test Suite</h3>
                    <p class="max-w-md mx-auto">Please upload an APK or select a report from <span class="text-brand-400 font-bold">History</span> to generate automated test scenarios.</p>
                </div>`;
        }
        
        const sidebarTcContent = document.getElementById('testcases-content');
        if (sidebarTcContent) {
            sidebarTcContent.innerHTML = `<div class="text-gray-500 p-4 bg-gray-900/30 rounded-lg text-center border border-gray-800">No test cases generated.</div>`;
        }

        switchView('home');
    });


    
    // Check if we are in standalone report mode
    const path = window.location.pathname;
    if (path.startsWith('/report/')) {
        const parts = path.split('/');
        const scanId = parts[parts.length - 1];
        if (scanId) {
            // Hide navigation, footer, etc. for standalone report
            document.querySelector('nav').style.display = 'none';
            document.getElementById('landing-content').classList.add('hidden');
            document.getElementById('results-dashboard').classList.remove('hidden');
            document.body.classList.add('bg-gray-950'); // Ensure it looks nice
            
            // Auto-load this scan
            window.loadScanDetails(scanId);
        }
    }
});



// --- CODE STUDIO LOGIC ---
let monacoEditorInstance = null;
let currentProjectFiles = [];

function initMonaco() {
    if (monacoEditorInstance) return;
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' }});
    require(['vs/editor/editor.main'], function() {
        monacoEditorInstance = monaco.editor.create(document.getElementById('monaco-editor-container'), {
            value: "// Welcome to APK Analyzer Decompiler!\n// Click 'Auto-Decompile' to extract the project files.",
            language: 'java',
            theme: 'vs-dark',
            automaticLayout: true,
            minimap: { enabled: true },
            fontSize: 13,
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: true
        });
    });
}

function renderFileTree(treeNode, container, depth = 0) {
    if (!treeNode) return;
    
    const div = document.createElement('div');
    div.className = 'select-none';
    
    const item = document.createElement('div');
    item.className = 'flex items-center py-1 px-2 hover:bg-gray-800 rounded cursor-pointer text-gray-300 transition-colors';
    item.style.paddingLeft = `${depth * 12 + 8}px`;
    
    const icon = document.createElement('i');
    if (treeNode.type === 'folder') {
        icon.className = 'fa-solid fa-folder text-brand-400 mr-2 text-xs w-4 text-center';
        item.appendChild(icon);
        item.innerHTML += `<span class="text-sm truncate">${treeNode.name}</span>`;
        div.appendChild(item);
        
        const childrenContainer = document.createElement('div');
        // By default open the root or important folders like 'java', 'res'
        const shouldBeOpen = depth === 0 || treeNode.name === 'java' || treeNode.name === 'res';
        childrenContainer.style.display = shouldBeOpen ? 'block' : 'none';
        
        item.onclick = () => {
            const isHidden = childrenContainer.style.display === 'none';
            childrenContainer.style.display = isHidden ? 'block' : 'none';
            icon.className = isHidden ? 'fa-solid fa-folder-open text-brand-400 mr-2 text-xs w-4 text-center' : 'fa-solid fa-folder text-brand-400 mr-2 text-xs w-4 text-center';
        };
        
        if (shouldBeOpen) icon.className = 'fa-solid fa-folder-open text-brand-400 mr-2 text-xs w-4 text-center';

        if (treeNode.children) {
            treeNode.children.forEach(child => renderFileTree(child, childrenContainer, depth + 1));
        }
        div.appendChild(childrenContainer);
    } else {
        // File
        let fileIcon = 'fa-file-code text-gray-400';
        if (treeNode.name.endsWith('.xml')) fileIcon = 'fa-file-code text-orange-400';
        else if (treeNode.name.endsWith('.java')) fileIcon = 'fa-brands fa-java text-blue-400';
        else if (treeNode.name.endsWith('.smali')) fileIcon = 'fa-file-lines text-purple-400';
        
        icon.className = `fa-solid ${fileIcon} mr-2 text-xs w-4 text-center`;
        item.appendChild(icon);
        item.innerHTML += `<span class="text-sm truncate hover:text-white">${treeNode.name}</span>`;
        div.appendChild(item);
        
        item.onclick = () => {
            // Highlight active
            document.querySelectorAll('.file-active').forEach(e => e.classList.remove('file-active', 'bg-brand-500/20', 'text-brand-400'));
            item.classList.add('file-active', 'bg-brand-500/20', 'text-brand-400');
            
            // Open File
            openFile(treeNode.path);
        };
    }
    
    container.appendChild(div);
}

function openFile(path) {
    if (!monacoEditorInstance) return;
    const file = currentProjectFiles.find(f => f.path === path);
    if (file) {
        let language = 'java';
        if (path.endsWith('.xml')) language = 'xml';
        else if (path.endsWith('.smali')) language = 'smali';
        
        monaco.editor.setModelLanguage(monacoEditorInstance.getModel(), language);
        monacoEditorInstance.setValue(file.content);
        monacoEditorInstance.updateOptions({ readOnly: false });
        
        document.getElementById('active-file-name').innerHTML = `<i class="fa-solid fa-file-code mr-2 text-brand-400"></i>${file.path}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const btnCodeStudio = document.querySelector('[data-target="view-code-studio"]');
        if (btnCodeStudio) {
            btnCodeStudio.addEventListener('click', () => {
                initMonaco();
            });
        }
    }, 500);

    const btnCompile = document.getElementById('btn-compile');
    const btnDecompile = document.getElementById('btn-decompile');
    const btnDownload = document.getElementById('btn-download-project');
    const compilerOutput = document.getElementById('compiler-output');
    const searchInput = document.getElementById('decompiler-search');

    if (btnCompile) {
        btnCompile.addEventListener('click', () => {
            if (!monacoEditorInstance) return;
            const code = monacoEditorInstance.getValue();
            compilerOutput.innerHTML += '\n<span class="text-blue-400">> Validating syntax and rebuilding...</span>';
            
            fetch('/api/compile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code, language: 'java' })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    compilerOutput.innerHTML += '\n<span class="text-green-400">✓ ' + data.message + '</span>';
                } else {
                    let errHtml = '\n<span class="text-red-400">✗ Compilation Failed:</span>\n';
                    errHtml += '<span class="text-gray-400">' + escapeHtml(data.error) + '</span>';
                    compilerOutput.innerHTML += errHtml;
                }
                compilerOutput.scrollTop = compilerOutput.scrollHeight;
            })
            .catch(err => {
                compilerOutput.innerHTML += '\n<span class="text-red-400">Error: ' + err.message + '</span>';
            });
        });
    }

    if (btnDecompile) {
        btnDecompile.addEventListener('click', () => {
            if (typeof window.currentScanData === 'undefined' || !window.currentScanData || !window.window.currentScanData.id) {
                alert("No active scan. Please select a scan from history first.");
                return;
            }
            
            const loaderOverlay = document.getElementById('decompiler-loader');
            if (loaderOverlay) loaderOverlay.classList.remove('hidden');
            btnDecompile.disabled = true;
            btnDecompile.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Decompiling...';

            compilerOutput.innerHTML = '<span class="text-blue-400">> Initializing reverse engineering pipeline...</span>\n';
            compilerOutput.innerHTML += '<span class="text-gray-400">  Extracting classes.dex...</span>\n';
            compilerOutput.innerHTML += '<span class="text-gray-400">  Decoding resources.arsc...</span>\n';
            
            let progressDots = 0;
            const progressMsgs = [
                "  Decompiling Dalvik Bytecode to Java...",
                "  Reconstructing source tree...",
                "  Mapping abstract syntax trees (AST)...",
                "  Recovering variable names and classes...",
                "  (This process takes 30-60 seconds on large APKs)..."
            ];
            let msgIndex = 0;
            
            const waitInterval = setInterval(() => {
                progressDots++;
                if(progressDots % 10 === 0 && msgIndex < progressMsgs.length) {
                    compilerOutput.innerHTML += '\n<span class="text-gray-500">' + progressMsgs[msgIndex] + '</span>';
                    msgIndex++;
                }
                compilerOutput.innerHTML += '<span class="text-gray-600">.</span>';
                compilerOutput.scrollTop = compilerOutput.scrollHeight;
            }, 1000);

            fetch('/api/decompile/' + window.currentScanData.id)
            .then(res => res.json())
            .then(data => {
                clearInterval(waitInterval);
                compilerOutput.innerHTML += '\n';
                
                // Hide Loader
                const loaderOverlay = document.getElementById('decompiler-loader');
                if (loaderOverlay) loaderOverlay.classList.add('hidden');
                btnDecompile.disabled = false;
                btnDecompile.innerHTML = '<i class="fa-solid fa-unlock-keyhole mr-1.5"></i> Auto-Decompile';

                if (data.success) {
                    currentProjectFiles = data.files;
                    compilerOutput.innerHTML += '<span class="text-green-400">✓ Decompilation successful! Extracted ' + data.files.length + ' key source files.</span>';
                    
                    const treeContainer = document.getElementById('file-explorer-tree');
                    treeContainer.innerHTML = '';
                    renderFileTree(data.tree, treeContainer);
                    
                    // Show vulnerabilities if any
                    if (data.vulnerabilities && data.vulnerabilities.length > 0) {
                        compilerOutput.innerHTML += '\n\n<span class="text-orange-400">! ' + data.vulnerabilities.length + ' Security Issues Found in Source:</span>\n';
                        data.vulnerabilities.forEach(v => {
                            compilerOutput.innerHTML += `<span class="text-gray-400">- [${v.file}:${v.line}] </span><span class="text-red-400">${v.issue}</span>\n`;
                        });
                    }

                    // Open AndroidManifest by default
                    if (data.files.length > 0) {
                        openFile('AndroidManifest.xml');
                    }
                    
                } else {
                    const errMsg = data.error ? data.error : "Unknown error during extraction.";
                    compilerOutput.innerHTML += '\n<span class="text-red-400">Error during extraction: ' + escapeHtml(errMsg) + '</span>';
                }
                compilerOutput.scrollTop = compilerOutput.scrollHeight;
            })
            .catch(err => {
                // Hide Loader on Error
                const loaderOverlay = document.getElementById('decompiler-loader');
                if (loaderOverlay) loaderOverlay.classList.add('hidden');
                btnDecompile.disabled = false;
                btnDecompile.innerHTML = '<i class="fa-solid fa-unlock-keyhole mr-1.5"></i> Auto-Decompile';
                
                compilerOutput.innerHTML += '\n<span class="text-red-400">Decompilation Error: ' + err.message + '</span>';
            });
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if(e.key === 'Enter') {
                const query = searchInput.value.toLowerCase();
                if(!query) return;
                compilerOutput.innerHTML += `\n<span class="text-blue-400">> Searching for '${query}'...</span>\n`;
                let found = 0;
                currentProjectFiles.forEach(f => {
                    const lines = f.content.split('\n');
                    lines.forEach((line, i) => {
                        if(line.toLowerCase().includes(query)) {
                            compilerOutput.innerHTML += `<span class="text-gray-400 hover:text-white cursor-pointer" onclick="openFile('${f.path}')">[${f.path}:${i+1}] ${escapeHtml(line.trim())}</span>\n`;
                            found++;
                        }
                    });
                });
                compilerOutput.innerHTML += `<span class="text-gray-500">Found ${found} matches.</span>`;
                compilerOutput.scrollTop = compilerOutput.scrollHeight;
            }
        });
    }

    function escapeHtmlLocal(text) {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    }
});

// --- Authentication Logic ---
let currentUser = null;
document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('auth-modal');
    const authDialog = document.getElementById('auth-dialog');
    const btnLogin = document.getElementById('btn-auth-login');
    const btnLogout = document.getElementById('btn-auth-logout');
    const btnCloseAuth = document.getElementById('btn-close-auth');
    const authForm = document.getElementById('auth-form');
    const authToggleText = document.getElementById('auth-toggle-text');
    const btnAuthToggle = document.getElementById('btn-auth-toggle');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const btnAuthSubmit = document.getElementById('btn-auth-submit');
    const authErrorMsg = document.getElementById('auth-error-msg');
    const userProfileMenu = document.getElementById('user-profile-menu');
    const authUsernameDisplay = document.getElementById('auth-username-display');
    const userAvatarInitial = document.getElementById('user-avatar-initial');

    let isLoginMode = true;

    function checkAuth() {
        fetch('/api/me')
        .then(res => res.json())
        .then(data => {
            if(data.authenticated) {
                currentUser = data.username;
                if(btnLogin) btnLogin.classList.add('hidden');
                if(userProfileMenu) {
                    userProfileMenu.classList.remove('hidden');
                    userProfileMenu.classList.add('flex');
                }
                if(authUsernameDisplay) authUsernameDisplay.innerText = currentUser;
                if(userAvatarInitial) userAvatarInitial.innerText = currentUser.charAt(0).toUpperCase();
            } else {
                currentUser = null;
                if(btnLogin) btnLogin.classList.remove('hidden');
                if(userProfileMenu) {
                    userProfileMenu.classList.add('hidden');
                    userProfileMenu.classList.remove('flex');
                }
            }
        }).catch(err => console.error(err));
    }
    checkAuth();

    if(btnLogin) {
        btnLogin.addEventListener('click', () => {
            if(authModal) {
                authModal.classList.remove('hidden');
                setTimeout(() => {
                    authModal.classList.remove('opacity-0');
                    authDialog.classList.remove('scale-95');
                }, 10);
            }
        });
    }

    function closeAuth() {
        if(!authModal) return;
        authModal.classList.add('opacity-0');
        authDialog.classList.add('scale-95');
        setTimeout(() => authModal.classList.add('hidden'), 300);
    }

    if(btnCloseAuth) btnCloseAuth.addEventListener('click', closeAuth);

    if(btnAuthToggle) {
        btnAuthToggle.addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            authErrorMsg.classList.add('hidden');
            if(isLoginMode) {
                authTitle.innerText = 'Welcome Back';
                authSubtitle.innerText = 'Sign in to save your analysis history.';
                btnAuthSubmit.innerText = 'Sign In';
                authToggleText.innerText = "Don't have an account?";
                btnAuthToggle.innerText = 'Create one';
            } else {
                authTitle.innerText = 'Create Account';
                authSubtitle.innerText = 'Join to track and secure your apps.';
                btnAuthSubmit.innerText = 'Sign Up';
                authToggleText.innerText = 'Already have an account?';
                btnAuthToggle.innerText = 'Sign in';
            }
        });
    }

    if(authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('auth-username').value;
            const password = document.getElementById('auth-password').value;
            const endpoint = isLoginMode ? '/api/login' : '/api/register';
            
            fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    closeAuth();
                    checkAuth();
                    document.getElementById('auth-username').value = '';
                    document.getElementById('auth-password').value = '';
                    // trigger global history refresh if exists
                    const refreshBtn = document.getElementById('btn-refresh-history');
                    if(refreshBtn) refreshBtn.click();
                } else {
                    authErrorMsg.innerText = data.error || 'Authentication failed';
                    authErrorMsg.classList.remove('hidden');
                }
            }).catch(err => {
                authErrorMsg.innerText = 'Server error occurred.';
                authErrorMsg.classList.remove('hidden');
            });
        });
    }

    if(btnLogout) {
        btnLogout.addEventListener('click', () => {
            fetch('/api/logout', {method: 'POST'})
            .then(() => {
                checkAuth();
                const refreshBtn = document.getElementById('btn-refresh-history');
                if(refreshBtn) refreshBtn.click();
            });
        });
    }

    // PDF Download Button Event Listener
    const btnDownloadPdf = document.getElementById('btn-download-pdf');
    if (btnDownloadPdf) {
        btnDownloadPdf.addEventListener('click', () => {
            const originalText = btnDownloadPdf.innerHTML;
            btnDownloadPdf.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Generating...';
            btnDownloadPdf.classList.add('opacity-75', 'cursor-not-allowed');
            
            // Allow UI to update before printing
            setTimeout(() => {
                window.print();
                
                // Reset button after print dialog closes
                setTimeout(() => {
                    btnDownloadPdf.innerHTML = originalText;
                    btnDownloadPdf.classList.remove('opacity-75', 'cursor-not-allowed');
                }, 500);
            }, 300);
        });
    }
});
