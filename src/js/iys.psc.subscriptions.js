"use strict";

var subscriptionsModule = (function (window, document) {

    var subscriptionsModuleObj = {},
        $subscriptionModal;

    subscriptionsModuleObj.initialize = function () {

        $subscriptionModal = $("#subscription-modal");

        $subscriptionModal.modal({
            show: true,
            backdrop: "static",
            keyboard: true
        });

    };

    return subscriptionsModuleObj;

})(window, document);