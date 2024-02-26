// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
  applyFilterNoBackground("rgb(150, 150, 150)");
  
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(applyFilterFunction, rowIndex, colIndex) {
  for (let rowIndex = 0; rowIndex < image.length; ++rowIndex) {
    for (let colIndex = 0; colIndex < image[rowIndex].length; ++colIndex) {
      let rgbString = image[rowIndex][colIndex];
      let rgbNumbers = rgbStringToArray(rgbString);
      applyFilterFunction(rgbNumbers);
      let newRgbString = rgbArrayToString(rgbNumbers);
      image[rowIndex][colIndex] = newRgbString;
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground() {
  
}

// TODO 5: Create the keepInBounds function
function keepInBounds(number) {
  return Math.max(0, Math.min(number, 255));
}

// TODO 3: Create reddify function
function reddify(rgbArray) {
  const RED = 0;
  rgbArray[RED] = keepInBounds(rgbArray[RED] + 50);
}

// TODO 6: Create more filter functions
function decreaseBlue(rgbArray) {
  const BLUE = 2;
  rgbArray[BLUE] = keepInBounds(rgbArray[BLUE] - 50);
}
function increaseGreenByBlue(rgbArray) {
  const GREEN = 1;
  const BLUE = 2;
  rgbArray[GREEN] = keepInBounds(rgbArray[GREEN] + rgbArray[BLUE]);
}

// CHALLENGE code goes below here
