var fs = require("fs");
var path = require("path");
var cheerio = require('cheerio');
var reactjs = require("./react.js");


module.exports = function react_iterative(cpath) {

    var files = fs.readdirSync(cpath);
    files.forEach(function(file_name, index, files) {
        var stat = fs.statSync(cpath + "/" + file_name);

        if (stat.isFile()) {
            if (path.extname(file_name) == ".mr") {
                console.log(cpath + "/" + file_name);
                var graph = reactjs(cpath + "/" + file_name);
                var xml_file_name = file_name.substring(0, file_name.length - 3) + ".xml";
                console.log(xml_file_name);
                var xml_file = fs.readFileSync(cpath + "/" + xml_file_name, {
                    encoding: "utf-8"
                });

                if (xml_file) {

                    var $ = cheerio.load(xml_file, {
                        xmlMode: true
                    });
                    //we need to clear all generated content first               
                    if ($("graph").length == 0) {
                        $("root").append("<graph generated='true'> </graph>");
                        Object.keys(graph).forEach(function(fn_name) {
                            var node = graph[fn_name];
                            $("graph").append("<node fn_name='" + fn_name + "'>" + "</node>");

                            node.forEach(function(path) {
                                if ($("graph node[fn_name='" + fn_name + "'] output[name='" + path.vname + "']").length == 0) {
                                    $("graph node[fn_name='" + fn_name + "']").append("<output name='" + path.vname + "'> </ouptut>");

                                }
                                $("graph node[fn_name='" + fn_name + "'] output[name='" + path.vname + "']").append("<end_point fn_name='" + path.end_fn_name + "' " + ((path.historical) ? "historical='" + path.historical + "' " : "") + ((path.passive) ? "passive='" + path.passive + "' " : "") + ((path.asynchronous) ? "asynchronous='" + path.asynchronous + "' " : "") + "></end_point>");


                            });
                        });


                    }

                    fs.writeFileSync(cpath + "/" + xml_file_name, $.html());
                }


            }

        } else {

            if (stat.isDirectory()) {
                react_iterative(cpath + "/" + file_name);

            }

        }




    });
}
