#!/bin/sh
dbpath=$(date +"%y%m%d%H%M%S")

mongodump --host 127.0.0.1:27017 --out ../DBBackup/${dbpath}
zip -r ../DBBackup/${dbpath}.zip ../DBBackup/${dbpath}
rm -rf ../DBBackup/${dbpath}
