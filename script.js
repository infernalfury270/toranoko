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