#! /bin/bash

rm ../static/* -R
cd ../frontend
npm run build --scripts-prepend-node-path=auto;
cd ./build
cp * ../../static/ -R
