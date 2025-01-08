const board = document.querySelector('#board')
const colors = ['#ff0000', '#ff7300', '#bbff00', '#09ff00', '#00e1ff', '#2f00ff', '#e100ff']
const SQUARES_NUMBER = 1000

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div')
    square.classList.add('square')

    // square.addEventListener('mouseover',()=> setColor(square))
    square.addEventListener('mouseover', setColor)
    // square.addEventListener('mouseleave',()=> removeColor(square))
    square.addEventListener('mouseleave' ,removeColor)
    board.append(square)
}

// function setColor(element) {
function setColor(event) {
    const element = event.target //добавили вызов события event вместо element
    const color = getRandomColor()
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 3px ${color}, 0 0 10px ${color}`
}

function removeColor(event) {
    const element = event.target //добавили вызов события event вместо element
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = `0 0 3px #000`
}

function getRandomColor() {
    // const index = Math.floor(Math.random() * colors.length)
    // return colors[index]
    return colors[Math.floor(Math.random() * colors.length)]
}