'use strict';

var videoPlayerModule = (function (window, document) {

    var videoPlayerModuleObj = {},
        $main,
        $videoContainer,
        $videoThumbnail,
        $playerAlert,
        player,
        playerState,
        probablyIsMobile,
        $languageSelection;

    videoPlayerModuleObj.initialize = function () {

        probablyIsMobile = common.probablyIsMobile();

        $main = $('#main'),
            $videoContainer = $('#video-container'),
            $videoThumbnail = $videoContainer.find('.video-thumbnail'),
            $playerAlert = $('#player-alert-message'),
            $languageSelection = $('#language-selection');

        setThumbnailVideoPreviewImage();

        $videoThumbnail.on('mouseenter mouseleave', function () {
            $(this).toggleClass('active');
        });

        $('#video-play-btn').on('click', function (e) {

            e.preventDefault();
            $languageSelection.fadeIn(400);
            $videoContainer.find('.video-player-watch-control').fadeOut(400);

        });

        $('#language-btn-es').on('click', function (e) {

            e.preventDefault();
            loadPlayer('es', $('#video-es').val());

        });

        $('#language-btn-en').on('click', function (e) {

            e.preventDefault();
            loadPlayer('en', $('#video-en').val());

        });

    };

    function setThumbnailVideoPreviewImage() {

        var previewImageUrl = 'url(img/player-live-preview-image.jpg' + '?' + common.getTimestamp() + ')';
        $videoThumbnail.css('background-image', previewImageUrl);

    }

    function loadPlayer(lang, vId) {

        loadPlayerApi();

        window.onYouTubeIframeAPIReady = function () {

            player = new YT.Player('yt-video', {
                videoId: vId,
                playerVars: {
                    enablejsapi: 1,
                    rel: 0,
                    hl: lang,
                    modestbranding: 1,
                    origin: document.domain
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onPlayerError
                }

            });

        }

        showPlayerAlert('<b>Espere un momento por favor.</b><br>Wait a moment please.');
        $languageSelection.fadeOut(400);
    }

    function loadPlayerApi() {

        var url = 'https://www.youtube.com/iframe_api',
            scriptId = 'yt-wjs';

        common.loadScript(scriptId, url);

    }

    function onPlayerReady(event) {

        hidePlayerAlert();

        if (!probablyIsMobile)
            event.target.playVideo();

        else
            $videoThumbnail.fadeOut();

    }

    function onPlayerStateChange(event) {

        playerState = event.data;
        var $theaterModeOverlay = $main.find('.theater-mode-overlay');

        switch (playerState) {

            case YT.PlayerState.ENDED:
                $theaterModeOverlay.fadeOut();
                break;

            case YT.PlayerState.PLAYING:
                $theaterModeOverlay.fadeIn();
                break;

            case YT.PlayerState.PAUSED:
                $theaterModeOverlay.fadeOut();
                break;

            case YT.PlayerState.BUFFERING:
                $videoThumbnail.fadeOut();
                break;

        }

    }

    function onPlayerError(event) {

        showPlayerAlert('<b>Ha ocurrido un error cargando la transmisi&oacute;n en vivo. Favor intente m&aacute;s tarde.</b><br>An error has occurred loading the live broadcast. Please try again later.<br><b>(Error: ' + event.data + '-PSC)</b>');

    }

    function showPlayerAlert(htmlMessage) {

        $playerAlert.fadeIn(400, function () {
            $(this).html(htmlMessage)
        });

    }

    function hidePlayerAlert() {

        $playerAlert.fadeOut(400, function () {
            $(this).html(null)
        });

    }

    return videoPlayerModuleObj;

})(window, document);