$(function() {
    console.log('hahahhaha');
    console.log('wf_5');
    var phonePattern = /^1[0-9]{10}$/;

    var $phoneNumber = $('.txt-re-phone');
    var $imgCode = $('.txt-re-code');
    var $phoneCode = $('.txt-phone-code');
    var $password = $('.txt-re-password');
    var $rePassword = $('.txt-re-password2');

    var $btnGetCode = $('.btn-get-code ');
    var $submit = $('.btn-register');

    function checkPassword() {
        var password = $.trim($password.val());
        var rePassword = $.trim($rePassword.val());
        if (password) {
            $('.require-password').hide();
            if (rePassword.length) {
                validRePassword(rePassword);
            }
            validPassword(password);
        } else {
            $('.error-password').hide();
            $('.require-password').show();
            $password.removeClass('valid');
        }
        $submit.trigger('valid');
    };

    function validPassword(password) {
        if (password.length >= 6 && password.length <= 20) {
            $('.error-password').hide();
            $password.addClass('valid');
        } else {
            $('.error-password').show();
            $password.removeClass('valid');
        }
        $submit.trigger('valid');
    };

    function checkRePassword() {
        var rePassword = $.trim($rePassword.val());
        $('.error-re-password').hide();
        if (rePassword) {
            $('.require-re-password').hide();
            validRePassword(rePassword);
        } else {
            $('.require-re-password').show();
            $rePassword.removeClass('valid');
        }
        $submit.trigger('valid');
    };

    function validRePassword(rePassword) {
        var password = $.trim($password.val());
        if (rePassword == password) {
            $rePassword.addClass('valid');
            $('.error-re-password').hide();
        } else {
            $rePassword.removeClass('valid');
            $('.error-re-password').show();
        }
        $submit.trigger('valid');
    };

    function checkPhoneNumber() {
        var phoneNumber = $.trim($phoneNumber.val());
        $('.error-phone-number').hide();
        $('.error-phone-exist').hide();
        if (phoneNumber) {
            $('.require-phone-number').hide();
            validPhoneNumber(phoneNumber);
        } else {
            $('.require-phone-number').show();
            $phoneNumber.removeClass('valid');
        }
        $submit.trigger('valid');
    };

    function validPhoneNumber(phoneNumber) {
        if (phonePattern.test(phoneNumber)) {
            if (!$phoneNumber.hasClass('no-exist')) {
                $phoneNumber.addClass('valid');
                $submit.trigger('valid');

            } else {
                $phoneNumber.addClass('valid');
            }
        } else {
            $phoneNumber.removeClass('valid');
            $('.error-phone-number').show();
        }
        $submit.trigger('valid');
    };

    $phoneNumber.blur(function() {
        checkPhoneNumber();
    });

    $password.blur(function() {
        checkPassword();
    });

    $rePassword.blur(function() {
        checkRePassword();
    });



    $('.txt-re-password, .txt-re-password2').blur(function() {
        $(this).parent().find('.form_rem').hide();
    });

    $('.txt-re-password, .txt-re-password2').focus(function() {
        $(this).parent().find('.form_rem').show();
        $(this).parent().find('.form_error').hide();
    });

    $('.txt-re-password, .txt-re-password2').blur(function() {
        $(this).parent().find('.form_rem').hide();
    });


    $submit.bind('valid', function() {

        var validMobile = $phoneNumber.hasClass('valid');
        var validPassword = $password.hasClass('valid');
        var validRePassword = $rePassword.hasClass('valid');

        if (validMobile && validPassword || validRePassword) {
            $submit.addClass('active');
        } else {
            $submit.removeClass('active');
        }


    });

    $submit.click(function() {
        if ($submit.hasClass('active')) {
            submit();
        }
    });

    function submit() {
        var mobile = $.trim($phoneNumber.val());
        var password = $.trim($password.val());

        var data = {
            mobile: mobile,
            password: password,
        };

        $.ajax({
            url: '/register',
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(user) {
                window.location.href = '/';
            },
            error: function(error) {
                console.log(error)
                var errJSON = JSON.parse(error.responseText);
                $('.lol-error').text(errJSON.message);
            }
        });
    };
});