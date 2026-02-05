import re

def validate_node_id(node_id):
    """
    Validate Node ID format.
    Must be exactly 64 hexadecimal characters.
    """
    if not node_id or not isinstance(node_id, str):
        return False
    
    # check length and hex pattern
    pattern = r'^[a-fA-F0-9]{64}$'
    return bool(re.match(pattern, node_id))

def validate_message(message):
    """
    Basic message validation.
    Must be non-empty string.
    """
    if not message or not isinstance(message, str):
        return False
    
    # strip whitespace and check if anything left
    return len(message.strip()) > 0

