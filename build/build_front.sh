
rm ../static/* -R
cd ../frontend
npm run less 
npm run build --scripts-prepend-node-path=auto;
cd ./build
cp * ../../static/
cd ./static
cp -R ./* ../../../static/ 
