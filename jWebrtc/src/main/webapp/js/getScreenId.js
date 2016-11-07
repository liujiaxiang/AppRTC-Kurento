    // Last time updated at Oct 24, 2015, 08:32:23

// Latest file can be found here: https://cdn.webrtc-experiment.com/getScreenId.js

// Muaz Khan         - www.MuazKhan.com
// MIT License       - www.WebRTC-Experiment.com/licence
// Documentation     - https://github.com/muaz-khan/getScreenId.

// ______________
// getScreenId.js

/*
getScreenId(function (error, sourceId, screen_constraints) {
    // error    == null || 'permission-denied' || 'not-installed' || 'installed-disabled' || 'not-chrome'
    // sourceId == null || 'string' || 'firefox'

    if(sourceId == 'firefox') {
        navigator.mozGetUserMedia(screen_constraints, onSuccess, onFailure);
    }
    else navigator.webkitGetUserMedia(screen_constraints, onSuccess, onFailure);
});
*/

var srcGetScreenIdHtml = 'https://' + location.host + '/jWebrtc/getScreenId.html';

(function() {
    window.getScreenId = function(callback) {
        // for Firefox:
        // sourceId == 'firefox'
        // screen_constraints = {...}
        if (!!navigator.mozGetUserMedia) {
            callback(null, 'firefox', {
                video: {
                    mozMediaSource: 'window',
                    mediaSource: 'window'
                }
            });
            return;
        }

        postMessage();

        window.addEventListener('message', onIFrameCallback);

        function onIFrameCallback(event) {
            if (!event.data) return;

            if (event.data.chromeMediaSourceId) {
                if (event.data.chromeMediaSourceId === 'PermissionDeniedError') {
                    callback('permission-denied');
                } else callback(null, event.data.chromeMediaSourceId, getScreenConstraints(null, event.data.chromeMediaSourceId));
            }

            if (event.data.chromeExtensionStatus) {
                callback(event.data.chromeExtensionStatus, null, getScreenConstraints(event.data.chromeExtensionStatus));
            }

            // this event listener is no more needed
            window.removeEventListener('message', onIFrameCallback);
        }
    };

    function getScreenConstraints(error, sourceId) {
        var screen_constraints = {
            audio: true,  // this flag does not seem to have any effect
            video: {
                mandatory: {
                    chromeMediaSource: error ? 'screen' : 'desktop',
                    maxWidth: window.screen.width > 1920 ? window.screen.width : 1920,
                    maxHeight: window.screen.height > 1080 ? window.screen.height : 1080
                },
                optional: []
            }
        };

        if (sourceId) {
            screen_constraints.video.mandatory.chromeMediaSourceId = sourceId;
        }

        return screen_constraints;
    }

    function postMessage() {
        if (!iframe) {
            loadIFrame(postMessage);
            return;
        }

        if (!iframe.isLoaded) {
            setTimeout(postMessage, 100);
            return;
        }

        iframe.contentWindow.postMessage({
            captureSourceId: true
        }, '*');

        //window.postMessage({
        //    captureSourceId: true
        //}, '*');
    }

    function loadIFrame(loadCallback) {
      console.log("Loading iFrame");
        if (iframe) {
            loadCallback();
            return;
        }

        iframe = document.createElement('iframe');
        iframe.onload = function() {
            iframe.isLoaded = true;

            loadCallback();
        };
        //iframe.src = 'https://www.webrtc-experiment.com/getSourceId/'; // https://wwww.yourdomain.com/getScreenId.html
        iframe.src = srcGetScreenIdHtml;
        iframe.style.display = 'none';
        (document.body || document.documentElement).appendChild(iframe);
    }

    var iframe;

    // this function is used in v3.0
    window.getScreenConstraints = function(callback) {
        loadIFrame(function() {
            getScreenId(function(error, sourceId, screen_constraints) {
                callback(error, screen_constraints.video);
            });
        });
    };
})();

