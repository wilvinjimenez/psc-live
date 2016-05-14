"use strict";

var socialModule = (function (window, document) {

    var socialModuleObj = {};

    socialModuleObj.initialize = function () {

        loadTwWidget();

    };

    function loadTwWidget() {

        loadTwitterApi();

        twttr.ready(function (twttr) {

            twttr.events.bind('rendered', function (e) {

                var $twWidget = $("#tw-widget");
                applyWidgetStyles($twWidget);

                $twWidget.css("opacity", 0).slideDown(300, function () { $(this).fadeTo(200, 1); });

            });

        });

    }

    function loadTwitterApi() {

        window.twttr = (function (s, id) {

            var js,
                bfjs = document.body.getElementsByTagName(s)[0],
                t = window.twttr || {},
                url = common.getProtocol() + "://platform.twitter.com/widgets.js";

            if (document.getElementById(id))
                return t;

            js = document.createElement(s);
            js.id = id;
            js.src = url;
            bfjs.parentNode.insertBefore(js, bfjs);

            t._e = [];
            t.ready = function (f) {
                t._e.push(f);
            };

            return t;

        } ("script", "twitter-wjs"));

    }

    function applyWidgetStyles($twWidget) {

        var $twTimeLine = $twWidget.find(".twitter-timeline"),
            $twTimeLineContents = $twTimeLine.contents(),
            fonts = "<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,400italic,300italic' rel='stylesheet'>",
            css = "<style> .SandboxRoot { font-family: 'Open Sans', arial, sans-serif; font-weight: 400; line-height: 1.42857143; color: #777; } .timeline-Header-title, .timeline-Tweet-text { font-weight: 400 !important; } .Avatar { border-radius: 50%; } </style>";

        $twTimeLineContents.find('head').append(fonts).append(css);

    }

    return socialModuleObj;

})(window, document);