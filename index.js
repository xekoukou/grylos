function is_object(obj) {
  return obj === Object(obj);
}

function are_var_equal(var1,var2) {
  if(Array.isArray(var1) && Array.isArray(var2)) {
    return are_arrays_equal(var1,var2);
  }
  if(is_object(var1) && is_object(var2)) {
    return are_objects_equal(var1,var2);
  }
  if(!is_object(var1) && !is_object(var2)) {
    return var1 == var2;
  }
  return false;
}

function are_arrays_equal(ar1,ar2) {
  if(ar1.length != ar2.length) {
    return false;
  }
  ar1.forEach(function(el1,index){
    el2 = ar2[index]; 
    if(!are_var_equal(el1,el2)) {
      return false;
    }
  });
  return true;
}

function are_objects_equal(obj1,obj2) {
  Object.keys(obj1).forEach(function(key){
    if(!(key in obj2)) {
      return false;
    }
    if(!are_var_equal(obj1[key],obj2[key])) {
      return false;
    }
  });
  return true;
}

function assert(var1, var2, msg) {
  if(!are_var_equal(var1,var2)) {
    throw new Error(msg);
  }
}

function debug(data) {
  process.stderr.write(JSON.stringify(data) + "\n");
}
var fs = require('fs');
var execSync = require('child_process').execSync;
//.dots(-1)("./temp/generate_graph_xml_from_mr_file/load_mr_file.js")
//./dots(1)
function load_mr_file(file_path) {
var lines;
////
var file = fs.readFileSync(file_path,"utf8");
lines = file.split("\n");
////
return lines;  
}
//.dots(-1)
assert(load_mr_file("./tests/generate_graph_xml_from_mr_file/load_mr_file/1.mr"), ["line1","line2",""],"load_mr_file 1 test Failed");

function find_function_names(lines,mr_file_path) {
var function_names;
////////////////////////
function_names = [];

var y = 0;
while (y < lines.length) {
var x = 0;
var line = lines[y];
while (x < line.length) {
    var xar = line.charAt(x);
    //find all non whitespace strings
    if (xar != " ") {
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
                    switch (xar) {
                      case "c": {
			function_name.properties.concurrent = "true";
                        break;
                      }
                      case "a": {
		        function_name.properties.asynchronous = "true";
                        break;
                      }
                      case "o": {
		        function_name.properties.ordered = "true";
                        break;
                      }
                      default: {
	        	debug("Error: There is no option '" + xar + "' for a function");
			debug("File: " + mr_file_path);
			debug("Function Name: " + value[0]);
			process.exit(1);
                      }
                    }
		}
	    }
	    //store them
	    function_names.push(function_name);
	}
	x = x + string.length - 1;
    }
    x++;
}
y++;
}
return function_names;
}

debug(find_function_names(load_mr_file("./tests/generate_graph_xml_from_mr_file/parse_mr_file/find_function_names/1.mr"),"./tests/generate_graph_xml_from_mr_file/parse_mr_file/find_function_names/1.mr"));
assert(find_function_names(load_mr_file("./tests/generate_graph_xml_from_mr_file/parse_mr_file/find_function_names/1.mr"),"./tests/generate_graph_xml_from_mr_file/parse_mr_file/find_function_names/1.mr"), [{'fn_name':'hello',x:0,y:0,properties:{'concurrent':true,'asynchronous':true}},{'fn_name':'world',x:0,y:18,properties:{}},{'fn_name':'Hi',x:3,y:0,properties:{'concurrent':true}},{'fn_name':'there',x:3,y:11,properties:{'concurrent':true,'asynchronous':true,'ordered':true}}],"find function_names 1 test Failed");
assert(find_function_names(load_mr_file("./tests/generate_graph_xml_from_mr_file/parse_mr_file/find_function_names/2.mr"),"./tests/generate_graph_xml_from_mr_file/parse_mr_file/find_function_names/1.mr"),"","find_function_names 2 test Failed");
