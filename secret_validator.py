import re
import requests
from utils.logger import logger

# Regex patterns for common API keys/secrets
PATTERNS = {
    "Google API Key": r"AIza[0-9A-Za-z-_]{35}",
    "Firebase DB URL": r"https://[a-zA-Z0-9-]+\.firebaseio\.com",
    "AWS Access Key": r"AKIA[0-9A-Z]{16}",
    "Stripe Secret Key": r"sk_live_[0-9a-zA-Z]{24}",
    "Stripe Publishable Key": r"pk_live_[0-9a-zA-Z]{24}",
    "Twilio Account SID": r"AC[a-zA-Z0-9_\-]{32}",
    "Generic URL": r"(https?://[^\s]+)"
}

def identify_secrets(strings_list):
    """
    Given a list of strings, identifies potential secrets based on regex patterns.
    Returns a dictionary of found secrets.
    """
    found_secrets = []
    
    for s in strings_list:
        if not s or not isinstance(s, str):
            continue
            
        matched = False
        for secret_type, pattern in PATTERNS.items():
            if secret_type == "Generic URL":
                continue # We'll handle generic URLs separately if we want, but prioritize specific keys
                
            match = re.search(pattern, s)
            if match:
                key_val = match.group(0)
                # Avoid duplicates
                if not any(f["value"] == key_val for f in found_secrets):
                    found_secrets.append({
                        "type": secret_type,
                        "value": key_val,
                        "status": "UNTESTED"
                    })
                matched = True
        
        # If it wasn't a specific key but it's a URL (often found in hardcoded secrets)
        if not matched:
            match = re.search(PATTERNS["Generic URL"], s)
            if match:
                url_val = match.group(0)
                if not any(f["value"] == url_val for f in found_secrets):
                    found_secrets.append({
                        "type": "URL",
                        "value": url_val,
                        "status": "UNTESTED"
                    })
                    
    return found_secrets

def validate_secret(secret_obj):
    """
    Takes a secret object and attempts to validate if it is active.
    Updates the 'status', 'risk', and 'details' fields.
    """
    s_type = secret_obj["type"]
    val = secret_obj["value"]
    
    secret_obj["status"] = "UNKNOWN"
    secret_obj["risk"] = "LOW"
    secret_obj["details"] = "Could not verify"
    
    try:
        if s_type == "Google API Key":
            # Test against Google Maps Geocoding API as a proxy for key validity
            url = f"https://maps.googleapis.com/maps/api/geocode/json?address=New+York&key={val}"
            r = requests.get(url, timeout=5)
            data = r.json()
            if data.get("status") == "REQUEST_DENIED":
                if "API keys with referer restrictions cannot be used" in data.get("error_message", ""):
                    secret_obj["status"] = "ACTIVE"
                    secret_obj["risk"] = "MEDIUM"
                    secret_obj["details"] = "Key is valid but protected by referer restrictions."
                else:
                    secret_obj["status"] = "INVALID"
                    secret_obj["risk"] = "INFO"
                    secret_obj["details"] = data.get("error_message", "Key rejected by Google.")
            elif data.get("status") in ["OK", "ZERO_RESULTS"]:
                secret_obj["status"] = "ACTIVE"
                secret_obj["risk"] = "HIGH"
                secret_obj["details"] = "Key is VALID and has UNRESTRICTED access to Maps API!"
            else:
                secret_obj["status"] = "INVALID"
                secret_obj["details"] = "Key did not work."
                
        elif s_type == "Firebase DB URL":
            # Test if database is openly readable
            url = f"{val}/.json"
            r = requests.get(url, timeout=5)
            if r.status_code == 200:
                secret_obj["status"] = "ACTIVE"
                secret_obj["risk"] = "CRITICAL"
                secret_obj["details"] = "Firebase DB is OPEN to unauthenticated public READS!"
            elif r.status_code == 401 or r.status_code == 403:
                secret_obj["status"] = "SECURE"
                secret_obj["risk"] = "LOW"
                secret_obj["details"] = "Firebase DB exists but is protected against public reads."
            else:
                secret_obj["status"] = "INVALID"
                secret_obj["details"] = "URL not reachable or valid."
                
        elif s_type == "Stripe Publishable Key":
            # Just structure
            secret_obj["status"] = "INFO"
            secret_obj["risk"] = "LOW"
            secret_obj["details"] = "Publishable keys are meant to be public, but should be monitored."
            
        elif s_type == "Stripe Secret Key":
            secret_obj["status"] = "ACTIVE (UNTESTED)"
            secret_obj["risk"] = "CRITICAL"
            secret_obj["details"] = "Stripe Secret Key found! Did not test to avoid triggering fraud alerts, but this is extremely dangerous."
            
        elif s_type == "AWS Access Key":
            secret_obj["status"] = "ACTIVE (UNTESTED)"
            secret_obj["risk"] = "CRITICAL"
            secret_obj["details"] = "AWS Access Key found! Did not test to avoid triggering alerts, but must be revoked immediately."
            
        elif s_type == "URL":
            # Just do a quick HEAD request to see if it's alive
            try:
                r = requests.head(val, timeout=3, allow_redirects=True)
                if r.status_code < 400:
                    secret_obj["status"] = "ACTIVE"
                    secret_obj["risk"] = "INFO"
                    secret_obj["details"] = f"Endpoint is alive (HTTP {r.status_code})."
                else:
                    secret_obj["status"] = "INVALID"
                    secret_obj["risk"] = "INFO"
                    secret_obj["details"] = f"Endpoint returned HTTP {r.status_code}."
            except Exception:
                secret_obj["status"] = "DEAD"
                secret_obj["details"] = "Endpoint unreachable."
                
    except Exception as e:
        logger.error(f"Error validating secret {val}: {e}")
        secret_obj["status"] = "ERROR"
        secret_obj["details"] = str(e)
        
    return secret_obj

def run_live_validation(strings_list):
    """
    Main entrypoint: takes raw strings, extracts structured secrets, and tests them.
    """
    secrets = identify_secrets(strings_list)
    results = []
    
    # We cap at 20 secrets to avoid spamming networks
    for s in secrets[:20]:
        results.append(validate_secret(s))
        
    return results
