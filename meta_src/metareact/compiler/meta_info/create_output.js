//header
header = $("project-name").text() + " - " + $("description").text() + "\n\n" +
            "Copyright (C) 2014-" + (new Date().getFullYear()) + " contributors as noted in the AUTHORS file" + "\n\n" +
            $("license-header").text();

//authors file
authors_file = "creators \n\n";
        $("contributors creator").each(function(index, item) {
            authors_file = authors_file + $(this).attr("name") + " " + $(this).attr("email") + "\n"
        });
        authors_file = authors_file + "\ncontributors \n\n";
        $("contributors contributor").each(function(index, item) {
            authors_file = authors_file + $(this).attr("name") + " " + $(this).attr("email") + "\n"
fs.writeFileSync("./src/AUTHORS", authors_file);

