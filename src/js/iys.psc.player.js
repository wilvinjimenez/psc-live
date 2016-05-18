'use strict';

var videoPlayerModule = (function (window, document) {

    var videoPlayerModuleObj = {},
        $main,
        $videoContainer,
        $videoThumbnail,
        $playerAlert,
        player,
        playerState,
        probablyIsMobile;

    videoPlayerModuleObj.initialize = function () {

        probablyIsMobile = common.probablyIsMobile();

        $main = $('#main'),
            $videoContainer = $('#video-container'),
            $videoThumbnail = $videoContainer.find('.video-thumbnail'),
            $playerAlert = $('#player-alert-message');

        setThumbnailVideoPreviewImage();

        $videoThumbnail.on('mouseenter mouseleave', function () {
            $(this).toggleClass('active');
        });

        $('#video-play-btn').on('click', function (e) {

            e.preventDefault();
            loadPlayer();

        });

    };

    function setThumbnailVideoPreviewImage() {

        var previewImageUrl = 'url(img/player-live-preview-image.jpg' + '?' + common.getTimestamp() + ')';
        $videoThumbnail.css('background-image', previewImageUrl);

    }

    function loadPlayer() {

        loadPlayerApi();

        window.onYouTubeIframeAPIReady = function () {

            player = new YT.Player('yt-video', {
                videoId: $('#video-id').val(),
                playerVars: {
                    enablejsapi: 1,
                    rel: 0,
                    showinfo: 0,
                    hl: "es",
                    color: 'white',
                    origin: document.domain
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onPlayerError
                }

            });

        }

        showPlayerAlert('Espere un momento por favor.');
        $videoContainer.find('.video-player-watch-control').fadeOut(400);

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

        showPlayerAlert('Ha ocurrido un error cargando la transmisi&oacute;n en vivo. Favor intente m&aacute;s tarde. (Error: ' + event.data + ')');

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