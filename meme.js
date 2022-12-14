function httpGet() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://meme-api.com/gimme", false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

let meme

function getMeme() {
    meme = httpGet()
    while (meme.nsfw === true) {
        meme = httpGet()
    }
    document.getElementById("meme").src = meme.url
    document.getElementById("title").innerHTML = "Başlık: " + meme.title
    document.getElementById("source-sub").innerHTML = "Kaynak Subreddit: " + meme.subreddit
}

getMeme()
document.getElementById("meme").addEventListener("click", getMeme)
