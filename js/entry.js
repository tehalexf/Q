// var pat = new RegExp(/^([+-])[mtwhfsuMTWHFSU]+[\s\n]*$/g);
var pat = /^[\s\n]*([+-]([mtwrfsuMTWRFSU]+|(0[1-9]|1[0-2])\/(0[1-9]|1[0-9])\/20(0[1-9]|1[0-9]))\s*([1-9]|1[0-2]):([30]0)\s*[apAP][mM]\s*-\s*([1-9]|1[0-2]):([30]0)\s*[apAP][mM]\s*((0[1-9]|[1-3][0-9])\/(0[1-9]|[1-3][0-9])\/(20[0-9][0-9])\s*(\-\s*(0[1-9]|[1-3][0-9])\/(0[1-9]|[1-3][0-9])\/(20[0-9][0-9]))?)?[\s\n]*)*$/
    // var pat = /^[\s\n]*([+-](([mtwhfsuMTWHFSU]+)|((0[1-9]|1[0-2])\/(0[1-9]|1[0-9])\/20(0[1-9]|1[0-9])))[\s\n]*(((0[1-9]|1[0-2]):([30]0)\s*[apAP][mM])-((0[1-9]|1[0-2]):([30]0)(\s*[apAP][mM])))[\s\n]*)*$/
var arr = ['u', 'm', 't', 'w', 'r', 'f', 's']
var socket = io.connect('http://d.rhocode.com:5010'); //SocketIO Connection
// var end = Date.parse('1/12/2016')
var end = Date.parse('3/15/2016')
var dateSet = new Set();
var lastDateSet;

function ArrNoDupe(a) {
    var temp = {};

    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;

    var r = new Set();
    for (var k in temp)
        r.add(k);
    return r;
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    result.setHours(0, 0, 0, 0);
    return result;
}

function dayOfWeek(date) {

    return arr[date.getDay()];
}
var t;
var working = '';

