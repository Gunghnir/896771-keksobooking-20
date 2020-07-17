'use strict';

var PIN_NUMBERS = 8;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = ['1', '2', '3'];
var GUESTS = ['1', '2', '3'];
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
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
var PIN_MAIN_OFFSET_X = 570;
var PIN_MAIN_OFFSET_Y = 375;

// var MainPinSize = {
//   WIDTH: 62,
//   HEIGHT: 62,
//   ARROW: 18
// };
// // var offsetY = MainPinSize.HEIGHT / 2 + MainPinSize.ARROW;

// module4-task2
// Выберем контрол адреса объявления, инпуты, селекты, филдсеты в ad-form и map__filters
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('form.ad-form');
var fieldSets = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelectorAll('form.map__filters > input, form.map__filters > select, form.map__filters > fieldset');

// Поле ввода адреса всегда должно быть заполнено. Заполним скриптом, а в разметке добавим свойство readonly, чтобы никто не почистил поле
var PIN_MAIN_WIDTH = mapPinMain.offsetWidth;
var PIN_MAIN_HEIGHT = mapPinMain.offsetHeight;
var inputAddressElement = document.querySelector('#address');
inputAddressElement.value = Math.round((PIN_MAIN_OFFSET_X + PIN_MAIN_WIDTH / 2)) + ', ' + Math.round((PIN_MAIN_OFFSET_Y + PIN_MAIN_HEIGHT / 2));

// Валидация
adForm.addEventListener('change', validate);

function validate() {
  var roomElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');
  var roomChecked = roomElement.value;
  var capacityChecked = capacityElement.value;

  if (roomChecked === '100' && capacityChecked !== '0') {
    capacityElement.setCustomValidity('При выборе 100 комнат количество мест должно быть "не для гостей"');
  } else if (roomChecked !== '100' && capacityChecked === '0') {
    capacityElement.setCustomValidity('Количество мест "не для гостей" только для варианта количества комнат "100 комнат"');
  } else if (roomChecked < capacityChecked) {
    capacityElement.setCustomValidity('Количество гостей не должно превышать количества комнат');
  } else {
    capacityElement.setCustomValidity('');
  }
}

// Страница находится в неактивном состоянии при открытии
function nodeDisable(node, status) {
  for (var i = 0; i < node.length; i++) {
    if (status === true) {
      node[i].setAttribute('disabled', true);
    } else {
      node[i].removeAttribute('disabled');
    }
  }
}

nodeDisable(fieldSets, true);
nodeDisable(mapFilters, true);

// Активация по 'mousedown' или 'keydown'
mapPinMain.addEventListener('mousedown', clickPinMainButton);
mapPinMain.addEventListener('keydown', pressPinMainButton);

// Функция активации

var map = document.querySelector('.map');

function setPageActive() {
  nodeDisable(fieldSets, false);
  nodeDisable(mapFilters, false);
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  mapPinMain.removeEventListener('mousedown', clickPinMainButton, false);
  mapPinMain.removeEventListener('keydown', pressPinMainButton, false);
}

// Ловим нажатие ЛКМ
function clickPinMainButton(e) {
  if (typeof e === 'object') {
    switch (e.button) {
      case 0:
        setPageActive();
        break;
      default:
        break;
    }
  }
}

// Ловим срабатывание по нажатию на Enter
function pressPinMainButton(evt) {
  if (evt.key === 'Enter') {
    setPageActive();
  }
}


// Стартовая координата метки
// var addressDefaultCoords = {
//   left: parseInt(mainPinLeft, 10),
//   top: parseInt(mainPinTop, 10) + offsetY
// };

// Обработка перемещений мыши (на будущее задание)

// var onMouseMove = function (moveEvt) {
//   moveEvt.preventDefault();

//   // Рассчитывает смещение относительно стартовой точки
//   var shift = {
//     x: startCoords.x - moveEvt.clientX,
//     y: startCoords.y - moveEvt.clientY
//   };

