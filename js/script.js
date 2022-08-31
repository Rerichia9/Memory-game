let CardsNumber
// Проверка на ввод
function Start() {
  CardsNumber = prompt('Введите количество карточек', '')
  if (CardsNumber === null) {
    alert('Вы отказались от ввода')
    Start()
  } else if (CardsNumber.length === 0) {
    alert('Нужно четное число', '')
    Start()
  } else if (isNaN(CardsNumber % 2)) {
    alert('Ошибка, введено не число')
    Start()
  } else if (CardsNumber % 2 === 0) {
    alert('Приятной игры')
  } else {
    alert('Число нечетное, но мы это исправим')
  }
}

Start()

// Карточка
class Card {
  _open = false
  _success = false

  constructor(container, num, action) {
    this.card = document.createElement('div')
    this.card.classList.add('card')
    this.card.textContent = num
    this.number = num

    this.card.addEventListener('click', () => {
      if (this.open == false && this.success == false) {
        this.open = true
        action(this)
      }
    })
    container.append(this.card)
  }

  set open(value) {
    this._open = value
    if (value) {
      this.card.classList.add('open')
    } else {
      this.card.classList.remove('open')
    }
  }

  get open() {
    return this._open
  }

  set success(value) {
    this._success = value
    if (value) {
      this.card.classList.add('success')
    } else {
      this.card.classList.remove('success')
    }
  }

  get success() {
    return this._success
  }
}

// Поле
function newGame(container, cardsCount) {
  let cardsNumberArray = [],
    cardsArray = [],
    firstCard = null,
    secondCard = null

  for (let i = 1; i <= cardsCount / 2; i++) {
    cardsNumberArray.push(i)
    cardsNumberArray.push(i)
  }

  // Перемешиваем массив

  // 1

  // cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5);

  function shuffle(arr) {
    for (var i = 0; i < arr.length; i++) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr.map(function (item, index) {
      return { key: index + 1, value: item };
    });
  }

  shuffle(cardsNumberArray)

  for (let cardNumber of cardsNumberArray) {
    cardsArray.push(new Card(container, cardNumber, flip))
  }

  // Таймер

  // setTimeout(function () {
  //   if (alert('Время вышло')) {
  //     window.location.reload();
  //   }
  //   location.reload();
  // }, 60000);

  const deadline = new Date(Date.now() + 60999);
  let timerId = null;
  // склонение числительных
  function declensionNum(num, words) {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  }
  function countdownTimer() {
    const diff = deadline - new Date();
    if (diff <= 0) {
      clearInterval(timerId);
      alert('Время вышло')
      window.location.reload();
      location.reload();
    }
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
    $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
  }
  const $minutes = document.querySelector('.timer__minutes');
  const $seconds = document.querySelector('.timer__seconds');
  countdownTimer();
  timerId = setInterval(countdownTimer, 1000);

  // Логика
  function flip(card) {
    if (firstCard != null && secondCard != null) {
      if (firstCard.number != secondCard.number) {
        firstCard.open = false
        secondCard.open = false
        firstCard = null
        secondCard = null
      }
    }
    if (firstCard == null) {
      firstCard = card
    } else {
      if (secondCard == null) {
        secondCard = card
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.success = true
        secondCard.success = true
        firstCard = null
        secondCard = null
      }
    }

    // Сброс игры
    if (document.querySelectorAll('.card.success').length == cardsNumberArray.length) {
      container.innerHTML = ''
      cardsNumberArray = []
      cardsArray = []
      firstCard = null
      secondCard = null
      clearInterval(timerId);

      let btn = document.getElementById('btn')
      btn.classList.toggle('hidden')
      btn.addEventListener('click', function () {
        // newGame(container, cardsCount)
        location.reload()
      })
    }
  }
}

newGame(document.getElementById('game'), CardsNumber)
