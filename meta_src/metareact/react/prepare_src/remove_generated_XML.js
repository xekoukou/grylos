    function remove_generated_XML(cpath) {


        function remove_generated_XML_rec(cpath) {
            //Check if it is a file or a directory.
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
                                //Remove all tags that have the generated tag set to true.
                                if ($(this).attr("generated") === "true") {
                                    $(this).remove();
                                }
                            });

                            fs.writeFileSync(cpath + "/" + file_name, $.html());


                        }

                    } else {
                        if (stat.isDirectory()) {


                            //Recursively operate on the subdirectories.
                            remove_generated_XML_rec(cpath + "/" + file_name);
                        }

                    }

                }

            );
        }
        remove_generated_XML_rec(cpath);

        //remove for the root xml file

        var xml_file = fs.readFileSync(cpath + ".xml", {
            encoding: "utf-8"
        });

        var $ = cheerio.load(xml_file, {
            xmlMode: true
        });
        $("*").each(function() {
            //Remove all tags that have the generated tag set to true.
            if ($(this).attr("generated") === "true") {
                $(this).remove();
            }
        });

        fs.writeFileSync(cpath + ".xml", $.html());


    }

    remove_generated_XML(source_path);

