let main = document.querySelector(".main"); 
const scoreElem = document.getElementById('score')
const levelElem = document.getElementById('level')

let playfield = [
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
];

// let gameSpeed = 400;
let score = 0;
let currentLevel = 1;

let possibleLevels = {
    1:{
        scorePerLine: 10,
        speed: 400,
        nextLevelScore: 300,
    },
    2:{
        scorePerLine: 15,
        speed: 200,
        nextLevelScore: 600,
    },
    3:{
        scorePerLine: 10,
        speed: 100,
        nextLevelScore: Infinity,
    }
};

let activeTetro = {
    x : 0,
    y : 0,

shape: [
    [1,1,0,],
    [1,1,0,],
    [0,0,0,],
],
};

let figures = {
    O:[
        [1,1,0,],
        [1,1,0,],
        [0,0,0,],
    ],
    I:[
        [0,1,0,0,],
        [0,1,0,0,],
        [0,1,0,0,],
        [0,1,0,0,],
    ],
    Z:[
        [1,1,0,],
        [0,1,1,],
        [0,0,0,],
    ],
    S:[
      [0,1,1,],
      [1,1,0,],
      [0,0,0,],
    ],
    T:[
        [1,1,1,],
        [0,1,0,],
        [0,0,0,],
    ],
    L:[
        [0,1,0,],
        [0,1,0,],
        [0,1,1,],
    ],
    J:[
        [0,1,0,],
        [0,1,0,],
        [1,1,0 ,],
    ],
}

function draw(){
    let mainInnerHTML = "";
    for (let y = 0; y < playfield.length; y++){
        for(let x = 0; x < playfield[y].length; x++){
            if(playfield[y][x] === 1){
                mainInnerHTML += '<div class="cell movingCell"></div>';
            }else if(playfield[y][x] === 2){
                mainInnerHTML += '<div class="cell fixedCell"></div>';
            }else{
                mainInnerHTML += '<div class="cell"></div>';
            }
        }
    }
// console.log(mainInnerHTML);
 main.innerHTML = mainInnerHTML;
}

function removePrevActiveTetro() {
    for (let y = 0; y < playfield.length; y++){
        for(let x = 0; x < playfield[y].length; x++){
            if(playfield [y][x] === 1){
                playfield[y][x] = 0;
            }
        }
    }
}

// 
function addActiveTetro() {
    removePrevActiveTetro();
    for (let y = 0; y < activeTetro.shape.length; y++){
        for(let x = 0; x < activeTetro.shape[y].length; x++){
            if (activeTetro.shape[y][x] === 1){
                playfield[activeTetro.y + y][activeTetro.x + x] = 
                activeTetro.shape[y][x];
            }
        }
    }
}

 function removeActiveTetro() {
    for (let y = 0; y < playfield.length; y++){
        for(let x = 0; x < playfield[y].length; x++){
            if(playfield[y][x] === 1) {
                playfield[y][x] = 0;
            }
        }
    }
}


function rotateTetro() {
    const prevTetroState = activeTetro.shape;
    
    activeTetro.shape = activeTetro.shape[0].map((val, index) => 
        activeTetro.shape.map((row) => row[index]).reverse());                     //вращаем фигуры вокруг центра по часовой

    if(hasCollision()){
        activeTetro.shape = prevTetroState;
    }             
}

function hasCollisions() {
    for (let y = 0; y < activeTetro.shape.length; y++){
        for(let x = 0; x < activeTetro.shape[y].length; x++){
            if (
                activeTetro.shape[y][x] &&
                (playfield[activeTetro.y + y] === undefined || 
                playfield[activeTetro.y + y][activeTetro.x + x] === undefined || 
                playfield[activeTetro.y + y][activeTetro.x + x] === 2)
            ) {
                return true;
            }
        }
    }
    return false;
}

// function canTetroMoveDown(){
//     for (let y = 0; y < playfield.length; y++){
//         for(let x = 0; x < playfield[y].length; x++){
//             if(playfield[y][x] === 1) {
//                 if(y === playfield.length - 1 || playfield[y + 1][x] === 2){
//                     return false;
//                 }
//             }
//         }
//     } 
//     return true;        
// }

// function moveTetroDown() {
//     if (canTetroMoveDown()){
//         for (let y = playfield.length - 1; y >= 0; y--){
//             for(let x = 0; x < playfield[y].length; x++){
//                 if(playfield[y][x] === 1){
//                     // console.log(playfield[y+1]);
//                 playfield[y+1][x] = 1; 
//                 playfield[y][x] = 0;
//                 }
//             }
//         } 
//     }else{
//         fixTetro();
//     }
// }

