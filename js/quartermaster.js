var activeDate = 1;
var started = true;
var todayDate = -1;
var thisHour = -1;
var fullHour = {};
var data = {
    //format is day# : hour# : data
    1: {
        16: {
            '20': ['Me'],
            '30': ['You']
        }
    }
};
var filtered = undefined;
var dataCache = undefined;

function shadeColor2(color, percent) {
    var f = parseInt(color.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = f >> 8 & 0x00FF,
        B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

function loadCorrectData() {

    var i = thisHour;
    var use = 0;
    var sub = ":00";
    var tim = ' AM';
    if (i % 2)
        sub = ":30";

    use = Math.floor(i / 2) % 12;

    if (use == 0)
        use = 12;

    if (i > 23)
        tim = ' PM';

    $('#hour-heading').html(fullHour[thisHour]);
    if (dataCache == undefined) {
        //No data for that date
        $('#hour-content').html('There are no scheduled events.');
    } else {
        if (filtered) {
            //todo
        } else {
            console.log(thisHour);
            if (thisHour in dataCache) {
                currentDisplay = dataCache[thisHour];
                var dummyNode = $('<div/>')
                var first = false;
                for (var element in currentDisplay) {
                    //TODO: Make this into CSS
                    if (!first) {
                        first = true;
                        var tempNode = $('<div style="font-weight: bold;">ECS ' + String(element) + ' Tutors:</div>')
                    } else {
                        var tempNode = $('<div style="font-weight: bold; margin-top:10px;">ECS ' + String(element) + ' Tutors:</div>')
                    }

                    console.log(tempNode);
                    currentList = currentDisplay[element];
                    var tempLength = currentList.length;

                    for (var i = 0; i < tempLength; i++) {
                        var tempContent = $('<div style="font-weight: normal;"> ' + currentList[i] + ' </div>');
                        console.log(tempNode);
                        tempNode = tempNode.add(tempContent);
                        console.log(tempNode);

                    }
                    dummyNode.append(tempNode);
                }

                $('#hour-content').html(dummyNode.html());

            } else {
                $('#hour-content').html('There are no scheduled events.');
            }

        }

        //has data for that date
    }
}

function selectDate(datenumber) {
    //Calendar is clicked or changed. Loading stuff should happen here.
    console.log("selectDate is called");
    $('.test').removeClass('activated');
    $('.test:eq(' + datenumber + ')').addClass('activated');
    activeDate = parseInt(datenumber);
    if (activeDate == todayDate) {

        var hour = currentHour();
        console.log('correct');
        console.log(hour);
        $('.myelement').slick('slickGoTo', hour, false);
        $('.selected-box').removeClass('selected-box');
        $('#heatrow-' + String(hour)).addClass('selected-box');
        $('.time-btn').removeClass('active');
        $('#timerow-' + String(hour)).addClass('active');
        thisHour = hour;
    } else {
        $('.myelement').slick('slickGoTo', 16, false);
        $('.selected-box').removeClass('selected-box');
        $('#heatrow-' + String(16)).addClass('selected-box');
        $('.time-btn').removeClass('active');
        $('.btn-currentday').removeClass('btn-currentday');
        $('#timerow-16').addClass('active');
        thisHour = 16;
    }

    if (data.hasOwnProperty(activeDate)) {
        dataCache = data[activeDate];
    } else {
        dataCache = undefined;
    }
    //TODO: Heatmap Loading!

    loadCorrectData();

}

function currentHour() {
    var d = new Date();
    var n = d.getHours();
    var e = d.getMinutes();

    if (e >= 30)
        d = 2 * n + 1;
    else
        d = 2 * n;

    return d;
}

function setup() {
    var dummy = $("<div/>")
    var dummy2 = $("<div/>")

    $('.Herp').removeClass('hidden');

    // $('.Herp').on('beforeChange', function(event, slick, previousSlide, currentSlide) {
    //     console.log(previousSlide, currentSlide);
    // });

    if ($(window).width() < 767) {
        $('.Herp').slick({
            dots: true,
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3
        });
    } else {
        $('.Herp').slick({
            dots: true,
            infinite: false,
            slidesToShow: 7,
            slidesToScroll: 7
        });
    }

    var derp = 8;

    for (var i = 0; i < 48; i++) {
        var use = 0;
        var sub = ":00";
        var tim = 'A';
        var longtim = ' AM';
        if (i % 2)
            sub = ":30";

        use = Math.floor(i / 2) % 12;

        if (use == 0)
            use = 12;

        if (i > 23) {
            tim = 'P';
            longtim = ' PM';
        }

        fullHour[i] = String(use) + String(sub) + longtim;

        var temp = $("<div class='row row-date'><button time-index='" + String(i) + "' id='timerow-" + String(i) + "' class='time-btn btn btn-default btn-block '>" + String(use) + String(sub) + tim + "</button></div>");
        var temp2 = $("<td id='heatrow-" + String(i) + "' class='invis-table'><div class='heatmap-box'></div></td>");

        dummy.append(temp);
        dummy2.append(temp2);
    }

    $('#testme').html(dummy.html()); -
    $('#top-heatmap').html(dummy2.html());

    $('.time-btn').on('click', function() {
        //On click of a timke button

        $('.selected-box').removeClass('selected-box');
        $('#heatrow-' + String($(this).attr('time-index'))).addClass('selected-box');
        $('.time-btn').removeClass('active');
        $(this).addClass('active');
        thisHour = parseInt($(this).attr('time-index'));
        loadCorrectData();
    });

    $('.myelement').on('afterChange', function(event, slick, currentSlide) {
        if (activeDate == 0 && currentSlide == 0) {
            $('.myelement').slick('slickSetOption', 'infinite', false, true);
            console.log('set uninfinite)');
        } else if (activeDate == 0 && currentSlide == 6) {
            $('.myelement').slick('slickSetOption', 'infinite', true, true);
            console.log('set infinite)');
        }
        if (activeDate == 13 && currentSlide == 42) {
            $('.myelement').slick('slickSetOption', 'infinite', false, true);
            console.log('set uninfinite)');
        } else if (activeDate == 13 && currentSlide == 36) {
            $('.myelement').slick('slickSetOption', 'infinite', true, true);
            console.log('set infinite)');
        }

    });

    $('.myelement').on('beforeChange', function(event, slick, previousSlide, currentSlide) {

        if (previousSlide == 0 && currentSlide == 42 && started == false) {
            activeDate = parseInt(activeDate) - 1;
            selectDate(activeDate);
            $('#maindate').slick('slickGoTo', activeDate, false);

        } else if (previousSlide == 42 && currentSlide == 0 && started == false) {

            activeDate = parseInt(activeDate) + 1;

            selectDate(activeDate);
            $('#maindate').slick('slickGoTo', activeDate, false);

        }
    });

    $('#testme').slick({
        speed: 200,
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 6,
        slidesToScroll: 6,

    });

    $('#testme').removeClass('hidden');

    var d = currentHour();
    $('.myelement').slick('slickGoTo', d, false);
    $('#timerow-' + String(d)).addClass('btn-currentday').addClass('active');

    $('#heatrow-' + String(d)).addClass('selected-box');
    var cw = $('#heatrow-' + String(d)).width();
    $('#heatrow-' + String(d)).css({
        'height': (cw + 4) + 'px'
    });

    // $( ".test" ).each(function() {
    //   var cw = $( this ).width();
    //  $( this ).css({'height':cw+'px'});
    // });

    $('.test').on('click', function() {
        //When the calendar is clicked (specific date)

        if (todayDate != $(this).children('p:eq(1)').html()) {
            $('.btn-currentday').removeClass('btn-currentday');
        } else {
            var d = currentHour();
            $('#timerow-' + String(d)).addClass('btn-currentday');
        }

        selectDate($(this).parent().attr('data-slick-index'));
    });

    started = false;
}

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var dayNames = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

var dates = [];

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function startup(date) {
    //This section deals with setting up the calendar dates.

    var dummy3 = $("<div/>")

    for (var i = 0; i < 14; i++) {
        dummy3.append('<div><div class="test"><p id="cmonth-' + String(i) + '">Dec</p><p id="cday-' + String(i) + '" style="font-size:27px">1</p><p id="cdow-' + String(i) + '" >Mon</p></div></div>');
    }
    $('#maindate').html(dummy3.html());

    var thisDate = new Date(date);

    todayDate = thisDate.getDate();

    for (var i = -1; i < 13; i++) {
        var tempDate = addDays(thisDate, i)
        $('#cmonth-' + String(i + 1)).html(monthNames[tempDate.getMonth()]);
        $('#cday-' + String(i + 1)).html(tempDate.getDate());
        $('#cdow-' + String(i + 1)).html(dayNames[tempDate.getDay()]);
        dates.push(tempDate);
    }

    $('#cmonth-1').parent().addClass('bold-n-stuff');

}

$(document).ready(function() {
    startup('12/1/2015');
    setup();
    selectDate(1);
});
