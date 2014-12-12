//////////////////////////////////////////////////////////////
//main
var source_path;
///////////////

if (process.argv.length != 3) {
    console.log("Please provide the source directory of your project.");
    return -1;
}

source_path = process.argv[2];
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
                        process.exit(-1);
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
        var files = fs.readdirSync(cpath);
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


                        //Recursively operate on the subdirectories.
                        delete_generated_src(cpath + "/" + file_name);
                    }

                }

            }

        );



    }


    delete_generated_src(source_path);
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
                if (stat.isDirectory()) {
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
                                            console.log("Error: There is no option '" + xar + "' for a function");
                                            console.log("File: " + mr_file_paths[index]);
                                            console.log("Function Name: " + value[0]);
                                            process.exit(0);
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
                            lend_points[y][x] = {
                                fn_name: fn.fn_name,
                                properties: fn.properties
                            };

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
        var graphs;
        ///////////////////////////
        graphs = [];
        end_points.forEach(function(lend_points, index) {
            var code = srcodes[index];
            var paths = [];
            Object.keys(lend_points).forEach(function(y_key) {
                Object.keys(lend_points[y_key]).forEach(function(x_key) {
                    var path = {
                        y: +y_key,
                        x: +x_key,
                        origin: lend_points[y_key][x_key]
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
                                process.exit(0);
                            } else {
                                return;
                            }
                        }
                        //Maling sure paths have only one possible direction to go.
                        if ((up && down) || (up && right) || (down && right)) {
                            console.log("\nError: mr_file:" + mr_file_paths[index] + ".mr(line: " + path.y + "," + "position: " + path.x + ")");
                            console.log("Multiple paths detected.");
                            format_XML(source_path);
                            process.exit(0);
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
                                    process.exit(0);
                                } else {
                                    path.vname = array[0];
                                    path.x = path.x + array[0].length + 2;
                                }


                            } else {
                                //Checking if this is the end of the path.
                                if (xar == "|") {

                                    path.end_fn_name = lend_points[path.y][path.x].fn_name;
                                    break;

                                } else {
                                    //Checking for the existence of options or return an error if it doesn't match any of the possible options.
                                    if (xar != "-") {
                                        var options = line.substring(path.x).split("-")[0];
                                        path.x = path.x + options.length - 1;
                                        for (var i = 0; i < options.length; i++) {
                                            var each = options.charAt(i);
                                            if (each == "p") {
                                                path.passive = true;
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
                                                            console.log("\nError: mr_file:" + mr_file_paths[index] + ".mr(line: " + path.y + "," + "position: " + path.x + ")");
                                                            console.log("Wrong option type.");
                                                            format_XML(source_path);
                                                            process.exit(0);
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



            //check that all paths have value names and concatenate paths with same origin
            var graph = new Object();

            paths.forEach(function(each) {
                if (!each.vname) {
                    console.log("Error: (" + each.origin_fn_name + "," + each.end_fn_name + ") : There is a path with no value name ");
                    format_XML(source_path);
                    process.exit(0);
                }

                if (!graph[each.origin.fn_name]) {
                    graph[each.origin.fn_name] = {
                        properties: each.origin.properties,
                        paths: []
                    };
                }
                graph[each.origin.fn_name]["paths"].push(each);
                delete(each.origin);

            });


            graphs.push(graph);

        });

        //TODO remove   console.log(JSON.stringify(graphs, null, 4));

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
                process.exit(0);
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
                    process.exit(0);
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
                    process.exit(0);
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
                process.exit(0);
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
                            process.exit(0);

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
                    process.exit(0);

                }


                //The asynchronous property cannot be set in a subgraph.
                if (fs.existsSync(mr_file_paths[index] + "/" + fn_name)) {
                    console.log("Error: The asynchronous property has been set in a 'subgraph' node");
                    console.log("File:" + mr_file_paths[index] + ".mr");
                    console.log("Fn_name:" + fn_name);
                    format_XML(source_path);
                    process.exit(0);

                }

                //The asynchronous property can only be set at the top level.
                if (mr_file_paths[index] != source_path) {
                    console.log("Error: The asynchronous property has been set in a level that is not the top.");
                    console.log("File:" + mr_file_paths[index] + ".mr");
                    console.log("Fn_name:" + fn_name);
                    format_XML(source_path);
                    process.exit(0);

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
            process.exit(0);
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
                $("graph node[fn_name='" + fn_name + "'] output[name='" + path.vname + "']").append("<end_point fn_name='" + path.end_fn_name + "' " + ((path.mutable) ? "mutable='" + path.mutable + "' " : "") + ((path.dependency) ? "dependency='" + path.dependency + "' " : "") + ((path.historical) ? "historical='" + path.historical + "' " : "") + ((path.passive) ? "passive='" + path.passive + "' " : "") + "></end_point>");


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
                                process.exit(0);
                            }
                            if (isTrue == 'start') {
                                isTrue = exists;
                            } else {
                                if (isTrue != exists) {

                                    console.log("Error: Input contains only part of the origins of an input of a child.");
                                    console.log("Folder: " + cpath);
                                    console.log("Value name: " + name);
                                    format_XML(source_path);
                                    process.exit(0);

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
                                process.exit(0);


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
                                process.exit(0);
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
                                        process.exit(0);
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
                            process.exit(0);
                        }
                        if (isTrue == 'start') {
                            isTrue = exists;
                        } else {
                            if (isTrue != exists) {

                                console.log("Error: Output contains only part of the origins of an output of a child.");
                                console.log("Folder: " + cpath);
                                console.log("Value name: " + name);
                                format_XML(source_path);
                                process.exit(0);

                            }

                        }
                    });

                    if (isTrue == 1) {
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
                            process.exit(0);


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
                            process.exit(0);
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
                                    process.exit(0);
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
                                        process.exit(0);

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
        process.exit(0);
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
            process.exit(0);
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
                    process.exit(0);

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
            process.exit(0);
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
                    process.exit(0);

                }
            });
        });

    });

});

