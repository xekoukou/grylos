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
                                fn_name: value[0]
                            };
                            if (value.length > 1) {
                                for (var i = 0; i < value[1].length; i++) {
                                    var xar = value[1].charAt(i);
                                    if (xar == "c") {
                                        function_name.concurrent = "true";
                                    } else {
                                        if (xar == "a") {
                                            function_name.asynchronous = "true";
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
        console.log(function_names);

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
                            lend_points[y][x] = fn.fn_name;

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

                                    path.end_fn_name = lend_points[path.y][path.x];
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
                                                if (each == "a") {
                                                    path.asynchronous = true;
                                                } else {
                                                    if (each == "h") {
                                                        path.historical = true;
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

                if (!graph[each.origin_fn_name]) {
                    graph[each.origin_fn_name] = [];
                }
                graph[each.origin_fn_name].push(each);
                delete(each.origin_fn_name);

            });


            graphs.push(graph);

        });


        //////////////////////////////////////////////////////////////////
    }
    //endof create_graphs
    ///////////////////////////////////////////////////////////////////
    //check_same_output_name    
    ////////////////////////

    graphs.forEach(function(graph, index) {
        var vnames = {};
        Object.keys(graph).forEach(function(fn_name) {
            var lvnames = {};
            graph[fn_name].forEach(function(path) {
                lvnames[path.vname] = null;
            });
            Object.keys(lvnames).forEach(function(item) {
                if ((vnames[item] == true) && (item != "null")) {
                    console.log("Error: " + mr_file_paths[index]);
                    console.log("function: " + fn_name + " output name: " + item);
                    console.log("Multiple outputs with the same name.");
                    //error
                } else {
                    vnames[item] = true;
                }

            });
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

            var node = graph[fn_name];
            //Adds the node.
            $("graph").append("<node fn_name='" + fn_name + "'>" + "</node>");

            node.forEach(function(path) {
                //Adds one output tag per vname.
                if ($("graph node[fn_name='" + fn_name + "'] output[name='" + path.vname + "']").length == 0) {
                    $("graph node[fn_name='" + fn_name + "']").append("<output name='" + path.vname + "'> </ouptut>");

                }
                //Adds multiple end_points per vname with their properties.
                $("graph node[fn_name='" + fn_name + "'] output[name='" + path.vname + "']").append("<end_point fn_name='" + path.end_fn_name + "' " + ((path.historical) ? "historical='" + path.historical + "' " : "") + ((path.passive) ? "passive='" + path.passive + "' " : "") + ((path.asynchronous) ? "asynchronous='" + path.asynchronous + "' " : "") + "></end_point>");


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

                    var outerHTML;

                    //To address namespace colisions,we set the origin (location and internal name) of the input.
                    var origin_locations = [];
                    var origin_names = [];
                    if (generated == "true") {

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
                                console.log("Error: Multiple origins with the same attributes.");
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

                                    console.log("Error: IOput contains only part of the origins of an input of a child.");
                                    console.log("Folder: " + cpath);
                                    console.log("Value name: " + name);
                                    format_XML(source_path);
                                    process.exit(0);

                                }

                            }
                        });

                        if (isTrue == 0) {
                            //We check if there is already an input with the same name.
                            if (parent("inputs input[name='" + name + "']").length != 0) {
                                console.log("Error: Multiple inputs with the same name.");
                                console.log("Folder: " + cpath);
                                console.log("Name: " + name);
                                origin_locations.forEach(function(item, index) {
                                    console.log("Origin name: " + origin_names[index]);
                                    console.log("Origin location: " + item);

                                });
                                parent("inputs input[name='" + name + "'] origin").each(function() {
                                    console.log("Origin name: " + $(this).attr("origin_name"));
                                    console.log("Origin location: " + $(this).attr("origin_location"));
                                });

                                format_XML(source_path);
                                process.exit(0);
                            }
                            //Insert an inputs tag if it is missing.
                            if (parent("inputs").length == 0) {
                                parent("root").append("<inputs/>");
                            }
                            parent("inputs").append(outerHTML);
                        }
                    }

                });



                $("outputs output").each(function(each) {
                    var name = $(this).attr("name");
                    var generated = $(this).attr("generated");

                    var outerHTML;

                    //To address namespace colisions,we set the origin (location and internal name) of the output.
                    var origin_locations = [];
                    var origin_names = [];
                    if (generated == "true") {

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

                    //Only add it to outputs if it is an external output requirement.
                    if (parent("graph node[fn_name='" + fn_name + "'] output[name='" + name + "']").length == 0) {

                        //We reject output if the user has already declared it. This way the user can catch values
                        //that represent the same thing.

                        var isTrue = 'start';
                        origin_locations.forEach(function(origin_location, index) {
                            var origin_name = origin_names[index];

                            var exists = parent("outputs output origin[origin_name='" + origin_name + "'][origin_location='" + origin_location + "']").length;

                            //Here we also check the existence of multiple outputs that have the same origin.
                            if (exists > 1) {
                                console.log("Error: Multiple origins with the same attributes.");
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

                                    console.log("Error: IOput contains only part of the origins of an output of a child.");
                                    console.log("Folder: " + cpath);
                                    console.log("Value name: " + name);
                                    format_XML(source_path);
                                    process.exit(0);

                                }

                            }
                        });

                        if (isTrue == 0) {
                            //We check if there is already an output with the same name.
                            if (parent("outputs output[name='" + name + "']").length != 0) {

                                //if it is null, we just add the origins since there can be only one null varriable.
                                if (name == "null") {

                                    origin_locations.forEach(function(item, index) {
                                        parent("outputs output[name='" + name + "']").append("<origin origin_name='" + origin_names[index] + "' origin_location='" + item + "' generated='true'/>");
                                    });
                                    return;
                                } else {
                                    console.log("Error: Multiple outputs with the same name.");
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
                                }
                            }
                            //Insert an outputs tag if it is missing.
                            if (parent("outputs").length == 0) {
                                parent("root").append("<outputs/>");
                            }
                            parent("outputs").append(outerHTML);
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

///////////////////////////////////////////////////////////////////
//insert_missing_io_tags_from_graph

///////////////////////////
graphs.forEach(function(graph, index) {
    Object.keys(graph).forEach(function(fn_name) {

        //check whether this function contains code or is a subgraph.
        //If it is a subgraph, all ioputs should have been inserted by the programmer/compiler already, so return an error.
        var obottom = true;
        if (fs.existsSync(mr_file_paths[index] + "/" + fn_name + ".mr")) {
            obottom = false;
        }

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
        graph[fn_name].forEach(function(path) {
            //Add only one output per vname.
            if (o("outputs output[name='" + path.vname + "']").length == 0) {
                if (obottom || (path.vname == "null")) {
                    o("outputs").append("<output generated='true' name='" + path.vname + "'/>");
                } else {
                    console.log("Error: There is an output defined in the graph that cannot be automatically generated. Please specify the origin of this output.");
                    console.log("File:" + mr_file_paths[index] + "/" + fn_name + ".xml");
                    console.log("name:" + path.vname);
                    format_XML(source_path);
                    process.exit(0);
                }
            }
            var ibottom = true;
            if (fs.existsSync(mr_file_paths[index] + "/" + path.end_fn_name + ".mr")) {
                ibottom = false;
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
                if (ibottom || (path.vname == "null")) {
                    i("inputs").append("<input generated='true' name='" + path.vname + "'/>");
                    fs.writeFileSync(ixml_path, i.html());
                } else {

                    console.log("Error: There is an input defined in the graph that cannot be automatically generated. Please specify the origin of this input.");
                    console.log("File:" + mr_file_paths[index] + "/" + path.end_fn_name + ".xml");
                    console.log("name:" + path.vname);
                    format_XML(source_path);
                    process.exit(0);
                }
            }
        });
        fs.writeFileSync(oxml_path, o.html());



    });
});
/////////////////////////////////////////////////////////////////////
//check_ioputs_have_origins

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

    $("inputs input[side-effect!='true']").each(function() {
        if ($(this).attr("name") != "null") {
            if ($("origin", this).length == 0) {
                console.log("Error: There is an input of a subgraph that doesn't have an origin");
                console.log("File: " + xml_path);
                console.log("Name: " + $(this).attr("name"));
                format_XML(source_path);
                process.exit(0);
            }
        }
    });

    $("outputs output[side-effect!='true']").each(function() {
        if ($(this).attr("name") != "null") {
            if ($("origin", this).length == 0) {
                console.log("Error: There is an output of a subgraph that doesn't have an origin");
                console.log("File: " + xml_path);
                console.log("Name: " + $(this).attr("name"));
                format_XML(source_path);
                process.exit(0);
            }
        }
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
                        if (!fs.existsSync(file_name.substring(0, file_name.length - 4))) {
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

                }

            });
        }
        var parent = [];
        find_starting_points_rec(source_path, parent);
        console.log(starting_points);

        //////////////////////////////////////////////////////////////////
        //create_flattened_graph
        var flattened_graph;
        ///////////////////////////
        flattened_graph = {};

        function set_cpath(pointer, start, end) {
            var cpath = pointer[start];
            for (var i = start + 1; i <= end; i++) {
                cpath = cpath + "/" + pointer[i];
            }
        }


        starting_points.forEach(function(pointer) {
            var cpath;
            var edge = null;

            function traverse(pointer, edge) {
                cpath = set_cpath(pointer, 0, pointer.length - 1);
                //check whether the node has already been traversed
                if (typeof flattened_graph[cpath] == "undefined") {
                    //insert the new node
                    flattened_graph[cpath] = {
                        pointer: pointer,
                        inputs: {},
                        outputs: {}
                    };
                    var node = flattened_graph[cpath];
                    //Add the edge from which we arrived here.
                    if (edge != null) {
                        if (typeof node.inputs[edge.o_name] == "undefined") {
                            node.inputs[edge.origin_name] = {};
                        }
                        node.inputs[edge.origin_name][edge.end_name] = edge;
                    }

                    var xml_file = fs.readFileSync(source_path + "/" + cpath + ".xml", {
                        encoding: "utf-8"
                    });

                    var $ = cheerio.load(xml_file, {
                        xmlMode: true
                    });
                    //we are at the bottom and for each output, we need to go up till we find where we send the output.
                    $("outputs output[side-effect!='true']").each(function() {
                        var origin_name = $(this).attr("name");
                        var i = 1;
                        while (i <= pointer.length) {
                            var cpath;
                            if (pointer.length - i - 1 >= 0) {
                                cpath = source_path + "/" + set_cpath(pointer, 0, pointer.length - i - 1);
                            } else {
                                cpath = source_path;
                            }
                            var origin_location = set_cpath(pointer, pointer.length - i, pointer.length - 1);




                            i++;
                        }
                    });

                }
            }

        });
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
