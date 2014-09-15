var fs = require("fs");
var path = require("path");
var cheerio = require('cheerio');


module.exports = function(cpath) {

    var graph = {};
    var async = [];
    var root = [];

    function parse(cpath, graph) {
        var file = fs.readFileSync(cpath + ".xml", {
            encoding: "utf-8"
        });

        if (file) {

            var $ = cheerio.load(file, {
                xmlMode: true
            });



            if ($("graph").length != 0) {

                console.log("Parse:");
                $("graph node").each(function(i) {
                    var node = $(this).attr("fn_name");
                    console.log($(this).html());
                    graph[node] = {};
                    graph[node]["output"] = {};
                    graph[node]["input"] = {};
                    graph[node]["graph"] = {};
                    var once_async = 0;
                    $("output", this).each(function(index) {
                        console.log($(this).html());

                        var name = $(this).attr("name");
                        if (graph[node]["output"][name] == undefined) {
                            graph[node]["output"][name] = {};
                        }
                        var fn_name;
                        var passive;
                        var asynchronous;
                        var historical;
                        $("end_point", this).each(function() {
                            fn_name = $(this).attr("fn_name");
                            passive = $(this).attr("passive");
                            asynchronous = $(this).attr("asynchronous");
                            historical = $(this).attr("historical");

                            graph[node]["output"][name][fn_name] = {
                                passive: passive,
                                asynchronous: asynchronous,
                                historical: historical
                            };

                            if (asynchronous == "true") {
                                once_async = 1;
                            }

                        });


                    });

                    if (once_async == 1) {
                        async.push({
                            root: root.slice(),
                            node: node
                        });
                    }

                    $("input", this).each(function(index) {
                        var name = $(this).attr("name");
                        graph[node]["input"][name] = {};

                    });


                });





                Object.keys(graph).forEach(function(key) {
                    root.push(key);
                    parse(cpath + "/" + key, graph[key]["graph"]);
                    root.pop();
                });
            } else {

            }


        } else {

            console.log("XML file " + cpath + " is missing.");
        }


    }

    parse(cpath, graph);

    console.log("graph:");
    console.log(JSON.stringify(graph, null, 4));
    console.log("async:");
    console.log(JSON.stringify(async, null, 4));


    var output = {
        graph: graph,
        async: async
    };

    return output;

}
