

// 1. set up board
// 2. user should be able to click a box and a mark shows up.
// --put an onclick in the first square
// --when user clicks, call function that upts an x in the box.
function markSquare(square) {
    // console.log(square.id);
    document.getElementById(square.id).innerHTML = "X";
}
