// Dane Schoonover
// CS 290-400

/*--- Create the table definitions ---*/
var tableInit = function(){
    var dTable = document.createElement("table");
    dTable.id = "table";
    dTable.style.textAlign = "center";
    return dTable;
};

var tableHeaderInit = function(){
    var headerRow = document.createElement("tr");
    headerRow.id = "header";
    for (var i = 0; i < 4; i++){
        var headerCell = document.createElement("th");
        headerCell.textContent = "Header " + " " + i;
        headerCell.style.border = "dotted black 1px";
        headerRow.appendChild(headerCell);

    }
    return headerRow;
};

var tableRowInit = function(rowNum){
    var row = document.createElement("tr");
    row.className = "row";
    row.id = "row" + rowNum;
    for (var j = 0; j < 4; j++) {
        var cell = document.createElement("td");
        cell.textContent = (j+1) + ", " + (rowNum+1);
        cell.id = "cell" + rowNum + j;
        cell.className = "cell";
        cell.style.border = "dotted black 1px";
        row.appendChild(cell);
    }
    return row;
};

var leftButtonInit = function(){
    var left = document.createElement("button");
    left.textContent = "Left";
    return left;
};

var rightButtonInit = function() {
    var right = document.createElement("button");
    right.textContent = "Right";
    return right;
};

var upButtonInit = function() {
    var up = document.createElement("button");
    up.textContent = "Up";
    return up;
};

var downButtonInit = function() {
    var down = document.createElement("button");
    down.textContent = "Down";
    return down;
};

var markCellButtonInit = function() {
    var mark = document.createElement("button");
    mark.textContent = "Mark Cell";
    return mark;
};


/*--- Initialize elements ---*/
var table = tableInit();
var tableHeader = tableHeaderInit();
var row1 = tableRowInit(0);
var row2 = tableRowInit(1);
var row3 = tableRowInit(2);
var leftButton = leftButtonInit();
var rightButton = rightButtonInit();
var upButton = upButtonInit();
var downButton = downButtonInit();
var markCellButton = markCellButtonInit();


/*--- Append elements ---*/
table.appendChild(tableHeader);
table.appendChild(row1);
table.appendChild(row2);
table.appendChild(row3);
document.body.appendChild(table);
document.body.appendChild(leftButton);
document.body.appendChild(rightButton);
document.body.appendChild(upButton);
document.body.appendChild(downButton);
document.body.appendChild(markCellButton);


/*--- Row maneuvering awesomeness ---*/
var rowsCollection = table.getElementsByClassName("row");
var selectedRow = 0;
var selectedIndex = 0;

// Changes 'selected' cell based on Row and Index of Row
var selectedCellInit = function(){
    var row = document.getElementById("row" + selectedRow);
    var cell = document.getElementById("cell" + selectedRow + selectedIndex);
    return cell;
};


/*--- Select cell 1,1 ---*/
var selectedCell = selectedCellInit();
addSelected(selectedCell);


/*--- Helper functions ---*/
// "Select" a cell
function addSelected(e) {
    //e.id = "selected";
    e.style.border = "solid black 2px";
}

// "Deselect" a cell
function removeSelected(e) {
    //e.id = "";
    e.style.border = "dotted black 1px";
}


/*--- Event handlers ---*/
function leftButtonClick(){
    if (selectedCell.previousElementSibling.className == "cell"){
        removeSelected(selectedCell);
        selectedIndex--;
        selectedCell = selectedCellInit();
        addSelected(selectedCell);
    }
}

function rightButtonClick(){
    if (selectedCell.nextElementSibling.className == "cell"){
        removeSelected(selectedCell);
        selectedIndex++;
        selectedCell = selectedCellInit();
        addSelected(selectedCell);
    }
}

function upButtonClick(){
    if (selectedRow > 0){
        removeSelected(selectedCell);
        selectedRow--;
        selectedCell = selectedCellInit();
        addSelected(selectedCell);
    }
}

function downButtonClick(){
    if (selectedRow < 2){
        removeSelected(selectedCell);
        selectedRow++;
        selectedCell = selectedCellInit();
        addSelected(selectedCell);
    }
}

function markCellButtonClick(){
    selectedCell.style.backgroundColor = "yellow";
}


/*--- Event listeners ---*/
document.addEventListener("DOMContentLoaded", addSelected(selectedCell));
leftButton.addEventListener("click", leftButtonClick);
rightButton.addEventListener("click", rightButtonClick);
upButton.addEventListener("click", upButtonClick);
downButton.addEventListener("click", downButtonClick);
markCellButton.addEventListener("click", markCellButtonClick);