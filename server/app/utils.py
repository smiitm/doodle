import secrets
import string

def generate_joincode():
    # generate a 6 digit random alphanumeric code
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(6))
