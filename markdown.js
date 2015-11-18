$(document).ready(function() {

    var converter = new Markdown.Converter();
    Markdown.Extra.init(converter,{"extensions": ["fenced_code_gfm"]});

    $(".markdown").each(function() {
      var md = $(this).text();
      var html = converter.makeHtml(md);
      $(this).empty();
      $(this).append(html);
    });
    $(".xml").each(function(){
      var text = $(this).text().replace(/%lt/g,"<");
      text = text.replace(/%gt/g,">");
      $(this).text(text);
    });
    $(".html").each(function(){
      var text = $(this).text().replace(/%lt/g,"<");
      text = text.replace(/%gt/g,">");
      $(this).text(text);
    });

        hljs.initHighlighting();
        MathJax.Hub.Typeset();
})
