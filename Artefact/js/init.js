// This JavaScript initialises the animations and carousels throughout the website

// Initialise Animate On Scroll (AOS) library
AOS.init({
  once: true // Animation only happens on first time scrolling to a region
});

// Slick carousel set-up
$('.slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: true, 
  prevArrow: '<button class="btn btn-prev text-muted fs-1"><i class="fa fa-angle-left"></i></button>',
  nextArrow: '<button class="btn btn-next text-muted fs-1"><i class="fa fa-angle-right"></i></button>',
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
        }
    }
    // You can unslick at a given breakpoint by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});