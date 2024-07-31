import requests
import shutil
# Nome del cimitero
nomecimitero = "cimitero1.zip"
# Download file from url
url = 'http://backend.memoryp.org:3001/cimitero/get/'+nomecimitero
r = requests.get(url, allow_redirects=True)
open(nomecimitero, 'wb').write(r.content)
# Unzipping file
shutil.unpack_archive(nomecimitero, "./")