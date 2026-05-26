import logging
import sys

# Configure logging
logger = logging.getLogger("apk_analyzer")
logger.setLevel(logging.INFO)

# Create console handler with formatting
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

# Add handler to logger
if not logger.handlers:
    logger.addHandler(handler)
