const body = document.querySelector('body')
const wrapper = document.querySelector('.wrapper')
const gallery = document.querySelector('.gallery')
const close = document.querySelector('.gallery__close')
const swiperWrapper = document.querySelector('.swiper-wrapper')

let currentSlide = 1
let picuresNumber = 14
let offset = window.innerHeight

document.querySelectorAll('.masonry__item').forEach(item => {
  item.addEventListener('click', openGallery)
})

document.querySelectorAll('.swiper-button-next').forEach(item => {
  item.addEventListener('click', () => {
    go(1)
  })
})

document.querySelectorAll('.swiper-button-prev').forEach(item => {
  item.addEventListener('click', () => {
    go(-1)
  })
})

close.addEventListener('click', closeGallery)

function openGallery(event) {
  currentSlide = 1
  const masonry = event.target.dataset.masonry
  gallery.style.display = 'block'
  wrapper.style.display = 'none'
  body.classList.add('lock')

  setTimeout(initGallery, 100)
}

function closeGallery() {
  gallery.style.display = 'none'
  wrapper.style.display = 'block'
  body.classList.remove('lock')
  swiperWrapper.classList.remove('animated')
}

function initGallery() {
  let picures = ''
  

   for (let index = 1; index <= picuresNumber; index++) {
    picures += `<div class="swiper__item"><img id="frt" data-masonry="1" src="img/picures/1/${index}.jpg" alt="image" /></div>`
  }

  swiperWrapper.innerHTML = picures

  const frt = document.querySelector('#frt')

  let translateY = offset * (picuresNumber - 1)

  swiperWrapper.style.transform = `translate3d(0px, -${translateY}px, 0px)`
  swiperWrapper.classList.add('animated')
  
  console.log('frt', frt)

 

  // `<img class="masonry__item" data-masonry="1" src="img/masonry/${index}.jpg" alt="image" />`
}

function go(direction) {
  // alert(direction)

  if (currentSlide + direction === 0) {
    // debugger
    currentSlide = picuresNumber
  } else if (currentSlide + direction > picuresNumber) {
    // debugger
    currentSlide = 1
  } else {
    // debugger
    currentSlide = currentSlide + direction 
  }

  // alert(currentSlide)

  console.log('currentSlide', currentSlide)
  let translateY = offset * (picuresNumber - currentSlide)

  console.log('translateY', translateY)
  swiperWrapper.style.transform = `translate3d(0px, -${translateY}px, 0px)`
}

// const swiper = new Swiper('.swiper', {
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// })