// // move block left
// function canTetroMoveLeft(){
//     for (let y = 0; y < playfield.length; y++){
//         for(let x = 0; x < playfield[y].length; x++){
//             if(playfield[y][x] === 1) {
//                 if(x === 0 || playfield[y][x - 1] === 2){
//                     return false;
//                 }
//             }
//         }
//     } 
//     return true;        
// }

// function moveTetroLeft() {
//     if (canTetroMoveLeft()){
//         for (let y = playfield.length - 1; y >= 0; y--){
//             for(let x = 0; x < playfield[y].length; x++){
//                 if(playfield[y][x] === 1){
//                 playfield[y][x - 1] = 1; 
//                 playfield[y][x] = 0;
//                 }
//             }
//         } 
//     }
// }

// // move block right
// function canTetroMoveRight(){
//     for (let y = 0; y < playfield.length; y++){
//         for(let x = 0; x < playfield[y].length; x++){
//             if(playfield[y][x] === 1) {
//                 if(x === 9 || playfield[y][x + 1] === 2){               // playfield[0].length - 1 === 9
//                     return false;
//                 }
//             }
//         }
//     } 
//     return true;        
// }

// function moveTetroRight() {
//     if (canTetroMoveRight()){
//         for (let y = playfield.length - 1; y >= 0; y--){
//             for(let x = 9; x >= 0; x--){
//                 if(playfield[y][x] === 1){
//                 playfield[y][x + 1] = 1; 
//                 playfield[y][x] = 0;
//                 }
//             }
//         } 
//     }
// }

function removeFullLines() {
    let canRemoveLine = true, filedLines = 0;
    for (let y = 0; y < playfield.length; y++) {    
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] !== 2) {
                canRemoveLine = false;
                break;
            }
        }
        if (canRemoveLine) {
            playfield.splice(y, 1); //удаляем заполненую линию
            playfield.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) //add new array-row
            filedLines += 1;
        }
        canRemoveLine= true;
    }
    switch (filedLines){ // добавляем очки за убранные линии
        case 1:
            score += 10; 
            break;
        case 2:
            score += 10*3; 
            break;
        case 3:
            score += 10*6;
            break;
        case 4:
            score += 10*12;
            break;
        default:
            break;
    }
    scoreElem.innerHTML = score; 
    if(score >= possibleLevels[currentLevel].nextLevelScore) {
        currentLevel++;
        levelElem.innerHTML = currentLevel;
    }
}

function getNewTetro() {
    const possibleFigures = 'OISZLJT';
    const rand = Math.floor(Math.random()*7);
    return figures[possibleFigures[rand]];
}

function fixTetro() {
    for (let y = 0; y < playfield.length; y++){
        for(let x = 0; x < playfield[y].length; x++){
            if(playfield[y][x] === 1){
                playfield[y][x] = 2;
            }
        }
    }
    // removeFullLines();
}

function moveTetroDown() { //движение вниз
    activeTetro.y +=1;
    if(hasCollisions()){
        activeTetro.y -=1;
        fixTetro();
        removeFullLines();
        activeTetro.shape = getNewTetro();
        activeTetro.x = Math.floor((10 - activeTetro.shape[0].length)/2);
        activeTetro.y = 0;
    } 
}
//draw();
// отрабатываем нажатие клавиш
document.onkeydown = function (e) {
    // console.log(e); //команда для просмотра в консоле кода клавиш
    if (e.keyCode === 37){ // двигаем фигуру в лево
        activeTetro.x -=1; 
        if(hasCollisions()){ // проверка на ошибку и выход за границы поля
            activeTetro.x +=1; //возвращаем на место если ошибка есть 
        }
    }else if (e.keyCode === 39){ // двигаем фигуру в право
        activeTetro.x +=1;
        if(hasCollisions()){
            activeTetro.x -=1;
        }
    }else if (e.keyCode === 40){ //ускоряем фигуру стрелкой вниз
        moveTetroDown();
    }else if (e.keyCode === 38){ //  вращаем фигуру нажатием стрелки вверх
            rotateTetro();
    }
        addActiveTetro();
        draw();
};
scoreElem.innerHTML =  score;
levelElem.innerHTML = currentLevel;

addActiveTetro();
draw();

function startGame() {
    moveTetroDown();
    addActiveTetro();
    draw();
    setTimeout(startGame, possibleLevels[currentLevel].speed);
}
setTimeout(startGame, possibleLevels[currentLevel].speed);