function validateXML(cpath){
var files = fs.readdirSync(cpath);
files.forEach(function(file, index, files) {
    var stat = fs.statSync(cpath + "/" + file);

    if (stat.isFile()) {
        if (path.extname(file) == ".xml") {

               var result = exec.exec("xmllint --format --noout " + cpath + "/" + file +" 1>&2");

                    if (result.stdout !== "") {
                            console.log("XML Error:\n"+ result.stdout);
                        process.exit(-1);
                    }

            }

    } else {
        if (stat.isDirectory()) {

            validateXML(cpath + "/" + file);
        }

    }

});

}

validate_XML(source_path);
