var template;
var urls = {};
var publicationList = "";
var title = "Thiago N. Ferreira";

function getFileName(){
    var url = window.location.pathname;
    return url.substring(url.lastIndexOf('/')+1);
}

function getDateNow(){
    var d = new Date();

    var day = d.getDate();
    var month =  d.getMonth() + 1;

    if(day < 10){
        day = "0" + day;
    }

    if(month < 10){
        month = "0" + month;
    }

    return day + "/" + month;
}

$(function(){

    var filename = getFileName() || "index.html";

    $(".menu-item[href='" + filename + "']").parent().addClass("active");

    document.title = $("header h1").text() + " | " + title;

	$(".menu-item").each(function(){
		urls[$(this).attr("href")] = $(this).attr("data-page");
	});

    $("header.menu-active").each(function(){
        var menu = $(this).data("menu-active");
        $(".menu-item[data-menu-pos='" + menu + "']").parent().addClass("active");
    });

    $(".publication-list-open-bibtex").click(function(){
        $(".publication-list-bibtex").hide("slide");
        $("#"+$(this).data("uuid")).slideToggle()
        return false;
    });

    $(".publication-list-sort").click(function(){
        $(".publication-list").hide();
        $("#publication-list-"+$(this).data("by")).fadeIn()

        $(".publication-list-sort[data-by='type']").toggle();
        $(".publication-list-sort[data-by='year']").toggle();
        return false;
    });

    $(".plano-de-aula tbody tr").each(function(){
        var size = $(this).find("td").length;

        var date = getDateNow();

        var el;

        if(size == 4){
            el = $(this).find("td:nth-child(2)");
        }else if(size == 5){
            el = $(this).find("td:nth-child(3)");
        }

        if(el.text() == date){
            el.css("font-weight","bold")
            el.prev().css("font-weight","bold")
            el.next().css("font-weight","bold")
            el.next().next().css("font-weight","bold")
        }
    });

    $(".notas button").click(function(){
        var codigo = $(".notas input").val();

        var url = $("iframe").data("src");

        url = url.replace("@CODIGO@", codigo);

        $("iframe").attr("src", url).show();
    })

    MathJax.Hub.Config({
		tex2jax: {
			inlineMath: [ ['$','$'], ["\\(","\\)"] ],
			processEscapes: true
		}
	});
});
