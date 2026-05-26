import os
import urllib.request
import zipfile

def setup():
    print("Setting up tools...")
    tools_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tools")
    os.makedirs(tools_dir, exist_ok=True)
    
    jadx_dir = os.path.join(tools_dir, "jadx")
    if not os.path.exists(os.path.join(jadx_dir, "bin", "jadx.bat")):
        print("Downloading JADX...")
        url = "https://github.com/skylot/jadx/releases/download/v1.4.7/jadx-1.4.7.zip"
        zip_path = os.path.join(tools_dir, "jadx.zip")
        urllib.request.urlretrieve(url, zip_path)
        
        print("Extracting JADX...")
        os.makedirs(jadx_dir, exist_ok=True)
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(jadx_dir)
            
        print("Cleaning up...")
        os.remove(zip_path)
    else:
        print("JADX already installed.")
        
    try:
        from setup_java import install_java
        install_java()
    except Exception as e:
        print(f"Failed to setup Java: {e}")
        
    print("Setup tools succeeded!")

if __name__ == "__main__":
    setup()
