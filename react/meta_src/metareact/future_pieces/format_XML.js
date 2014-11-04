function format_XML(source_path){

var files = fs.readdirSync(source_path);
files.forEach(function(file, index, files) {
    var stat = fs.statSync(source_path + "/" + file);

    if (stat.isFile()) {
        if (path.extname(file) == ".xml") {

              exec.run("xmllint --format " + source_path + "/" + file + " --output " + source_path + "/" + file);
        }

    } else {
        if (stat.isDirectory()) {

           format_XML(source_path + "/" + file);
        }

    }

});

}