function myCallback() {
    var dictSet = {};
    var dictSet2 = {};

    if (pat.test($('#textarea').val())) {

        $('#textarea').parent().removeClass('has-error');
        reg = new RegExp(/\+([mtwrfsuMTWRFSU]+)[\s\n]*((([1-9]|1[0-2]):([30]0)\s*[apAP][mM])\s*-\s*(([1-9]|1[0-2]):([30]0)(\s*[apAP][mM])))\s*(((0[1-9]|[1-3][0-9])\/(0[1-9]|[1-3][0-9])\/(20[0-9][0-9]))\s*(\-\s*((0[1-9]|[1-3][0-9])\/(0[1-9]|[1-3][0-9])\/(20[0-9][0-9])))?)?[\s\n]*/g);

        var result;
        tempset = [];
        while ((result = reg.exec($('#textarea').val())) !== null) {
            var days = result[1].toLowerCase();

            var iter = Date.parse('t');
            var thisEnd = end;

            if (result[11] != undefined) {
                var dayOne = Date.parse(result[11]);
                iter = iter.compareTo(dayOne) < 0 ? dayOne : iter;
            }
            if (result[16] != undefined) {
                var dayTwo = Date.parse(result[16]).add(1).day();
                thisEnd = thisEnd.compareTo(dayTwo) > 0 ? dayTwo : thisEnd;
            }

            if (iter.compareTo(thisEnd) > 0) {

                continue;
            }

            for (; !(iter.equals(thisEnd)); iter = iter.add(1).day()) {
                if (days.indexOf(dayOfWeek(iter)) != -1) {

                    var timeIter = iter.clone().at(result[3]);
                    var timeStop1 = iter.clone().at(result[6]);
                    var timeStop2 = iter.clone().add(1).day().at(result[6]);

                    for (; !timeIter.equals(timeStop1) && !timeIter.equals(timeStop2); timeIter = timeIter.add(30).minute()) {

                        if (!(iter in dictSet)) {
                            dictSet[iter.clone()] = {};
                        }

                        dictSet[iter.clone()][timeIter.clone()] = true;

                        if (!(iter in dictSet2)) {
                            dictSet2[iter.clone()] = {}
                        };

                        dictSet2[iter.clone()][timeIter.toString('h:mmt')] = true;

                    }

                }
            }
        }

        reg = new RegExp(/\+((0[1-9]|1[0-2])\/(0[1-9]|1[0-9])\/20(0[1-9]|1[0-9]))[\s\n]*(([1-9]|1[0-2]):([30]0)\s*[apAP][mM])\s*-\s*(([1-9]|1[0-2]):([30]0)(\s*[apAP][mM]))[\s\n]*/g);
        var result;
        while ((result = reg.exec($('#textarea').val())) !== null) {
            // dictSet[Date.parse(result[1])] = true;

            var iter = Date.parse(result[1]);
            var timeIter = iter.clone().at(result[5]);
            var timeStop1 = iter.clone().at(result[8]);
            var timeStop2 = iter.clone().add(1).day().at(result[8]);

            for (; !timeIter.equals(timeStop1) && !timeIter.equals(timeStop2); timeIter = timeIter.add(30).minute()) {

                if (!(iter in dictSet)) {
                    dictSet[iter.clone()] = {};
                }

                dictSet[iter.clone()][timeIter.clone()] = true;

                if (!(iter in dictSet2)) {
                    dictSet2[iter.clone()] = {}
                };

                dictSet2[iter.clone()][timeIter.toString('h:mmt')] = true;

            }

        }

        reg = new RegExp(/\-([mtwrfsuMTWRFSU]+)[\s\n]*((([1-9]|1[0-2]):([30]0)\s*[apAP][mM])\s*-\s*(([1-9]|1[0-2]):([30]0)(\s*[apAP][mM])))\s*(((0[1-9]|[1-3][0-9])\/(0[1-9]|[1-3][0-9])\/(20[0-9][0-9]))\s*(\-\s*((0[1-9]|[1-3][0-9])\/(0[1-9]|[1-3][0-9])\/(20[0-9][0-9])))?)?[\s\n]*/g);
        var result;
        tempset = [];
        while ((result = reg.exec($('#textarea').val())) !== null) {
            var days = result[1].toLowerCase();

            return
            var iter = Date.parse('t');
            var thisEnd = end;

            if (result[11] != undefined) {
                var dayOne = Date.parse(result[11]);
                iter = iter.compareTo(dayOne) < 0 ? dayOne : iter;
            }
            if (result[16] != undefined) {
                var dayTwo = Date.parse(result[16]).add(1).day();
                thisEnd = thisEnd.compareTo(dayTwo) > 0 ? dayTwo : thisEnd;
            }
            if (iter.compareTo(thisEnd) > 0) {

                continue;
            }

            for (; !(iter.equals(thisEnd)); iter = iter.add(1).day()) {
                if (days.indexOf(dayOfWeek(iter)) != -1) {

                    var timeIter = iter.clone().at(result[3]);
                    var timeStop1 = iter.clone().at(result[6]).add(30).minute();
                    var timeStop2 = iter.clone().add(1).day().at(result[6]).add(30).minute();
                    if (timeIter.equals(timeStop1))
                        timeStop1 = timeStop1.add(30).minute()

                    for (; !timeIter.equals(timeStop1) && !timeIter.equals(timeStop2); timeIter = timeIter.add(30).minute()) {

                        if (iter in dictSet && timeIter in dictSet[iter]) {
                            delete dictSet[iter][timeIter];
                            if (!Object.keys(dictSet[iter]).length)
                                delete dictSet[iter];
                        }

                        if (iter in dictSet2 && timeIter.toString('h:mmt') in dictSet2[iter]) {
                            delete dictSet2[iter][timeIter.toString('h:mmt')];
                            if (!Object.keys(dictSet2[iter]).length)
                                delete dictSet2[iter];
                        }

                    }

                }
            }
        }

        reg = new RegExp(/\-((0[1-9]|1[0-2])\/(0[1-9]|1[0-9])\/20(0[1-9]|1[0-9]))[\s\n]*(([1-9]|1[0-2]):([30]0)\s*[apAP][mM])\s*-\s*(([1-9]|1[0-2]):([30]0)(\s*[apAP][mM]))[\s\n]*/g);
        var result;
        while ((result = reg.exec($('#textarea').val())) !== null) {
            // dictSet[Date.parse(result[1])] = true;

            var iter = Date.parse(result[1]);
            var timeIter = iter.clone().at(result[5]);
            var timeStop1 = iter.clone().at(result[8]);
            var timeStop2 = iter.clone().add(1).day().at(result[8]);
            if (timeIter.equals(timeStop1))
                timeStop1 = timeStop1.add(30).minute()

            for (; !timeIter.equals(timeStop1) && !timeIter.equals(timeStop2); timeIter = timeIter.add(30).minute()) {

                if (iter in dictSet && timeIter in dictSet[iter]) {
                    delete dictSet[iter][timeIter];
                    if (!Object.keys(dictSet[iter]).length)
                        delete dictSet[iter];
                }

                if (iter in dictSet2 && timeIter.toString('h:mmt') in dictSet2[iter]) {
                    delete dictSet2[iter][timeIter.toString('h:mmt')];
                    if (!Object.keys(dictSet2[iter]).length)
                        delete dictSet2[iter];
                }

            }

        }

        // var htmlText = []
        // for (var i in mylist) {
        //     var dictObj = dictSet[mylist[i]];

        //     var mylist2 = Object.keys(dictObj).sort(function(a, b) {
        //         return a - b
        //     });

        // }
        var niceList = []
        var timeList = []
        for (i in dictSet) {
            var value = dictSet[i];
            for (j in value) {
                var thisData = Date.parse(j.substring(0, 33));
                niceList.push(thisData)
                timeList.push(thisData.getTime() / 100000);
            }
        }

        lastDateSet = timeList;
        var mylist = niceList.sort(function(a, b) {
            return a.compareTo(b)
        });

        var exists = {};
        var htmlList = [];
        for (var j in mylist) {
            // 

            var i = mylist[j]

            var optim = i.toString('ddd, MMM dd, yyyy')

            if (optim in exists) {
                htmlList[htmlList.length - 1] += i.toString(', h:mmt')

            } else {
                exists[optim] = true
                htmlList.push('<tr><td>' + optim + '</td><td>' + i.toString('h:mmt'));

            }
        }

        var tableHead = "<table style='width:100%; '> <thead> <tr>   <th>Day</th> <th>Tutoring Times</th> </tr> </thead> <tbody> "
        var tableEnd = " </tbody> </table>"
        working = tableHead + htmlList.join("</td></tr>") + '</td></tr>' + tableEnd

        $('#hour-content').html(tableHead + htmlList.join("</td></tr>") + '</td></tr>' + tableEnd);

        // var thisDate = Date.parse(mylist[i].substring(0, 33)).toString('ddd MMM dd, yyyy');
    } else {
        $('#hour-content').html('There is an error in the formula. Please correct it! <br/>' + working);
        $('#textarea').parent().addClass('has-error');
    }
}

