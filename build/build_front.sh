#! /bin/bash

rm ../static/* -Rf;
cd ../frontend;
npm run build --scripts-prepend-node-path=auto;
cd ./dist;
rm *.map;
cp * ../../static/ -Rf;

