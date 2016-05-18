'use strict';

var donationsModule = (function (window, document) {

    var donationsModuleObj = {},
        $donationsForm,
        $amountsBtns,
        $donationAmount,
        $donationAmountValue,
        $donateBtn,
        $formAlert;

    donationsModuleObj.initialize = function () {

        $donationsForm = $('#donations-form'),
            $amountsBtns = $donationsForm.find('.amount-btn'),
            $donationAmount = $('#donation-amount'),
            $donationAmountValue = $('#donation-amount-value'),
            $donateBtn = $('#donate-btn'),
            $formAlert = $('#donations-form-alert');

        $amountsBtns.on('click', function (e) {

            e.preventDefault();
            var $btn = $(this);

            $formAlert.hide();
            $amountsBtns.removeClass('selected');

            if (!$btn.find($donationAmount).length > 0)
                $donationAmount.val(null);

            $donationAmountValue.val(parseInt($btn.text().split('$')[1].trim()));
            $btn.addClass('selected');

        }),

            $donationAmount.on('keydown', function (e) {

                e = (e) ? e : window.event;
                var charCode = (e.which) ? e.which : e.keyCode,
                    $input = $(this);

                if (charCode === 69 || charCode === 187 || charCode === 189 || charCode === 190 || ($input.val().length >= 7 && !((charCode > 36 && charCode < 41) || charCode === 8 || charCode === 9 || charCode === 18 || charCode === 46)))
                    return false;

                $donationAmountValue.val($input.val());

            }).on('keyup', function (e) {

                var $input = $(this);
                $donationAmountValue.val(parseInt($input.val()));

            }).on('blur', function () {

                var $input = $(this);

                if (!$input.val())
                    $input.closest('.amount-btn').removeClass('selected');

            }),

            $donateBtn.on('click', function () {

                if (parseInt($donationAmountValue.val())) {

                    $formAlert.fadeOut();

                } else {

                    $donationAmount.val(null);
                    $donationAmountValue.val(null);
                    $formAlert.fadeIn();
                    return false;

                }

            });

    }

    return donationsModuleObj;

})(window, document);