function mysql_real_escape_string(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\" + char; // prepends a backslash to backslash, percent,
                // and double/single quotes
        }
    });
}

socket.on('calendar_status', function(data) {
    $('#response').html(data['message']);
    t = setTimeout(function() {
        $('#response').html('');
    }, 10000);
});

socket.on('calendar_data', function(data) {
    $('#textarea').val(data['data']);
    $('#subjs').val(data['subjects']);
    myCallback();
});

function subm() {
    $('#email').parent().removeClass('has-error');
    $('#passw').parent().removeClass('has-error');
    var error = 0;
    if ($('#email').val().replace(" ", "") == '') {
        $('#email').parent().addClass('has-error');
        error++;
    }
    if ($('#passw').val().replace(" ", "") == '') {
        $('#passw').parent().addClass('has-error');
        error++;
    }

    if ($('#subjs').val().replace(" ", "") == '') {
        $('#subjs').parent().addClass('has-error');
        error++;
    }

    if (!pat.test($('#textarea').val()))
        error++;
    if (error)
        return

    socket.emit('calendar_entry', {
        'email': mysql_real_escape_string($('#email').val()),
        'passw': mysql_real_escape_string($('#passw').val()),
        'subjs': mysql_real_escape_string($('#subjs').val()),
        'data': $('#textarea').val().substring(0, 4000),
        'rawdata': lastDateSet
    })
}

function loadme() {
    $('#email').parent().removeClass('has-error');
    $('#passw').parent().removeClass('has-error');
    var error = 0;
    if ($('#email').val().replace(" ", "") == '') {
        $('#email').parent().addClass('has-error');
        error++;
    }
    if ($('#passw').val().replace(" ", "") == '') {
        $('#passw').parent().addClass('has-error');
        error++;
    }

    if (error)
        return
    $('#response').html('Loading your data...');
    socket.emit('calendar_fetch', {
        'email': mysql_real_escape_string($('#email').val()),
        'passw': mysql_real_escape_string($('#passw').val())
    })
}

$(document).ready(function() {

    $('#textarea').bind('input propertychange', function() {

        if (t) {
            clearTimeout(t);
            t = setTimeout(myCallback, 1000);
        } else {
            t = setTimeout(myCallback, 1000);
        }
    });

    var myString = "+mtw +mtHw";
    var reg = new RegExp(/([+-])([mtwhfsuMTWHFSU])+/g);
    var result;
    while ((result = reg.exec(myString)) !== null) {

    }

});
