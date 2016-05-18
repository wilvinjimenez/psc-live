'use strict';

var subscriptionsModule = (function (window, document) {

    var subscriptionsModuleObj = {},
        $subscriptionModal;

    subscriptionsModuleObj.initialize = function () {

        $subscriptionModal = $('#subscription-modal');

        $subscriptionModal.on('show.bs.modal hidden.bs.modal', function (e) {
            $(document.body).toggleClass('solid-blank');
        });

        $subscriptionModal.modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });

        $('#btn-subscribe-later').on('click', function () {

            $subscriptionModal.modal('hide');

        });
        
        var expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (24 * 60 * 60 * 1000));
        expiryDate.setHours(8);
        expiryDate.setMinutes(0);
        expiryDate.setSeconds(0);

        var expiryUTCDate = expiryDate.toUTCString();

        var subscriptionCookie = 'WC_SC=CONFIRMED; expires=' + expiryUTCDate + '; path=/';
        
        expiryDate.setHours(expiryDate.getHours() + 1);        
        
    };

    return subscriptionsModuleObj;

})(window, document);