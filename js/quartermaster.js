var activeDate = 1;
var started = true;
var todayDate = -1;
var thisHour = -1;
var fullHour = {};
var ignoreChange = false;
var lastDate = -1;
var thisDateIndex = 0;
var rightNow = -1;
var data = {
    //format is day# : hour# : data
    1: {
        16: {
            '20': ['Me <div style="display: inline-block;" > hi </div>'],
            '30': ['You']
        },
        17: {
            '20': ['Me <div style="display: inline-block;" > hi </div>'],
            '30': ['You']
        }
    },
    2: {
        16: {
            '20': ['Me <div style="display: inline-block;" > hi </div>'],
            '30': ['You']
        },
        17: {
            '20': ['Me <div style="display: inline-block;" > hi </div>'],
            '30': ['You']
        }
    },
    3: {
        16: {
            '20': ['Me <div style="display: inline-block;" > hi </div>'],
            '30': ['You']
        },
        17: {
            '20': ['Me <div style="display: inline-block;" > hi </div>'],
            '30': ['You']
        }
    },
    4: {
        16: {
            '20': ['Me <div style="display: inline-block;" > hi </div>'],
            '30': ['You']
        },
        17: {
            '20': ['Me <div style="display: inline-block;" > hi </div>'],
            '30': ['You']
        }
    }
};

var heatMapData = {
    0: {
        'total': 5,
        '20': 3,
        '30': 2
    },
    1: {
        'total': 10,
        '20': 3,
        '30': 7
    },
    2: {
        'total': 10,
        '20': 7,
        '30': 3
    },
    3: {
        'total': 5,
        '20': 3,
        '30': 2
    },
    'totals': {
        'total': 30,
        '20': 16,
        '30': 14
    }
}
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

