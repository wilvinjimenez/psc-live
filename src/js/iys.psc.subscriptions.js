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
        signUpFormIsValid = true;

    subscriptionsModuleObj.initialize = function () {

        $subscriptionModal = $('#subscription-modal'),
            $firstName = $('#first-name'),
            $lastName = $('#last-name'),
            $emailAddress = $('#email-address'),
            $churchName = $('#church-name'),
            $countryName = $('#country-name'),
            $broadcastPeopleAmount = $('#broadcast-people-amount'),
            $newsletterYes = $('#newsletter-yes'),
            $newsletterNo = $('#newsletter-no'),

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

            var requiredFields = [$firstName, $lastName, $emailAddress, $countryName, $broadcastPeopleAmount];

            validateRequiredFields(requiredFields);
            validateEmailField($emailAddress);
            validateTextField($churchName);
            validateNumericField($broadcastPeopleAmount);

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

    function validateRequiredFields(fieldsList) {

    }

    function validateEmailField($emailField) {

        var regEx = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/,
            fieldValue = $emailField.val();

        signUpFormIsValid = (regEx.test(fieldValue)) ? signUpFormIsValid : false;

    }

    function validateTextField($textField) {

        var fieldValue = $textField.val(),
            signUpFormIsValid = (!$.isNumeric(fieldValue)) ? signUpFormIsValid : false;

        if (!signUpFormIsValid)
            $emailField.class("has-error");

    }

    function validateNumericField($numericField) {

        var fieldValue = $numericField.val(),
            signUpFormIsValid = ($.isNumeric(fieldValue)) ? signUpFormIsValid : false;

        if (!signUpFormIsValid)
            $emailField.class("has-error");

    }

    return subscriptionsModuleObj;

})(window, document);