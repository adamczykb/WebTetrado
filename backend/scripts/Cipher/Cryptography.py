import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.backends import default_backend
from django.conf import settings

class HashId:
    kdf:PBKDF2HMAC
    def __init__(self):
        self.kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=settings.SALT,
        iterations=390000,
        backend=default_backend()
    )
    def encrypt(self,txt):
        # try:
            txt = str(txt)
            key = base64.urlsafe_b64encode(self.kdf.derive(settings.ENCRYPT_KEY))
            f = Fernet(key)
            encrypted_text = f.encrypt(txt.encode('ascii'))
            encrypted_text = base64.urlsafe_b64encode(encrypted_text).decode("ascii") 
            return encrypted_text
        # except Exception as e:
        #     # log the error if any
        #     return None


    def decrypt(self,txt):
        # try:
            txt = base64.urlsafe_b64decode(txt)
            key = base64.urlsafe_b64encode(self.kdf.derive(settings.ENCRYPT_KEY))
            f = Fernet(key)
            decoded_text = f.decrypt(txt).decode("ascii")     
            return decoded_text
        # except Exception as e:
        #     return None
