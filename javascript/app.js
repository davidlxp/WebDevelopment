
/* Function calculates number of tree needed */
function calcTreeNeeded() {

    // Number of books and pages
    var bookNum = parseFloat(document.getElementById("book-num").value);
    var avgPageNum = parseFloat(document.getElementById("page-num").value);

    // Calculate total pages
    var totalPageNum = bookNum * avgPageNum;

    // Calculate tree saved
    var treeToPageMulti = 10000;
    var treeNeededNum = totalPageNum / treeToPageMulti;

    // Transform number of trees to acre
    var treePerAcre = 50;
    var acres = treeNeededNum / treePerAcre;

    // Transform acres to number of central parks
    var acrePerPark = 843;
    var parks = (acres / acrePerPark).toFixed(4);

    // Get input from user's settings choice
    var s1 = document.getElementById("set1").checked;
    var s2 = document.getElementById("set2").checked;
    var s3 = document.getElementById("set3").checked;

    // Construct a sentence based on user's settings choice
    var result = "These books require to cut down " + treeNeededNum + " trees to produce! ";
    if (s1 || s3)
        result += "It's about " + acres + " acres of forest. ";
    if (s2 || s3)
        result += "The size of forest constitued by these trees is about " + parks + " NYC central park.";
  
    // Write the trees needed num on the HTML page
    document.getElementById("tree-needed").innerHTML = result;

    // Disappear the last coach mark after submission
    document.getElementById("coach-step3").style.display="none";
}

/* Function reactively pops up hint */
function popHelp() {
    alert("Please type any number between 200 to 400 for the 'Average number of pages per book' input box");
}

/* Function gives proactive input hints */
function giveInputHint() {
    document.getElementById("input-hint").innerHTML = "Please provide any number of books, like a number between 1000 to 4000";
}

/* Function removes the proactive input hints */
function removeInputHint() {
    document.getElementById("input-hint").innerHTML = "";
}

/* Function do the things after the 1st coach mark */
function afterFirstCoach() {
    document.getElementById("coach-step1").style.display="none";
    document.getElementById("coach-step2").style.display="inline";
}

/* Function do the things after the 2nd coach mark */
function afterSecondCoach() {
    document.getElementById("coach-step2").style.display="none";
    document.getElementById("coach-step3").style.display="block";
}

/* Function shows the calculator */
function useOrCloseCalc() {

    var status = document.getElementById("calculator").style.display;

    // Enable the opening and closing calculator functionality
    if (status === "none")
    {
        document.getElementById("calculator").style.display = "block";
        document.getElementById("expandable-button").value = "Close Calculator";
    }
    else
    {
        document.getElementById("calculator").style.display = "none";
        document.getElementById("expandable-button").value = "Use Calculator";
    }
}

/* Function shows or unshows the hidden information */
function showOrUnshowInfo() {
    var status = document.getElementById("advanced-info").style.display;

    if (status == "none")
    {
        document.getElementById("advanced-info").style.display = "block";
        document.getElementById("hidden-button").value = "Less Info...";
    }
    else
    {
        document.getElementById("advanced-info").style.display = "none";
        document.getElementById("hidden-button").value = "More Info...";
    }
}

/* Function does autofill for the simple calculator */
function autofillSimpleCalc(books, pages)
{
    document.getElementById("book-num").value = parseFloat(books);
    document.getElementById("page-num").value = parseFloat(pages);
}

/* Function dynamically shows simple & complex calculator based on user's choice with this button */
function simpleOrComplex()
{
    var status = document.getElementById("simple-calculator").style.display;

    if (status == "none")
    {
        document.getElementById("simple-calculator").style.display = "block";
        document.getElementById("complex-calculator").style.display = "none";
        document.getElementById("calc-switch-button").value = "Advanced Calculator";
    }
    else
    {
        document.getElementById("simple-calculator").style.display = "none";
        document.getElementById("complex-calculator").style.display = "block";
        document.getElementById("calc-switch-button").value = "Simple Calculator";
    }
}

/* Function dynamically shows settings menu */
function openOrCloseSettings()
{
    var status = document.getElementById("settings-menu").style.display;

    if (status == "none")
    {
        document.getElementById("settings-menu").style.display = "block";
        document.getElementById("settings-button").value = "Close Settings";
    }
    else
    {
        document.getElementById("settings-menu").style.display = "none";
        document.getElementById("settings-button").value = "Settings";
    }
}