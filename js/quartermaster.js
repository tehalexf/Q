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




var derp = 8;
var dummy = $("<div/>")


for (var i = 0; i < 48; i++) {
  var use = 0;
  var sub = ":00";
  var tim = 'A';
  if (i % 2)
    sub = ":30";

  use = Math.floor(i/2) % 12;

  if (use == 0)
    use = 12;
  

  if (i > 23)
    tim = 'P';



    var temp = $("<div class='row row-date'><button id='timerow-" + String(i) + "' class='time-btn btn btn-default btn-block '>" + String(use) + String(sub) + tim + "</button></div>");

    dummy.append(temp);
}
console.log(dummy.html())

$('#testme').html(dummy.html());


$('.time-btn').on('click', function() {
  $('.time-btn').removeClass('active');
  $(this).addClass('active');
  console.log($(this));
});


$('.myelement').on('afterChange', function(event, slick, currentSlide ){
  console.log(currentSlide);
});







    $('#testme').slick({
      speed: 50,
      vertical: true,
      verticalSwiping: true,
  slidesToShow: 6,
  slidesToScroll: 6,

});
  $('#testme').removeClass('hidden');
var d = new Date();
var n = d.getHours();
var e = d.getMinutes();

if (e >= 30)
  d = 2 * n + 1;
else
  d = 2 * n;
console.log('#timerow' + String(d));
$('.myelement').slick('slickGoTo',d, false);
$('#timerow-' + String(d)).addClass('btn-currentday');


// $( ".test" ).each(function() {
//   var cw = $( this ).width();
//  $( this ).css({'height':cw+'px'});
// });


});


