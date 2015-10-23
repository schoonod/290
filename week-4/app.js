function Automobile(year, make, model, type){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
];


function sortArr(comparator, automobiles){

    // Copy automobiles into a new array object
    // Citation: https://piazza.com/class/iexadsf9t962en?cid=110 (Josh Homann's deep copy solution)
    var autos = new Array();

    autos = automobiles;

    //autos = automobiles.map(function(element){
    //    return JSON.parse(JSON.stringify(element));
    //});

    // Position of 'greatest'
    var i = 0;
    // Position of comparison against 'greatest'
    var j = i + 1;

    // swaps compared elements
    function swap(array, left, right){
        var temp = array[left];
        array[left] = array[right];
        array[right] = temp;

    }

    // I think this is a version of the selection sort..I think. I really dunno, I just made some shit up and hope it works..
    while (i < autos.length){
        // if j has reached the end of the array, all comparisons have been made. advance i and start j over at i+1
        if (j == (autos.length)) {
            i++;
            j = i + 1;
        }
        // if the comparator confirms that the left value is bigger than the right, move on to next comparison (j)
        else if (comparator(autos[i], autos[j]))
            j++;
        // else right is bigger than left, swap'em
        else
            swap(autos, i, j);
    }

    // return the sorted function
    return autos;
}


function yearComparator(auto1, auto2){
    return auto1.year >= auto2.year;
}

function makeComparator(auto1, auto2){
    var str1 = auto1.type.toLowerCase();
    var str2 = auto2.type.toLowerCase();
    return (str1 <= str2);
    /* need to touch this up to check all characters */
    /* as is it just checks if first word/first letter is less than second word/first letter */
    /* i.e. Ford/Fiat may not give correct result */
    /* pretty sure i have this in a c++ program */
}

function typeComparator(auto1, auto2){
    var str1 = auto1.type.toLowerCase();
    var str2 = auto2.type.toLowerCase();

    var autoMap = ["sedan", "wagon", "suv", "pickup", "roadster"];

    // convert the auto type to the index value of the type that it matches to in the autoMap; this allows for int comparison
    for (var i = 0; i < autoMap.length; i++) {
        if (str1 == autoMap[i])
            str1 = i;
        if (str2 == autoMap[i])
            str2 = i;
    }

    // if they are the same, return the result of comparing them by year
    if (str1 == str2)
        return yearComparator(auto1, auto2);

    // if they are not the same, return the T/F comparison of their map values
    return (str1 > str2);
}

Automobile.prototype.logMe = function(bool){
    if(!bool)
        console.log(this.year + " " + this.make + " " + this.model);
    else
        console.log(this.year + " " + this.make + " " + this.model + " " + this.type);

};

var yearComp = sortArr(yearComparator, automobiles);
var makeComp = sortArr(makeComparator, automobiles);
var typeComp = sortArr(typeComparator, automobiles);


console.log("*****");
console.log("\nThe cars sorted by year are:");
yearComp.forEach(function(element){
    element.logMe(false);
});

console.log("\nThe cars sorted by make are:");
makeComp.forEach(function(element){
    element.logMe(false);
});

console.log("\nThe cars sorted by type are:");
typeComp.forEach(function(element){
    element.logMe(true);
});
console.log("*****");
