//cheerio fs path
//
var fs = require("fs");
var path = require("path");
var cheerio = require('cheerio');



module.exports = {
    //initial level=0, iter[0]=new object
    create_ioputs: function(cpath) {

        function create_ioputs(cpath, f$) {
            //TODO has errors plus it doesnt find the internal inputs outputs so as to remove them
            console.log("Create_ioputs:");
            console.log(cpath);
            var files = fs.readdirSync(cpath);
            files.forEach(function(file_name, index, files) {
                var stat = fs.statSync(cpath + "/" + file_name);

                if (stat.isDirectory()) {

                    var fxml_file = fs.readFileSync(cpath + "/" + file_name + ".xml", {
                        encoding: "utf-8"
                    });

                    var f$ = cheerio.load(fxml_file, {
                        xmlMode: true
                    });

                    create_ioputs(cpath + "/" + file_name, f$);
                    fs.writeFileSync(cpath + "/" + file_name + ".xml", f$.html());

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
                            var outerHTML = $("<div/>").append($(this).clone()).html();
                            var name = $(this).attr("name").replace(/\n+/g, '').replace(/\s+/g, '');
                            if (f$("graph node[fn_name='" + fn_name + "']").length == 0) {
                                f$("graph").append("<node fn_name='" + fn_name + "'></node>");
                            }
                            console.log("Name:" + name);

                            f$("graph node[fn_name='" + fn_name + "']").append("<input name='" + name + "'></input>");
                            if (f$("graph node[fn_name='" + fn_name + "'] output[name='" + name + "']").length == 0) {
                                console.log($(this).html());
                                if (f$("inputs input[name='" + name + "']").length == 0) {
                                    f$("inputs").append(outerHTML);
                                }

                            }

                        });

                        $("outputs output").each(function(each) {

                            var outerHTML = $("<div/>").append($(this).clone()).html();
                            var name = $(this).attr("name").replace(/\n+/g, '').replace(/\s+/g, '');
                            console.log("Name:" + name);

                            if (f$("graph node[fn_name='" + fn_name + "'] output[name='" + name + "']").length == 0) {
                                console.log($(this).html());
                                f$("graph node[fn_name='" + fn_name + "']").append("<output name='" + name + "'></output>");
                                if (f$("outputs output name:contains(" + name + ")").length == 0) {
                                    f$("outputs").append(outerHTML);
                                }

                            }

                        });






                    }
                }
            });



        }


        var fxml_file = fs.readFileSync(cpath + ".xml", {
            encoding: "utf-8"
        });

        var f$ = cheerio.load(fxml_file, {
            xmlMode: true
        });

        create_ioputs(cpath, f$);
        fs.writeFileSync(cpath + ".xml", f$.html());


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
