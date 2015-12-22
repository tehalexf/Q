$( document ).ready(function() {



 

	$('.Herp').slick({
    dots:  true,
  infinite: true,
  slidesToShow: 7,
  slidesToScroll: 7
});

$( ".selectem" ).each(function() {
  var cw = $( this ).width();
 $( this ).css({'height':cw+'px'});
});


});


