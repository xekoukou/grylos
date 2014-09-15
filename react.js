fs = require("fs");

module.exports = function(path) {

    var code = fs.readFileSync(path).toString().split("\n");

    //finding the functions
    var functions = new Array();

    var y = 0;
    while (y < code.length) {
        var x = 0;
        var line = code[y];
        while (x < line.length) {
            var xar = line.charAt(x);

            if (xar == " ") {
                x++;
                continue;
            } else {
                var string = line.substring(x).split(" ", 1)[0];
                var alphanum = string.match(/^[a-z_0-9]+$/i);
                if (alphanum) {
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


    console.log(functions);


    var end_points = new Object();

    functions.forEach(function(fn) {

        if (fn.y + 1 < code.length) {
            var y = fn.y + 1;
            var line = code[y];
            var x = fn.x;
            var once = 0;
            while ((x < fn.x + fn.fn_name.length) && (x < line.length)) {
                var xar = line.charAt(x);

                if (xar == "|") {
                    if (!end_points[y]) {
                        end_points[y] = new Object();
                    }
                    end_points[y][x] = fn.fn_name;

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


    //traversing the paths


    paths.forEach(function(path) {
        while (true) {
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


            if (!(up || down || right)) {
                line = code[path.y];
                xar = line.charAt(path.x);
              if(xar != "|"{
                console.log("Error:(line: " + path.y + "," + "position: " + path.x + ") A path with no end.");
                process.exit(0);}
            else{
             return; 
            }}
            if((up &&down)|| (up && right)|| (down && right)){
                console.log("Error:(line: " + path.y + "," + "position: " + path.x + ") Multiple paths detected.");
}            

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

                if (xar == "(") {
                    var array = line.substring(path.x + 1).split(")");
                    if (array.length < 1) {

                        console.log("Error:(line: " + path.y + "," + "position: " + path.x + ") There is a missing ')'.");
                    } else {
                        path.vname = array[0];
                        path.x = path.x + array[0].length + 2;
                    }


                } else {

                    if (xar == "|") {

                        path.end_fn_name = start_points[path.y][path.x];
                        break;

                    } else {

                        if (xar != "-") {
                            var options = line.substring(path.x).split("-")[0];
                            path.x = path.x + options.length - 1;
                            for (var i = 0; i < options.length; i++) {
                                var each = options.charAt(i);
                                if (each == "p") {
                                    path.passive = true;
                                }else{
                                if (each == "a") {
                                    path.asynchronous = true;
                                }else{
                                if (each == "h") {
                                    path.historical = true;
                                }else{
                        console.log("Error:(line: " + path.y + "," + "position: " + path.x + ") Wrong option type.");
                                }}}
                            }



                        }
                    }


                }
            }

        }
    });



    console.log(paths);


    //check that all paths have value names
    var output = new Object();

    paths.forEach(function(each) {
        if (!each.vname) {
            console.log("Error: (" + each.fn_name + "," + each.end_fn_name + ") : There is a path with no value name ");
            process.exit(0);
        }

        if (!output[each.fn_name]) {
            output[each.fn_name] = [];
        }
        output[each.fn_name].push(each);

    });
    console.log("Output(" + path + "):");
    console.log(output);

    return output;




}
