var deepEqual = function(value1, value2){

    if (typeof(value1) !== 'object' && value1 !== null){
        return (value1 === value2);
    }

    else {
        var count1 = 0;
        var count2 = 0;

        for (prop in value1)
            count1++

        for (prop in value2)
            count2++

        if (count1 != count2)
            return false;

        else {
            for (var prop in value1) {
                if (!deepEqual(value1[prop], value2[prop])) {
                    return false
                }
            }
            return true;
        }
    }

};


var obj = {here: {is: "an"}, object: 2};

console.log(deepEqual(obj, obj));
// true

console.log(deepEqual(obj, {here: 1, object: 2}));
// false

console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// true
