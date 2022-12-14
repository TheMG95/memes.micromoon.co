let meme
let nsfwToggle = document.getElementById("nsfw-toggle")
let timerDisplay = document.getElementById("timer")
let seconds

function requestMeme() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://meme-api.com/gimme", false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

function setNSFWToggle() {
    if (getNSFWCookie()) {
        nsfwToggle.textContent = "NSFW Gösterme"
    } else {
        nsfwToggle.textContent = "NSFW Göster"
    }

}

function getNSFWCookie() {
    try {
        return document.cookie.split("=")[1].split(";")[0] === "true"
    }
    catch (TypeError) {
        setNSFWCookie(false)
        return false
    }
}

function setNSFWCookie(value) {
    document.cookie = "nsfw=" + value + "; Sat, 13 Sep 275760 00:00:00 GMT"
}

function toggleNSFW() {
    setNSFWCookie(!getNSFWCookie())
    setNSFWToggle()
}


function getMeme() {
    seconds = 30
    timerDisplay.textContent = "Yenileniyor..."
    meme = requestMeme()
    if (!getNSFWCookie()) {
        while (meme.nsfw === true) {
            meme = requestMeme()
        }
    }
    document.getElementById("meme").src = meme.url
    document.getElementById("title").innerHTML = "Başlık: " + meme.title
    document.getElementById("title-url").href = meme.postLink
    if (meme.nsfw) {
        document.getElementById("title").innerHTML += " (NSFW)"
    }
    document.getElementById("source-sub").innerHTML = "Kaynak Subreddit: " + meme.subreddit
    document.getElementById("source-sub-url").href = "https://reddit.com/r/" + meme.subreddit
}

function timer() {
    if (seconds === 0) {
        getMeme()
    }
    seconds--
    timerDisplay.textContent = seconds + " saniyeye yenilenecek"
}

getMeme()
document.getElementById("meme").addEventListener("click", getMeme)
nsfwToggle.addEventListener("click", toggleNSFW)
setNSFWToggle()

setInterval(timer, 1000)