// var pat = new RegExp(/^([+-])[mtwhfsuMTWHFSU]+[\s\n]*$/g);
var pat = new RegExp(/(^[+-])([mtwhfsuMTWHFSU]|(0[1-9]|1[0-2])\/(0[1-9]|1[0-2])\/20(0[1-9]|1[0-5]))+[\s\n]+(0[1-9]|1[0-2]):(0[1-9]|[0-5][0-9]|60)[ap]m-(0[1-9]|1[0-2]):(0[1-9]|[0-5][0-9]|60)[ap]m$/);


function tokenizeExpression(line, delimiter)
{
    var array = line.split(delimiter);
    return array;
}


$(document).ready(function() {

    $('#textarea').bind('input propertychange', function() {
        if (pat.test(this.value)) {
            console.log('Hi, David')
            $(this).parent().removeClass('has-error');
            var delimiter = new RegExp(/[\s\n]+/);
            var tokens = tokenizeExpression(this.value, delimiter);
            for(i = 0; i < tokens.length; i++){
                console.log(tokens[i]);
            }
        } else {
            console.log('MHAS VALUE')
            $(this).parent().addClass('has-error');
        }
        // console.log('The original string is: "' )

    });

    var myString = "+mtw +mtHw";
    var reg = new RegExp(/([+-])([mtwhfsuMTWHFSU])+/g);
    var result;
    while ((result = reg.exec(myString)) !== null) {
        console.log(result);
    }

});
