source_path = null;
prog_lang = null;

var error = false;
var prev = null;
for (var i = 2; i < process.argv.length; i++) {
    var arg = process.argv[i];
    //We update the prev
    if (arg == "-lang") {
        if (!prev) {
            prev = "lang";
        } else {
            error = true;
        }
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

if ((!source_path) || (!prog_lang) || error) {
    console.log("Please provide the language and source directory of your project.");
    console.log("Example: -lang js ./meta_src/metareact/react");
    return -1;
}

