"use strict";

var videoPlayerModule = (function (window, document) {

    var videoPlayerModuleObj = {},
        $main,
        $videoContainer,
        $videoThumbnail,
        player,
        playerState,
        isiOS;

    videoPlayerModuleObj.initialize = function () {

        isiOS = (window.navigator.userAgent.match(/iPhone|iPad|iPod/i)) ? true : false;

        $main = $("#main"),
            $videoContainer = $("#video-container"),
            $videoThumbnail = $videoContainer.find(".video-thumbnail");

        setThumbnailVideoPreviewImage();

        $videoThumbnail.on("mouseenter mouseleave", function () {
            $(this).toggleClass("active");
        });

        loadPlayer();

    };

    function setThumbnailVideoPreviewImage() {

        var previewImageUrl = "url(img/player-live-preview-image.jpg" + "?" + common.getTimestamp() + ")";
        $videoThumbnail.css("background-image", previewImageUrl);

    }

    function loadPlayer() {

        loadPlayerApi();
        
        window.onYouTubeIframeAPIReady = function () {

            player = new YT.Player('yt-video', {
                
                events: {
                    "onReady": onPlayerReady,
                    "onStateChange": onPlayerStateChange,
                    "onError": onPlayerError
                }
                
            });
                        
        }

    }

    function loadPlayerApi() {

        var url = common.getProtocol() + "://www.youtube.com/iframe_api",
            scriptId = "yt-wjs";

        common.loadScript(scriptId, url);

    }

    function onPlayerReady(event) {
                
        $videoContainer.find(".wait-message").fadeOut(300, function () {
            $videoContainer.find(".video-player-watch-control").fadeIn(200);
        });

        $("#video-play-btn").on('click', function (e) {

            e.preventDefault();
            
            if (!isiOS)
                event.target.playVideo();

            else
                $videoThumbnail.fadeOut();

        });

    }

    function onPlayerStateChange(event) {

        playerState = event.data;
        var $theaterModeOverlay = $main.find(".theater-mode-overlay");

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
        alert(event.data);
    }

    return videoPlayerModuleObj;

})(window, document);