function httpGet()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://meme-api.com/gimme", false );
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

let meme = httpGet()

function getMeme() {
    if (meme.nsfw = "false") {
        document.getElementById("meme").src = meme.url
    }
    else {
        location.reload() 
}
}

function getTitle() {
    document.getElementById("title").innerHTML = "Başlık: " + meme.title
}

function getSubreddit() {
    document.write("<h2> Kaynak Subreddit: " + meme.subreddit + "</h2>") 
}
getTitle()
getMeme()
getSubreddit()
