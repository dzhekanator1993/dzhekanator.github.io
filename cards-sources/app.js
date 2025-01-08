const slides = document.querySelectorAll('.slide')
const next = document.getElementById('next')
const prev = document.getElementById('prev')

function slidesPlugin(activeSlides = 2) {
    

    // //счетчик проверяющий класс на active
    // for (const slide of slides){
    //     slide.addEventListener('click', ()=>{
    //         clearActivClasses()
    //         //добавляем activ к выбраному классу
    //         slide.classList.add('active')
    //     })
    // }
    slides[activeSlides].classList.add('active')



    let index = 3;

    const activeSlide = n =>{
        // console.log(n);
        for ( slide of slides){
            clearActivClasses();
        }   
        slides[n].classList.add('active');
    }

    // функция удаляющая active
    function clearActivClasses(){
        slides.forEach((slide)=>{
            slide.classList.remove('active')
        })
    }

    const nextSlide = ()=>{
        if(index == slides.length -1){
            index=0;
            activeSlide(index);
        }else{
            index++;
            activeSlide(index);
        }
    }
    const prevSlide = ()=>{
        if(index == 0 ){
            index = slides.length -1;
            activeSlide(index);
        }else{
            index--;
            activeSlide(index);
        }
    }

    slides.forEach((slide, indexSlide) => {
        slide.addEventListener('click', ()=>{
            index = indexSlide;
            activeSlide(index);
        })
    });


    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);
}

slidesPlugin(0)