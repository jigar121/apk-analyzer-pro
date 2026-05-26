import urllib.request
import zipfile
import os

def install_java():
    tools_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tools")
    target_dir = os.path.join(tools_dir, "jdk-17.0.2")
    if os.path.exists(target_dir):
        print("Java is already installed.")
        return

    print("Downloading JRE...")
    url = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.11%2B9/OpenJDK17U-jre_x64_windows_hotspot_17.0.11_9.zip"
    zip_path = "jre.zip"
    tools_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tools")
    os.makedirs(tools_dir, exist_ok=True)
    
    zip_full_path = os.path.join(tools_dir, zip_path)
    urllib.request.urlretrieve(url, zip_full_path)
    
    print("Extracting JRE...")
    target_dir = os.path.join(tools_dir, "jdk-17.0.2") # using this name as compiler_api.py expects it
    
    with zipfile.ZipFile(zip_full_path, 'r') as zip_ref:
        zip_ref.extractall(tools_dir)
        
    print("Renaming extracted folder...")
    # Find the extracted folder (it will be jdk-17.0.11+9-jre)
    for folder in os.listdir(tools_dir):
        if folder.startswith("jdk-17") and folder != "jdk-17.0.2":
            extracted_path = os.path.join(tools_dir, folder)
            if os.path.exists(target_dir):
                import shutil
                shutil.rmtree(target_dir, ignore_errors=True)
            os.rename(extracted_path, target_dir)
            break

    os.remove(zip_full_path)
    print("JRE Setup completed successfully! JDK path: " + target_dir)

if __name__ == "__main__":
    install_java()
