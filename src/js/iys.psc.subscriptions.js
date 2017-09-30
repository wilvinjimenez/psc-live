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
        $formErrorMessage,

        SUBSCRIPTION_COOKIE_NAME = 'WC_SC_PSC17_3',
        SUBSCRIPTION_COOKIE_CONFIRMED = 'CONFIRMED',
        SUBSCRIPTION_COOKIE_UNCONFIRMED = 'UNCONFIRMED';

    subscriptionsModuleObj.initialize = function () {

        $subscriptionModal = $('#subscription-modal'),
            $firstName = $('#first-name'),
            $lastName = $('#last-name'),
            $emailAddress = $('#email-address'),
            $churchName = $('#church-name'),
            $countryName = $('#country-name'),
            $broadcastPeopleAmount = $('#webcast-people-amount'),
            $newsletterYes = $('#newsletter-yes'),
            $newsletterNo = $('#newsletter-no'),
            $formErrorMessage = $('#subscriptions-form-alert');

        $subscriptionModal.on('show.bs.modal hidden.bs.modal', function (e) {

            $(document.body).toggleClass('solid-blank');
            $('#content').toggle();
            $('footer').toggle();

        });

        if (common.getCookie(SUBSCRIPTION_COOKIE_NAME) === '') {

            $subscriptionModal.modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            });

        }

        $('#btn-subscribe-later').on('click', function (e) {

            e.preventDefault();
            $subscriptionModal.modal('hide');

            var expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 2);

            common.setCookie(SUBSCRIPTION_COOKIE_NAME, SUBSCRIPTION_COOKIE_UNCONFIRMED, expiryDate);

        });

        $('#sign-up-form').on('submit', function () {

            signUpFormIsValid = true;
            validateFormFields();

            if (!signUpFormIsValid) {

                var signUpFormErrorMessageAdvice;
                window.clearTimeout(signUpFormErrorMessageAdvice);

                $formErrorMessage.fadeIn();

                signUpFormErrorMessageAdvice = window.setTimeout(function () {

                    $formErrorMessage.fadeOut();

                }, 5000);

            }

            else {

                var expiryDate = new Date();
                expiryDate.setTime(expiryDate.getTime() + (24 * 60 * 60 * 1000));
                expiryDate.setHours(8);
                expiryDate.setMinutes(0);
                expiryDate.setSeconds(0);

                common.setCookie(SUBSCRIPTION_COOKIE_NAME, SUBSCRIPTION_COOKIE_CONFIRMED, expiryDate);

            }

            return signUpFormIsValid;

        }).find('.form-control').on('focus', function () {

            $(this).closest('.form-group').removeClass('has-error').siblings('.field-error').text(null);

        });

    };

    function validateFormFields() {

        var requiredFields = [$firstName, $lastName, $emailAddress, $countryName, $broadcastPeopleAmount],
            textFields = [$firstName, $lastName, $churchName],
            numericFields = [$broadcastPeopleAmount],
            emailFields = [$emailAddress];

        validateRequiredFields(requiredFields);
        validateTextField(textFields);
        validateNumericField(numericFields);
        validateEmailField(emailFields);

    }

    function validateRequiredFields(fields) {

        $.each(fields, function (i, v) {

            if (this.val() === '') {

                signUpFormIsValid = false;
                this.closest('.form-group').addClass('has-error').find('.field-error').html('Debes llenar este campo correctamente.');

            }

        });

    }

    function validateEmailField(fields) {

        $.each(fields, function (i, v) {

            var regEx = /^(([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,})?$/;

            if (!regEx.test(this.val())) {

                signUpFormIsValid = false;
                this.closest('.form-group').addClass('has-error').find('.field-error').html('Formato de e-mail incorrecto.');

            }

        });

    }

    function validateTextField(fields) {

        $.each(fields, function (i, v) {

            var fieldValue = this.val();

            if ($.isNumeric(fieldValue) && fieldValue !== '') {

                signUpFormIsValid = false;
                this.closest('.form-group').addClass('has-error').find('.field-error').html('Este es un campo de texto.');

            }

        });

    }


    function validateNumericField(fields) {

        $.each(fields, function (i, v) {

            var fieldValue = this.val();

            if ((!$.isNumeric(fieldValue) || fieldValue < 1 || fieldValue != ~~fieldValue) && fieldValue !== '') {

                signUpFormIsValid = false;
                this.closest('.form-group').addClass('has-error').find('.field-error').html('Debes ingresar un n&uacute;mero entero mayor que 0.');

            }

        });

    }

    return subscriptionsModuleObj;

})(window, document);