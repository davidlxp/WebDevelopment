
/* Listener checks the "click" status of whole page */
document.addEventListener("click", (event) => {
    closeSuggestOnOutsideClick();
})

/* Function calculates number of tree needed */
function calcTreeNeeded() {

    // Firstly, remove content from "tree-needed" section 
    document.getElementById("tree-needed").innerHTML = "";

    // Get the string representation of input values
    var bookNumStr = document.getElementById("book-num").value;
    var pageNumStr = document.getElementById("page-num").value;

    // Don't allow submit if any of the input box is empty or is not a number
    if (bookNumStr === "" || isNaN(bookNumStr) || pageNumStr === "" || isNaN(pageNumStr))
    {
        // Send a warning!!!
        document.getElementById("tree-needed").innerHTML = "Invalid Input!!! Please provide numbers!";
        return;
    }

    // Number of books and pages
    var bookNum = parseFloat(bookNumStr);
    var avgPageNum = parseFloat(pageNumStr);

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
        result += "It's about " + acres.toFixed(4) + " acres of forest. ";
    if (s2 || s3)
        result += "The size of forest constitued by these trees is about " + parks + " NYC central park.";
  
    // Write the trees needed num on the HTML page
    document.getElementById("tree-needed").innerHTML = result;

    // Disappear the last coach mark after submission
    document.getElementById("coach-step3").style.display="none";

    // Save books and pages value only after submission is successfully processed
    saveBooksInput(); 
    savePagesInput();

    // Update Completeness Meter when the submit button is clicked and successfully submitted 
    updateMeterFromSubmit();
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
    // Fill the input box
    document.getElementById("book-num").value = parseFloat(books);
    document.getElementById("page-num").value = parseFloat(pages);

    // Update the completeness meter
    updateMeterFromInput();
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

/* General function returns new data to be stored in the storage after user provides input
 * @boxId: The ID of the input box where user provides new input
 * @storedData: a copy of stored data from LocalStorage
 * @maxAmount: max amount of data allowed to be stored in that variable from LocalStorage (defined by the developer) */
function generateNewSaveInput(boxId, storedData, maxAmount)
{
    // Get value from input box
    var inputVal = document.getElementById(boxId).value;

    // Get the existing data
    var data = storedData;

    // If the inputVal is a empty string, don't save it
    if (inputVal.trim() === "")
        return data;

    // If the data doesn't exist or it's an empty string
    if (data && data !== "")
    {
        // Turn the saved string into array
        var dataArray = data.split("||");

        // If the array of stored data contains input value, we don't need to modify anything, return itself.
        if (dataArray.includes(inputVal))
            return data;

        // If the array exceed the MAX amount allow, remove the 1st element from "data" string
        var arrLen = dataArray.length
        if (arrLen >= maxAmount)
        {
            // Get the the index of array we start to keep to maintain the maxAmount requirement (even after adding new value)
            var startIdx = arrLen - maxAmount + 1; 

            // Copy to only keep a part of array which meet the maxAmount requirement
            data = "";
            for (let i = startIdx; i < arrLen; ++i)
            {
                data += dataArray[i];
                if (i < arrLen - 1)
                    data += "||";
            }
        }
        
        // Append the new value to the "data" string
        data += "||" + inputVal;

        // Return the "data" string
        return data;
    }
    else
        // Since the local storage data was empty, we only return the new data from input box
        return inputVal;
}

/* Function attempts to save user's input which is from the "Number of books" input box */
function saveBooksInput()
{
    // If local storage available, try to save value from input box to the storage
    if (typeof(Storage) !== "undefined")
    {
        // Get the newBookSave for saving to storage
        var newBookSave = generateNewSaveInput("book-num", localStorage.booksNumHistory, 3);

        // If the newBookSave is not "undefined", then save it
        if (typeof(newBookSave) !== "undefined")
            localStorage.booksNumHistory = newBookSave;
    }
}

/* Function attempts to save user's input which is from the "Number of pages" input box */
function savePagesInput()
{
    // If local storage available, try to save value from input box to the storage
    if (typeof(Storage) !== "undefined")
    {
        // Get the newPageSave for saving to storage
        var newPageSave = generateNewSaveInput("page-num", localStorage.pagesNumHistory, 3);

        // If the newSaveInput is not "undefined", then save it
        if (typeof(newPageSave) !== "undefined")
            localStorage.pagesNumHistory = newPageSave;
    }
}

/* A general function for suggest input to input box from stored data 
 * @storedData: the data stored in the LocalStorage which we want to generate suggestions from 
 * @listId: the ID of the list in HTML that we want to place the suggestions
 * @boxId: the input box which user potentially want to fill with the suggested data */
function suggestInput(storedData, listId, boxId)
{
    // Clear the <ul>, which is the suggestion area before appending 
    clearSuggestion(listId);
    
    // Check if the historical data exists
    if (typeof(Storage) !== "undefined" && storedData)
    {
        // Split to a list of values for suggestion
        var allData = storedData.split("||");

        // Add the suggestions to a <ul> list in HTML
        for (let i = 0; i < allData.length; ++i)
        {
            // Access one data
            var data = allData[i];

            // Create the list item
            var listItem = document.createElement("li");

            // Add class attribute to the list item
            listItem.classList.add("suggest-list-item");

            // Add value to the list item
            listItem.appendChild(document.createTextNode(data));

            // Add event - when clicks on a suggestion, it will pop into the input box
            listItem.setAttribute("onclick", "useSuggestion(" + data + ",'" + boxId + "', '" + listId + "')")

            // Append the list item to the list on HTML
            document.getElementById(listId).appendChild(listItem);
        }
    }
}

/* Function specialized for suggesting input for bookNums input box */
function suggestBooksInput()
{
    suggestInput(localStorage.booksNumHistory, "book-num-suggestion", "book-num");
}

/* Function specialized for suggesting input for pageNums input box */
function suggestPagesInput()
{
    suggestInput(localStorage.pagesNumHistory, "page-num-suggestion", "page-num");
}

/* Function clear the suggestion that shown in a list by setting it to "" 
 * @listId: ID of the list on HTML that we want to clear */
function clearSuggestion(listId)
{
    // Clear up an <ul> list before attempting another suggestion
    document.getElementById(listId).innerHTML = "";
}

/* Function display suggestion to the input box
 * This function will be triggered by event 
 * @val: suggestion value pass to the input box 
 * @boxId: the ID of input box
 * @listId: the list we want to clear after providing suggestion */
function useSuggestion(val, boxId, listId)
{
    // Assign value
    document.getElementById(boxId).value = val;

    // Clear a suggestion list after suggestion
    clearSuggestion(listId);
}

/* Function modify completeness meter when user interact with input boxes */
function updateMeterFromInput()
{
    // Get the input from input boxes
    var bookNumInput = document.getElementById("book-num").value;
    var pageNumInput = document.getElementById("page-num").value;

    // Check if the input is valid
    var bookEmpty = typeof(bookNumInput) === "undefined" || bookNumInput === "";
    var pageEmpty = typeof(pageNumInput) === "undefined" || pageNumInput === "";

    // Dynamically modify the progress meter based on judges
    if (bookEmpty && pageEmpty)
        document.getElementById("completeness-meter").innerHTML = "Your Progress: 0% <br>(Next Step - provide a book OR page number)";
    else if (!bookEmpty && !pageEmpty)
        document.getElementById("completeness-meter").innerHTML = "Your Progress: 90% <br>(Next Step - click submit!)";
    else if (bookEmpty)
        document.getElementById("completeness-meter").innerHTML = "Your Progress: 40% <br>(Next Step - provide a book number)";
    else
        document.getElementById("completeness-meter").innerHTML = "Your Progress: 40% <br>(Next Step - provide a page number)";
}

/* Function modify completeness meter when user interact with calculation submit button */
function updateMeterFromSubmit()
{
    // Get the input from input boxes
    var bookNumInput = document.getElementById("book-num").value;
    var pageNumInput = document.getElementById("page-num").value;

    // Check if the input is valid
    var bookEmpty = typeof(bookNumInput) === "undefined" || bookNumInput === "";
    var pageEmpty = typeof(pageNumInput) === "undefined" || pageNumInput === "";

    // Only update the progress to 100% if input boxes have information
    if (!bookEmpty && !pageEmpty)
        document.getElementById("completeness-meter").innerHTML = "Your Progress: 100% <br>Congratulation, calculation done!";
}

// Funtion closes input suggestions if a click outside of input boxes are detected
function closeSuggestOnOutsideClick()
{
    // Check if the book and page input box is clicked or not
    var isBookInputClick = document.getElementById("book-num").contains(event.target);
    var isPageInputClick = document.getElementById("page-num").contains(event.target);

    // Try to remove suggestions for book & page number
    if (!isBookInputClick)
        clearSuggestion("book-num-suggestion");
    if (!isPageInputClick)
        clearSuggestion("page-num-suggestion");
}





/* Testing function which helps with remove stored data */
// function clearStorage()
// {
//     localStorage.removeItem("booksNumHistory");
//     localStorage.removeItem("pagesNumHistory");
// }