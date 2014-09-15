function delete_generated_src(cpath) {

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


                        delete_generated_src(cpath + "/" + file_name);
                    }

                }

            }

        );



    }


delete_generated_src(source_path);

