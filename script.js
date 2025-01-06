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
function fetchJSONData(filepath) {
    fetch(filepath)
    .then((res) => {
        if (!res.ok) {
            throw new Error
                (`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) =>{
        console.log(data);
        return data;
    })
    .catch((error) =>
        console.error("Unable to fetch data:", error));
}
//Changelogs//
fetchJSONData("https://infernalfury270.github.io/toranoko/data/changelogs.json");