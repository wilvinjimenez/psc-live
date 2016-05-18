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

    };

    return subscriptionsModuleObj;

})(window, document);