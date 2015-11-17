$(document).ready(function() {

    var converter = new Markdown.Converter();
    Markdown.Extra.init(converter,{"extensions": ["fenced_code_gfm"]});

    $(".markdown").each(function() {
            var md = $(this).text();
            var html = converter.makeHtml(md);
            $(this).empty();
            $(this).append(html);

        })

        hljs.initHighlighting();
        MathJax.Hub.Typeset();
})
