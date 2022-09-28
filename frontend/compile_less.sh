#!/bin/bash

for file in ./src/assets/less/*.less;
do
if [[ -f $file ]]; then
    filename=$(basename "$file")
    lessc --js $file ./src/assets/css/${filename%.*}.css
fi
done
