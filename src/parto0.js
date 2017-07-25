given an array of values, write a function that finds the index of where the value is located, and if nothing is found, returns -1.
example: for ['apple', 'orange', 'pineapple']
'orange' returns '1'
'durian' returns '-1'

//Part 0.a
function findindex (array, string){
console.log(array.indexOf(string))
}

var fruitz = ['apple', 'orange', 'pineapple']

findindex(fruitz, 'orange');
findindex(fruitz, 'durian');


//Part 0.b
var fruits = ['apple', 'orange', 'orange', 'orange', 'pineapple'];
var emptyArray = [];

function findMatch(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (value === array[i]) {
            var index = i;
            emptyArray.push(index);
        };
    };

    if (index === undefined) {
        return -1;
    } else {
        console.log(emptyArray);
    }
};

findMatch(fruits, 'orange'); 
findMatch(fruits, 'durian'); 