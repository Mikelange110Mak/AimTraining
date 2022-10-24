const startBtn = document.querySelector('#start'),
   screens = document.querySelectorAll('.screen'),
   timelist = document.querySelector('#timelist'),
   timeEl = document.querySelector('#time'),
   board = document.querySelector('#board');

let time = 0;
let score = 0;
let misses = 0
const colors = ['linear-gradient(90deg, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)', 'linear-gradient(to right top, #f92a2a, #fc0c45, #fb005e, #f50076, #eb128d)', 'linear-gradient(to right top, #18ff02, #54f600, #70ec01, #82e30e, #90da1b)', 'linear-gradient(to right top, #ffbc02, #f5c400, #eacc00, #ded30b, #d2da1b)']


startBtn.addEventListener('click', (e) => {
   e.preventDefault()
   screens[0].classList.add('up')
})

timelist.addEventListener('click', (e) => {
   if (e.target.classList.contains('time-btn')) {
      time = parseInt(e.target.getAttribute('data-time'));
      screens[1].classList.add('up');
      startGame();
   }
})



board.addEventListener('click', (e) => {
   if (e.target.classList.contains('circle')) {
      score++
      e.target.remove()
      createRandomCircle()
   } else {
      if (time > 0) {
         misses++
      }
   }
})

function getRandomColor() {
   return colors[Math.floor(Math.random() * colors.length)];
}

function startGame() {
   setInterval(decreaseTime, 1000)
   createRandomCircle()
   setTime(time)
}

function decreaseTime() {
   if (time === 0) {
      endGame()
   } else {
      let current = --time;
      if (current < 10) {
         current = `0${current}`
      }
      setTime(current)
   }
}

function setTime(value) {
   timeEl.innerHTML = `00:${value}`
}

function endGame() {
   timeEl.parentNode.classList.add('hide')
   board.innerHTML = `<h1>Счет: <span class ="primary">${score}</span></h1>
   <h2>Промахов: <span class ="misses">${misses}</span></h2>
   <button class="re">Вернуться</button>`
   const re = document.querySelector('.re');
   setTimeout(
      re.addEventListener('click', () => {
         document.location.reload()
      }), endGame)

}

function createRandomCircle() {
   const circle = document.createElement('div');
   circle.classList.add('circle');

   const size = getRandomNumber(10, 60)
   const { width, height } = board.getBoundingClientRect()

   const x = getRandomNumber(0, width - size)
   const y = getRandomNumber(0, height - size)


   circle.style.width = `${size}px`
   circle.style.height = `${size}px`

   circle.style.top = `${y}px`
   circle.style.left = `${x}px`

   circle.style.background = getRandomColor();

   board.append(circle)
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min)
}
