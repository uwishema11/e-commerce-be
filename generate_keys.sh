# 1. Generate private key
openssl genpkey -algorithm RSA -out private_key.pem

# 2. Extract public key from private key
openssl rsa -pubout -in private_key.pem -out public_key.pem