var fs = require("fs");
var path = require("path");
var cheerio = require('cheerio');

module.exports =

function Node(file_path, fext) {
    var self = this;
    this.type;
    this.inputs = new Object();
    this.outputs = new Object();
    this.children = new Object();

    var xml_file = fs.readFileSync(file_path, {
        encoding: "utf-8"
    });

    var $ = cheerio.load(xml_file, {
        xmlMode: true
    });

    //depending whether there is a folder with the same name , define its type 
    //and find its children if it has
    //
    var cpath = file_path.substring(0, file_path.length - 4);
    try {
        var stat = fs.statSync(cpath);
        if (stat.isDirectory()) {
            this.type = "subgraph";
            console.log("subgraph:" + cpath);

            var files = fs.readdirSync(cpath);
            files.forEach(function(file_name, index, files) {
                var stat = fs.statSync(cpath + "/" + file_name);

                if (stat.isFile()) {
                    if (path.extname(file_name) == ".xml") {

                        self.children[file_name] = new Node(cpath + "/" + file_name, fext);
                    }
                }
            });



        } else {
            this.type = "node";
            console.log("node:" + cpath);
            console.log("Not a folder");
        }
    } catch (e) {
        console.log("error:" + e.toString());
        console.log("node:" + cpath);
        console.log("The folder does not exist");
        this.type = "node";

    }

    if (this.type == "node") {
        console.log(this.type);
        try {
            this.code = fs.readFileSync(cpath + fext, {
                encoding: "utf-8"
            });
        } catch (e) {
            console.log("error:" + cpath + fext);
            console.log("There is no code for this node nor is it a subgraph");
            process.exit(-1);
        }
    } else {

        //TODO analyze the graph

    }









}
