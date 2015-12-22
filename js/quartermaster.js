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




// $( ".test" ).each(function() {
//   var cw = $( this ).width();
//  $( this ).css({'height':cw+'px'});
// });


});


