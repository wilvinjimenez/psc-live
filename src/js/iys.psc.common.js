'use strict';

var common = (function (window, document) {

    var commonObj = {};

    commonObj.getTimestamp = function () {

        var currentdate = new Date(),
            timestamp = currentdate.getDate() + '' + (currentdate.getMonth() + 1) + '' + currentdate.getFullYear() + '' + currentdate.getHours() + '' + currentdate.getMinutes() + '' + currentdate.getSeconds();

        return timestamp;

    },

        commonObj.getContextProtocol = function () {

            var protocol = /^http:/.test(document.location) ? 'http' : 'https';
            return protocol;

        },

        commonObj.loadScript = function (id, url) {

            var s = 'script',
                js = document.createElement(s),
                bfjs = document.body.getElementsByTagName(s)[0],
                src = url;

            js.id = id;
            js.src = src;
            bfjs.parentNode.insertBefore(js, bfjs);

        },

        //Fisher–Yates Shuffle.
        commonObj.shuffle = function (array) {

            var i = array.length,
                j = 0,
                temp;

            while (i--) {

                j = Math.floor(Math.random() * (i + 1));

                // Swap randomly chosen element with current element.
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;

            }

            return array;

        },

        commonObj.setCookie = function (cname, cvalue, exdays) {

            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

            var expires = 'expires=' + d.toUTCString();
            document.cookie = cname + '=' + cvalue + '; ' + expires;

        },

        commonObj.getCookie = function (cname) {

            var name = cname + '=',
                ca = document.cookie.split(';');

            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];

                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }

                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }

            return '';

        };

    commonObj.probablyIsMobile = function () {

        var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            isACommonMobileOS = (window.navigator.userAgent.match(/iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i)) ? true : false;

        if (viewportWidth <= 1280 && isACommonMobileOS) return true

        return false;

    }

    return commonObj;

})(window, document);