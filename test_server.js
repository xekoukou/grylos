var execSync = require("child_process").execSync;

function test() {
  console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
  execSync("node convert.js");
  execSync("litprog -html index.html javascript > index.js");
  execSync("node index.js");

  var xml = execSync("litprog -html -ar index.html xml").toString('utf8').split('\n%%%%\n');
  xml.forEach(function(each){
    each = each.replace(/%lt/g,"<");
    each = each.replace(/%gt/g,">");
    execSync('xmllint --format --noout -',{'input':each});
  });
}


setInterval(function(){
  test();
},1000);
