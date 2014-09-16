//cheerio fs path
//
var fs = require("fs");
var path = require("path");
var cheerio = require('cheerio');



module.exports = {
    create_ioputs: function(cpath) {

        function generate_xml_content_from_children(cpath, parent) {
            var files = fs.readdirSync(cpath);
            files.forEach(function(file_name, index, files) {
                var stat = fs.statSync(cpath + "/" + file_name);

                if (stat.isDirectory()) {

                    var fxml_file = fs.readFileSync(cpath + "/" + file_name + ".xml", {
                        encoding: "utf-8"
                    });

                    var parent = cheerio.load(fxml_file, {
                        xmlMode: true
                    });

                    generate_xml_content_from_children(cpath + "/" + file_name, parent);
                    fs.writeFileSync(cpath + "/" + file_name + ".xml", parent.html());

                }
            });

            files = fs.readdirSync(cpath);
            files.forEach(function(file_name, index, files) {
                var stat = fs.statSync(cpath + "/" + file_name);

                if (stat.isFile()) {

                    if (path.extname(file_name) == ".xml") {


                        var xml_file = fs.readFileSync(cpath + "/" + file_name, {
                            encoding: "utf-8"
                        });

                        var $ = cheerio.load(xml_file, {
                            xmlMode: true
                        });


                        var fn_name = file_name.substring(0, file_name.length - 4);
                        $("inputs input").each(function(each) {
                            //To address namespace colisions,we set the origin of the input.
                            var origin = $(this).attr("origin");
                            if (origin) {
                                origin = fn_name;
                                $(this).attr("origin", origin);
                            } else {
                                origin = fn_name + "/" + origin;
                                $(this).attr("origin", origin);
                            }
                            var outerHTML = $("<div/>").append($(this).clone()).html();
                            var name = $(this).attr("name");
                            //Add node in case this xml is not in the mr file, meaning it only depends on external ioput.
                            if (parent("graph node[fn_name='" + fn_name + "']").length == 0) {
                                parent("graph").append("<node fn_name='" + fn_name + "'></node>");
                            }
                            //Add the input in the graph.
                            parent("graph node[fn_name='" + fn_name + "']").append("<input name='" + name + "'></input>");

                            //Only add it to inputs if it is an external input requirement.
                            if (parent("graph node output[name='" + name + "']").length == 0) {
                                //We reject input with the same (name , origin)        
                                if (parent("inputs input[name='" + name + "'][origin='" + origin + "']").length == 0) {
                                    parent("inputs").append(outerHTML);
                                }





                            }

                        });

                        $("outputs output").each(function(each) {

                            var origin = $(this).attr("origin");
                            if (origin) {
                                origin = fn_name;
                                $(this).attr("origin", origin);
                            } else {
                                origin = fn_name + "/" + origin;
                                $(this).attr("origin", origin);
                            }

                            var outerHTML = $("<div/>").append($(this).clone()).html();
                            var name = $(this).attr("name");
                            //Add node in case this xml is not in the mr file, meaning it only depends on external ioput.
                            if (parent("graph node[fn_name='" + fn_name + "']").length == 0) {
                                parent("graph").append("<node fn_name='" + fn_name + "'></node>");
                            }
                            //We add the output to the graph only once.
                            if (parent("graph node output[name='" + name + "']").length == 0) {
                                parent("graph node[fn_name='" + fn_name + "']").append("<output name='" + name + "'></output>");
                                //We add the output to the outputs only once only if it is an external output.
                                if (parent("outputs output name[" + name + "]").length == 0) {
                                    parent("outputs").append(outerHTML);
                                }

                            }

                        });






                    }
                }
            });



        }


        var xml_file = fs.readFileSync(cpath + ".xml", {
            encoding: "utf-8"
        });

        var $ = cheerio.load(fxml_file, {
            xmlMode: true
        });

        generate_xml_content_from_children(cpath, $);
        fs.writeFileSync(source_path + ".xml", $.html());


    },

    clean_generated: function clean_generated(cpath) {

        var files = fs.readdirSync(cpath);
        files.forEach(function(file_name, index, files) {
                var stat = fs.statSync(cpath + "/" + file_name);

                if (stat.isFile()) {
                    if (path.extname(file_name) == ".xml") {
                        var xml_file = fs.readFileSync(cpath + "/" + file_name, {
                            encoding: "utf-8"
                        });

                        var $ = cheerio.load(xml_file, {
                            xmlMode: true
                        });
                        $("*").each(function() {

                            if ($(this).attr("generated") === "true") {
                                $(this).remove();
                            }
                        });

                        fs.writeFileSync(cpath + "/" + file_name, $.html());


                    }

                } else {
                    if (stat.isDirectory()) {


                        clean_generated(cpath + "/" + file_name);
                    }

                }

            }

        );



    },
    create_ioputs_tags: function create_ioputs_tags(cpath) {

        var files = fs.readdirSync(cpath);
        files.forEach(function(file_name, index, files) {
                var stat = fs.statSync(cpath + "/" + file_name);

                if (stat.isFile()) {
                    if (path.extname(file_name) == ".xml") {
                        var xml_file = fs.readFileSync(cpath + "/" + file_name, {
                            encoding: "utf-8"
                        });

                        var $ = cheerio.load(xml_file, {
                            xmlMode: true
                        });
                        if ($("inputs").length == 0) {
                            $("root").append("<inputs generated='true'></inputs>");
                            $("root").append("<outputs generated='true'></outputs>");
                        }

                        fs.writeFileSync(cpath + "/" + file_name, $.html());


                    }

                } else {
                    if (stat.isDirectory()) {


                        create_ioputs_tags(cpath + "/" + file_name);
                    }

                }

            }

        );



    },

    clean_generated_src: function clean_generated_src(cpath) {

        var files = fs.readdirSync(cpath);
        files.forEach(function(file_name, index, files) {
                var stat = fs.statSync(cpath + "/" + file_name);

                if (stat.isFile()) {
                    if (path.extname(file_name) == ".js") {
                        var file = fs.readFileSync(cpath + "/" + file_name, {
                            encoding: "utf-8"
                        });

                        if (file.substring(2, 12) == "$GENERATED") {
                            fs.unlinkSync(cpath + "/" + file_name);
                        }

                    }

                } else {
                    if (stat.isDirectory()) {


                        clean_generated_src(cpath + "/" + file_name);
                    }

                }

            }

        );



    }







}
