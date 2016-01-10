var pat = new RegExp(/^(([+-])[mtwhfsuMTWHFSU]+[\s\n]*)*$/g);
$(document).ready(function() {

    $('#textarea').bind('input propertychange', function() {
        if (pat.test(this.value)) {
            console.log('HAS VALUE')
            $(this).parent().removeClass('has-error');
        } else {
            console.log('MHAS VALUE')
            $(this).parent().addClass('has-error');
        }
        //     // if (this.value.length) {
        //     //     $("#yourBtnID").show();
        //     // }
        // var re = new RegExp("^([a-z0-9]{5,})$");
    });

    var myString = "+mtw +mtHw";
    var reg = new RegExp(/([+-])([mtwhfsuMTWHFSU])+/g);
    var result;
    while ((result = reg.exec(myString)) !== null) {
        console.log(result);
    }

});
