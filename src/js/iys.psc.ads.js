"use strict";

var adsModule = (function (window, document) {

    var adsModuleObj = {},
        randomAds,
        staticAds,
        adsImageRootPath,
        $randomAds;

    adsModuleObj.initialize = function () {

        var url = "js/iys.psc.live.ads.definition.min.js" + "?" + common.getTimestamp(),
            scriptId = "iys-psc-ads-definition";

        common.loadScript(scriptId, url);

    },

        adsModuleObj.initializeAds = function () {

            randomAds = this.adsDefinitionList.randomAds,
                staticAds = this.adsDefinitionList.staticAds,
                adsImageRootPath = "img/ads/",
                $randomAds = $("#random-ads");

            loadRandomAds(randomAds);
            loadStaticAds(staticAds);

        };

    function loadRandomAds(randomAds) {

        var activeAds = getActiveAds(randomAds.adsList),
            $ad = $randomAds.find(".ad"),
            loopTime = 7;

        $(window).resize(function () {
            $randomAds.height($ad.height());
        });

        $randomAds.find("img").load(function () {
            $(window).resize();
        });

        common.shuffle(activeAds);

        $.each(activeAds, function (index, data) {

            var $rAd = (index) ? $ad.clone() : $ad;
            setAdAttributes($rAd.find("a"), randomAds.linkTitle, data);
            $rAd.appendTo($randomAds);

        });

        var randomAdsLoop = setInterval(function () {

            var $firstAd = $randomAds.find(".ad").first();

            $firstAd.hide().remove();
            $randomAds.append($firstAd);
            $firstAd.fadeIn(1000);

        }, loopTime * 1000);

    }

    function loadStaticAds(staticAds) {

        var staticAdsQuantity = 8,
            activeAds = getActiveAds(staticAds.adsList),
            firstSelectedAds = activeAds.slice(0, staticAdsQuantity);

        common.shuffle(firstSelectedAds);

        $.each(firstSelectedAds, function (index, data) {

            if (index < staticAdsQuantity) {

                var $sAd = $("#static-ad-0" + (1 + index));
                setAdAttributes($sAd, staticAds.linkTitle, data);

            }

        });

    }

    function getActiveAds(ads) {

        var activeAds = [];

        for (var k = 0; k < ads.length; k++) {

            var ad = ads[k];

            if (ad.active)
                activeAds.push(ad);

        }

        return activeAds;

    }

    function setAdAttributes($adLink, linkTitle, data) {

        $adLink.attr({
            title: linkTitle,
            href: data.url,
            target: data.target
        }).find("img").attr({
            alt: data.description,
            src: adsImageRootPath + data.image
        });

    }

    return adsModuleObj;

})(window, document);