'use strict';


var arrayOfRandomlyGeneratedNumbers = [];
var numberOfClicks = 0;


function generatesARandomNumber(min, max) {
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
  var newArrayOfRandomNumbers = [];
  for (var i = 0; i < 3; i++) {
    newArrayOfRandomNumbers.push(generatesARandomNumber(0, Product.arrayOfProductInstances.length));
  }
  while (arrayOfRandomlyGeneratedNumbers.includes(newArrayOfRandomNumbers[0]))
  {
    newArrayOfRandomNumbers[0] = generatesARandomNumber(0, Product.arrayOfProductInstances.length);
  }
  while (arrayOfRandomlyGeneratedNumbers.includes(newArrayOfRandomNumbers[1]) ||
    newArrayOfRandomNumbers[1] === newArrayOfRandomNumbers[0])
  {
    newArrayOfRandomNumbers[1] = generatesARandomNumber(0,Product.arrayOfProductInstances.length);
  }
  while (arrayOfRandomlyGeneratedNumbers.includes(newArrayOfRandomNumbers[2]) ||
    newArrayOfRandomNumbers[2] === newArrayOfRandomNumbers[1] ||
    newArrayOfRandomNumbers[2] === newArrayOfRandomNumbers[0])
  {
    newArrayOfRandomNumbers[2] = generatesARandomNumber(0, Product.arrayOfProductInstances.length);
  }
  arrayOfRandomlyGeneratedNumbers = newArrayOfRandomNumbers;
}


var firstRenderedImage = document.getElementById('imageFirst');
var secondRenderedImage = document.getElementById('imageSecond');
var thirdRenderedImage = document.getElementById('imageThird');
var sideBar = document.getElementById('sidebar');


function displayThreeRandomlyGeneratedImages() {
  var imagesToBeRenderedArray = [
    firstRenderedImage,
    secondRenderedImage,
    thirdRenderedImage
  ];
  helpsGenerateThreeRandomNumbers();
  imagesToBeRenderedArray.forEach(function(image, index) {
    image.src = Product.arrayOfProductInstances[arrayOfRandomlyGeneratedNumbers[index]].path;
    image.id = Product.arrayOfProductInstances[arrayOfRandomlyGeneratedNumbers[index]].productName;
    Product.arrayOfProductInstances[arrayOfRandomlyGeneratedNumbers[index]].numberOfTimesImageIsDisplayed++;
  });
}

function handlesImageClicksByUser(event) {
  for (var i = 0; i < Product.arrayOfProductInstances.length; i++) {
    if (Product.arrayOfProductInstances[i].productName === event.target.id) {
      Product.arrayOfProductInstances[i].numberOfTimesImageWasClickedByUser++;
      numberOfClicks++;
    }
  }
  if (numberOfClicks < 25) {
    displayThreeRandomlyGeneratedImages();
  } else if (numberOfClicks === 25) {
    localStorage.setItem('userClickData', JSON.stringify(Product.arrayOfProductInstances));
    document.getElementById('displayed-images').style.display = 'none';
    document.getElementById('show-chart').style.display = 'flex';
    document.getElementById('clear-localstorage').style.display = 'flex';
  }
}

function displaysTheResultList() {
  sideBar.style.display = 'flex';
  clickEventForChartToBeShown.style.display = 'none';
  var resultsTable = document.getElementById('results');
  var sideBarDiv = document.getElementById('borderleft');
  for(var i = 0; i < Product.arrayOfProductInstances.length; i++){
    var product = Product.arrayOfProductInstances[i];
    var createTrTags = document.createElement('tr');
    var createTdTags = document.createElement('td');
    createTrTags.textContent = product.productName;
    createTdTags.textContent = product.numberOfTimesImageIsDisplayed;
    resultsTable.appendChild(createTrTags);
    createTrTags.appendChild(createTdTags);
  }
  sideBarDiv.classList.add('content');
}


function makeChart() {
  var productNames = [];
  var percents = [];
  document.getElementById('displayed-images').style.display = 'none';
  document.getElementById('cust-chart').style.display = 'flex';
  for (var i = 0; i < Product.arrayOfProductInstances.length; i++) {
    productNames.push(Product.arrayOfProductInstances[i].productName);
    percents.push(Product.arrayOfProductInstances[i].numberOfTimesImageWasClickedByUser);
  }

  displaysTheResultList();
  var data = {
    labels: productNames,
    datasets: [
      {
        label: '# of participant votes',
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


  var chartForImagesChosenByUser = document.getElementById('cust-chart').getContext('2d');
  new Chart(chartForImagesChosenByUser, {
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


document.getElementById('cust-chart').style.display = 'none';
document.getElementById('show-chart').style.display = 'none';
document.getElementById('clear-localstorage').style.display = 'none';
sideBar.style.display = 'none';


(function checkForLocalStorage(){
  if(localStorage.userClickData){
    console.log('Storage Exists');
    var parsedImages = JSON.parse(localStorage.userClickData);
    for(var i = 0; i < Product.arrayOfProductInstances.length; i++){
      Product.arrayOfProductInstances = parsedImages;
    }
  }else{
    console.log('Storage does not exist');
  }
})();


document.getElementById('clear-localstorage').addEventListener('click', function(){
  localStorage.clear();
  window.location.reload();
});


displayThreeRandomlyGeneratedImages();
