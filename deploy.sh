# Build files
# npm run build

# Upload files
scp build.zip droppy:/var/www/adm_steel

# Compile
ssh droppy "cd /var/www/adm_steel && rm -rf public && unzip build.zip && mv build public"