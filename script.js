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

//LOAD JSON DATA//
function fetchJSONData(filepath, dataHandler) {
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
        for (let i = 0; i < data.changelogs.length; i++) {
            let clonedEntry = changelogEntrySample.cloneNode(true);
            clonedEntry.querySelector("p:nth-of-type(1)").innerHTML = data.changelogs[i].date;
            clonedEntry.querySelector("p:nth-of-type(2)").innerHTML = data.changelogs[i].log;
            changelogContainer.appendChild(clonedEntry);
        }
    }
    changelogEntrySample.remove();
}
fetchJSONData("https://infernalfury270.github.io/toranoko/data/changelogs.json", LoadChangelogs);