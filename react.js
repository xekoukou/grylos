//////////////////////////////////////////////////////////////
//main
var source_path;
var prog_lang;
var root_io;
var gen_all;
var single_threaded;
///////////////
source_path = null;
prog_lang = null;
root_io = false;
gen_all = false;
single_threaded = false;


var error = false;
var prev = null;
for (var i = 2; i < process.argv.length; i++) {
    var arg = process.argv[i];
    //We update the prev
    if (arg == "--lang") {
        if (!prev) {
            prev = "lang";
        } else {
            error = true;
        }
    } else {
        if (arg == "--root_io") {
            root_io = true;
        } else {
            if (arg == "--gen_all") {
                gen_all = true;
            } else {
                if (arg == "--single_threaded") {
                    single_threaded = true;
                } else {
                    //We assign the value
                    if (prev == null) {
                        if (!source_path) {
                            source_path = arg;
                        } else {
                            error = true;
                        }
                    } else {
                        if (prev == "lang") {
                            if (!prog_lang) {
                                prog_lang = arg;
                                prev = null;
                            } else {
                                error = true;
                            }
                        }
                    }
                }
            }
        }
    }

}

if ((!source_path) || (!prog_lang) || error) {
    console.log("Please provide the language and source directory of your project.");
    console.log("Example: --lang js ./meta_src/metareact/react");
    return -1;
}

/////////////////////////////////////////////////////////////
//module_dependencies
var fs;
var path;
var cheerio;
var exec;
/////////////

fs = require("fs");
path = require("path");
cheerio = require('cheerio');
exec = require('execSync');

///////////////////////////////////////////////////////////
//generate_function_src
////////////////

function generate_function_rec(cpath) {
    var functions = ["reusable", "dynamic", "single_use"];
    functions.forEach(function(folder) {
        try {
            var files = fs.readdirSync(cpath + "/" + folder);
            files.forEach(function(file, index, files) {
                var stat = fs.statSync(cpath + "/" + folder + "/" + file);
                if (stat.isDirectory()) {

                    try {
                        fs.readFileSync(cpath + "/" + folder + "/" + file + ".xml")
                        console.log("Compiling '" + file + "' function.");
                        console.log("Path: " + cpath + "/" + folder + "/" + file + "\n");
                        var result = exec.exec("node react.js --gen_all --root_io " + cpath + "/" + folder + "/" + file + " --lang " + prog_lang);

                        console.log(result.stdout);
                        if (result.code == 1) {
                            console.log(cpath + "/" + folder + "/" + file + ": Exiting..");
                            process.exit(1);
                        }

                        result = exec.exec("node react.js --gen_all --root_io --single_threaded " + cpath + "/" + folder + "/" + file + " --lang " + prog_lang);

                        console.log(result.stdout);
                        if (result.code == 1) {
                            console.log(cpath + "/" + folder + "/" + file + ": Exiting..");
                            process.exit(1);
                        }


                        console.log("End of Compilation");

                    } catch (e) {
                        //Do nothing. TODO Find a better solution.
                    }

                }
            });
        } catch (e) {
            return;
        }
    });


    var files = fs.readdirSync(cpath);
    files.forEach(function(file, index, files) {
        var stat = fs.statSync(cpath + "/" + file);
        if (stat.isDirectory()) {
            //Recursively operate on the subdirectories.
            generate_function_rec(cpath + "/" + file);
        }
    });




}

if (gen_all) {
    generate_function_rec(source_path);
}

///////////////////////////////////////////////////////////
//prepare_src

////////////////
{
    ///////////////////////////////////////////////////////////
    //remove_generated_XML

    //////////////////////
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


    /////////////////////////////////////////////////////////////
    //validate_XML
    /////////////
    function validateXML(cpath) {

        //Check if it is a file or a directory.
        var files = fs.readdirSync(cpath);
        files.forEach(function(file, index, files) {
            var stat = fs.statSync(cpath + "/" + file);

            if (stat.isFile()) {

                //If it is an xml file, validate it. 
                if (path.extname(file) == ".xml") {

                    var result = exec.exec("xmllint --format --noout " + cpath + "/" + file + " 1>&2");

                    if (result.stdout !== "") {
                        console.log("XML Error:\n" + result.stdout);
                        process.exit(1);
                    }

                }

            } else {
                if (stat.isDirectory()) {
                    //Recursively operate on the subdirectories.
                    validateXML(cpath + "/" + file);
                }

            }

        });




    }

    validateXML(source_path);

    //////////////////////////////////////////////////////////
    //delete_generated_src
    /////////////////////////

    function delete_generated_src(cpath) {

        //Check if it is a file or a directory.
        var files;
        try {
            files = fs.readdirSync(cpath);
        } catch (e) {
            return;
        }
        files.forEach(function(file_name, index, files) {
                var stat = fs.statSync(cpath + "/" + file_name);

                if (stat.isFile()) {
                    if (path.extname(file_name) == ".js") {
                        var file = fs.readFileSync(cpath + "/" + file_name, {
                            encoding: "utf-8"
                        });

                        //If the source file has generated at the start, it deletes it.
                        if (file.substring(2, 12) == "$GENERATED") {
                            fs.unlinkSync(cpath + "/" + file_name);
                        }

                    }

                } else {
                    if (stat.isDirectory()) {
                        if (file_name != 'single_threaded' && file_name != 'multi_threaded' && file_name != "reusable" && file_name != "dynamic" && file_name != "single_use") {
                            //Recursively operate on the subdirectories.
                            delete_generated_src(cpath + "/" + file_name);
                        }
                    }

                }

            }

        );



    }


    delete_generated_src(source_path);

    //Delete main file.
    try {
        var file = fs.readFileSync(source_path + ".js", {
            encoding: "utf-8"
        });

        //If the source file has generated at the start, it deletes it.
        if (file.substring(2, 12) == "$GENERATED") {
            fs.unlinkSync(source_path + ".js");
        }
    } catch (e) {}


    ////////////////////////////////////////////////////////////////////

}
//endof prepare_src
///////////////////////////////////////////////////////////////
//parse_mr_files

