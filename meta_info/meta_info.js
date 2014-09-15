module.exports = function Meta_info() {

    var fs = require("fs");
    var meta_info = fs.readFileSync("./meta_info/meta_info.xml", {
        encoding: "utf-8"
    });

    var cheerio = require("cheerio");

    var $ = cheerio.load(meta_info, {
        xmlMode: true
    });

    /*
     * This function creates the license header that is used by all source files
     */
    this.header = function() {
       

        return $("project-name").text() + " - " + $("description").text() + "\n\n" +
            "Copyright (C) 2014-" + (new Date().getFullYear()) + " contributors as noted in the AUTHORS file" + "\n\n" +
            $("license-header").text();

    }

    this.authors_file = function() {
        var authors_file = "creators \n\n";
        $("contributors creator").each(function(index, item) {
            authors_file = authors_file + $(this).attr("name") + " " + $(this).attr("email") + "\n"
        });

        var authors_file = authors_file + "\ncontributors \n\n";
        $("contributors contributor").each(function(index, item) {
            authors_file = authors_file + $(this).attr("name") + " " + $(this).attr("email") + "\n"
        });

        fs.writeFileSync("./src/AUTHORS", authors_file);

    }

    this.license = function() {
        fs.writeFileSync("./src/LICENSE", $("license").text());

    }

}
