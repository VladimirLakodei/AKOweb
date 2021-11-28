(function() {
  const body = document.querySelector('body')
  const wrapper = document.querySelector('.wrapper')
  const gallery = document.querySelector('.gallery')
  const close = document.querySelector('.gallery__close')
  const swiperWrapper = document.querySelector('.glide__slides')

  let glide
  let masonry
  let description = ''
  let currentSlide = 1
  let picuresNumber = 0
  let offset = window.innerWidth

  document.querySelectorAll('.masonry__item').forEach(item => {
    item.addEventListener('click', openGallery)
  })

  // document.querySelectorAll('.half_right').forEach(item => {
  //   item.addEventListener('click', () => {
  //     go(1)
  //   })
  // })

  // document.querySelectorAll('.half_left').forEach(item => {
  //   item.addEventListener('click', () => {
  //     go(-1)
  //   })
  // })

  function initControlButtons(event) {
    console.log('event', event)

    let classList = event.target.classList

    console.log('classList', classList)

    if (classList.contains('half_left')) {
      go(-1)
    }

    if (classList.contains('half_right')) {
      go(1)
    }
  }

  close.addEventListener('click', closeGallery)

  function openGallery(event) {
    currentSlide = 1
    const parent = event.target.closest('[data-masonry]')
    if (parent) {
      masonry = parent.dataset.masonry
      picuresNumber = parent.dataset.slides
      description = parent.dataset.description
      gallery.style.display = 'block'
      // wrapper.style.display = 'none'
      body.classList.add('lock')
      body.classList.add('gallery_open')

      setTimeout(initGallery, 100)
    }
  }

  function closeGallery() {
    glide.destroy()
    gallery.style.display = 'none'
    // wrapper.style.display = 'block'
    body.classList.remove('lock')
    body.classList.remove('gallery_open')
    swiperWrapper.classList.remove('animated')
    document.removeEventListener('click', initControlButtons)
  }

  function initGallery() {
    let picures = ''

    for (let index = 1; index <= picuresNumber; index++) {
      picures += `<div class="swiper__item" class="glide__slide"><div><img data-masonry="${masonry}" src="img/picures/${masonry}/${index}.jpg" alt="image" /> <div class="description">${description && index === 1 ? description : ''}</div></div><div class="half_left"></div>
        <div class="half_right"></div></div>`
    }

    swiperWrapper.innerHTML = picures

    setTimeout(() => {
      glide = new Glide('.glide').mount()
      // gallery.addEventListener('click', initControlButtons)
      setTimeout(() => {
        gallery.addEventListener('click', initControlButtons)
        document.querySelectorAll('.half_right').forEach(item => {
          item.addEventListener('click', () => {
            go(1)
          })
        })

        document.querySelectorAll('.half_left').forEach(item => {
          item.addEventListener('click', () => {
            go(-1)
          })
        })
      }, 10)
    }, 10)

    // let translateX = offset * (picuresNumber - 1)

    // swiperWrapper.style.width = `${translateX*picuresNumber}px`
    // swiperWrapper.style.transform = `-translate3d(${translateX}px, 0px, 0px)`
    // swiperWrapper.classList.add('animated')
  }

  // function goNext() {
  //   go(1)
  // }

  // function goPrev() {
  //   go(-1)
  // }

  function go(direction) {
    glide.go(direction === 1 ? '>' : '<')
  }

  // function printMousePos(event) {
  //   screenWidth = document.body.clientWidth,
  //   screenHeight = document.body.clientHeight
  //   console.log("clientX: " + event.clientX + " - clientY: " + event.clientY)
  // }

  // document.addEventListener("click", printMousePos);

  // function go(direction) {
  //   // alert(direction)

  //   if (currentSlide + direction === 0) {
  //     // debugger
  //     currentSlide = picuresNumber
  //   } else if (currentSlide + direction > picuresNumber) {
  //     // debugger
  //     currentSlide = 1
  //   } else {
  //     // debugger
  //     currentSlide = currentSlide + direction 
  //   }

  //   // alert(currentSlide)

  //   console.log('currentSlide', currentSlide)
  //   let translateX = offset * (picuresNumber - currentSlide)

  //   console.log('translateX', translateX)
  //   swiperWrapper.style.transform = `translate3d(-${translateX}px, 0px, 0px)`
  // }

  // const swiper = new Swiper('.swiper', {
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  // })
})();
