function remove_generated_XML(cpath) {

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


                        remove_generated_XML(cpath + "/" + file_name);
                    }

                }

            }

        );



    }

remove_generated_XML(source_path);
