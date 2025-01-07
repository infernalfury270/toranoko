//PAGE CONTROL//
var headerButtons = document.querySelectorAll(".headerButton");
var pages = document.querySelectorAll(".page");
function hideAllPages() {
    for (let page of pages){
        page.style.display="none";
    }
}
 function showPage(pgno) {
    hideAllPages();
    let page = pages[pgno]
    page.style.display="block";
}

showPage(0);

for (let i = 0; i < headerButtons.length; i++) {
    let headerButton = headerButtons[i];
    headerButton.addEventListener("click", function() {
        showPage(i);
    });
}

//LOAD FILE DATA//
const endpoint = "https://infernalfury270.github.io/toranoko/";
function fetchFileData(filepath, dataHandler) {
    fetch(filepath)
    .then((res) => {
        if (!res.ok) {
            throw new Error
                (`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        console.log(data);
        dataHandler(data);
    })
    .catch((error) =>
        console.error("Unable to fetch data:", error));
}
//Changelogs//
function LoadChangelogs(data) {
    let changelogContainer = document.querySelector("#changelogContainer");
    let changelogEntrySample = document.querySelector("#changelogEntrySample");
    let changelogError = document.querySelector("#changelogError");
    if (data.changelogs.length != 0) {
        changelogError.remove();
        for (let i = data.changelogs.length - 1; i >= 0; i--) {
            let clonedEntry = changelogEntrySample.cloneNode(true);
            clonedEntry.querySelector("p:nth-of-type(1)").innerHTML = data.changelogs[i].date;
            clonedEntry.querySelector("p:nth-of-type(2)").innerHTML = data.changelogs[i].log;
            changelogContainer.appendChild(clonedEntry);
        }
    }
    changelogEntrySample.remove();
}
fetchFileData(endpoint + "data/changelogs.json", LoadChangelogs);

//Chapters//
var readSeries = document.querySelector("#readSeries");
function ReadSeries(seriesName) {
    readSeries.querySelector("h2").innerHTML = seriesName;
    fetchFileData(endpoint + "data/writingpieces.json", function(data) {
        readSeries.querySelector("p:nth-of-type(1)").innerHTML = data[seriesName][0].description;
        readSeries.querySelector("img").src = data[seriesName][0].imageFilepath;
        let entryContainer = readSeries.querySelector("div:nth-of-type(1)");
        while (entryContainer.firstChild) {
            entryContainer.removeChild(entryContainer.lastChild);
        }
        for (let i = 0; i < data[seriesName][0].entries.length; i++) {
            let newNode = document.createElement("a");
            newNode.href = data[seriesName][0].entries[i].entryFilepath;
            newNode.appendChild(document.createTextNode(data[seriesName][0].entries[i].entryName));
            entryContainer.appendChild(newNode);
        }
    })
}
ReadSeries("Newsletters");

var readingPageButtons = document.querySelectorAll(".readingPageButton");
for (let i = 0; i < readingPageButtons.length; i++) {
    let seriesButton = readingPageButtons[i];
    seriesButton.addEventListener("click", function() {
        ReadSeries(seriesButton.innerHTML);
    });
}

//Characters//

function LoadCharacter(characterData) {
    let characterInfo = document.querySelector("#characterInfo");
    characterInfo.querySelector("img:nth-of-type(1)").src = characterData.portraitFilepath;
    characterInfo.querySelector("h2").innerHTML = characterData.name;
    characterInfo.querySelector("p").innerHTML = characterData.description;
    characterInfo.querySelector("img:nth-of-type(2)").src = characterData.fullbodyFilepath;
}
function LoadCharacterSet(setName) {
    fetchFileData(endpoint + "data/characters.json", function(data) {
        let characterButtonContainer = document.querySelector("#characterButtonContainer");
        while (characterButtonContainer.firstChild) {
            characterButtonContainer.removeChild(characterButtonContainer.lastChild);
        }
        for (let i = 0; i < data[setName].length; i++) {
            let newNode = document.createElement("button");
            newNode.appendChild(document.createTextNode(data[setName][i].name));
            characterButtonContainer.appendChild(newNode);
            newNode.addEventListener("click", function() {
                LoadCharacter(data[setName][i]);
            })
        }
        LoadCharacter(data[setName][0]);
    })
}
LoadCharacterSet("The Takasu Family");

var characterPageButtons = document.querySelectorAll(".characterPageButton");
for (let i = 0; i < characterPageButtons.length; i++) {
    let charPageButton = characterPageButtons[i];
    charPageButton.addEventListener("click", function() {
        LoadCharacterSet(charPageButton.innerHTML);
    });
}