/////////////////////
{
    //////////////////////////////////////////////////////////////
    //find_mr_file_paths

    var mr_file_paths;
    var mr_files;
    ///////////////////
    function find_mr_paths(cpath) {
        var files = fs.readdirSync(cpath);
        files.forEach(function(file_name, index, files) {
            var stat = fs.statSync(cpath + "/" + file_name);

            if (stat.isFile()) {
                if (path.extname(file_name) == ".mr") {
                    mr_file_paths.push(cpath + '/' + file_name.substring(0, file_name.length - 3));
                    mr_files.push(fs.readFileSync(cpath + "/" + file_name));
                }
            } else {
                if (stat.isDirectory() && (file_name != 'reusable' && file_name != "dynamic" && file_name != "single_use")) {
                    find_mr_paths(cpath + "/" + file_name);

                }

            }
        });
    }
    mr_file_paths = [];
    mr_files = [];
    mr_file_paths.push(source_path);
    mr_files.push(fs.readFileSync(source_path + ".mr"));
    find_mr_paths(source_path);
    ////////////////////////////////////////////////////////////////
    //split_srcode_into_lines
    var srcodes;
    //////////////////////
    srcodes = [];

    mr_files.forEach(function(each) {
        srcodes.push(each.toString().split("\n"));
    });

    ////////////////////////////////////////////////////////////////
    //create_graphs
    //////////////
    {
        ////////////////////////////////////////////////////////////////
        //find_functions
        var function_names;
        ////////////////////////
        function_names = [];
        srcodes.forEach(function(code, index) {
            var functions = [];

            var y = 0;
            while (y < code.length) {
                var x = 0;
                var line = code[y];
                while (x < line.length) {
                    var xar = line.charAt(x);
                    //find all non whitespace strings
                    if (xar == " ") {
                        x++;
                        continue;
                    } else {
                        var string = line.substring(x).split(" ", 1)[0];
                        //check that they only have alphanumeric or _ characters
                        var alphanum = string.match(/^[a-z_:0-9]+$/i);
                        if (alphanum) {
                            var value = alphanum[0].split(":", 2);
                            var function_name = {
                                x: x,
                                y: y,
                                fn_name: value[0],
                                properties: {}
                            };
                            if (value.length > 1) {
                                for (var i = 0; i < value[1].length; i++) {
                                    var xar = value[1].charAt(i);
                                    if (xar == "c") {
                                        function_name.properties.concurrent = "true";
                                    } else {
                                        if (xar == "a") {
                                            function_name.properties.asynchronous = "true";
                                        } else {
                                            if (xar == "o") {
                                                function_name.properties.ordered = "true";
                                            } else {
                                                console.log("Error: There is no option '" + xar + "' for a function");
                                                console.log("File: " + mr_file_paths[index]);
                                                console.log("Function Name: " + value[0]);
                                                process.exit(1);
                                            }
                                        }
                                    }
                                }
                            }
                            //store them
                            functions.push(function_name);
                        }
                        x = x + string.length - 1;
                    }

                    x++;
                }
                y++;
            }
            //store the function names of this code with the rest of functions
            function_names.push(functions);
        });



        //TODO Find a better name for this. Find all the output origin positions
        ///////////////////////////////////////////////////////////////
        //find_end_points
        var end_points;
        ////////////////////
        end_points = [];

        function_names.forEach(function(functions, index) {
            var lend_points = {};
            var code = srcodes[index];
            functions.forEach(function(fn) {

                if (fn.y + 1 < code.length) {
                    var y = fn.y + 1;
                    var line = code[y];
                    var x = fn.x;
                    var once = 0;
                    while ((x < fn.x + fn.fn_name.length) && (x < line.length)) {
                        var xar = line.charAt(x);

                        if (xar == "|") {
                            if (!lend_points[y]) {
                                lend_points[y] = new Object();
                            }
                            lend_points[y][x] =
                                fn.fn_name;

                            y++;
                            if (y >= code.length) {
                                break;
                            }
                            line = code[y];
                            var once = 1;

                        } else {
                            if (once) {
                                break;
                            }
                            x++;
                        }
                    }

                }
            });


            end_points.push(lend_points);
        });

        /////////////////////////////////////////////////////////////////
        //path_traversal
        var gpaths;
        ///////////////////////////
        gpaths = [];

        end_points.forEach(function(lend_points, index) {
            var code = srcodes[index];
            var paths = [];
            Object.keys(lend_points).forEach(function(y_key) {
                Object.keys(lend_points[y_key]).forEach(function(x_key) {
                    var path = {
                        y: +y_key,
                        x: +x_key,
                        origin_fn_name: lend_points[y_key][x_key]
                    };
                    while (true) {
                        //Checking which way to go next.
                        //up
                        var up = 0;
                        var y = path.y - 1;
                        var x = path.x;
                        var line = code[y];
                        var xar;
                        if (x < line.length) {
                            xar = line.charAt(x);
                            if (xar == "/") {
                                up = 1;
                            }
                        }

                        //down
                        var down = 0;
                        y = path.y + 1;
                        x = path.x;
                        if (y < code.length) {
                            line = code[y];
                            if (x < line.length) {
                                xar = line.charAt(x);
                                if (xar == "\\") {
                                    down = 1;
                                }
                            }
                        }



                        var right = 0;
                        y = path.y;
                        x = path.x + 1;
                        line = code[y];
                        if (x < line.length) {
                            xar = line.charAt(x);
                            if ((xar != " ") && (xar != "\\") && (xar != "/")) {
                                right = 1;
                            }
                        }

                        //Making sure there are no paths without ending.
                        if (!(up || down || right)) {
                            line = code[path.y];
                            xar = line.charAt(path.x);
                            if (xar != "|") {
                                console.log("\nError: mr_file:" + mr_file_paths[index] + ".mr(line: " + path.y + "," + "position: " + path.x + ")");
                                console.log("A path with no end.");
                                format_XML(source_path);
                                process.exit(1);
                            } else {
                                return;
                            }
                        }
                        //Maling sure paths have only one possible direction to go.
                        if ((up && down) || (up && right) || (down && right)) {
                            console.log("\nError: mr_file:" + mr_file_paths[index] + ".mr(line: " + path.y + "," + "position: " + path.x + ")");
                            console.log("Multiple paths detected.");
                            format_XML(source_path);
                            process.exit(1);
                        }
                        //Moving forward.
                        if (up) {
                            path.y = path.y - 1;
                            path.x = path.x;
                        }

                        if (down) {
                            path.y = path.y + 1;
                            path.x = path.x;

                        }

                        if (right) {
                            path.y = path.y;
                            path.x = path.x + 1;


                            line = code[path.y];
                            xar = line.charAt(path.x);
                            //Checking if this is a value name declaration
                            if (xar == "(") {
                                var array = line.substring(path.x + 1).split(")");
                                if (array.length < 1) {

                                    console.log("\nError: mr_file:" + mr_file_paths[index] + ".mr(line: " + path.y + "," + "position: " + path.x + ")");
                                    console.log("There is a missing ')'.");
                                    format_XML(source_path);
                                    process.exit(1);
                                } else {
                                    path.vname = array[0];
                                    path.x = path.x + array[0].length + 2;
                                }


                            } else {
                                //Checking if this is the end of the path.
                                if (xar == "|") {

                                    path.end_fn_name = lend_points[path.y][path.x];
                                    break;

                                } else {
                                    //Checking for the existence of options or return an error if it doesn't match any of the possible options.
                                    if (xar != "-") {
                                        var options = line.substring(path.x).split("-")[0];
                                        path.x = path.x + options.length - 1;
                                        for (var i = 0; i < options.length; i++) {
                                            var each = options.charAt(i);
                                            //'e' is for endpoint
                                            if (each == "p") {
                                                path.passive = true;
                                            } else {

                                                if (each == "e") {
                                                    path.dynamic = true;
                                                } else {
                                                    if (each == "h") {
                                                        path.historical = true;
                                                    } else {
                                                        if (each == "m") {
                                                            path.mutable = true;

                                                        } else {
                                                            if (each == "d") {
                                                                path.dependency = true;
                                                            } else {
                                                                if (each == "l") {
                                                                    path.lossless = true;

                                                                } else {
                                                                    console.log("\nError: mr_file:" + mr_file_paths[index] + ".mr(line: " + path.y + "," + "position: " + path.x + ")");
                                                                    console.log("Wrong option type.");
                                                                    format_XML(source_path);
                                                                    process.exit(1);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }



                                    }
                                }


                            }
                        }

                    }
                    //Remove unnecessary properties and store path.
                    delete path.x;
                    delete path.y;
                    paths.push(path);
                });
            });


            gpaths.push(paths);
        });

        ///////////////////////////////////////////////////////////////////////////////////////
        //build graph
        var graphs;
        //////////////////
        graphs = [];

        //Generate all the nodes of the graphs and their properties.
        function_names.forEach(function(functions) {
            var graph = new Object();
            functions.forEach(function(fn) {
                //Add the properties if we had the same name twice or more
                if (typeof graph[fn.fn_name] != "undefined") {
                    for (var attrname in fn.properties) {
                        graph[fn.fn_name].properties[attrname] = fn.properties[attrname];
                    }
                } else {
                    graph[fn.fn_name] = {
                        "properties": fn.properties,
                        "paths": []
                    };
                }


            });
            graphs.push(graph);
        });

        gpaths.forEach(function(paths, index) {

            var graph = graphs[index];
            //check that all paths have value names and concatenate paths with same origin

            paths.forEach(function(each) {
                if (!each.vname) {
                    console.log("Error: " + mr_file_paths[index] + "\nPath<" + each.origin_fn_name + "," + each.end_fn_name + "> : There is a path with no value name ");
                    format_XML(source_path);
                    process.exit(1);
                }

                graph[each.origin_fn_name]["paths"].push(each);
                delete(each.origin_fn_name);

            });


        });


        //TODO remove         console.log(JSON.stringify(graphs, null, 4));

        //////////////////////////////////////////////////////////////////
    }
    //endof create_graphs
    ///////////////////////////////////////////////////////////////////
    //insert_missing_io_tags_from_graph

    ///////////////////////////
    graphs.forEach(function(graph, index) {
        Object.keys(graph).forEach(function(fn_name) {

            //Insert the output tag into the originator xml file and do nothing if there is already user content.
            var oxml_path = mr_file_paths[index] + "/" + fn_name + ".xml";
            try {
                var oxml_file = fs.readFileSync(oxml_path, {
                    encoding: "utf-8"
                });
            } catch (e) {
                console.log("\nError: xml file missing:" + oxml_path);
                format_XML(source_path);
                process.exit(1);
            }

            var o = cheerio.load(oxml_file, {
                xmlMode: true
            });
            //Insert an outputs tag if it is missing.
            if (o("outputs").length == 0) {
                o("root").append("<outputs/>");
            }
            graph[fn_name]["paths"].forEach(function(path) {
                //Add only one output per vname.
                if (o("outputs output[name='" + path.vname + "']").length == 0) {
                    o("outputs").append("<output generated='true' name='" + path.vname + "'/>");
                }

                //Insert the input tag into the terminator xml file and do nothing if there is already user content.
                var ixml_path = mr_file_paths[index] + "/" + path.end_fn_name + ".xml";
                try {
                    var ixml_file = fs.readFileSync(ixml_path, {
                        encoding: "utf-8"
                    });
                } catch (e) {
                    console.log("\nError: xml file missing:" + ixml_path);
                    format_XML(source_path);
                    process.exit(1);
                }

                var i = cheerio.load(ixml_file, {
                    xmlMode: true
                });
                //Insert an inputs tag if it is missing.
                if (i("inputs").length == 0) {
                    i("root").append("<inputs/>");
                }
                //Insert the input tag into the end_point xml file and do nothing if there is already user content.
                if (i("inputs input[name='" + path.vname + "']").length == 0) {
                    i("inputs").append("<input generated='true' name='" + path.vname + "'/>");
                }
                fs.writeFileSync(ixml_path, i.html());
            });
            fs.writeFileSync(oxml_path, o.html());



        });
    });


    ///////////////////////////////////////////////////////////////////
    //check_same_output_name    
    ////////////////////////

    graphs.forEach(function(graph, index) {
        var vnames = {};
        Object.keys(graph).forEach(function(fn_name) {
            var lvnames = {};
            graph[fn_name]["paths"].forEach(function(path) {
                lvnames[path.vname] = null;
            });
            Object.keys(lvnames).forEach(function(item) {
                if (vnames[item] == true) {
                    console.log("Error: " + mr_file_paths[index]);
                    console.log("function: " + fn_name + " output name: " + item);
                    console.log("Multiple outputs with the same name.");
                    process.exit(1);
                    //error
                } else {
                    vnames[item] = true;
                }

            });
        });
    });
    //////////////////////////////////////////////////////////////////
    //check_node_properties
    ///////////////////////
    graphs.forEach(function(graph, index) {
        Object.keys(graph).forEach(function(fn_name) {
            var node = graph[fn_name];
            //Concurrency cannot exist on an asynchronous node
            if (("asynchronous" in node.properties) && ("concurrent" in node.properties)) {
                console.log("Error: The asynchronous and concurrent property has been set in the same node");
                console.log("File:" + mr_file_paths[index] + ".mr");
                console.log("Fn_name:" + fn_name);
                process.exit(1);
            }

            //An asynchronous node can not have inputs
            if ("asynchronous" in node.properties) {
                //check if it has inputs
                //Generated from the graph
                Object.keys(graph).forEach(function(f_name) {
                    Object.keys(graph[f_name]["paths"]).forEach(function(path) {
                        if (path.end_fn_name == fn_name) {
                            console.log("Error: The asynchronous property has been set in a node that has inputs generated from the graph.");
                            console.log("File:" + mr_file_paths[index] + ".mr");
                            console.log("Fn_name:" + fn_name);
                            process.exit(1);

                        }
                    });
                });

                //From the xml file
                var xml_file = fs.readFileSync(mr_file_paths[index] + "/" + fn_name + ".xml", {
                    encoding: "utf-8"
                });

                var $ = cheerio.load(xml_file, {
                    xmlMode: true
                });

                if ($("inputs input").length > 0) {
                    console.log("Error: The asynchronous property has been set in a node that has inputs defined in the xml file.");
                    console.log("File:" + mr_file_paths[index] + ".mr");
                    console.log("Fn_name:" + fn_name);
                    process.exit(1);

                }


                //The asynchronous property cannot be set in a subgraph.
                if (fs.existsSync(mr_file_paths[index] + "/" + fn_name)) {
                    console.log("Error: The asynchronous property has been set in a 'subgraph' node");
                    console.log("File:" + mr_file_paths[index] + ".mr");
                    console.log("Fn_name:" + fn_name);
                    format_XML(source_path);
                    process.exit(1);

                }

            }



        });
    });

    //////////////////////////////////////////////////////////////////
    //insert_graph_content_to_xml_files

    /////////////////////
    graphs.forEach(function(graph, index) {
        var xml_path = mr_file_paths[index] + ".xml";
        try {
            var xml_file = fs.readFileSync(xml_path, {
                encoding: "utf-8"
            });
        } catch (e) {
            console.log("\nError: xml file missing:" + xml_path);
            format_XML(source_path);
            process.exit(1);
        }

        var $ = cheerio.load(xml_file, {
            xmlMode: true
        });
        //Appends the graph tag.
        $("root").append("<graph generated='true'> </graph>");
        Object.keys(graph).forEach(function(fn_name) {

            var paths = graph[fn_name]["paths"];
            //Adds the node.
            //Add the properties
            $("graph").append("<node fn_name='" + fn_name + "' " + ((graph[fn_name].properties.asynchronous) ? "asynchronous='" + graph[fn_name].properties.asynchronous + "'" : "") + " " + ((graph[fn_name].properties.concurrent) ? "concurrent='" + graph[fn_name].properties.concurrent + "' " : "") + ">" + "</node>");

            paths.forEach(function(path) {
                //Adds one output tag per vname.
                if ($("graph node[fn_name='" + fn_name + "'] output[name='" + path.vname + "']").length == 0) {
                    $("graph node[fn_name='" + fn_name + "']").append("<output name='" + path.vname + "'> </ouptut>");

                }
                //Adds multiple end_points per vname with their properties.
                $("graph node[fn_name='" + fn_name + "'] output[name='" + path.vname + "']").append("<end_point fn_name='" + path.end_fn_name + "' " + ((path.mutable) ? "mutable='" + path.mutable + "' " : "") + ((path.dependency) ? "dependency='" + path.dependency + "' " : "") + ((path.lossless) ? "lossless='" + path.lossless + "' " : "") + ((path.historical) ? "historical='" + path.historical + "' " : "") + ((path.dynamic) ? "dynamic='" + path.dynamic + "' " : "") + ((path.passive) ? "passive='" + path.passive + "' " : "") + "></end_point>");


            });






        });
        fs.writeFileSync(xml_path, $.html());
    });

    ///////////////////////////////////////////////////////////////////////
}
//endof parse_mr_files
//////////////////////////////////////////////////////////////////////
//generate_xml_content_from_children

/////////////////////////////

function generate_xml_content_from_children(cpath, parent) {
    var files = fs.readdirSync(cpath);
    files.forEach(function(file_name, index, files) {
        var stat = fs.statSync(cpath + "/" + file_name);
        //A deep first algorith.
        if (stat.isDirectory() && (file_name != 'single_threaded' && file_name != 'multi_threaded' && file_name != 'reusable' && file_name != "dynamic" && file_name != "single_use")) {

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
                    var name = $(this).attr("name");
                    var generated = $(this).attr("generated");

                    //We get all the attributes to check that the parent has the same attributes.
                    var side_effect = $(this).attr("side-effect");

                    var outerHTML;

                    //To address namespace colisions,we set the origin (location and internal name) of the input.
                    var origin_locations = [];
                    var origin_names = [];
                    if ((generated == "true") && ($("origin", this).length > 0)) {

                        var origin = $("origin", this).each(function() {
                            var origin_location = $(this).attr("origin_location");
                            origin_location = fn_name + "/" + origin_location;
                            $(this).attr("origin_location", origin_location);
                            var origin_name = $(this).attr("origin_name");
                            origin_names.push(origin_name);
                            origin_locations.push(origin_location);
                        });

                    } else {
                        //if it wasn't generated we add as origin itself and remove all other origins.

                        $(this).attr("generated", "true");
                        $("origin", this).remove();
                        var origin_location = fn_name;
                        var origin_name = name;
                        $(this).append("<origin origin_name='" + origin_name + "' origin_location='" + origin_location + "' generated='true'/>");
                        origin_names.push(origin_name);
                        origin_locations.push(origin_location);



                    }
                    outerHTML = $("<div/>").append($(this).clone()).html();

                    //Only add it to inputs if it is an external input requirement.
                    if (parent("graph node output[name='" + name + "'] end_point[fn_name='" + fn_name + "']").length == 0) {

                        //We reject input if the user has already declared it. This way the user can catch values
                        //that represent the same thing.

                        var isTrue = 'start';
                        origin_locations.forEach(function(origin_location, index) {
                            var origin_name = origin_names[index];

                            var exists = parent("inputs input origin[origin_name='" + origin_name + "'][origin_location='" + origin_location + "']").length;

                            //Here we also check the existence of multiple inputs that have the same origin.
                            if (exists > 1) {
                                console.log("Error: Multiple inputs with the same origin.");
                                console.log("Folder: " + cpath);
                                console.log("origin name: " + origin_name);
                                console.log("origin location: " + origin_location);
                                format_XML(source_path);
                                process.exit(1);
                            }
                            if (isTrue == 'start') {
                                isTrue = exists;
                            } else {
                                if (isTrue != exists) {

                                    console.log("Error: Input contains only part of the origins of an input of a child.");
                                    console.log("Folder: " + cpath);
                                    console.log("Value name: " + name);
                                    format_XML(source_path);
                                    process.exit(1);

                                }

                            }
                        });


                        if (isTrue == 1) {
                            //check that the attributes of the children are the same with that of the parent.
                            if (parent("inputs input origin[origin_name='" + origin_names[0] + "'][origin_location='" + origin_locations[0] + "']").parent().attr("side-effect") != side_effect) {
                                console.log("Error: Child input has different attributes than its parent.");
                                console.log("Folder: " + cpath);
                                console.log("Name: " + parent("inputs input origin[origin_name='" + origin_names[0] + "'][origin_location='" + origin_locations[0] + "']").parent().attr("name"));
                                origin_locations.forEach(function(item, index) {
                                    console.log("Origin name: " + origin_names[index]);
                                    console.log("Origin location: " + item);
                                });
                                format_XML(source_path);
                                process.exit(1);


                            }
                        }

                        if (isTrue == 0) {
                            //We check if there are multiple inputs with the same name.
                            var inputs = parent("inputs input[name='" + name + "']");
                            if (inputs.length > 1) {
                                console.log("Error: Multiple inputs with the same name.");
                                console.log("Folder: " + cpath);
                                console.log("Name: " + name);
                                format_XML(source_path);
                                process.exit(1);
                            } else {
                                if (inputs.length == 1) {
                                    //check that the attributes of the children are the same with that of the parent.
                                    if (inputs.attr("side-effect") != side_effect) {
                                        console.log("Error: There is an input with the same name but different attributes.");
                                        console.log("Folder: " + cpath);
                                        console.log("Name: " + inputs.attr("name"));
                                        origin_locations.forEach(function(item, index) {
                                            console.log("Origin name: " + origin_names[index]);
                                            console.log("Origin location: " + item);

                                        });
                                        format_XML(source_path);
                                        process.exit(1);
                                    } else {
                                        //We add only the contents
                                        parent(inputs).append($("<div/>").append($("origin", this).clone()).html());
                                    }
                                } else {
                                    //There isn't an input with that name, so we add it. length==0
                                    //Insert an inputs tag if it is missing.
                                    if (parent("inputs").length == 0) {
                                        parent("root").append("<inputs/>");
                                    }
                                    parent("inputs").append(outerHTML);

                                }
                            }
                        }
                    }

                });



                $("outputs output").each(function(each) {
                    var name = $(this).attr("name");
                    var generated = $(this).attr("generated");

                    //We get all the attributes to check that the parent has the same attributes.
                    var side_effect = $(this).attr("side-effect");

                    var outerHTML;

                    //To address namespace colisions,we set the origin (location and internal name) of the output.
                    var origin_locations = [];
                    var origin_names = [];
                    if ((generated == "true") && ($("origin", this).length > 0)) {

                        //Mulitple origins can exist if they are side-effects, otherwise only one.
                        var origin = $("origin", this).each(function() {
                            var origin_location = $(this).attr("origin_location");
                            origin_location = fn_name + "/" + origin_location;
                            $(this).attr("origin_location", origin_location);
                            var origin_name = $(this).attr("origin_name");
                            origin_names.push(origin_name);
                            origin_locations.push(origin_location);

                        });

                    } else {
                        //if it wasn't generated we add as origin itself and remove the previous origin.

                        $(this).attr("generated", "true");
                        $("origin", this).remove();
                        var origin_location = fn_name;
                        var origin_name = name;
                        $(this).append("<origin origin_name='" + origin_name + "' origin_location='" + origin_location + "' generated='true'/>");
                        origin_names.push(origin_name);
                        origin_locations.push(origin_location);
                    }

                    outerHTML = $("<div/>").append($(this).clone()).html();


                    //We reject output if the user has already declared it. This way the user can catch values
                    //that represent the same thing.

                    var isTrue = 'start';
                    origin_locations.forEach(function(origin_location, index) {
                        var origin_name = origin_names[index];

                        var exists = parent("outputs output origin[origin_name='" + origin_name + "'][origin_location='" + origin_location + "']").length;

                        //Here we also check the existence of multiple outputs that have the same origin.
                        if (exists > 1) {
                            console.log("Error: Multiple outputs have the same origin.");
                            console.log("Folder: " + cpath);
                            console.log("origin name: " + origin_name);
                            console.log("origin location: " + origin_location);
                            format_XML(source_path);
                            process.exit(1);
                        }
                        if (isTrue == 'start') {
                            isTrue = exists;
                        } else {
                            if (isTrue != exists) {

                                console.log("Error: Output contains only part of the origins of an output of a child.");
                                console.log("Folder: " + cpath);
                                console.log("Value name: " + name);
                                format_XML(source_path);
                                process.exit(1);

                            }

                        }
                    });

                    if (isTrue == 1) {
			    //TODO improve that for all the attributes.
                        //check that the attributes of the children are the same with that of the parent.
                        if (parent("outputs output origin[origin_name='" + origin_names[0] + "'][origin_location='" + origin_locations[0] + "']").parent().attr("side-effect") != side_effect) {
                            console.log("Error: Child output has different attributes than its parent.");
                            console.log("Folder: " + cpath);
                            console.log("Name: " + parent("outputs output origin[origin_name='" + origin_names[0] + "'][origin_location='" + origin_locations[0] + "']").parent().attr("name"));
                            origin_locations.forEach(function(item, index) {
                                console.log("Origin name: " + origin_names[index]);
                                console.log("Origin location: " + item);
                            });
                            format_XML(source_path);
                            process.exit(1);


                        }
                    }


                    if (isTrue == 0) {
                        //We check if there is already an output with the same name.
                        var outputs = parent("outputs output[name='" + name + "']");
                        if (outputs.length > 1) {
                            console.log("Error: Multiple outputs with the same name.");
                            console.log("Folder: " + cpath);
                            console.log("Name: " + name);
                            format_XML(source_path);
                            process.exit(1);
                        } else {
                            if (outputs.length == 1) {
                                //check that the attributes of the children are the same with that of the parent.
                                if (outputs.attr("side-effect") != side_effect) {
                                    console.log("Error: There is an output with the same name but different attributes.");
                                    console.log("Folder: " + cpath);
                                    console.log("Name: " + outputs.attr("name"));
                                    origin_locations.forEach(function(item, index) {
                                        console.log("Origin name: " + origin_names[index]);
                                        console.log("Origin location: " + item);
                                    });
                                    format_XML(source_path);
                                    process.exit(1);
                                } else {


                                    //There can be only one origin if it isn't a side-effect
                                    if ((parent("origins", outputs).length > 0) && (side_effect != 'true')) {
                                        console.log("Error: Multiple origins of the same output.");
                                        console.log("Folder: " + cpath);
                                        console.log("Name: " + name);
                                        origin_locations.forEach(function(item, index) {
                                            console.log("Origin name: " + origin_names[index]);
                                            console.log("Origin location: " + item);
                                        });
                                        parent("outputs output[name='" + name + "'] origin").each(function() {
                                            console.log("Origin name: " + $(this).attr("origin_name"));
                                            console.log("Origin location: " + $(this).attr("origin_location"));
                                        });


                                        format_XML(source_path);
                                        process.exit(1);

                                    } else {
                                        //Here this output could also be used from inside the graph.
                                        //We add only the contents
                                        parent(outputs).append($("<div/>").append($("origin", this).clone()).html());
                                    }
                                }
                            } else {
                                //Only add it to outputs if it is an external output requirement.
                                if (parent("graph node[fn_name='" + fn_name + "'] output[name='" + name + "']").length == 0) {
                                    //There isn't an output with that name, so we add it. length==0
                                    //Insert an outputs tag if it is missing.
                                    if (parent("outputs").length == 0) {
                                        parent("root").append("<outputs/>");
                                    }
                                    parent("outputs").append(outerHTML);

                                }
                            }
                        }
                    }
                });
            }
        }
    });
}


var xml_file = fs.readFileSync(source_path + ".xml", {
    encoding: "utf-8"
});

var $ = cheerio.load(xml_file, {
    xmlMode: true
});

generate_xml_content_from_children(source_path, $);
fs.writeFileSync(source_path + ".xml", $.html());

/////////////////////////////////////////////////////////////////////
//check_ioputs_origins

///////////////////////////////////
mr_file_paths.forEach(function(item) {

    var xml_path = item + ".xml";
    try {
        var xml_file = fs.readFileSync(xml_path, {
            encoding: "utf-8"
        });
    } catch (e) {
        console.log("\nError: xml file missing:" + xml_path);
        format_XML(source_path);
        process.exit(1);
    }

    var $ = cheerio.load(xml_file, {
        xmlMode: true
    });

    $("inputs input").each(function() {
        var name = $(this).attr("name");
        if ($("origin", this).length == 0) {
            console.log("Error: There is an input of a subgraph that doesn't have an origin");
            console.log("File: " + xml_path);
            console.log("Name: " + name);
            format_XML(source_path);
            process.exit(1);
        }

        var origins = [];
        $("origin", this).each(
            function() {
                var origin = {};
                origin.name = $(this).attr("origin_name");
                origin.location = $(this).attr("origin_location");
                origins.push(origin);
            }
        );
        origins.forEach(function(item) {
            origins.forEach(function(sitem) {
                if ((item != sitem) && (item.name == sitem.name) && (sitem.location.indexOf(item.location) == 0)) {
                    console.log("Error: There is an input that has multiple origins with the same name/(sub)location");
                    console.log("File: " + xml_path);
                    console.log("Name: " + name);
                    console.log("name: " + item.name);
                    console.log("location: " + item.location);
                    format_XML(source_path);
                    process.exit(1);

                }
            });
        });
    });

    $("outputs output").each(function() {
        var name = $(this).attr("name");
        if ($("origin", this).length == 0) {
            console.log("Error: There is an output of a subgraph that doesn't have an origin");
            console.log("File: " + xml_path);
            console.log("Name: " + name);
            format_XML(source_path);
            process.exit(1);
        }
        var origins = [];
        $("origin", this).each(
            function() {
                var origin = {};
                origin.name = $(this).attr("origin_name");
                origin.location = $(this).attr("origin_location");
                origins.push(origin);
            }
        );
        origins.forEach(function(item) {
            origins.forEach(function(sitem) {
                if ((item != sitem) && (item.name == sitem.name) && (sitem.location.indexOf(item.location) == 0)) {
                    console.log("Error: There is an output that has multiple origins with the same name/(sub)location");
                    console.log("File: " + xml_path);
                    console.log("Name: " + name);
                    console.log("name: " + item.name);
                    console.log("location: " + item.location);
                    format_XML(source_path);
                    process.exit(1);

                }
            });
        });

    });

});

/////////////////////////////////////////////////////////////////////
//check_only_side_effects_exist
//////////////////////////////

var root_in_out = {
    "inputs": {},
    "outputs": {}
};

var xml_file = fs.readFileSync(source_path + ".xml", {
    encoding: "utf-8"
});

var $ = cheerio.load(xml_file, {
    xmlMode: true
});

$("inputs input").each(function() {
    if ($(this).attr("side-effect") != "true") {
        if (root_io == false || (root_io == true && ($(this).attr("generated") == "true"))) {
            if (root_io) {
                console.log("Error: There is a generated input in the root xml_file.");
            } else {
                console.log("Error: There is an input which is not a side_effect in the root xml_file.");
            }
            console.log("Name: " + $(this).attr("name"));
            format_XML(source_path);
            process.exit(1);
        } else {
            var prop = {};
            //TODO Some of them would never happen. We need to throw errors on their existence.
            //Get the edge properties
            if ($(this).attr("mutable") == "true") {
                prop.mutable = "true";
            }
            if ($(this).attr("historical") == "true") {
                prop.historical = "true";
            }
            if ($(this).attr("dynamic") == "true") {
                prop.dynamic = "true";
            }
            if ($(this).attr("lossless") == "true") {
                prop.lossless = "true";
            }
            if ($(this).attr("dependency") == "true") {
                prop.dependency = "true";
            }
            if ($(this).attr("passive") == "true") {
                prop.passive = "true";
            }
            if (prog_lang == "rust") {
                if (typeof($(this).attr("type")) != "undefined") {
                    prop.type = $(this).attr("type");
                } else {
                    console.log("Error: There is an input that doesn't have a type in the root xml file.");
                    console.log("Name:" + $(this).attr("name"));

                }
            }
            root_in_out.inputs[$(this).attr("name")] = prop;
        }
    }
});

$("outputs output").each(function() {
    if ($(this).attr("side-effect") != "true") {
        if (root_io == false || (root_io == true && ($(this).attr("generated") == "true"))) {
            if (root_io) {
                console.log("Error: There is a generated output in the root xml_file.");
            } else {
                console.log("Error: There is an output which is not a side_effect in the root xml_file.");
            }
            console.log("Name: " + $(this).attr("name"));
            format_XML(source_path);
            process.exit(1);
        } else {
            var prop = {};
            //TODO Some of them would never happen. We need to throw errors on their existence.
            //Get the edge properties
            if ($(this).attr("mutable") == "true") {
                prop.mutable = "true";
            }
            if ($(this).attr("historical") == "true") {
                prop.historical = "true";
            }
            if ($(this).attr("dynamic") == "true") {
                prop.dynamic = "true";
            }
            if ($(this).attr("lossless") == "true") {
                prop.lossless = "true";
            }
            if ($(this).attr("dependency") == "true") {
                prop.dependency = "true";
            }
            if ($(this).attr("passive") == "true") {
                prop.passive = "true";
            }
            if (prop_lang == "rust") {
                if (typeof($(this).attr("type")) != "undefined") {
                    prop.type = $(this).attr("type");
                } else {
                    console.log("Error: There is an output that doesn't have a type in the root xml file.");
                    console.log("Name:" + $(this).attr("name"));

                }
            }
            root_in_out.outputs[$(this).attr("name")] = prop;
        }
    }
});
var folder;
if (single_threaded) {
    folder = "single_threaded";
} else {
    folder = "multi_threaded";
}
try {
    fs.mkdirSync(source_path + "/" + folder);
} catch (e) {}

fs.writeFileSync(source_path + "/" + folder + "/root_in_out.json", JSON.stringify(root_in_out, null, 4));
////////////////////////////////////////////////////////////////////
//generate_src
/////////////////
{
    ///////////////////////////////////////////////////////////////////

    //TODO we need to put reusable functions somewhere
    function set_cpath(pointer, start, end) {
        var cpath = pointer[start];
        for (var i = start + 1; i <= end; i++) {
            cpath = cpath + "/" + pointer[i];
        }
        return cpath;
    }



    ///////////////////////////////////////////////////////////////////
    //flatten_graph
    var flattened_graph;
    ////////////////
    {

        //////////////////////////////////////////////////////////////////
        //find_starting_points
        var starting_points;
        /////////////////////
        starting_points = [];

        //finds the functions that do not contain inputs and are at the lowest level.
        function find_starting_points_rec(cpath, parent) {
            var files = fs.readdirSync(cpath);
            files.forEach(function(file_name, index, files) {
                var stat = fs.statSync(cpath + "/" + file_name);

                if (stat.isFile()) {
                    if (path.extname(file_name) == ".xml") {
                        //we check if the directory with the same name exist.
                        if (!fs.existsSync(cpath + "/" + file_name.substring(0, file_name.length - 4))) {
                            var xml_file = fs.readFileSync(cpath + "/" + file_name, {
                                encoding: "utf-8"
                            });

                            var $ = cheerio.load(xml_file, {
                                xmlMode: true
                            });
                            //we check the existance of inputs with no side-effect property.
                            if ($("inputs input[side-effect!='true']").length == 0) {
                                var element = parent.slice();
                                element.push(file_name.substring(0, file_name.length - 4));
                                starting_points.push(element);
                            }


                        }
                    }
                }
                if (stat.isDirectory()) {
                    if (file_name != 'single_threaded' && file_name != 'multi_threaded' && file_name != "reusable" && file_name != "dynamic" && file_name != "single_use") {
                        var element = parent.slice();
                        element.push(file_name);
                        find_starting_points_rec(cpath + "/" + file_name, element);
                    }
                }

            });
        }
        var parent = [""];
        find_starting_points_rec(source_path, parent);

        //We check specifically those nodes that have some of the external input of the library.	
        if (root_io) {

            //Find all the Candidates.
            var candidates = {};
            var root_input = {};

            var xml_file = fs.readFileSync(source_path + ".xml", {
                encoding: "utf-8"
            });

            var $ = cheerio.load(xml_file, {
                xmlMode: true
            });

            $("inputs input").each(function() {
                if ($(this).attr("side-effect") != "true") {
                    $("origin", this).each(function() {
                        var origin_name = $(this).attr("origin_name");
                        var ncpath = source_path + "/" + $(this).attr("origin_location");
                        if (!(ncpath in root_input) && !(ncpath in candidates)) {
                            root_input[ncpath] = {};
                        }
                        root_input[ncpath][origin_name] = true;
                    });
                }
            });

            var keys = Object.keys(root_input);
            while (keys.length > 0) {
                keys.forEach(function(cpath) {
                    var names = root_input[cpath];
                    delete root_input[cpath];

                    var xml_file = fs.readFileSync(cpath + ".xml", {
                        encoding: "utf-8"
                    });

                    var $ = cheerio.load(xml_file, {
                        xmlMode: true
                    });

                    $("inputs input").each(function() {
                        var name = $(this).attr("name");
                        if (name in names) {
                            if ($("origin", this).length == 0) {
                                if (!(cpath in candidates)) {
                                    candidates[cpath] = {};
                                }
                                candidates[cpath][name] = true;
                            } else {
                                $("origin", this).each(function() {
                                    var origin_name = $(this).attr("origin_name");
                                    var ncpath = cpath + "/" + $(this).attr("origin_location");
                                    if (!(ncpath in root_input)) {
                                        root_input[ncpath] = {};
                                    }
                                    root_input[ncpath][origin_name] = true;
                                });
                            }
                        }

                    });
                });
                keys = Object.keys(root_input);
            }
            //TODO remove 
            console.log("Candidates:\n" + JSON.stringify(candidates, null, 4));

            Object.keys(candidates).forEach(function(cpath) {

                var length = Object.keys(candidates[cpath]).length;

                var xml_file = fs.readFileSync(cpath + ".xml", {
                    encoding: "utf-8"
                });
                var $ = cheerio.load(xml_file, {
                    xmlMode: true
                });

                if ($("inputs input[side-effect!='true']").length == length) {
                    var element = cpath.split(source_path)[1].split("/");
                    console.log(element);
                    starting_points.push(element);
                }


            });
        }
        //TODO remove 
        console.log("Starting_points:\n" + JSON.stringify(starting_points, null, 4));

        //////////////////////////////////////////////////////////////////
        //find_node_properties
        var node_properties;
        //////////////////////////////
        node_properties = {};
        var concurrent_index = 0;

        function find_node_properties_rec(cpath, parent) {


            var xml_file = fs.readFileSync(cpath + ".xml", {
                encoding: "utf-8"
            });

            var $ = cheerio.load(xml_file, {
                xmlMode: true
            });

            $("graph node").each(function() {
                var fn_name = $(this).attr("fn_name");
                var child = parent.slice();
                child.push(fn_name);

                if (Object.keys($(this).get(0).attribs).length > 1) {
                    var node = {};
                    if (!single_threaded) {
                        if ($(this).attr("concurrent") == "true") {
                            concurrent_index++;
                            node.concurrent = concurrent_index;
                        }
                    }
                    if ($(this).attr("asynchronous") == "true") {
                        node.asynchronous = "true";
                    }
                    if ($(this).attr("ordered") == "true") {
                        node.ordered = "true";
                    }

                    node_properties[set_cpath(child, 0, child.length - 1)] = node;

                }

                //we check if the directory with the same name exist.
                //This should happen at this place because the concurrency property can be rewritten by the lower levels.
                if (fs.existsSync(cpath + "/" + fn_name)) {
                    find_node_properties_rec(cpath + "/" + fn_name, child);
                }

            });



        }
        var parent = [""];
        find_node_properties_rec(source_path, parent);
        //TODO remove        console.log("Node_properties: \n" + JSON.stringify(node_properties, null, 4));

        //////////////////////////////////////////////////////////////////
        //create_flattened_graph
        //var flattened_graph;
        ///////////////////////////
        flattened_graph = {};

        starting_points.forEach(function(pointer) {
            traverse(pointer, null);

            function traverse(pointer, edge) {
                var cpath = set_cpath(pointer, 0, pointer.length - 1);

                //check whether the node has already been traversed.
                var traversed = typeof flattened_graph[cpath] != "undefined";

                //Create the node if it doesn't exist.
                if (!traversed) {

                    //insert the new node

                    flattened_graph[cpath] = {
                        pointer: pointer,
                        inputs: {},
                        outputs: {},
                        properties: {
                            concurrent: 0
                        }
                    };
                }

                //Add the edge from which we arrived here.
                //If this is a starting point the edge is null.
                var node = flattened_graph[cpath];

                if (edge != null) {

                    node.inputs[edge.end_vname] = JSON.parse(JSON.stringify(edge));

                }


                //If it hasn't been traversed, continue.
                if (!traversed) {


                    //add the inherited node properties
                    //Only the concurrent property is inherited at the moment.
                    for (var key in node_properties) {
                        if (cpath.indexOf(key) == 0) {
                            for (var k in node_properties[key]) flattened_graph[cpath]["properties"][k] = node_properties[key][k];
                        }
                    };

                    //We check all output tags.
                    var xml_file = fs.readFileSync(source_path + cpath + ".xml", {
                        encoding: "utf-8"
                    });

                    var $ = cheerio.load(xml_file, {
                        xmlMode: true
                    });
                    $("outputs output[side-effect!='true']").each(function() {
                        var n_edge = {
                            "origin_pointer": pointer,
                            "properties": {}
                        };
                        n_edge.origin_vname = $(this).attr("name");

                        //we are at the bottom and for each output, we need to go up till we find where we sent the output.
                        var caught_level = pointer.length - 1;
                        var vname = n_edge.origin_vname;
                        for (var i = pointer.length - 2; i >= 0; i--) {
                            var up_cpath = source_path + set_cpath(pointer, 0, i);

                            var parent_xml_file = fs.readFileSync(up_cpath + ".xml", {
                                encoding: "utf-8"
                            });
                            var parent = cheerio.load(parent_xml_file, {
                                xmlMode: true
                            });

                            //Check whether that output is part of the current graph
                            parent("graph node[fn_name='" + pointer[i + 1] + "'] output[name='" + vname + "'] end_point").each(function() {
                                //Create an edge for each end_point and traverse it.
                                var nn_edge = JSON.parse(JSON.stringify(n_edge));

                                //Get the edge properties
                                if (parent(this).attr("mutable") == "true") {
                                    nn_edge.properties.mutable = "true";
                                }
                                if (parent(this).attr("historical") == "true") {
                                    nn_edge.properties.historical = "true";
                                }
                                if (parent(this).attr("dynamic") == "true") {
                                    nn_edge.properties.dynamic = "true";
                                }
                                if (parent(this).attr("lossless") == "true") {
                                    nn_edge.properties.lossless = "true";
                                }
                                if (parent(this).attr("dependency") == "true") {
                                    nn_edge.properties.dependency = "true";
                                }
                                if (parent(this).attr("passive") == "true") {
                                    nn_edge.properties.passive = "true";
                                }


                                //Find the end_point and traverse it.
                                var fn_name = parent(this).attr("fn_name");
                                var end_pointer = JSON.parse(JSON.stringify(pointer.slice(0, i + 1)));
                                end_pointer.push(fn_name);
                                go_down(end_pointer, vname, nn_edge);
                            });


                            var origin_location = set_cpath(pointer, i + 1, caught_level);

                            //Check whether the output is used in the upper graph.
                            var temp = parent("outputs output origin[origin_name='" + vname + "'][origin_location='" + origin_location + "']");
                            if (temp.length == 0) {
                                //The output has been consummed in a lower level and no other consumption happens in the upper levels.
                                break;
                            }

                            //Check if the output has been caught.
                            output = parent(temp).parent();
                            if (parent(output).attr("generated") != "true") {
                                vname = parent(output).attr("name");
                                caught_level = i;

                            }
                            //We continue to go up.
                        }
                    });

                }
            }

            function go_down(pointer, vname, edge) {
                var cpath = source_path + set_cpath(pointer, 0, pointer.length - 1);

                //Go down till you find all inputs that use that output.
                var xml_file = fs.readFileSync(cpath + ".xml", {
                    encoding: "utf-8"
                });
                var $ = cheerio.load(xml_file, {
                    xmlMode: true
                });

                //Check if it is bottom
                var temp = $("inputs input[name='" + vname + "']");
                if ($("origin", temp).length == 0) {
                    //We are at the bottom
                    var n_edge = JSON.parse(JSON.stringify(edge));
                    n_edge.end_pointer = pointer;
                    n_edge.end_vname = vname;

                    //Add the edge to the output of the original node.
                    var edge_origin = set_cpath(n_edge.origin_pointer, 0, n_edge.origin_pointer.length - 1);
                    var prev_node = flattened_graph[edge_origin];
                    if (typeof prev_node.outputs[n_edge.origin_vname] == "undefined") {
                        prev_node.outputs[n_edge.origin_vname] = [];
                    }
                    prev_node.outputs[n_edge.origin_vname].push(JSON.parse(JSON.stringify(n_edge)));

                    //Continue traversing.
                    traverse(n_edge.end_pointer, n_edge);
                } else {
                    //We go lower
                    $("origin", temp).each(function() {
                        var n_pointer = pointer.concat($(this).attr("origin_location").split("/"));
                        var n_vname = $(this).attr("origin_name");
                        go_down(n_pointer, n_vname, edge);
                    });
                }

            }

        });

        //TODO remove  console.log(JSON.stringify(flattened_graph, null, 4));

        /////////////////////////////////////////////////////////////////
    }
    //endof flatten_graph
    //////////////////////////////////////////////////////////////////
    //level_graph
    var leveled_graph;
    //////////////////////


    leveled_graph = {
        set: {},
        inputs: {},
        outputs: {},
        pointer: [""]
    };

    Object.keys(flattened_graph).forEach(function(key) {
        node = flattened_graph[key];

        var lgraph = leveled_graph;
        for (var i = 1; i < node.pointer.length; i++) {
            var item = node.pointer[i];
            if (!(item in lgraph.set)) {
                lgraph.set[item] = {
                    pointer: node.pointer.slice(0, i + 1),
                    inputs: {},
                    outputs: {},
                    set: {}
                };
            }
            var lgraph_path = set_cpath(lgraph.set[item].pointer, 0, lgraph.set[item].pointer.length - 1);

            for (var k in node.inputs) {
                var input_path = set_cpath(node.inputs[k].origin_pointer, 0, node.inputs[k].origin_pointer.length - 1);

                if (input_path.indexOf(lgraph_path) == -1) {
                    lgraph.set[item].inputs[k] = node.inputs[k];
                }
            }
            for (var k in node.outputs) {
                node.outputs[k].forEach(function(l) {
                    var output_path = set_cpath(l.end_pointer, 0, l.end_pointer.length - 1);

                    if (output_path.indexOf(lgraph_path) == -1) {
                        if (!(k in lgraph.set[item].outputs)) {
                            lgraph.set[item].outputs[k] = [];
                        }
                        lgraph.set[item].outputs[k].push(l);
                    }
                });
            }


            lgraph = lgraph.set[item];
        };
    });

    //TODO remove      console.log(JSON.stringify(leveled_graph, null, 4));


    ///////////////////////////////////////////////////////////////
    //if_root_io
    ////////////////
    {
        //////////////////////////////////////////////////////
	//reusable
	//////////////////////////////////////////////////////
	//if_threaded_generate_meta_data
	
	    function if_threaded_generate_meta_data(single_threaded,starting_points,flattened_graph,leveled_graph ){
    /////////////////////////////////////////////////////////////////
    //determine_subgraphs
    var flattened_graph_v2;
    /////////////////////////////////////

    flattened_graph_v2 = JSON.parse(JSON.stringify(flattened_graph));

    //We need to determine if subgraphs
    //that have the same concurrent value have a path from outside which connects 2 of its nodes.
    //If this happens, then the thread would have to block if we dont split it into 2 threads/subgraphs.


    var set_index = 0;

    var iter_pointers = {};
    var siter_pointers = {};

    //Group the pointers according to their concurrent number.

    starting_points.forEach(function(pointer) {
        var cpath = set_cpath(pointer, 0, pointer.length - 1);
        var node = flattened_graph_v2[cpath];
        var conc = node.properties.concurrent;

        if (!(conc in iter_pointers)) {
            iter_pointers[conc] = {};
        }

        iter_pointers[conc][cpath] = pointer;
    });


    while (Object.keys(iter_pointers).length > 0) {

        //For each group of pointers, we add all the nodes we can to the set and determine the new starting pointers that we put in the siter_pointers.
        //We do this iteratively until there are no more starting pointers.

        Object.keys(iter_pointers).forEach(function(conc) {
            //Once checks the existence of of at least one starting point.
            var group = iter_pointers[conc];

            set_index++;

            Object.keys(group).forEach(function(key) {
                var pointer = group[key];

                var trav_pointers = [pointer];

                while (trav_pointers.length > 0) {

                    var pointer = trav_pointers[trav_pointers.length - 1];
                    var cpath = set_cpath(pointer, 0, pointer.length - 1);
                    var node = flattened_graph_v2[cpath];

                    trav_pointers.pop();


                    //Check if it has the same conc.
                    if (node.properties.concurrent == conc) {

                        //If it is already set, all previous nodes of the same conc have also been set.
                        if (!('set' in node.properties)) {

                            //We add the node to the set if it doesn't have paths outside of the conc that link to a node of the current set or to a node of the same conc that hasn't been traversed yet and we add its paths to the set as well.
                            if (check_backwards(set_index, pointer, conc) == false) {
                                if (!(conc in siter_pointers)) {
                                    siter_pointers[conc] = {};
                                }
                                siter_pointers[conc][cpath] = pointer;
                            };
                        }
                    } else {
                        if (!(node.properties.concurrent in siter_pointers)) {
                            siter_pointers[node.properties.concurrent] = {};
                        }
                        siter_pointers[node.properties.concurrent][cpath] = pointer;
                    }

                    //Go forward.
                    Object.keys(node.outputs).forEach(function(key) {
                        var output = node.outputs[key];
                        output.forEach(function(item) {
                            //If the edge is passive, that means that the computation stops here.
                            if (item.properties.passive != "true") {
                                trav_pointers.push(
                                    item.end_pointer
                                );
                            }
                        });

                    });
                }
            });
        });

        iter_pointers = siter_pointers;
        siter_pointers = {};

    }

    function check_backwards(set_index, starting_pointer, conc) {

        var iter_pointers = [{
            "pointer": starting_pointer,
            "outside": false
        }];
        var can_guarantee_convexity = true;

        while (iter_pointers.length > 0) {

            var iter = iter_pointers[iter_pointers.length - 1];
            var pointer = iter.pointer;
            var cpath = set_cpath(pointer, 0, pointer.length - 1);
            var node = flattened_graph_v2[cpath];

            iter_pointers.pop();

            Object.keys(node.inputs).forEach(function(key) {
                var input = node.inputs[key];
                var prev_cpath = set_cpath(input.origin_pointer, 0, input.origin_pointer.length - 1);
                var prev_node = flattened_graph_v2[prev_cpath];

                if (prev_node.properties.concurrent != conc) {
                    iter.outside = true;

                    iter_pointers.push({
                        "pointer": input.origin_pointer,
                        "outside": iter.outside
                    });

                } else {
                    if ((iter.outside == true) && ((!("set" in prev_node.properties)) || (prev_node.properties.set == set_index))) {
                        can_guarantee_convexity = false;
                        return false;
                    }

                    if (!("set" in prev_node.properties)) {
                        iter_pointers.push({
                            "pointer": input.origin_pointer,
                            "outside": iter.outside
                        });
                    }

                }

            });


        }
        if (can_guarantee_convexity == true) {

            var iter_pointers = [starting_pointer];
            while (iter_pointers.length > 0) {

                var pointer = iter_pointers[iter_pointers.length - 1];
                var cpath = set_cpath(pointer, 0, pointer.length - 1);
                var node = flattened_graph_v2[cpath];

                iter_pointers.pop();

                if ((node.properties.concurrent == conc) && (!("set" in node.properties))) {
                    node.properties.set = set_index;

                    Object.keys(node.inputs).forEach(function(key) {
                        var input = node.inputs[key];
                        var prev_cpath = set_cpath(input.origin_pointer, 0, input.origin_pointer.length - 1);
                        var prev_node = flattened_graph_v2[prev_cpath];

                        iter_pointers.push(
                            input.origin_pointer
                        );
                    });
                }
            }
            return true;
        }
    }

    //TODO remove  console.log(JSON.stringify(flattened_graph_v2, null, 4));

    /////////////////////////////////////////////////////////////////
    //determine_subgraph_order_str_points
    var thread_starting_points;
    var flattened_graph_v3;
    ///////////////////////////////////////////

    flattened_graph_v3 = JSON.parse(JSON.stringify(flattened_graph_v2));
    thread_starting_points = {};

    starting_points.forEach(function(st_pointer) {

        var trav_pointers = [st_pointer];
        while (trav_pointers.length > 0) {

            var pointer = trav_pointers[trav_pointers.length - 1];
            var cpath = set_cpath(pointer, 0, pointer.length - 1);
            var node = flattened_graph_v3[cpath];
            var set = node.properties.set;

            trav_pointers.pop();

            if (node.properties.passed == true) {
                continue;
            }
            node.properties.passed = true;


            //Go forward.
            Object.keys(node.outputs).forEach(function(key) {
                var output = node.outputs[key];
                output.forEach(function(item) {
                    //If the edge is passive, that means that the computation stops here.
                    if (item.properties.passive != "true") {
                        var next_pointer = item.end_pointer;
                        var next_cpath = set_cpath(next_pointer, 0, next_pointer.length - 1);
                        var next_node = flattened_graph_v3[next_cpath];
                        var next_set = next_node.properties.set;

                        if (next_set != set) {
                            if (!(set in thread_starting_points)) {
                                thread_starting_points[set] = {};
                            }
                            if (!(next_set in thread_starting_points[set])) {
                                thread_starting_points[set][next_set] = {};
                            }

                            thread_starting_points[set][next_set][next_cpath] = next_pointer;
                        }

                        trav_pointers.push(
                            item.end_pointer
                        );
                    }
                });

            });
        }
    });


    //TODO remove     console.log(JSON.stringify(thread_starting_points, null, 4));
    /////////////////////////////////////////////////////////////////
    //merge_serial_subgraphs
    var flattened_graph_v4;
    var thread_starting_points_v2;
    //////////////////////////////
    flattened_graph_v4 = JSON.parse(JSON.stringify(flattened_graph_v3));
    thread_starting_points_v2 = JSON.parse(JSON.stringify(thread_starting_points));


    //Find the mergable set.
    var merge_set;

    //Done till we can't find any new merge.

    while (true) {
        merge_set = [];

        Object.keys(thread_starting_points_v2).forEach(function(origin_subgraph) {

            if (Object.keys(thread_starting_points_v2[origin_subgraph]).length > 1) {
                return;
            }

            for (var end_subgraph in thread_starting_points_v2[origin_subgraph]) {

                var mergable = true;

                for (var dep_subgraph in thread_starting_points_v2) {
                    if (end_subgraph in thread_starting_points_v2[dep_subgraph] && (dep_subgraph != origin_subgraph)) {
                        mergable = false;
                        break;
                    }
                }
                //Check that there are no mutable inputs from the previous thread. At the moment, we only check that the input doesn't have the _v(number) at the end.
                //TODO We need to find a better way at idenitfying the mutable dependencies. Here there might be false possitivies.
                Object.keys(thread_starting_points_v2[origin_subgraph][end_subgraph]).forEach(function(cpath) {
                    var node = flattened_graph_v4[cpath];
                    Object.keys(node.inputs).forEach(function(e_input_name) {
                        if (e_input_name.match(/_v\d+$/) != null) {
                            var o_pointer = node.inputs[e_input_name].origin_pointer;
                            var o_path = set_cpath(o_pointer, 0, o_pointer.length - 1);
                            var o_node = flattened_graph_v4[o_path];
                            if (o_node.properties.set == origin_subgraph) {
                                mergable = false;
                            }

                        }
                    });
                });


                if (mergable) {
                    merge_set.push({
                        "o": origin_subgraph,
                        "e": end_subgraph
                    });
                }
            }
        });

        //Perform any transitive computations to find the ending set numbers.
        merge_set.forEach(function(one) {
            merge_set.forEach(function(two) {
                if (one.o == two.e) {
                    //Move the starting points temporarily for the next step before removing them.
                    thread_starting_points_v2[two.o][one.e] = thread_starting_points_v2[one.o][one.e];
                    one.o = two.o;
                }
            });
        });

        //Merge those sets.
        merge_set.forEach(function(pair) {
            var st_pts = thread_starting_points_v2[pair.o][pair.e];
            Object.keys(st_pts).forEach(function(stpath) {


                var trav_pointers = [];

                //Add the initial nodes of the set from each thread_starting_point.

                var pointer = st_pts[stpath];
                var cpath = set_cpath(pointer, 0, pointer.length - 1);
                var node = flattened_graph_v4[cpath];

                Object.keys(node.outputs).forEach(function(key) {
                    var output = node.outputs[key];
                    output.forEach(function(item) {
                        trav_pointers.push(
                            item.end_pointer
                        );
                    });

                });



                while (trav_pointers.length > 0) {

                    var pointer = trav_pointers[trav_pointers.length - 1];
                    var cpath = set_cpath(pointer, 0, pointer.length - 1);
                    var node = flattened_graph_v4[cpath];

                    trav_pointers.pop();

                    if (node.properties.set == parseInt(pair.e)) {
                        //Change the set id.
                        node.properties.set = parseInt(pair.o);
                        //Go forward.
                        Object.keys(node.outputs).forEach(function(key) {
                            var output = node.outputs[key];
                            output.forEach(function(item) {
                                trav_pointers.push(
                                    item.end_pointer
                                );
                            });

                        });
                    }
                }
            });
        });

        //Delete the unecessary thread_starting_points and move the starting points to the correct set.

        merge_set.forEach(function(pair) {
            delete thread_starting_points_v2[pair.o][pair.e];

            for (key in thread_starting_points_v2[pair.e]) {
                if (!(key in thread_starting_points_v2[pair.o])) {
                    thread_starting_points_v2[pair.o][key] = {};
                }
                for (key2 in thread_starting_points_v2[pair.e][key]) {
                    thread_starting_points_v2[pair.o][key][key2] = thread_starting_points_v2[pair.e][key][key2];
                }
            }
            delete thread_starting_points_v2[pair.e];

            if (Object.keys(thread_starting_points_v2[pair.o]).length == 0) {
                delete thread_starting_points_v2[pair.o];
            }
        });

        //Check if we could merge more subgraphs. This could potentially allow us to merge even more in the next iteration.
        if (merge_set.length == 0) {
            break;
        }
    }

    //Add the starting points as the thread starting points of the initial thread/subgraph.
    //We do it here because otherwise the merge process would remove them. :)
    thread_starting_points_v2[-1] = {};

    starting_points.forEach(function(st_pointer) {

        var st_cpath = set_cpath(st_pointer, 0, st_pointer.length - 1);
        var st_node = flattened_graph_v4[st_cpath];
        var st_set = st_node.properties.set;
        if (!(st_set in thread_starting_points_v2[-1])) {
            thread_starting_points_v2[-1][st_set] = {};
        }

        thread_starting_points_v2[-1][st_set][st_cpath] = st_pointer;
    });



    //TODO remove    
    console.log("Thread_starting_points:\n" + JSON.stringify(thread_starting_points_v2, null, 4));
    //TODO remove    
    console.log("Flattened Graph:\n" + JSON.stringify(flattened_graph_v4, null, 4));


    ///////////////////////////////////////////////////////////////
    //order_nodes
    var ordered_set;
    ////////////// 
    flattened_graph_l = JSON.parse(JSON.stringify(flattened_graph_v4));


    //It returns the index of the last string that they have the same.
    function compare(pointer, sec_pointer) {
        var min = Math.min(pointer.length, sec_pointer.length);
        var last = -1;
        for (var i = 0; i < min; i++) {
            if (pointer[i] != sec_pointer[i]) {
                break;
            }
            last++;
        }
        return last;
    }

    //A way to check whether a string is contained inside an array.
    function contains(array, item) {
        var contains = false;
        array.forEach(function(each) {
            if (each == item) {
                contains = true;
            }
        });
        return contains;
    }

    function traverse_leveled_graph(leveled_graph, pointer) {
        var lgraph = leveled_graph;
        for (var i = 1; i < pointer.length; i++) {
            lgraph = lgraph.set[pointer[i]];
        }
        return lgraph;
    }

    function traverse_ordered_graph(ordered_graph, pointer) {
        var lograph = ordered_graph;
        for (var i = 1; i < pointer.length; i++) {
            for (var j = 0; j < lograph.set.length; j++) {
                if (lograph.set[j].name == pointer[i]) {
                    lograph = lograph.set[j];
                }
            }
        }
        return lograph;
    }


    function generate_src_add_node(pointer, set_id, flattened_graph, leveled_graph) {

        //Findind the node we are refering to.
        var cpath = set_cpath(pointer, 0, pointer.length - 1);
        var node = flattened_graph[cpath];

        var lgraph = traverse_leveled_graph(leveled_graph, pointer.slice(0, pointer.length - 1));
        var input_local_var = {};
        var input_not_local_var = {};
        var input_external_var = {};
        var input_not_external_var = {};

        var historical = false;
        Object.keys(node.inputs).forEach(function(vname) {

            var external = false;
            var local = true;

            if (!('dependency' in node.inputs[vname].properties)) {
                if (flattened_graph[set_cpath(node.inputs[vname].origin_pointer, 0, node.inputs[vname].origin_pointer.length - 1)].properties.set != set_id) {
                    external = true;
                }
                if (vname in lgraph.inputs) {
                    local = false;
                }


                if (external) {
                    input_external_var[vname] = [node.pointer];
                } else {
                    input_not_external_var[vname] = true;
                }
                if (local) {
                    input_local_var[vname] = true;
                } else {
                    input_not_local_var[vname] = true;
                }
            }
            if ('historical' in node.inputs[vname].properties) {
                historical = true;
            }
        });

        var output_external_var = {};
        var output_not_external_var = {};
        var output_historical_var = {};
        var output_dynamic_var = {};

        Object.keys(node.outputs).forEach(function(vname) {
            var dependency = false;
            var external = false;
            var dynamic = false;

            node.outputs[vname].forEach(function(each) {
                if ('dependency' in each.properties) {
                    dependency = true;
                }
                if ('dynamic' in each.properties) {
                    dynamic = true;
                }
                if (flattened_graph[set_cpath(each.end_pointer, 0, each.end_pointer.length - 1)].properties.set != set_id) {
                    external = true;
                }
            });

            if (!dependency) {
                if (external) {
                    output_external_var[vname] = [node.pointer];
                } else {
                    output_not_external_var[vname] = true;
                }
                if (historical) {
                    output_historical_var[vname] = [node.pointer];
                }
                if (dynamic) {
                    output_dynamic_var[vname] = [node.pointer];
                }
            }
        });


        return {
            name: pointer[pointer.length - 1],
            "input_local_var": input_local_var,
            "input_not_local_var": input_not_local_var,
            "input_external_var": input_external_var,
            "input_not_external_var": input_not_external_var,
            "output_external_var": output_external_var,
            "output_not_external_var": output_not_external_var,
            "output_historical_var": output_historical_var,
            "output_dynamic_var": output_dynamic_var,
            "set": [],
            "type": "node"
        };
    }


    ordered_set = {};

    //Group starting points per subgraph.
    var grouped_starting_points = {};
    Object.keys(thread_starting_points_v2).forEach(function(key) {
        Object.keys(thread_starting_points_v2[key]).forEach(function(subgraph_id) {
            if (!(subgraph_id in grouped_starting_points)) {
                grouped_starting_points[subgraph_id] = {};
            }
            Object.keys(thread_starting_points_v2[key][subgraph_id]).forEach(function(path) {
                grouped_starting_points[subgraph_id][path] = thread_starting_points_v2[key][subgraph_id][path];
            });
        });
    });

    Object.keys(grouped_starting_points).forEach(function(set_id) {

        var set = grouped_starting_points[set_id];

        //The current subgraph;
        var prefix_pointer = [""];

        //The current subgraphs that we have already skipped because they had unmet dependencies.
        // This is emptied after one more node is added to the source file.
        var skippedList = [];

        var keys = Object.keys(set);

        var c_i = [0];
        var i = 0;

        var ordered_graph = {
            "name": "",
            "input_local_var": {},
            "input_not_local_var": {},
            "input_external_var": {},
            "input_not_external_var": {},
            "output_external_var": {},
            "output_historical_var": {},
            "output_dynamic_var": {},
            "output_not_external_var": {},
            "set": [],
            "type": "subgraph"
        };

        while (true) {
            var node = flattened_graph_l[keys[i]];
            var diff = compare(node.pointer, prefix_pointer);


            //node must be inside the prefix_pointer subgraph.
            //Check if we already skipped that subgraph.
            if ((diff == prefix_pointer.length - 1) && (!contains(skippedList, node.pointer))) {

                //Check if we reached Bottom.
                if (node.pointer.length == prefix_pointer.length) {

                    //Add the node code into the source file.
                    var lograph = traverse_ordered_graph(ordered_graph, node.pointer.slice(0, node.pointer.length - 1));
                    lograph.set.push(generate_src_add_node(node.pointer, set_id, flattened_graph_l, leveled_graph));

                    //Mark it by removing the passed property.
                    delete node.properties.passed;

                    //Add the outputs from the node to the set.
                    Object.keys(node.outputs).forEach(function(vname) {
                        node.outputs[vname].forEach(function(item) {
                            var cpath = set_cpath(item.end_pointer, 0, item.end_pointer.length - 1);
                            var node = flattened_graph_l[cpath];

                            //node must be in the same thread/subgraph.
                            if (node.properties.set == set_id) {

                                //We add the node.
                                if (!(cpath in set)) {
                                    keys.push(cpath);
                                }
                                set[cpath] = item.end_pointer;
                            }
                        });
                    });

                    //Remove the current node
                    delete set[keys[i]];

                    //Find all the keys again.
                    keys.splice(i, 1);

                    //Stop when we do not have any more keys. 
                    if (keys.length == 0) {
                        break;
                    }

                    //Update the prefix_pointer.
                    prefix_pointer = prefix_pointer.slice(0, prefix_pointer.length - 1);
                    c_i.pop();
                    i = c_i[c_i.length - 1];

                    //The i might be at the end so we need to put at the front after the removal of the node.
                    while (i >= keys.length) {
                        prefix_pointer = prefix_pointer.slice(0, prefix_pointer.length - 1);
                        c_i.pop();
                        i = c_i[c_i.length - 1];
                    }
                    //Update the skippList.
                    skippedList = [];
                    continue;

                } else {

                    //Check that all the dependencies of the subgraph are met.
                    var missing_dependencies = false;
                    var lgraph = traverse_leveled_graph(leveled_graph, node.pointer.slice(0, prefix_pointer.length + 1));
                    Object.keys(lgraph.inputs).forEach(function(nvalue) {
                        var cpath = set_cpath(lgraph.inputs[nvalue].origin_pointer, 0, lgraph.inputs[nvalue].origin_pointer.length - 1);
                        var input_node = flattened_graph_l[cpath];
                        if (("passed" in input_node.properties) && (input_node.properties.set_id == set_id)) {
                            missing_dependencies = true;
                        }
                    });
                    if (!missing_dependencies) {
                        prefix_pointer = node.pointer.slice(0, prefix_pointer.length + 1);
                        c_i.push(i);
                        //If a subgraph.
                        if (prefix_pointer.length != node.pointer.length) {
                            var lograph = traverse_ordered_graph(ordered_graph, prefix_pointer.slice(0, prefix_pointer.length - 1));
                            lograph.set.push({
                                "name": prefix_pointer[prefix_pointer.length - 1],
                                "input_local_var": {},
                                "input_not_local_var": {},
                                "input_external_var": {},
                                "input_not_external_var": {},
                                "output_external_var": {},
                                "output_not_external_var": {},
                                "output_historical_var": {},
                                "output_dynamic_var": {},
                                "set": [],
                                "type": "subgraph"
                            });
                        }
                        continue;
                    } else {
                        skippedList.push(node.pointer.slice(0, prefix_pointer.length + 1));
                    }
                }

            }
            i++;
            while (i >= keys.length) {
                prefix_pointer = prefix_pointer.slice(0, prefix_pointer.length - 1);
                c_i.pop();
                i = c_i[c_i.length - 1];
            }
        };
        ordered_set[set_id] = ordered_graph;

    });

    //TODO remove  console.log(JSON.stringify(ordered_set, null, 4));

    function ordered_graph_complete(pointer, ordered_graph, leveled_graph, flattened_graph) {
        var subgraph = traverse_ordered_graph(ordered_graph, pointer);

        if (subgraph.type == "node") {
            return;
        } else {
            //Fill the lower levels.
            subgraph.set.forEach(function(item) {
                var new_pointer = pointer.slice(0, pointer.length);
                new_pointer.push(item.name);
                ordered_graph_complete(new_pointer, ordered_graph, leveled_graph, flattened_graph);
            });

            subgraph.set.forEach(function(item) {

                var lgraph = traverse_leveled_graph(leveled_graph, pointer.slice(0, pointer.length - 1));
                var lsubgraph = traverse_leveled_graph(leveled_graph, pointer.slice(0, pointer.length));
                Object.keys(item.input_not_local_var).forEach(function(vname) {

                    if (vname in lgraph.inputs) {
                        subgraph.input_not_local_var[vname] = true;
                    } else {
                        subgraph.input_local_var[vname] = true;
                    }

                });

                Object.keys(item.input_external_var).forEach(function(vname) {
                    if (vname in subgraph.input_external_var) {
                        subgraph.input_external_var[vname] = subgraph.input_external_var[vname].concat(item.input_external_var[vname]);
                    } else {
                        subgraph.input_external_var[vname] = item.input_external_var[vname];

                    }
                });
                Object.keys(item.input_not_external_var).forEach(function(vname) {
                    if (vname in item.input_not_local_var) {
                        subgraph.input_not_external_var[vname] = true;
                    }
                });


                Object.keys(item.output_not_external_var).forEach(function(vname) {
                    if (vname in lsubgraph.outputs) {
                        subgraph.output_not_external_var[vname] = true;
                    }
                });

                Object.keys(item.output_external_var).forEach(function(vname) {
                    if (vname in subgraph.output_external_var) {
                        subgraph.output_external_var[vname] = subgraph.output_external_var[vname].concat(item.output_external_var[vname]);
                    } else {
                        subgraph.output_external_var[vname] = item.output_external_var[vname];
                    }
                });

                Object.keys(item.output_historical_var).forEach(function(vname) {
                    if (vname in subgraph.output_historical_var) {
                        subgraph.output_hostorical_var[vname] = subgraph.output_historical_var[vname].concat(item.output_historical_var[vname]);
                    } else {
                        subgraph.output_historical_var[vname] = item.output_historical_var[vname];
                    }
                });
                Object.keys(item.output_dynamic_var).forEach(function(vname) {
                    if (vname in subgraph.output_dynamic_var) {
                        subgraph.output_dynamic_var[vname] = subgraph.output_dynamic_var[vname].concat(item.output_dynamic_var[vname]);
                    } else {
                        subgraph.output_dynamic_var[vname] = item.output_dynamic_var[vname];
                    }
                });
            });

        }
    }

    Object.keys(ordered_set).forEach(function(set_id) {
        var ordered_graph = ordered_set[set_id];
        ordered_graph_complete([""], ordered_graph, leveled_graph, flattened_graph_l);
    });
    //TODO remove 
    console.log("Ordered_set:\n" + JSON.stringify(ordered_set, null, 4));



	    }

        ///////////////////////////////////////////////////////
        //single_use
        ////////////////////////////////////////////////////////
        //save_input_to_files
        /////////////////////
        function save_input_to_files(fs, source_path, single_threaded, ordered_set, thread_starting_points, flattened_graph) {
                var folder;
                if (single_threaded) {
                    folder = "single_threaded";
                } else {
                    folder = "multi_threaded";
                }
                try {
                    fs.mkdirSync(source_path + "/" + folder);
                } catch (e) {}

                fs.writeFileSync(source_path + "/" + folder + "/ordered_set.json", JSON.stringify(ordered_set, null, 4));
                fs.writeFileSync(source_path + "/" + folder + "/thread_starting_points.json", JSON.stringify(thread_starting_points, null, 4));
                fs.writeFileSync(source_path + "/" + folder + "/flattened_graph.json", JSON.stringify(flattened_graph, null, 4));
            }
            ///////////////////////////////////////////////////////////////////
            //TODO To be moved into the single_use function
            //generate_src
        function generate_src(source_path, flattened_graph, fs, path, prog_lang, thread_starting_points, ordered_set) {

                ///////////////////////////////////////////////////////////////////////////////////
                //reusable functions
                ////////////////

                //clean_function_names
                ///////////////////////////
                function clean_function_names(prog_lang, functions) {
                    var cleaned_functions = [];
                    var keywords;
                    switch (prog_lang) {
                        case "js_browser":
                            keywords = {
                                "catch": true,
                                "for": true,
                                "function": true,
                                "if": true,
                                "switch": true,
                                "while": true,
                                "console.log": true
                            };
                            break;
                        case "rust":
                            break;

                    }

                    functions.forEach(function(fn) {

                        if (!(fn[0] in keywords)) {
                            cleaned_functions.push(fn);
                        }
                    });
                    return cleaned_functions;
                }

                //src_fext
                //////////////////
                function src_fext(prog_lang) {
                        switch (prog_lang) {
                            case "rust":
                                return ".rs";
                            case "JavaScript":
                            case "js_browser":
                                return ".js";
                        }

                    }
                    ////////////////////////////////////////////////////////////////
                    //s_pointer_dup
                    //////////////////

                function s_pointer_dup(s_pointer) {
                    var npointer = s_pointer.slice();
                    for (var i = 0; i < npointer.length; i++) {
                        npointer[i] = s_pointer[i].slice();
                        npointer[i][2] = s_pointer[i][2].slice();
                    }
                    return npointer;
                }

                //traverse_f_index
                //////////////////
                // Pointer is of the form [[type,name,normal_pointer],[]] where the original element is always from the main flattened graph while
                // the others are of type single_use or reusable.

                function traverse_f_index(f_index, pointer) {
                    var sp = f_index;

                    pointer.forEach(function(item) {
                        var type = item[0];
                        var sname = item[1];
                        var npointer = item[2];
                        if (type != "main") {
                            sp = sp[type][sname];
                        }
                        for (var i = 1; i < npointer.length; i++) {
                            sp = sp["set"][npointer[i]];
                        }
                    });
                    return sp;
                }



                //////////////////////////////////////////////////////////////////
                //search_f_index
                /////////////////
                function search_f_index(f_index, name, pointer, dynamic) {
                    var sp_array = [];

                    var sp = f_index;
                    var lpointer = [];
                    pointer.forEach(function(item) {
                        var type = item[0];
                        var sname = item[1];
                        var npointer = item[2];
                        if (type != "main") {
                            sp = sp[type][sname];
                        }
                        sp_array.push([sp, [
                            [type, sname, [""]]
                        ]]);
                        var lnpointer = [];
                        for (var i = 1; i < npointer.length; i++) {
                            lnpointer.push(npointer[i]);
                            sp = sp["set"][npointer[i]];
                            sp_array.push([sp, lpointer.slice().push([type, sname, lnpointer.slice(0)])]);
                        };
                        lnpointer = lpointer.slice().push([type, sname, lnpointer.slice(0)]);

                    });

                    //search from the bottom since closer functions shadow earlier definitions.
                    var result = null;
                    while (sp_array.length > 0) {
                        spa = sp_array.pop();
                        if (dynamic != true) {
                            ["single_use", "reusable"].forEach(function(item) {
                                if (name in spa[0][item]) {
                                    result = [item, spa[1]];
                                }
                            });
                        } else {
                            if (name in spa[0]["dynamic"]) {
                                result = [item, spa[1]];
                            }
                        }

                    }
                    return result;

                }

                ///////////////////////////////////////////////////////////////////

                //////////////////////////////////////////////////////////////////// 
                //index_functions
                var f_index;
                //////////////////

                //TODO At the moment we index only the functions that are generated with the metareact framework.
                f_index = {
                    "set": {},
                    "reusable": {},
                    "single_use": {},
                    "dynamic": {},
                    "ordered_set": ordered_set,
                    "flattened_graph": flattened_graph,
                    "thread_starting_points": thread_starting_points
                };

                function traverse_leveled_set(leveled_set, pointer) {
                    var lset = leveled_set;
                    for (var i = 1; i < pointer.length; i++) {
                        lset = lset.set[pointer[i]];
                    }
                    return lset;
                }

                //Recursive function that indexes functions(reusable,single_use,dynamic)

                function index_functions_rec(cpath, leveled_set, position) {
                    var functions = [
                        "reusable",
                        "dynamic",
                        "single_use"
                    ];
                    var lset = traverse_leveled_set(leveled_set, position);
                    functions.forEach(function(folder) {
                        try {
                            var files = fs.readdirSync(cpath + "/" + folder);
                            files.forEach(function(file, index, files) {
                                var stat = fs.statSync(cpath + "/" + folder + "/" + file);

                                if (stat.isFile()) {

                                    if (path.extname(file) == ".xml") {
                                        //TODO find the functions of this function
                                        var f_leveled_set = {
                                            "used_by": {
                                                "bt": [],
                                                "at": []
                                            },
                                            "set": {},
                                            "reusable": {},
                                            "single_use": {},
                                            "dynamic": {},
                                            "single_threaded": {},
                                            "multi_threaded": {}

                                        };
                                        try {
                                            ["single_threaded", "multi_threaded"].forEach(function(t_thread) {
                                                f_leveled_set[t_thread].root_io = JSON.parse(
                                                    fs.readFileSync(cpath + "/" + folder + "/" + file.substring(0, file.length - 4) + "/" + t_thread + "/root_in_out.json", {
                                                        encoding: "utf-8"
                                                    }));
                                                f_leveled_set[t_thread].ordered_set = JSON.parse(
                                                    fs.readFileSync(cpath + "/" + folder + "/" + file.substring(0, file.length - 4) + "/" + t_thread + "/ordered_set.json", {
                                                        encoding: "utf-8"
                                                    }));
                                                f_leveled_set[t_thread].thread_starting_points = JSON.parse(
                                                    fs.readFileSync(cpath + "/" + folder + "/" + file.substring(0, file.length - 4) + "/" + t_thread + "/thread_starting_points.json", {
                                                        encoding: "utf-8"
                                                    }));
                                                f_leveled_set[t_thread].flattened_graph = JSON.parse(
                                                    fs.readFileSync(cpath + "/" + folder + "/" + file.substring(0, file.length - 4) + "/" + t_thread + "/flattened_graph.json", {
                                                        encoding: "utf-8"
                                                    }));
                                            });
                                        } catch (e) {

                                            console.log("Error: " + cpath + "/" + folder + "/" + file.substring(0, file.length - 4));
                                            console.log("\nError message: " + e.message);
                                            process.exit(1);

                                        }

                                        index_functions_rec(cpath + "/" + folder + "/" + file.substring(0, file.length - 4), f_leveled_set, [""]);
                                        lset[folder][file.substring(0, file.length - 4)] = f_leveled_set;
                                    }
                                }
                            });
                        } catch (e) {
                            return;
                        }
                    });


                    var files = fs.readdirSync(cpath);
                    files.forEach(function(file, index, files) {
                        var stat = fs.statSync(cpath + "/" + file);
                        if (stat.isDirectory() && file != 'single_threaded' && file != 'multi_threaded' && file != "reusable" && file != "dynamic" && file != "single_use") {
                            //Recursively operate on the subdirectories.
                            lset.set[file] = {
                                "set": {},
                                "reusable": {},
                                "single_use": {},
                                "dynamic": {}
                            };
                            index_functions_rec(cpath + "/" + file, leveled_set, position.slice().push(file));
                        }
                    });
                }


                index_functions_rec(source_path, f_index, [""]);


                //TODO remove      
                console.log("f_index: \n" + JSON.stringify(f_index, null, 4));

                /////////////////////////////////////////////////////////////
                //Find_functions
                //////////////////

                f_index_v2 = JSON.parse(JSON.stringify(f_index));

                function f_index_function_src_rec(source_path, prog_lang, f_index, s_pointer, new_graph) {
                    var lf_index = traverse_f_index(f_index, s_pointer);

                    Object.keys(lf_index.set).forEach(function(name) {
                        var npointer = s_pointer_dup(s_pointer);
                        npointer[npointer.length - 1][2].push(name);
                        f_index_function_src_rec(source_path, prog_lang, f_index, npointer, false);
                    });
                    ["single_use", "dynamic", "reusable"].forEach(function(fn) {
                        Object.keys(lf_index[fn]).forEach(function(name) {
                            var npointer = s_pointer_dup(s_pointer);
                            npointer.push([fn, name, [""]]);
                            f_index_function_src_rec(source_path, prog_lang, f_index, npointer, true);
                        });
                    });
                    if (new_graph) {
                        var flattened_graph;
                        var ppath = source_path;
                        s_pointer.forEach(function(each) {
                            if (each[0] != "main") {
                                ppath += "/" + each[0] + "/" + each[1];
                            }
                            ppath += set_cpath(each[2], 0, each[2].length - 1);
                        });

                        if (s_pointer.length > 1) {
                            if ("single_threaded" in lf_index) {
                                flattened_graph = lf_index.single_threaded.flattened_graph;
                            } else {
                                flattened_graph = lf_index.multi_threaded.flattened_graph;
                            }
                        } else {
                            flattened_graph = lf_index.flattened_graph;
                        }


                        Object.keys(flattened_graph).forEach(function(cpath) {
                            var node = flattened_graph[cpath];
                            s_pointer[s_pointer.length - 1][2] = node.pointer.slice(0, -1);
                            var node_fn_name = node.pointer[node.pointer.length - 1];

                            lf_index = traverse_f_index(f_index, s_pointer);
                            if (!("nodes" in lf_index)) {
                                lf_index.nodes = {};
                            }
                            lf_index.nodes[node_fn_name] = {
                                "bt": {
                                    "reusable": {},
                                    "dynamic": {},
                                    "single_use": {}
                                },
                                "at": {
                                    "reusable": {},
                                    "dynamic": {},
                                    "single_use": {}
                                }
                            };

                            //We search the function names in the source code and search them with our s_pointer.
                            var source_file = fs.readFileSync(ppath + cpath + src_fext(prog_lang), {
                                encoding: "utf-8"
                            });

                            //Split between regular single thread functions and tail functions.
                            var s_split = source_file.split("!tail!");

                            //Search all functions.
                            var bt_source = s_split[0];

                            var bt_functions = [];
                            var regex = /(DYN\s+|\s*)(.+)\s*\((.+)\)/g;
                            var match;
                            while (match = regex.exec(bt_source)) {
                                bt_functions.push([match[2], match[3].replace(/\s+/g, "").split(","), match[1].trim() == "DYN"]);
                                console.log(match[1]);
                                console.log(match[2]);
                                console.log(match[3]);
                                console.log(match[3].replace(/\s+/g, "").split(","));
                            }

                            bt_functions = clean_function_names(prog_lang, bt_functions);
                            bt_functions.forEach(function(fn) {
                                //TODO remove   
                                console.log(fn);
                                var result = search_f_index(f_index, fn[0], s_pointer, fn[2]);
                                if (result != null) {
                                    lf_index.nodes[node_fn_name]["bt"][result[0]][fn[0]] = [fn[1], result[1]];
                                    var sp = traverse_f_index(f_index, result[1]);
                                    var npointer = s_pointer_dup(s_pointer);
                                    sp[result[0]][fn[0]].used_by.bt.push([node_fn_name, npointer]);
                                }

                                //TODO remove
                                console.log(result);
                            });
                            if (s_split.length == 2) {
                                var at_source = s_split[1];

                                var at_functions = [];
                                var match;
                                while (match = regex.exec(at_source)) {
                                    at_functions.push([match[2], match[3].replace(/\s+/g, "").split(","), match[1].trim() == "DYN"]);
                                }
                                at_functions = clean_function_names(prog_lang, at_functions);
                                at_functions.forEach(function(fn) {
                                    //TODO remove
                                    console.log(fn);
                                    var result = search_f_index(f_index, fn[0], s_pointer, fn[2]);

                                    if (result != null) {
                                        lf_index.nodes[node_fn_name]["at"][result[0]][fn[0]] = [fn[1], result[1]];
                                        var sp = traverse_f_index(f_index, result[1]);
                                        var npointer = s_pointer_dup(s_pointer);
                                        sp[result[0]][fn[0]].used_by.at.push([node_fn_function, npointer]);
                                    }

                                    //TODO remove
                                    console.log(result);
                                });
                            }

                            //TODO print an error if multiple tails exist.


                        });
                    }

                }

                f_index_function_src_rec(source_path, prog_lang, f_index_v2, [
                    ["main", "", [""]]
                ], true);



                ///////////////////////////////////////////////////////////////////////////////
                //check_deterministic_mutation_losslessness
                ///////////////
                f_index_v3 = JSON.parse(JSON.stringify(f_index_v2));

                function check_iterate(f_index) {

                    var flattened_graph = f_index.flattened_graph;

                    //Check the inputs of the function to find if they are mutable.
                    var mutable_input_nodes = {};
                    Object.keys(f_index.thread_starting_points[-1]).forEach(function(key) {
                        Object.keys(f_index.thread_starting_points[-1][key]).forEach(function(cpath) {
                            var node = flattened_graph[cpath];
                            Object.keys(node.inputs).forEach(function(vname) {
                                if ("mutable" in node.inputs[vname].properties) {
                                    if (vname in mutable_input_nodes) {
                                        console.log("Error: Mutable input variable of a function is used by multiple nodes.");
                                        console.log("Path: " + cpath);
                                        console.log("name: " + vname);
                                        process.exit(1);
                                    } else {
                                        mutable_input_nodes[vname] = [cpath, node];
                                    }
                                }
                            });
                        });
                    });

                    Object.keys(mutable_input_nodes).forEach(function(vname) {
                        var cpath = mutable_input_nodes[vname][0];
                        var node = mutable_input_nodes[vname][1];
                        check_mutability_rec(f_index, cpath, -1, vname, 0);
                    });


                    Object.keys(flattened_graph).forEach(function(cpath) {
                        var node = flattened_graph[cpath];
                        Object.keys(node.outputs).forEach(function(vname) {
                            node.outputs[vname].forEach(function(item) {
                                if ("mutable" in item.properties) {

                                    if (vname.match(/_v1$/) == null) {
                                        console.log("Error:Mutable output variable whose name is not in the form (name)_v1");
                                        console.log("Path: " + cpath);
                                        console.log("name: " + vname);
                                        process.exit(1);
                                    }

                                    check_mutability_rec(f_index, cpath, -1, vname.slice(0, -3), 0);
                                }
                                if ("historical" in item.properties) {
                                    node.properties.ordered = true;
                                    item.properties.lossless = true;
                                    propagate_ordered(f_index, cpath);
                                    //TODO propagate_losslessness();
                                    //TODO propagate_indirect_historical();  ??

                                }
                                if ("lossless" in item.properties) {
                                    //TODO propagate_losslessness();
                                }
                            });
                        });

                        if ("ordered" in node.properties) {
                            //TODO propagate_ordered();
                        }
                    });

                    ["reusable", "single_use", "dynamic"].forEach(function(fn_type) {
                        Object.keys(f_index[fn_type]).forEach(function(fn) {
                            var lf_index = f_index[fn_type][fn];
                            //Recursively iterate here
                            check_iterate(lf_index);

                        });
                    });


                }



                function check_mutability_rec(f_index, cpath, set, vname, version) {
                    var flattened_graph = f_index.flattened_graph;
                    var node = flattened_graph[cpath];
                    var fn_name = node.pointer[node.pointer.length - 1];

                    //Check that the node belongs to a different thread subgraph.
                    if (node.properties.set == set) {
                        console.log("Error: Mutable variable has 2 functions/nodes in the same thread subgraph.");
                        console.log("Path: " + cpath);
                        console.log("name: " + vname);
                        process.exit(1);
                    }

                    //Go inside the source_code.
                    ["reusable", "single_use"].forEach(function(fn_type) {
                        var temp = f_index.nodes[fn_name].at[fn_type];
                        Object.keys(temp).forEach(function(src_fn) {
                            temp[src_fn][0].forEach(function(fn_var) {
                                if (fn_var == vname) {

                                    //Log that this function can indeed get the mutable var from the previous level.
                                    if (temp[src_fn].length < 3) {
                                        temp[src_fn].push({
                                            "mutable": {}
                                        });
                                    }
                                    temp[src_fn][2]["mutable"][fn_var] = true;
                                }
                            });

                        });
                    });


                    //Traverse the graph.
                    Object.keys(node.outputs).forEach(function(name) {
                        var regex = new RegExp("/" + vname + "_v(\d+)$/");
                        var match = name.match(regex);
                        if (match != null) {
                            if (match[1] != version) {
                                console.log("Error:Mutable output variable has incorrect version");
                                console.log("Path: " + cpath);
                                console.log("name: " + name);
                                console.log("It should have been: " + vname + "_v" + version);
                                process.exit(1);
                            }
                            if (node.outputs[name].length > 1) {
                                console.log("Error: Mutable variable has multiple output end points.");
                                console.log("Path: " + cpath);
                                console.log("name: " + name);
                                process.exit(1);

                            }
                            node.outputs[name].forEach(function(item) {
                                var ncpath = set_cpath(item.end_pointer, 0, item.end_pointer.length - 1);
                                check_mutability_rec(f_index, ncpath, node.properties.set, vname, version + 1);

                            });
                        }
                    });




                }


                function propagate_ordered(f_index, cpath) {





                }



                check_iterate(f_index_v3);


                ////////////////////////////////////////////////////////////
            }
            //////////////////////////////////////////////////////////
            //generate_src
            //////////////////////


        //end of single_use
        //////////////////////////////////////////////////////////
        //if_root_io
        ///////////////

        //TODO
        //!tail!
        switch (root_io) {
            case true:
                save_input_to_files(fs, source_path, single_threaded, ordered_set, thread_starting_points_v2, flattened_graph_v4);
                break;
            case false:
                //TODO remove this with the generate_src single_use function
                generate_src(source_path, flattened_graph_v4, fs, path, prog_lang, thread_starting_points_v2, ordered_set);
                break;

        }


        ////////////////////////////////////////////////////////
    }
    //end of if_root_io
    ///////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////
    //generate_src
    //////////////////////////////////////////
    //Generate the code.
    /*

        fs.writeFileSync("/tmp/leveled_graph.json", JSON.stringify(leveled_graph,null,4));
        fs.writeFileSync("/tmp/flattened_graph.json", JSON.stringify(flattened_graph,null,4));
        fs.writeFileSync("/tmp/thread_starting_points.json", JSON.stringify(thread_starting_points,null,4));


        if (prog_lang == "js-browser") {
    var result = exec.exec("ribosome.js generate_js-browser_src.js.dna "+source_path+" /tmp/leveled_graph.json /tmp/flattened_graph.json /tmp/thread_starting_points.json");
    console.log(result.stdout);
        }
        if (prog_lang == "rust") {}
    */
    ////////////////////////////////////////////////////////////////
}
//endof generate_src
///////////////////////////////////////////////////////////////////
/*

    var parsejs = require("./parse.js");

    var po = parsejs("./meta_src/metareact/compiler");

*/
//////////////////////////////
//format_XML

////////////
function format_XML(source_path) {


    function format_XML_rec(source_path) {
        //Check if it is a file or a directory.
        var files = fs.readdirSync(source_path);
        files.forEach(function(file, index, files) {
            var stat = fs.statSync(source_path + "/" + file);

            if (stat.isFile()) {
                if (path.extname(file) == ".xml") {
                    //Format the xml file.
                    exec.run("export XMLLINT_INDENT='    '\nxmllint --format " + source_path + "/" + file + " --output " + source_path + "/" + file);

                }

            } else {
                if (stat.isDirectory()) {

                    //Recursively operate on the subdirectories.
                    format_XML_rec(source_path + "/" + file);
                }

            }

        });
    }
    exec.run("export XMLLINT_INDENT='    '\nxmllint --format " + source_path + ".xml" + " --output " + source_path + ".xml");

    format_XML_rec(source_path);
}
format_XML(source_path);



///////////////////////////////////

/*
var orderjs = require("./order.js");
orderjs(po.graph,po.async);

*/

//TEST
/*

var Js_lang = require("./js_lang.js");
var js_lang = new Js_lang();


var string = "function Troll(){\nthis.foe= 2;\n}\n";


console.log(js_lang.beautify(string));




try {
    fs.mkdirSync("./src");
} catch (e) {};

var Meta_info = require("./meta_info/meta_info.js");
var meta_info = new Meta_info();

console.log(meta_info.header());
meta_info.authors_file();
meta_info.license();


*/
