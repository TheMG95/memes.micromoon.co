let meme

function httpGet() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://meme-api.com/gimme", false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

function setNSFWToggle() {
    if (getNSFWCookie()) {
        nsfwToggle.textContent = "Disable NSFW"
    } else {
        nsfwToggle.textContent = "Enable NSFW"
    }

}

function getNSFWCookie() {
    return document.cookie.split("=")[1].split(";")[0] === "true"
}

function setNSFWCookie(value) {
    document.cookie = "nsfw=" + value + "; Sat, 13 Sep 275760 00:00:00 GMT"
}

function toggleNSFW() {
    setNSFWCookie(!getNSFWCookie())
    setNSFWToggle()
}


function getMeme() {
    meme = httpGet()
    if (!getNSFWCookie()) {
        while (meme.nsfw === true) {
            meme = httpGet()
        }
    }
    document.getElementById("meme").src = meme.url
    document.getElementById("title").innerHTML = "Başlık: " + meme.title
    if (meme.nsfw) {
        document.getElementById("title").innerHTML += " (NSFW)"
    }
    document.getElementById("source-sub").innerHTML = "Kaynak Subreddit: " + meme.subreddit
}

getMeme()
document.getElementById("meme").addEventListener("click", getMeme)
let nsfwToggle = document.getElementById("nsfw-toggle")
nsfwToggle.addEventListener("click", toggleNSFW)
setNSFWToggle()
