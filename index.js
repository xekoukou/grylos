function assert(var1, var2, msg) {
  if(var1 != var2) {
    throw new Error(msg);
  }
}
var fs = require(&apos;fs&apos;);
var execSync = require(&apos;child_process&apos;).execSync;
//.dots(-1)(&quot;./temp/generate_graph_xml_from_mr_file/load_mr_file.js&quot;)
//./dots(1)
function load_mr_file(file_path) {
  var lines;
////
  var file = fs.readFileSync(file_path,&quot;utf8&quot;);
  lines = file.split(&quot;\n&quot;);
////
  return lines;  
}
//.dots(-1)
