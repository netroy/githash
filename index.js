'use strict';

var path = require('path');
var fs = require('fs');

var refRegexp = /^ref: (.+)/;
var utf8Options = { 'encoding': 'utf8' };

// lookup the hash by looping through git refs
function gitHash () {
  var ref = 'ref: HEAD', file;
  while (ref && refRegexp.test(ref)) {
    ref = ref.match(refRegexp);
    if (ref[1]) {
      file = path.resolve('.git', ref[1]);
      ref = fs.readFileSync(file, utf8Options);
    }
  }
  return ref && ref.split('\n')[0].trim();
}

module.exports = gitHash;
