    var meta_info = fs.readFileSync("./meta_info/meta_info.xml", {
        encoding: "utf-8"
    });
    $ = cheerio.load(meta_info, {
        xmlMode: true
    });

