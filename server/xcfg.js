#!/usr/bin/env node

var result = {}

for(x in process.env) { 
  var value = process.env[x]; 
  
  if (x.startsWith("XCFG_")) {
	result[x.substring("XCFG_".length)] = value
  }
}

console.log(JSON.stringify(result));
