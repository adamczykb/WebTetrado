
rm ../static/* -R
cd ../frontend
# npm run less 
# npm run lessc;
npm run build --scripts-prepend-node-path=auto;
cd ./build
cp * ../../static/ -R

