'use strict';

var MAP_WIDTH = 1200;
var PIN_NUMBERS = 8;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = ['1', '2', '3'];
var GUESTS = ['1', '2', '3'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var Y_MIN = 130;
var Y_MAX = 630;
var X_MIN = 0;
var X_MAX = 1199;
var PRICE_MIN = 0;
var PRICE_MAX = 9999999;

// Вписываем рандомизаторы
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomArr = function (arr) {
  var randomArr = [];

  arr.forEach(function (element) {
    if (getRandomInteger(0, 1) === 1) {
      randomArr.push(element);
    }
  });

  return randomArr;
};

//Функция для создания массива из 8 объектов
var arrData = function () {
  var adsArr = [];

  for (var i = 0; i < PIN_NUMBERS; i++) {
    var locationX = getRandomInteger(X_MIN, X_MAX);
    var locationY = getRandomInteger(Y_MIN, Y_MAX);

    var adsData ={
      author: {
        avatar: 'img/avatars/user0' + (i+1) + '.png'
      },

      offer: {
        title: 'строка, заголовок предложения',
        address: locationX + ', ' + locationY,
        price: getRandomInteger(PRICE_MIN, PRICE_MAX),
        TYPES: getRandomElement(TYPES),
        rooms: getRandomElement(ROOMS),
        guests: getRandomElement(GUESTS),
        checkin: getRandomElement(CHECKIN),
        checkout: getRandomElement(CHECKOUT),
        features: getRandomArr(FEATURES),
        description: 'строка с описанием',
        photos: getRandomArr(PHOTOS),
      },

      location: {
        x: locationX,
        y: locationY
      }
    };

    adsArr.push(adsData);
  }

  return adsArr;
}


// Делаем карту видимой (с заделом на следующие задания)
var setPageActive = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
}

setPageActive();

// Создадим метки для карты, и заполним их с помощью arrData
var adsArray = arrData()
var mapPins = document.querySelector('.map__pins');

var createPins = function () {
// Генерируем один пин, сдвигаем начало координат изображения через style
  var createPin = function (ads) {
    var pinContent = document.getElementById('pin').content;
    var pinElement = pinContent.cloneNode(true);
    var pin = pinElement.querySelector('.map__pin');
    var avatar = pinElement.querySelector('img');

    pin.style.left = ads.location.x + 'px';
    pin.style.marginLeft = (-MAP_PIN_WIDTH / 2) + 'px';
    pin.style.top = ads.location.y + 'px';
    pin.style.marginTop = -MAP_PIN_HEIGHT + 'px';

    avatar.src = ads.author.avatar;
    avatar.alt = ads.offer.title;

    return pinElement;
  }
// Отрисуем созданные элементы в .mapPins с помощью фрагмента необходимое число раз

  var fragment = document.createDocumentFragment();

  for (var i=0; i < adsArray.length; i++){
    fragment.appendChild(createPin(adsArray[i]))
  }

  mapPins.appendChild(fragment);
};

createPins()
