#!/bin/node
const fs = require('fs');
const R = require('ramda');
//Obtain the environment string passed to the node script
const environment = process.argv[2];
//read the content of the json file
const commonFileContent = require(`../env/common.json`);
const envFileContent = require(`../env/${environment}.json`);
const finalFileContent = R.mergeDeepRight(commonFileContent, envFileContent);
//copy the json inside the env.json file
fs.writeFileSync(
  'src/env.json',
  JSON.stringify(finalFileContent, undefined, 2),
);