function changeTime(thisElem) {
    $('.myelement').slick('slickGoTo', thisElem.attr('time-index'), false);
    $('.selected-box').removeClass('selected-box');
    $('#heatrow-' + String(thisElem.attr('time-index'))).addClass('selected-box');
    $('.time-btn').removeClass('active');
    thisElem.addClass('active');
    thisHour = parseInt(thisElem.attr('time-index'));
    loadCorrectData();
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

    var numTutors;

    if (dataCache == undefined) {
        //No data for that date
        $('#hour-heading').html(fullHour[thisHour] + ' - 0 Tutors');
        $('#hour-content').html('There are no scheduled events.');
    } else {
        if (filtered) {
            //todo
        } else {

            if (thisHour in dataCache) {
                currentDisplay = dataCache[thisHour];
                var dummyNode = $('<div/>')
                var first = false;

                var counter = 0;
                for (var element in currentDisplay) {
                    counter++;
                    //TODO: Make this into CSS
                    if (!first) {
                        first = true;
                        var tempNode = $('<div style="font-weight: bold;">ECS ' + String(element) + ' Tutors:</div>')
                    } else {
                        var tempNode = $('<div style="font-weight: bold; margin-top:10px;">ECS ' + String(element) + ' Tutors:</div>')
                    }

                    currentList = currentDisplay[element];
                    var tempLength = currentList.length;

                    for (var i = 0; i < tempLength; i++) {
                        var tempContent = $('<div style="font-weight: normal;"> ' + currentList[i] + ' </div>');

                        tempNode = tempNode.add(tempContent);

                    }
                    dummyNode.append(tempNode);
                }
                $('#hour-heading').html(fullHour[thisHour] + ' - ' + counter + ' Tutors');
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

    $('.test').removeClass('activated');
    $('.test:eq(' + datenumber + ')').addClass('activated');
    activeDate = parseInt(datenumber);

    var heatCache;
    if (data.hasOwnProperty(activeDate)) {
        dataCache = data[activeDate];
        heatCache = heatMapData[activeDate];
    } else {
        dataCache = undefined;
    }

    $('.time-btn').attr('data-original-title', '0 tutors').attr('style', '');
    //TODO: Heatmap Loading!
    $('.hour-tutor').css('background', '#2196F3').html('');
    // $('.hour-tutor').css('background', '#2196F3').html('0 T');
    if (filtered) {

    } else {
        $('.heatmap-box').css('background', '#FFFFFF');

        if (dataCache) {
            for (var i = 0; i < 48; i++) {
                if (String(i) in dataCache) {
                    var sum = 0;
                    for (var key in dataCache[String(i)]) {
                        sum += dataCache[String(i)][key].length;
                    }
                    if (heatCache != undefined && heatCache['total'] != undefined) {
                        var color = shadeColor2('#2196F3', +(sum * -1.25 / heatCache['total']).toFixed(1) % 1);
                        $('#heatrow-' + String(i)).children(":first").css('background-color', color);
                        $('#timerow-' + String(i)).children().eq(1).html(sum + ' Tutors').css('background-color', color);
                    }

                    // $('#timerow-' + String(i)).attr('data-original-title', heatCache['total'] + ' tutors');
                }

            }

        }
    }

    if (activeDate == thisDateIndex) {

        var hour = currentHour();

        ignoreChange = true;
        $('.myelement').slick('slickGoTo', hour, false);
        ignoreChange = false;

        $('.selected-box').removeClass('selected-box');
        $('#heatrow-' + String(hour)).addClass('selected-box');
        $('.time-btn').removeClass('active');
        $('#timerow-' + String(hour)).addClass('active').addClass('btn-currentday');
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
            speed: 200,
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

        var temp = $("<div class='row row-date'><button title='herp' data-toggle='tooltip' time-index='" + String(i) + "' id='timerow-" + String(i) + "' class='time-btn btn btn-default btn-block '><div>" + String(use) + String(sub) + tim + "</div><div class='hour-tutor' style='background:#2196F3;'></div></button></div>");
        var temp2 = $("<td title='" + fullHour[i] + "' data-heatid='" + String(i) + "' id='heatrow-" + String(i) + "' class='invis-table'><div class='heatmap-box'></div></td>");

        dummy.append(temp);
        dummy2.append(temp2);
    }

    $('#testme').html(dummy.html());
    $('#top-heatmap').html(dummy2.html());

    // $('.time-btn').tooltip({
    //     animated: 'fade',
    //     placement: 'right',
    //     container: 'body',
    //     trigger: 'hover'
    // });

    $('.time-btn').on('click', function() {
        //On click of a timke button
        changeTime($(this));
    });

    $('.myelement').on('afterChange', function(event, slick, currentSlide) {

        if (activeDate == 0 && currentSlide == 0) {
            $('.myelement').slick('slickSetOption', 'infinite', false, true);

        } else if (activeDate == 0 && currentSlide >= 6) {
            $('.myelement').slick('slickSetOption', 'infinite', true, true);

        }
        if (activeDate == 13 && currentSlide == 42) {
            $('.myelement').slick('slickSetOption', 'infinite', false, true);

        } else if (activeDate == 13 && currentSlide <= 36) {
            $('.myelement').slick('slickSetOption', 'infinite', true, true);

        }

    });

    $('.myelement').on('beforeChange', function(event, slick, previousSlide, currentSlide) {

        if (!ignoreChange) {
            if (previousSlide == 0 && currentSlide == 42 && started == false) {
                activeDate = parseInt(activeDate) - 1;
                selectDate(activeDate);
                $('#maindate').slick('slickGoTo', activeDate, false);

            } else if (previousSlide == 42 && currentSlide == 0 && started == false) {

                activeDate = parseInt(activeDate) + 1;

                selectDate(activeDate);
                $('#maindate').slick('slickGoTo', activeDate, false);

            }
        }
        $('.now-btn').on('click', function() {
            ignoreChange = true;
            selectDate(0);
            changeTime($('#timerow-' + parseInt(currentHour())));
            ignoreChange = false;

        });
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

        if (todayDate != $(this).children('p:eq(0)').html()) {
            //CHANGEME -- First date
            $('.btn-currentday').removeClass('btn-currentday');
        } else {
            var d = currentHour();
            $('#timerow-' + String(d)).addClass('btn-currentday');
        }

        selectDate($(this).parent().attr('data-slick-index'));

    });

    $('.invis-table').on('click', function() {

        changeTime($('#timerow-' + parseInt($(this).attr('data-heatid'))));
        // $('.myelement').slick('slickGoTo', parseInt($(this).attr('data-heatid')), false);
        // if (todayDate != $(this).children('p:eq(1)').html()) {
        //     $('.btn-currentday').removeClass('btn-currentday');
        // } else {
        //     var d = currentHour();
        //     $('#timerow-' + String(d)).addClass('btn-currentday');
        // }

        // selectDate($(this).parent().attr('data-slick-index'));
    });

    $('.myelement').slick('slickGoTo', d, false);

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
        dummy3.append('<div><div class="test" data-toggle="tooltip" ><div class="sub-box" id="cmonth-' + String(i) + '">Dec</div><div  class="sub-box"  id="cday-' + String(i) + '" style="font-size:27px">1</div><div id="cdow-' + String(i) + '" >Mon</div></div></div>');
    }
    $('#maindate').html(dummy3.html());

    var thisDate = new Date(date);

    todayDate = addDays(thisDate, -1).getDate();

    for (var i = -1; i < 13; i++) {
        var tempDate = addDays(thisDate, i)
        $('#cmonth-' + String(i + 1)).html(monthNames[tempDate.getMonth()]);
        $('#cday-' + String(i + 1)).html(tempDate.getDate());
        $('#cdow-' + String(i + 1)).html(dayNames[tempDate.getDay()]);
        dates.push(tempDate);
        var cachedTotals = heatMapData['totals'];
        if ((i + 1) in heatMapData) {
            var cachedDay = heatMapData[(i + 1)];
            if (filtered) {
                //TODO: FILTER
            } else { //2196f3
                $('#cdow-' + String(i + 1)).css('background-color', shadeColor2('#2196F3', +(cachedDay['total'] * -1.25 / cachedTotals['total']).toFixed(1) % 1)).parent().attr('title', String(cachedDay['total']) + ' tutors');
            }
        } else {
            $('#cdow-' + String(i + 1)).css('background-color', '#2196F3').parent().attr('title', '0 tutors');
        }
    }
    $('[data-toggle="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'bottom',
        container: 'body'
    });
    $('#cmonth-0').parent().addClass('bold-n-stuff');

}

$(document).ready(function() {
    var d = addDays(new Date(), 1);

    startup((d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear());
    setup();
    selectDate(0);

    setInterval(function() {
        var rightNow = new Date().getDate();
        if (lastDate == -1) {
            lastDate = new Date().getDate();
            rightNow = currentHour();
        } else {
            if (lastDate != rightNow) {
                lastDate = rightNow;
                todayDate = rightNow;
                thisDateIndex++;
                selectDate(thisDateIndex);
                $('.bold-n-stuff').removeClass('.bold-n-stuff');
                $('.cmonth-' + thisDateIndex).parent().addClass('.bold-n-stuff');
            }
        }

        if (activeDate == thisDateIndex) {
            $('.btn-currentday').removeClass('btn-currentday');
            $('#timerow-' + String(currentHour())).addClass('btn-currentday');
        }

    }, 60000);
    // 60000
});
