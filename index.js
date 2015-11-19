function assert(var1, var2, msg) {
  if(var1 != var2) {
    throw new Error(msg);
  }
}
var fs = require('fs');
var execSync = require('child_process').execSync;
//.dots(-1)("./temp/generate_graph_xml_from_mr_file/load_mr_file.js")
//./dots(1)
function load_mr_file(file_path) {
  var lines;
////
  var file = fs.readFileSync(file_path,"utf8");
  lines = file.split("\n");
////
  return lines;  
}
//.dots(-1)
