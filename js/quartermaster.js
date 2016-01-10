// var pat = new RegExp(/^([+-])[mtwhfsuMTWHFSU]+[\s\n]*$/g);
var pat = new RegExp(/(^[+-])[mtwhfsuMTWHFSU]+[\s\n]+(0[1-9]|1[0-2]):(0[1-9]|[0-5][0-9]|60)[ap]m-(0[1-9]|1[0-2]):(0[1-9]|[0-5][0-9]|60)[ap]m$/);


$(document).ready(function() {

    $('#textarea').bind('input propertychange', function() {
        if (pat.test(this.value)) {
            console.log('Hi, David')
            $(this).parent().removeClass('has-error');
        } else {
            console.log('MHAS VALUE')
            $(this).parent().addClass('has-error');
        }
    });

    var myString = "+mtw +mtHw";
    var reg = new RegExp(/([+-])([mtwhfsuMTWHFSU])+/g);
    var result;
    while ((result = reg.exec(myString)) !== null) {
        console.log(result);
    }

});
