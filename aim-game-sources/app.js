 const startBtn = document.querySelector('#start')
 const screens = document.querySelectorAll('.screen')
 const timeList = document.querySelector('#timeList')
 const timeEl = document.querySelector('#time')
 const board = document.querySelector('#board')
 const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'indigo', 'violet']

 let time = 0
 let score = 0

 startBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    screens[0].classList.add('up')
 })

 timeList.addEventListener('click', event =>{
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        // console.log(time)
        startGame()

    }
 })

 board.addEventListener('click', ()=>{
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
 })

 function startGame() {
    setInterval(decreaseTime,1000)
    createRandomCircle()
    setTime(time)
    //winTheGame()
 }

 function decreaseTime() {
     if (time===0){
        finishGame()
     }else{
        let current = --time
    if(current<10){
        current=`0${current}`
    }
    setTime(current)
    }
    
 }

 function finishGame() {
    //  console.log('finish')
    //удаляем родителя(время по завершению) так
    //timeEl.parentNode.remove() 
    //или так
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span> </h1>`
 }

 function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10,60)
    //получаем свойства доски(высоту и шириу )
    const {width, height} = board.getBoundingClientRect()
    //console.log(qqq)
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top =  `${y}px`
    circle.style.left =  `${x}px`
    circle.style.background = getRandomColor()

    board.append(circle )
 }

 function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

 function getRandomNumber(min, max) {
     return Math.round(Math.random() * (max - min)+min)
 }

 function setTime(value) {
    timeEl.innerHTML =`00:${value}`
 }


 //
 function winTheGame() {
    function killCircle() {
       const circle = document.querySelector('.circle')
       if (circle) {
         circle.click()   
       }
    }
    setInterval(killCircle, 50)
 }