//   // Обновляет координаты стартовой точки
//   startCoords = {
//     x: moveEvt.clientX,
//     y: moveEvt.clientY
//   };

//   // Рассчитывает положение перемещаемого элемента
//   var currentCoords = {
//     x: mainPin.offsetLeft - shift.x,
//     y: mainPin.offsetTop - shift.y
//   };

//   // Перемещает элемент при условии вхождения в заданную область перемещения
//   if (currentCoords.x >= MainPinSize.WIDTH / 2 &&
//     currentCoords.x <= map.clientWidth - MainPinSize.WIDTH / 2 &&
//     currentCoords.y + offsetY >= CoordY.MIN &&
//     currentCoords.y + offsetY <= CoordY.MAX) {

//     mainPin.style.left = currentCoords.x + 'px';
//     mainPin.style.top = currentCoords.y + 'px';

//     // Заносит в поле с адресом текущее положение элемента 'Главный пин'
//     // с поправкой на размер элемента
//     window.form.setAddress(currentCoords.x, currentCoords.y + offsetY);
//   }
// };

// module3-task3

var templateCard = document.querySelector('#card').content.querySelector('.map__card');

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


// Функция для создания массива из 8 объектов
var arrData = function () {
  var adsArr = [];

  for (var i = 0; i < PIN_NUMBERS; i++) {
    var locationX = getRandomInteger(X_MIN, X_MAX);
    var locationY = getRandomInteger(Y_MIN, Y_MAX);

    var adsData = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: 'строка, заголовок предложения',
        address: locationX + ', ' + locationY,
        price: getRandomInteger(PRICE_MIN, PRICE_MAX),
        type: getRandomElement(TYPES),
        rooms: getRandomElement(ROOMS),
        guests: getRandomElement(GUESTS),
        checkin: getRandomElement(CHECKIN_TIMES),
        checkout: getRandomElement(CHECKOUT_TIMES),
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
};


// Создадим метки для карты, и заполним их с помощью arrData
var mapPins = document.querySelector('.map__pins');

// module3-task3

// <<<<<<< module4-task2
// var createCard = function (arrFeatures) {
//   var cardElement = templateCard.cloneNode(true);
//   cardElement.querySelector('.popup__title').textContent = arrFeatures.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = arrFeatures.offer.address;
//   cardElement.querySelector('.popup__text--price').textContent = arrFeatures.offer.price + ' ' + String.fromCharCode(8381) + '/ночь';

//   switch (arrFeatures.offer.type) {
//     case 'flat' :
//       cardElement.querySelector('.popup__type').textContent = 'Квартира';
//       break;
//     case 'palace' :
//       cardElement.querySelector('.popup__type').textContent = 'Дворец';
//       break;
//     case 'house' :
//       cardElement.querySelector('.popup__type').textContent = 'Дом';
//       break;
//     case 'bungalo' :
//       cardElement.querySelector('.popup__type').textContent = 'Бунгало';
//       break;
//     default:
//       cardElement.querySelector('.popup__type').textContent = 'Квартира';
//   }
//   cardElement.querySelector('.popup__text--capacity').textContent = arrFeatures.offer.rooms + ' комнаты для ' + arrFeatures.offer.guests + ' гостей';
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrFeatures.offer.checkin + ', выезд до ' + arrFeatures.offer.checkout;
//   cardElement.querySelector('.popup__description').textContent = arrFeatures.offer.description;
//   cardElement.querySelector('.popup__avatar').src = arrFeatures.author.avatar;


//   // Сравним сгенерированный на строке 73 массив с представленным в разметке ненумерованным списком, и оставим совпадения видимыми
//   var arrayUl = cardElement.querySelectorAll('.popup__feature');

//   for (var i = 0; i < arrayUl.length; i++) {

//     for (var j = 0; j < arrFeatures.offer.features.length; j++) {
//       if (!arrayUl[i].matches('.popup__feature--' + arrFeatures.offer.features[i])) {
//         arrayUl[i].classList.add('visually-hidden');
//       }
//     }
//   }

//   // Заполним <div class="popup__photos">
//   var photos = cardElement.querySelector('.popup__photos');
//   var photo = cardElement.querySelector('.popup__photo');
//   // photo.src = arrFeatures.offer.photos[0];
//   for (var k = 0; k < arrFeatures.offer.photos.length; k++) {
//     var img = photo.cloneNode(true);
//     img.src = arrFeatures.offer.photos[k];
//     photos.appendChild(img);
//   }

//   return cardElement;
// };

// // Вызовем функцию для создания карточки с информацией, и запишем результат в <section class = "map"> перед <div class="map__filters-container">
// var adsData = arrData();
// var card = createCard(adsData[0]);
// var filters = map.querySelector('.map__filters-container');
// map.insertBefore(card, filters);

// =======

// // Создадим метки для карты, и заполним их с помощью arrData
// var mapPins = document.querySelector('.map__pins');
// >>>>>>> master

// module3-task3

var createCard = function (arrFeatures) {
  var cardElement = templateCard.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = arrFeatures.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = arrFeatures.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = arrFeatures.offer.price + ' ' + String.fromCharCode(8381) + '/ночь';

  switch (arrFeatures.offer.type) {
    case 'flat' :
      cardElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'palace' :
      cardElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'house' :
      cardElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'bungalo' :
      cardElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    default:
      cardElement.querySelector('.popup__type').textContent = 'Квартира';
  }
  cardElement.querySelector('.popup__text--capacity').textContent = arrFeatures.offer.rooms + ' комнаты для ' + arrFeatures.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrFeatures.offer.checkin + ', выезд до ' + arrFeatures.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = arrFeatures.offer.description;
  cardElement.querySelector('.popup__avatar').src = arrFeatures.author.avatar;


  // Сравним сгенерированный на строке 73 массив с представленным в разметке ненумерованным списком, и оставим совпадения видимыми
  var arrayUl = cardElement.querySelectorAll('.popup__feature');

  for (var i = 0; i < arrayUl.length; i++) {

    for (var j = 0; j < arrFeatures.offer.features.length; j++) {
      if (!arrayUl[i].matches('.popup__feature--' + arrFeatures.offer.features[i])) {
        arrayUl[i].classList.add('visually-hidden');
      }
    }
  }

  // Заполним <div class="popup__photos">
  var photos = cardElement.querySelector('.popup__photos');
  var photo = cardElement.querySelector('.popup__photo');
  for (var k = 0; k < arrFeatures.offer.photos.length; k++) {
    var img = photo.cloneNode(true);
    img.src = arrFeatures.offer.photos[k];
    photos.appendChild(img);
    photo.remove();
  }

  return cardElement;
};

// Вызовем функцию для создания карточки с информацией, и запишем результат в <section class = "map"> перед <div class="map__filters-container">
var adsData = arrData();
var card = createCard(adsData[0]);
var filters = map.querySelector('.map__filters-container');
map.insertBefore(card, filters);


// Генерируем один пин, сдвигаем начало координат изображения через style
var createPin = function (ads) {
  var pinContent = document.getElementById('pin').content;
  var pinElement = pinContent.cloneNode(true);
  var pin = pinElement.querySelector('.map__pin');
  var avatar = pinElement.querySelector('img');

  pin.style.left = ads.location.x + (-MAP_PIN_WIDTH / 2) + 'px';
  pin.style.top = ads.location.y - MAP_PIN_HEIGHT + 'px';
  avatar.src = ads.author.avatar;
  avatar.alt = ads.offer.title;

  return pinElement;
};

// Отрисуем созданные элементы в .mapPins с помощью фрагмента необходимое число раз
var createPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adsData.length; i++) {
    fragment.appendChild(createPin(adsData[i]));
  }

  mapPins.appendChild(fragment);
};

createPins();
