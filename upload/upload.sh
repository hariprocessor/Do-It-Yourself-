# /bin/bash
touch hi
scp -i ~/.ssh/diy_key -r $1 hari@192.168.122.90:/home/hari/module/$2/
