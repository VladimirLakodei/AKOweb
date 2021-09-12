let body = document.querySelector('body')
let wrapper = document.querySelector('.wrapper')
let gallery = document.querySelector('.gallery')
let close = document.querySelector('.gallery__close')

document.querySelectorAll('.masonry__item').forEach(item => {
  item.addEventListener('click', openGallery)
})

close.addEventListener('click', closeGallery)

function openGallery(event) {
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
}

function initGallery() {
  // const swiper = new Swiper('.swiper', {
  //   direction: "vertical",
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  // })
}

// const swiper = new Swiper('.swiper', {
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// })

