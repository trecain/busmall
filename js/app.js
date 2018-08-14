'use strict';

function Product(filename) {
    this.imageFilename = filename;
    this.numberOfVotes = 0;
    this.numberOfTimesImageIsDisplayed = 0;
    Product.arrayOfImageFilePaths.push(this);
}
Product.arrayOfImageFilePaths = [];

var generateRandomNumberForImageArray = function() {
    return Math.floor(Math.random() * Product.arrayOfImageFilePaths.length);
}

console.log(generateRandomNumberForImageArray);

var arrayOfImageFilepaths = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 
                            'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 
                            'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 
                            'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 
                            'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 
                            'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 
                            'img/water-can.jpg', 'img/wine-glass.jpg' 
                            ];


var createProductInstances = function(imagePathArray) {
    imagePathArray.forEach(function(imagePath) {
        new Product(imagePath);
    });
    return Product.arrayOfImageFilePaths;
}
createProductInstances(arrayOfImageFilepaths);

var firstRandomnlyGeneratedImageMarkup = document.getElementsByTagName('img')[0];
var secondRandomnlyGeneratedImageMarkup = document.getElementsByTagName('img')[1];
var thirdRandomnlyGeneratedImageMarkup = document.getElementsByTagName('img')[2];

var firstRandomnlyGeneratedImage = new Product('img/boots.jpg');
var secondRandomnlyGeneratedImage = new Product('img/pen.jpg');
var thirdRandomnlyGeneratedImage = new Product('img/scissors.jpg');

var displayThreeRandomnlyGeneratedImages= function() {
    do {
        var firstRandomnlyGeneratedIndex = generateRandomNumberForImageArray();
        var secondRandomnlyGeneratedIndex = generateRandomNumberForImageArray();
        var thirdRandomnlyGeneratedIndex = generateRandomNumberForImageArray();
    } while(firstRandomnlyGeneratedIndex === secondRandomnlyGeneratedIndex ||
          firstRandomnlyGeneratedIndex === thirdRandomnlyGeneratedIndex &&
          secondRandomnlyGeneratedIndex === thirdRandomnlyGeneratedIndex);
        
        
        var firstRandomnlyGeneratedImage = Product.arrayOfImageFilePaths[firstRandomnlyGeneratedIndex];
        var secondRandomnlyGeneratedImage = Product.arrayOfImageFilePaths[secondRandomnlyGeneratedIndex];
        var thirdRandomnlyGeneratedImage = Product.arrayOfImageFilePaths[thirdRandomnlyGeneratedIndex];
        firstRandomnlyGeneratedImageMarkup.src = firstRandomnlyGeneratedImage.imageFilename;
        secondRandomnlyGeneratedImageMarkup.src = secondRandomnlyGeneratedImage.imageFilename;
        thirdRandomnlyGeneratedImageMarkup.src = thirdRandomnlyGeneratedImage.imageFilename;
}

firstRandomnlyGeneratedImageMarkup.addEventListener('click', function() {
   
    displayThreeRandomnlyGeneratedImages();
});

secondRandomnlyGeneratedImageMarkup.addEventListener('click', function() {
  
    displayThreeRandomnlyGeneratedImages();
});

thirdRandomnlyGeneratedImageMarkup.addEventListener('click', function() {
   
    displayThreeRandomnlyGeneratedImages();
});  