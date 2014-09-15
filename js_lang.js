module.exports = function Js_lang() {

    var beautify = require("js-beautify").js_beautify;

    this.beautify = function(string) {

        return beautify(string);

    }


}