(function() {
    //if(document.domain.indexOf('') === -1) {
     //   return;
   // }

    window.getScreenId = function(callback) {
        // for Firefox:
        // sourceId == 'firefox'
        // screen_constraints = {...}
        if (!!navigator.mozGetUserMedia) {
            callback(null, 'firefox', {
                video: {
                    mozMediaSource: 'window',
                    mediaSource: 'window'
                }
            });
            return;
        }

        postMessage();

        window.addEventListener('message', onIFrameCallback);

        function onIFrameCallback(event) {
            if (!event.data) return;

            if (event.data.chromeMediaSourceId) {
                if (event.data.chromeMediaSourceId === 'PermissionDeniedError') {
                    callback('permission-denied');
                } else callback(null, event.data.chromeMediaSourceId, getScreenConstraints(null, event.data.chromeMediaSourceId));
            }

            if (event.data.chromeExtensionStatus) {
                callback(event.data.chromeExtensionStatus, null, getScreenConstraints(event.data.chromeExtensionStatus));
            }

            // this event listener is no more needed
            window.removeEventListener('message', onIFrameCallback);
        }
    };

    function getScreenConstraints(error, sourceId) {
        var screen_constraints = {
            audio: true,  // this flag does not seem to have any effect
            video: {
                mandatory: {
                    chromeMediaSource: error ? 'screen' : 'desktop',
                    maxWidth: window.screen.width > 1920 ? window.screen.width : 1920,
                    maxHeight: window.screen.height > 1080 ? window.screen.height : 1080
                },
                optional: []
            }
        };

        if (sourceId) {
            screen_constraints.video.mandatory.chromeMediaSourceId = sourceId;
        }

        return screen_constraints;
    }

    function postMessage() {
        if (!iframe) {
            loadIFrame(postMessage);
            return;
        }

        if (!iframe.isLoaded) {
            setTimeout(postMessage, 100);
            return;
        }

        iframe.contentWindow.postMessage({
            captureSourceId: true
        }, '*');

        //window.postMessage({
        //    captureSourceId: true
        //}, '*');
    }

    function loadIFrame(loadCallback) {
        if (iframe) {
            loadCallback();
            return;
        }

        iframe = document.createElement('iframe');
        iframe.onload = function() {
            iframe.isLoaded = true;

            loadCallback();
        };

        //iframe.src = 'https://www.webrtc-experiment.com/getSourceId/'; // https://wwww.yourdomain.com/getScreenId.html
        iframe.src = srcGetScreenIdHtml;
        iframe.style.display = 'none';
        (document.body || document.documentElement).appendChild(iframe);
    }

    var iframe;

    // this function is used in v3.0
    window.getScreenConstraints = function(callback) {
        loadIFrame(function() {
            getScreenId(function(error, sourceId, screen_constraints) {
                callback(error, screen_constraints.video);
            });
        });
    };
})();

//var DetectRTC = {};

/*var screenCallback;

DetectRTC.screen = {
    chromeMediaSource: 'screen',
    getSourceId: function (callback) {
        screenCallback = callback;
        window.postMessage('get-sourceId', '*');
    },
    onMessageCallback: function (data) {
        // "cancel" button is clicked
        if (data == 'PermissionDeniedError') {
            DetectRTC.screen.chromeMediaSource = 'PermissionDeniedError';
            if (screenCallback) return screenCallback('PermissionDeniedError');
            else throw new Error('PermissionDeniedError');
        }

        // extension notified his presence
        if (data == 'rtcmulticonnection-extension-loaded') {
            DetectRTC.screen.chromeMediaSource = 'desktop';
        }

        // extension shared temp sourceId
        if (data.sourceId) {
            DetectRTC.screen.sourceId = data.sourceId;
            if (screenCallback) screenCallback(DetectRTC.screen.sourceId);
        }
    },
    getChromeExtensionStatus: function (callback) {
        // https://chrome.google.com/webstore/detail/screen-capturing/cpnlknclehfhfldcbmcalmobceenfjfd
        var extensionid = 'cpnlknclehfhfldcbmcalmobceenfjfd';

        var image = document.createElement('img');
        image.src = 'chrome-extension://' + extensionid + '/icon.png';
        image.onload = function () {
            DetectRTC.screen.chromeMediaSource = 'screen';
            window.postMessage('are-you-there', '*');
            console.log('extension loaded.');
            setTimeout(function () {
                if (DetectRTC.screen.chromeMediaSource == 'screen') {
                    callback('installed-disabled');
                } else callback('installed-enabled');
            }, 2000);
        };
        image.onerror = function () {
            callback('not-installed');
        };
    }
};

window.addEventListener('message', function (event) {
    if (!event.data || !(typeof event.data == 'string' || event.data.sourceId || event.data.captureSourceId)) return;
    if (event.data.captureSourceId) captureSourceId();

    DetectRTC.screen.onMessageCallback(event.data);
});

function captureSourceId() {
    // check if desktop-capture extension installed.
    DetectRTC.screen.getChromeExtensionStatus(function (status) {
        if (status != 'installed-enabled') {
            window.parent.postMessage({
                chromeExtensionStatus: status
            }, '*');
            return;
        }

        DetectRTC.screen.getSourceId(function (sourceId) {
            window.parent.postMessage({
                chromeMediaSourceId: sourceId
            }, '*');
        });
    });
}*/
