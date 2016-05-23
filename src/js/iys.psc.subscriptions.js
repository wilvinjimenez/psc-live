'use strict';

var subscriptionsModule = (function (window, document) {

    var subscriptionsModuleObj = {},
        $subscriptionModal,
        $firstName,
        $lastName,
        $emailAddress,
        $churchName,
        $countryName,
        $broadcastPeopleAmount,
        $newsletterYes,
        $newsletterNo,
        signUpFormIsValid,
        $formErrorMessage;

    subscriptionsModuleObj.initialize = function () {

        signUpFormIsValid = true;

        $subscriptionModal = $('#subscription-modal'),
            $firstName = $('#first-name'),
            $lastName = $('#last-name'),
            $emailAddress = $('#email-address'),
            $churchName = $('#church-name'),
            $countryName = $('#country-name'),
            $broadcastPeopleAmount = $('#broadcast-people-amount'),
            $newsletterYes = $('#newsletter-yes'),
            $newsletterNo = $('#newsletter-no'),
            $formErrorMessage = $('#subscriptions-form-alert');

            $subscriptionModal.on('show.bs.modal hidden.bs.modal', function (e) {
                $(document.body).toggleClass('solid-blank');
            });

        $subscriptionModal.modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });

        $('#btn-subscribe-later').on('click', function (e) {

            e.preventDefault();
            $subscriptionModal.modal('hide');

        });

        $('#sign-up-form').on('submit', function () {

            var requiredFields = [$firstName, $lastName, $emailAddress, $countryName, $broadcastPeopleAmount],
                textFields = [$firstName, $lastName, $churchName],
                numericFields = [$broadcastPeopleAmount],
                emailFields = [$emailAddress];

            validateRequiredFields(requiredFields);
            validateTextField(textFields);
            validateNumericField(numericFields);
            validateEmailField(emailFields);

            if (!signUpFormIsValid) {
                $formErrorMessage.fadeIn();
            }

            return signUpFormIsValid;

        });

        var expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (24 * 60 * 60 * 1000));
        expiryDate.setHours(9);
        expiryDate.setMinutes(0);
        expiryDate.setSeconds(0);

        var expiryUTCDate = expiryDate.toUTCString();

        var subscriptionCookie = 'WC_SC=CONFIRMED; expires=' + expiryUTCDate + '; path=/';

        expiryDate.setHours(expiryDate.getHours() + 1);

    };

    function validateRequiredFields(fields) {

        $.each(fields, function (i, v) {

            if (this.val() === '') {

                signUpFormIsValid = false;
                this.closest('.form-group').addClass('has-error');

            }

        });

    }

    function validateEmailField(fields) {

        $.each(fields, function (i, v) {

            var regEx = /^(([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,})?$/;

            if (!regEx.test(this.val())) {

                signUpFormIsValid = false;
                this.closest('.form-group').addClass('has-error');

            }

        });

    }

    function validateTextField(fields) {

        $.each(fields, function (i, v) {

            var fieldValue = this.val();

            if ($.isNumeric(fieldValue) && fieldValue !== '') {

                signUpFormIsValid = false;
                this.closest('.form-group').addClass('has-error');

            }

        });

    }


    function validateNumericField(fields) {

        $.each(fields, function (i, v) {

            var fieldValue = this.val();

            if ($.isNumeric(fieldValue) && fieldValue !== '') {

                signUpFormIsValid = false;
                this.closest('.form-group').addClass('has-error');

            }

        });

    }

    return subscriptionsModuleObj;

})(window, document);