/////////////////////////////////////////////////////////////////////
//check_only_side_effects_exist

//////////////////////////////
var xml_file = fs.readFileSync(source_path + ".xml", {
    encoding: "utf-8"
});

var $ = cheerio.load(xml_file, {
    xmlMode: true
});

$("inputs input").each(function() {
    if ($(this).attr("side-effect") != "true") {
        console.log("Error: There is an input which is not a side_effect in the root xml_file.");
        console.log("Name: " + $(this).attr("name"));
        format_XML(source_path);
        process.exit(0);
    }
});

$("outputs output").each(function() {
    if ($(this).attr("side-effect") != "true") {
        console.log("Error: There is an output which is not a side_effect in the root xml_file.");
        console.log("Name: " + $(this).attr("name"));
        format_XML(source_path);
        process.exit(0);
    }
});
////////////////////////////////////////////////////////////////////
//generate_src
/////////////////
{
    ///////////////////////////////////////////////////////////////////
    //flatten_graph
    ////////////////
    {
        //TODO we need to put reusable functions somewhere
        function set_cpath(pointer, start, end) {
            var cpath = pointer[start];
            for (var i = start + 1; i <= end; i++) {
                cpath = cpath + "/" + pointer[i];
            }
            return cpath;
        }


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
                    var element = parent.slice();
                    element.push(file_name);
                    find_starting_points_rec(cpath + "/" + file_name, element);

                }

            });
        }
        var parent = [""];
        find_starting_points_rec(source_path, parent);


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
                    if ($(this).attr("concurrent") == "true") {
                        concurrent_index++;
                        node.concurrent = concurrent_index;
                    }
                    if ($(this).attr("asynchronous") == "true") {
                        node.asynchronous = "true";
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
        console.log("Node_properties: \n" + JSON.stringify(node_properties, null, 4));

        //////////////////////////////////////////////////////////////////
        //create_flattened_graph
        var flattened_graph;
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
                        properties: {}
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
                        if (key.indexOf(cpath) == 0) {
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

        //TODO remove   
        console.log(JSON.stringify(flattened_graph, null, 4));

        /////////////////////////////////////////////////////////////////
    }
    //endof flatten_graph
    //////////////////////////////////////////////////////////////////
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