$(document).ready(function() {

    var converter = new Markdown.Converter();
    Markdown.Extra.init(converter,{"extensions": ["fenced_code_gfm","attr_list"]});

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
    })

    $("code").before('<p class="code_toggle">Code:</p>');
    $(".code_toggle").click(function(){$(this).next().toggle()});
    setTimeout(function(){$(".code_toggle").next().toggle();},1);

        hljs.initHighlighting();
        MathJax.Hub.Typeset();
   
//Creating the table of Contents. 
    $(".markdown").each(function() {
      $(this).prepend("<h1>Table of Contents</h1><div id='toc'></div>");
      $(this).children().first().click(function() {
        var toc = $(this).next("div#toc");
        if(!$(toc).is(':empty')){
          $(toc).empty();
          return;
        }
        $(toc).append("<ul></ul>");
        var current = $(toc).children().last();
        $(toc).nextAll("h1").each(function() {
          var id = $(this).attr("id");
          var text = $(this).text();
          console.log("ds"+id);
          console.log(text);
          if(id != null) {
            $(current).append("<li><a href='#"+ id +"'>"+ text +"</a></li>");
            $(current).append("<ul></ul>");
            current = $(current).children().last();
          $(this).nextUntil("h1","h2").each(function() {
            var id = $(this).attr("id");
            var text = $(this).text();
            if(id != null) {
              $(current).append("<li><a href='#"+ id +"'>"+ text +"</a></li>");
              $(current).append("<ul></ul>");
              current = $(current).children().last();
             
            $(this).nextUntil("h2","h3").each(function() {
              var id = $(this).attr("id");
              var text = $(this).text();
              if(id != null) {
                $(current).append("<li><a href='#"+ id +"'>"+ text +"</a></li>");
              }
            });  
            current = $(current).parent();
            }
          }); 
          current = $(current).parent();
          }
        });
      });  
    });
})
