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
                        remove_generated_XML(cpath + "/" + file_name);
                    }

                }

            }

        );



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
        srcodes.forEach(function(code) {
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
                        var alphanum = string.match(/^[a-z_0-9]+$/i);
                        if (alphanum) {
                            //store them
                            functions.push({
                                x: x,
                                y: y,
                                fn_name: alphanum[0]
                            });
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
                            if ((xar != " ")) {
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
                                process.exit(0);
                            } else {
                                return;
                            }
                        }
                        //Maling sure paths have only one possible direction to go.
                        if ((up && down) || (up && right) || (down && right)) {
                            console.log("\nError: mr_file:" + mr_file_paths[index] + ".mr(line: " + path.y + "," + "position: " + path.x + ")");
                            console.log("Multiple paths detected.");
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
        console.log(JSON.stringify(graphs, null, 4));


        //////////////////////////////////////////////////////////////////
    }
    //endof create_graphs
    ///////////////////////////////////////////////////////////////////
    //insert_missing_io_tags

    ///////////////////////////
    graphs.forEach(function(graph, index) {
        Object.keys(graph).forEach(function(fn_name) {


            var oxml_path = mr_file_paths[index] + "/" + fn_name + ".xml";
            try {
                var oxml_file = fs.readFileSync(oxml_path, {
                    encoding: "utf-8"
                });
            } catch (e) {
                console.log("\nError: xml file missing:" + oxml_path);
                process.exit(0);
            }

            var o = cheerio.load(oxml_file, {
                xmlMode: true
            });
            if (o("outputs").length == 0) {
                o("root").append("<outputs/>");
            }
            graph[fn_name].forEach(function(path) {
                if (o("outputs output[name='"+path.vname+"'").length==0) {
                    o("outputs").append("<output generated='true' name='" + path.vname + "'/>");
                }
                var ixml_path = mr_file_paths[index] + "/" + path.end_fn_name + ".xml";
                try {
                    var ixml_file = fs.readFileSync(ixml_path, {
                        encoding: "utf-8"
                    });
                } catch (e) {
                    console.log("\nError: xml file missing:" + ixml_path);
                    process.exit(0);
                }

                var i = cheerio.load(ixml_file, {
                    xmlMode: true
                });
                if (i("inputs").length == 0) {
                    i("root").append("<inputs/>");
                }

                i("inputs").append("<input generated='true' name='" + path.vname + "'/>");
                fs.writeFileSync(ixml_path, i.html());
            });
            fs.writeFileSync(oxml_path, o.html());



        });
    });

    //////////////////////////////////////////////////////////////////
}
//endof parse_mr_files
//////////////////////////////////////////////////////////////////////


/*


    var react_iterate = require("./react_iterate.js");
    react_iterate("./meta_src");

    var create_ioputs_tags = require('./create_ioputs.js').create_ioputs_tags;

    create_ioputs_tags("./meta_src/metareact");

    var create_ioputs = require('./create_ioputs.js').create_ioputs;
    create_ioputs("./meta_src/metareact/compiler");


    var parsejs = require("./parse.js");

    var po = parsejs("./meta_src/metareact/compiler");

*/
//////////////////////////////
//format_XML

////////////
function format_XML(source_path) {

    //Check if it is a file or a directory.
    var files = fs.readdirSync(source_path);
    files.forEach(function(file, index, files) {
        var stat = fs.statSync(source_path + "/" + file);

        if (stat.isFile()) {
            if (path.extname(file) == ".xml") {
                //Format the xml file.
                exec.run("xmllint --format " + source_path + "/" + file + " --output " + source_path + "/" + file);

            }

        } else {
            if (stat.isDirectory()) {

                //Recursively operate on the subdirectories.
                format_XML(source_path + "/" + file);
            }

        }

    });

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
