$( document ).ready(function() {



  $('.Herp').removeClass('hidden');


if ($(window).width() < 767) {
    $('.Herp').slick({
    dots:  true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3
});
} else {
    $('.Herp').slick({
    dots:  true,
  infinite: true,
  slidesToShow: 7,
  slidesToScroll: 7
});
}

$('.myelement').on('afterChange', function(event, slick, currentSlide ){
  console.log(currentSlide);
});

    $('#testme').slick({
      speed: 50,
      vertical: true,
      verticalSwiping: true,
  slidesToShow: 6,
  slidesToScroll: 1,

});


        



// $( ".test" ).each(function() {
//   var cw = $( this ).width();
//  $( this ).css({'height':cw+'px'});
// });


});


