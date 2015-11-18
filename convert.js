var fs = require('fs');

var file = fs.readFileSync('sindex.html',"utf8");
var result = [];
var flip = false;
file.split("```xml").forEach(function(each){
  if(flip) {
    var temp = each.split('```');
    temp[0] = temp[0].replace(/</g,"%lt");
    temp[0] = temp[0].replace(/>/g,"%gt");
    result.push(temp.join('```'));
    flip = false;
  } else {
    result.push(each);
    flip = true;
  }
});

fs.writeFileSync('index.html',result.join("```xml"));

