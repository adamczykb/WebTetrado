rm ../static/js/* -R
rm ../static/css/* -R
cd ../frontend
npm run less 
npm run build --scripts-prepend-node-path=auto;
cd ./build
cp manifest.json ../../static
cp asset-manifest.json ../../static
cd ./static
cp media/ ../../../static -r;
cp css/ ../../../static -r;
cp js/ ../../../static -r;
