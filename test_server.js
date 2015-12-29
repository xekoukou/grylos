var execSync = require("child_process").execSync;

function test() {
  console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
  execSync("node convert.js");
  var code = execSync("litprog -html index.html 'javascript.*'").toString('utf8')
      .replace(/process.exit\((.*)\)/g,'return "error " + "$1"').replace(/^\s*error\(/mg,"//");
  eval(code);

  var xml = execSync("litprog -html -ar index.html xml").toString('utf8').split('\n%%%%\n');
  xml.forEach(function(each){
    each = each.replace(/%lt/g,"<");
    each = each.replace(/%gt/g,">");
    execSync('xmllint --format --noout -',{'input':each});
  });
}


test();
