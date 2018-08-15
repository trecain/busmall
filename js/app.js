'use strict';

var arrayOfRandomlyGeneratedNumbers = [];
var numberOfClicks = 0;

function genratesARandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Product(productName, type) {
  this.productName = productName;
  this.type = type;
  this.path = 'images/' + this.productName + this.type;
  this.numberOfTimesImageIsDisplayed = 0;
  this.numberOfTimesImageWasClickedByUser = 0;
  Product.arrayOfProductInstances.push(this);
}
Product.arrayOfProductInstances = [];

new Product('bag', '.jpg');
new Product('banana', '.jpg');
new Product('bathroom', '.jpg');
new Product('boots', '.jpg');
new Product('breakfast', '.jpg');
new Product('bubblegum', '.jpg');
new Product('chair', '.jpg');
new Product('cthulhu', '.jpg');
new Product('dog-duck', '.jpg');
new Product('dragon', '.jpg');
new Product('pen', '.jpg');
new Product('pet-sweep', '.jpg');
new Product('scissors', '.jpg');
new Product('shark', '.jpg');
new Product('sweep', '.png');
new Product('tauntaun', '.jpg');
new Product('unicorn', '.jpg');
new Product('usb', '.gif');
new Product('water-can', '.jpg');
new Product('wine-glass', '.jpg');

function helpsGenerateThreeRandomNumbers() {
  for (var i = 0; i < 3; i++) {
    arrayOfRandomlyGeneratedNumbers.push(
      genratesARandomNumber(0, Product.arrayOfProductInstances.length)
    );
  }
  while (
    arrayOfRandomlyGeneratedNumbers[1] === arrayOfRandomlyGeneratedNumbers[0]
  ) {
    arrayOfRandomlyGeneratedNumbers[1] = genratesARandomNumber(
      0,
      Product.arrayOfProductInstances.length
    );
  }
  while (
    arrayOfRandomlyGeneratedNumbers[2] === arrayOfRandomlyGeneratedNumbers[1] ||
    arrayOfRandomlyGeneratedNumbers[2] === arrayOfRandomlyGeneratedNumbers[0]
  ) {
    arrayOfRandomlyGeneratedNumbers[2] = genratesARandomNumber(
      0,
      Product.arrayOfProductInstances.length
    );
  }
}

var firstRenderedImage = document.getElementById('imageFirst');
var secondRenderedImage = document.getElementById('imageSecond');
var thirdRenderedImage = document.getElementById('imageThird');
function displayThreeRandomlyGeneratedImages() {
  var imagesToBeRenderedArray = [
    firstRenderedImage,
    secondRenderedImage,
    thirdRenderedImage
  ];
  helpsGenerateThreeRandomNumbers();
  imagesToBeRenderedArray.forEach(function(image, index) {
    console.log('idx: ', index);
    image.src =
      Product.arrayOfProductInstances[
        arrayOfRandomlyGeneratedNumbers[index]
      ].path;
    image.id =
      Product.arrayOfProductInstances[
        arrayOfRandomlyGeneratedNumbers[index]
      ].productName;
    Product.arrayOfProductInstances[arrayOfRandomlyGeneratedNumbers[index]].numberOfTimesImageIsDisplayed++;
  });
  arrayOfRandomlyGeneratedNumbers = [];
  console.log(Product.arrayOfProductInstances.numberOfTimesImageIsDisplayed);
}

function handlesImageClicksByUser(event) {
  var targetEl = event.target;
  for (var i = 0; i < Product.arrayOfProductInstances.length; i++) {
    if (Product.arrayOfProductInstances[i].productName === event.target.id) {
      Product.arrayOfProductInstances[i].numberOfTimesImageWasClickedByUser++;
      numberOfClicks++;
    }
    console.log('nums ', numberOfClicks);
  }
  if (numberOfClicks < 25) {
    displayThreeRandomlyGeneratedImages();
  } else if (numberOfClicks === 25) {
    document.getElementById('displayed-images').style.display = 'none';
    document.getElementById('show-chart').style.display = 'flex';
    document.getElementById('ten-more').style.display = 'flex';
    document.getElementById('lcClear').style.display = 'flex';
  }
}

function clickButtonHandler(event) {
  document.getElementById('show-chart').style.display = 'none';
  document.getElementById('ten-more').style.display = 'none';
  document.getElementById('cust-chart').style.display = 'none';
  document.getElementById('lcClear').style.display = 'none';
  document.getElementById('displayed-images').style.display = 'flex';
  numberOfClicks = 15;
}

function makeChart() {
  var productNames = [];
  var percents = [];
  document.getElementById('displayed-images').style.display = 'none';
  document.getElementById('second-logo').style.display = 'flex';
  document.getElementById('cust-chart').style.display = 'flex';
  document.getElementById('btnss').style.display = 'none';
  document.getElementById('top').style.display = 'none';
  for (var i = 0; i < Product.arrayOfProductInstances.length; i++) {
    productNames.push(Product.arrayOfProductInstances[i].productName);
    percents.push(
      Product.arrayOfProductInstances[i].numberOfTimesImageWasClickedByUser
    );
  }

  var data = {
    labels: productNames,
    datasets: [
      {
        data: percents,
        backgroundColor: [
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'indigo',
          'violet',
          '#790e08',
          '#7d443d',
          '#89a5bb',
          '#ab831b',
          '#ead83c',
          '#22d7a5',
          '#760567',
          '#52f6bf',
          '#30a702',
          '#534317',
          '#cf7e0b',
          '#3017ec',
          '#4f7c9a'
        ],
        hoverBackgroundColor: []
      }
    ]
  };

  var chartForImagesChosenByUser = document
    .getElementById('cust-chart')
    .getContext('2d');
  var myChart = new Chart(chartForImagesChosenByUser, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      barValueSpacing: 2
    }
  });
}


var clickEventForDisplayeImages = document.getElementById('displayed-images');
clickEventForDisplayeImages.addEventListener('click', handlesImageClicksByUser);

var clickEventForChartToBeShown = document.getElementById('show-chart');
clickEventForChartToBeShown.addEventListener('click', makeChart);

var clickEventForTenMoreButton = document.getElementById('ten-more');
clickEventForTenMoreButton.addEventListener('click', clickButtonHandler);

document.getElementById('show-chart').style.display = 'none';
document.getElementById('ten-more').style.display = 'none';
document.getElementById('lcClear').style.display = 'none';
document.getElementById('second-logo').style.display = 'none';

displayThreeRandomlyGeneratedImages();
