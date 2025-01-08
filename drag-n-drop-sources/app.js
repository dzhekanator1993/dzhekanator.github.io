const item = document.querySelector('.item')
const placeholders = document.querySelectorAll('.placeholder')

// console.log(item)

// события перемещение переменной
item.addEventListener('dragstart', dragstart)
item.addEventListener('dragend', dragend)

//используем цыкл forOf чтобы пробежаться по массиву(на каждой итерации создавать placeholder из массива placeholders)
for (const placeholder of placeholders){
    // console.log(placeholder)
    // добавляем события для перемещения  
    placeholder.addEventListener('dragover', dragover)
    placeholder.addEventListener('dragleave', dragleave)
    placeholder.addEventListener('dragenter', dragenter)
    placeholder.addEventListener('drop', dragdrop)
}
// 
function dragover(event) {
    // console.log('drag over')
    //выключает отмену перемещениия в другой блок
    event.preventDefault()
}
function dragleave(event) {
    // console.log('drag leave')
    event.target.classList.remove ('hovered')
}
function dragenter(event) {
    // console.log('drag enter')
    event.target.classList.add('hovered')
}
function dragdrop(event) {
    // console.log('drag drop')
    event.target.classList.remove ('hovered')
    event.target.append(item)
}

//
function dragstart(event) {
    // console.log('drag start', event.target)
    //добавляем стиль при перемещении
    event.target.classList.add('hold')
    //скрываем стартовую позицию через setTimeout добавив стиль
    setTimeout(() => event.target.classList.add('hide'),0)
}
function dragend(event) {
    // console.log('drag end')
    //удаляем все стили оставив только item
    event.target.className = 'item'   
}