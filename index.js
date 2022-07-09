const next = document.querySelector('.right')

const previous = document.querySelector('.left')

let count = 0

var sliderImgLinks

// Function to go to the next image
function nextSlide() {
  let sliderImg = Array.from(document.querySelectorAll('.sliderImg'))
  let nbSlide = sliderImg.length
  sliderImg[count].classList.remove('active')

  if (count < nbSlide - 1) {
    count++
  } else {
    count = 0
  }

  sliderImg[count].classList.add('active')
}
next.addEventListener('click', nextSlide)

// Function to back to the previous image
function previousSlide() {
  let sliderImg = Array.from(document.querySelectorAll('.sliderImg'))
  let nbSlide = sliderImg.length
  sliderImg[count].classList.remove('active')

  if (count > 0) {
    count--
  } else {
    count = nbSlide - 1
  }

  sliderImg[count].classList.add('active')
}
previous.addEventListener('click', previousSlide)

// Function to manage the timer
$(document).ready(function () {
  var refreshIntervalId = setInterval('nextSlide()', 5000)

  $('#timer').on('change', function (event) {
    clearInterval(refreshIntervalId)
    let intervalValue = event.target.value * 1000
    refreshIntervalId = setInterval('nextSlide()', intervalValue)
  })
})

// Function to use keyboard to go to the next image or back to the previous
function keyPress(e) {
  if (e.keyCode === 37) {
    previousSlide()
  } else if (e.keyCode === 39) {
    nextSlide()
  }
}

document.addEventListener('keydown', keyPress)

const ajaxBtn = document.querySelector('.ajaxBtn')

const slider = document.querySelector('.slider')

// Function to add Ajax images at the click on the button
ajaxBtn.addEventListener('click', function addAjaxImagesToSlider() {
  $.ajax({
    type: 'POST',
    url: '/ajax.php',
    data: {
      z_test: 'slider',
    },
    success: function (response) {
      sliderImgLinks = $.parseJSON(response)
      sliderImgLinks.forEach((image) => {
        let img = document.createElement('img')
        img.classList.add('sliderImg')
        img.setAttribute('src', image)
        slider.append(img)
      })
      addAjaxMiniatures()
      ajaxBtn.remove()
    },
    error: function (response) {
      console.log(response)
    },
  })
})

// Function to display the matching image at the click on the miniature
function miniaturesClick(img) {
  let sliderImg = Array.from(document.querySelectorAll('.sliderImg'))
  sliderImg[count].classList.remove('active')
  const imgId = img.id
  count = imgId - 1
  sliderImg[imgId - 1].classList.add('active')
}

// Function to add the ajax images miniatures at the click on the ajax button
function addAjaxMiniatures() {
  let counter = 5
  let miniaturesDiv = document.querySelector('.miniatures')
  sliderImgLinks.forEach((image) => {
    let miniature = document.createElement('img')
    miniature.classList.add('miniaturesImg')
    miniature.classList.add('miniaturesImgAjax')
    miniature.setAttribute('id', counter)
    miniature.setAttribute('src', image)
    miniaturesDiv.append(miniature)
    counter++
  })
  const miniaturesImgAjax = Array.from(
    document.querySelectorAll('.miniaturesImgAjax')
  )
  miniaturesImgAjax.forEach((img) => {
    img.addEventListener('click', () => {
      miniaturesClick(img)
    })
  })
}

const miniaturesImg = document.querySelectorAll('.miniaturesImg')

miniaturesImg.forEach((img) => {
  img.addEventListener('click', () => {
    miniaturesClick(img)
  })
})
