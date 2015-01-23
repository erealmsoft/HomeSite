#!/bin/sh
if [ ${1} = "" ] || [ ! -e "./build/${1}.zip" ]; then
echo "bad command"
exit
fi

dbpath=$(date +"%y%m%d%H%M%S")

mongodump --host 127.0.0.1:27017 --out ../DBBackup/${dbpath}
zip -r ../DBBackup/${dbpath}.zip ../DBBackup/${dbpath}
rm -rf ../DBBackup/${dbpath}

unzip ./build/${1}.zip  -d ./build
mongo e-homesite --eval "db.dropDatabase()"
mongorestore --host 127.0.0.1  --port 27017 ./build/${1}
rm -rf ./build/${1}
