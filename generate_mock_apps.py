import json
import random

categories = [
    {"name": "Game", "color": "text-yellow-500", "bg": "bg-yellow-500/20", "icon": "fa-gamepad"},
    {"name": "Social", "color": "text-blue-500", "bg": "bg-blue-500/20", "icon": "fa-hashtag"},
    {"name": "Tool", "color": "text-gray-400", "bg": "bg-gray-400/20", "icon": "fa-wrench"},
    {"name": "Finance", "color": "text-green-500", "bg": "bg-green-500/20", "icon": "fa-coins"},
    {"name": "Entertainment", "color": "text-purple-500", "bg": "bg-purple-500/20", "icon": "fa-film"},
    {"name": "Education", "color": "text-indigo-500", "bg": "bg-indigo-500/20", "icon": "fa-graduation-cap"}
]

# High quality exact icons for popular ones
exact_apps = [
    {"id": "com.whatsapp", "name": "WhatsApp Messenger", "category": "Social", "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg", "faIcon": "fa-whatsapp"},
    {"id": "com.instagram.android", "name": "Instagram", "category": "Social", "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg", "faIcon": "fa-instagram"},
    {"id": "com.spotify.music", "name": "Spotify", "category": "Entertainment", "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg", "faIcon": "fa-spotify"},
    {"id": "com.zhiliaoapp.musically", "name": "TikTok", "category": "Entertainment", "iconUrl": "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg", "faIcon": "fa-tiktok"},
    {"id": "com.facebook.katana", "name": "Facebook", "category": "Social", "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png", "faIcon": "fa-facebook"},
    {"id": "org.telegram.messenger", "name": "Telegram", "category": "Social", "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg", "faIcon": "fa-telegram"},
    {"id": "com.twitter.android", "name": "X (Twitter)", "category": "Social", "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg", "faIcon": "fa-twitter"},
    {"id": "com.snapchat.android", "name": "Snapchat", "category": "Social", "iconUrl": "https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg", "faIcon": "fa-snapchat"},
    {"id": "com.tencent.ig", "name": "PUBG Mobile", "category": "Game", "iconUrl": "", "faIcon": "fa-gamepad"},
    {"id": "com.dts.freefireth", "name": "Free Fire", "category": "Game", "iconUrl": "", "faIcon": "fa-gamepad"},
    {"id": "com.kiloo.subwaysurf", "name": "Subway Surfers", "category": "Game", "iconUrl": "", "faIcon": "fa-person-running"},
    {"id": "com.king.candycrushsaga", "name": "Candy Crush Saga", "category": "Game", "iconUrl": "", "faIcon": "fa-candy-cane"},
    {"id": "com.google.android.youtube", "name": "YouTube", "category": "Entertainment", "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg", "faIcon": "fa-youtube"},
    {"id": "com.netflix.mediaclient", "name": "Netflix", "category": "Entertainment", "iconUrl": "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", "faIcon": "fa-film"}
]

# Generate more generic apps to reach 100
verbs = ["Super", "Mega", "Pro", "Lite", "Max", "Ultra", "Epic", "Smart", "Quick", "Easy"]
nouns = ["Racing", "Shooter", "Puzzle", "Editor", "VPN", "Cleaner", "Scanner", "Wallet", "Player", "Connect"]

generated_apps = []
count = len(exact_apps)

while count < 100:
    cat = random.choice(categories)
    v = random.choice(verbs)
    n = random.choice(nouns)
    name = f"{v} {n}"
    
    # avoid exact duplicates
    if any(a['name'] == name for a in generated_apps):
        continue
        
    pkg = f"com.{v.lower()}.{n.lower()}{random.randint(1,99)}"
    
    app_obj = {
        "id": pkg,
        "name": name,
        "category": cat["name"],
        "iconUrl": "", # Will use font-awesome fallback
        "faIcon": cat["icon"],
        "iconColor": cat["color"],
        "iconBg": cat["bg"]
    }
    
    generated_apps.append(app_obj)
    count += 1

import urllib.parse

all_apps = exact_apps + generated_apps

for app in all_apps:
    if not app.get("iconUrl"):
        # generate a placeholder logo with the app's initials
        app["iconUrl"] = f"https://ui-avatars.com/api/?name={urllib.parse.quote(app['name'])}&background=random&color=fff&size=128&rounded=true"

with open('mock_apps.json', 'w', encoding='utf-8') as f:
    json.dump(all_apps, f, indent=4)
    
print(f'Generated {len(all_apps)} apps to mock_apps.json')
