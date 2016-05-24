var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
});

//based on: http://stackoverflow.com/a/9214163/325251
//uses Google Feed API - https://developers.google.com/feed/v1/jsondevguide

function GetContent(feedUrl) {
    var feedApiGetJSON = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=15&callback=?&q=';
    $.ajax({
        url: feedApiGetJSON + feedUrl,
        dataType: 'jsonp',
        jsonpCallback: 'JsonpCallback'
    });
}

function JsonpCallback(data) {
    if (data.responseStatus == "200") {
        //alert(data.responseData.feed.title);
        for (var i = 0; i < data.responseData.feed.entries.length; i++) {
            item = "<li>" + "<a href='" + data.responseData.feed.entries[i].link + "'>" + data.responseData.feed.entries[i].title + "</a>" + "</li>"
            $('#links').append(item);
        }
    }
    else {
        //alert(data.responseDetails);
        $('div').append("An error occurred - " + data.responseDetails);
    }
}

$(document).ready(function() {
    GetContent("https://medium.com/feed/@hwegge2");
});