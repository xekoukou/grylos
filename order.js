module.exports = function(graph, async) {


    function point(root) {
        var pointer = {
            graph: graph
        };
        root.forEach(function(key) {
            pointer = pointer["graph"];
            pointer = pointer[key];
        });
        return pointer;
    }

    function markDeep(root, vname, index) {

        var pointer = point(root);
        Object.keys(pointer["graph"]).forEach(function(node_name) {
            var node = pointer["graph"][node_name];

            if (vname in node["input"]) {
                if (!("which" in node)) {
                    node.which = {};
                }
                node.which[index] = true;
                var lroot = root.slice();
                lroot.push(node_name);
                markDeep(lroot, vname, index);
            }
        });

    }


    //Find the boundaries of the asynchronous functions at which point we will perform memoization

    async.forEach(function(each, index) {
        var pointer = point(each.root);
        var root = each.root.slice();

        pointer = pointer["graph"][each.node];
        if (!("which" in pointer)) {
            pointer.which = {};
        }
        console.log(pointer);
        pointer.which[index] = true;

        function step(root, pointer) {

            //IMPORTANT  Here we assume that all outputs of a node can either be asynchronous or not

            Object.keys(pointer["output"]).forEach(function(vname) {

                if (vname != "null") {
                    //check if it is an internal node
                    var edge = pointer["output"][vname];
                    if (Object.keys(edge).length == 0) {

                        var lroot = root.slice();
                        var lpointer;

                        //this should only happen if it is a side effect else it is an error.
                        var end_fn = 0;
                        while (lroot.length > 0) {
                            lpointer = point(lroot);
                            if (!("which" in lpointer)) {
                                lpointer.which = {};
                            }
                            lpointer.which[index] = true;
                            //It should always exist
                            edge = lpointer["output"][vname];
                            if (Object.keys(edge).length != 0) {
                                end_fn = 1;
                                break;
                            }
                            lroot.pop();
                        }
                        if (end_fn) {

                            Object.keys(edge).forEach(function(end_name) {
                                var end = edge[end_name];

                                if ((end.historical != "true") || (end.passive != "true")) {
                                    lpointer = point(lroot);
                                    lpointer = lpointer["graph"][end_name];
                                    if (typeof lpointer.which == undefined) {
                                        lpointer.which = [];
                                    }
                                    lpointer.which.push(index);

                                    lroot.push(end_name);
                                    //go DEEP
                                    markDeep(lroot, vname, index);

                                }
                                if ((end.historical != "true") || (end.passive != "true")) {
                                    step(lroot, lpointer);

                                }
                            });
                        }




                    } else {


                        //TODO 
                    }
                }

            });

        };



    });


}
