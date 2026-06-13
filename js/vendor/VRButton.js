/* VRButton — minimal WebXR session button (UMD, works via file:// and https)
   Based on the three.js VRButton pattern (MIT). Creates a floating button that
   starts/ends an immersive-vr session when WebXR is available, and shows a
   helpful label otherwise. */
(function (global) {

	var VRButton = {

		createButton: function (renderer, labels) {

			labels = labels || {};
			var L = {
				enter: labels.enter || 'ENTER VR',
				exit: labels.exit || 'EXIT VR',
				notSupported: labels.notSupported || 'VR NOT SUPPORTED',
				notSecure: labels.notSecure || 'WEBXR NEEDS HTTPS'
			};

			var button = document.createElement('button');

			function showEnterVR(/* device */) {

				var currentSession = null;

				function onSessionStarted(session) {
					session.addEventListener('end', onSessionEnded);
					renderer.xr.setSession(session);
					button.textContent = L.exit;
					currentSession = session;
				}

				function onSessionEnded(/* event */) {
					currentSession.removeEventListener('end', onSessionEnded);
					button.textContent = L.enter;
					currentSession = null;
				}

				button.style.display = '';
				button.style.cursor = 'pointer';
				button.textContent = L.enter;

				button.onclick = function () {
					if (currentSession === null) {
						var sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'] };
						navigator.xr.requestSession('immersive-vr', sessionInit).then(onSessionStarted);
					} else {
						currentSession.end();
					}
				};
			}

			function disableButton() {
				button.style.display = '';
				button.style.cursor = 'auto';
				button.style.opacity = '.45';
				button.onclick = null;
			}

			function showWebXRNotFound() {
				disableButton();
				button.textContent = L.notSupported;
			}

			function stylizeElement(element) {
				element.style.position = 'absolute';
				element.style.bottom = '20px';
				element.style.left = '50%';
				element.style.transform = 'translateX(-50%)';
				element.style.padding = '12px 24px';
				element.style.border = '1px solid rgba(255,255,255,.35)';
				element.style.borderRadius = '12px';
				element.style.background = 'rgba(10,14,30,.55)';
				element.style.backdropFilter = 'blur(8px)';
				element.style.color = '#fff';
				element.style.font = '700 13px sans-serif';
				element.style.letterSpacing = '1px';
				element.style.outline = 'none';
				element.style.zIndex = '999';
			}

			if ('xr' in navigator) {

				button.id = 'VRButton';
				button.style.display = 'none';
				stylizeElement(button);

				navigator.xr.isSessionSupported('immersive-vr').then(function (supported) {
					supported ? showEnterVR() : showWebXRNotFound();
				}).catch(showWebXRNotFound);

				return button;

			} else {

				var message = document.createElement('a');

				if (window.isSecureContext === false) {
					message.href = document.location.href.replace(/^http:/, 'https:');
					message.innerHTML = L.notSecure;
				} else {
					message.href = 'https://immersiveweb.dev/';
					message.innerHTML = L.notSupported;
				}

				message.style.textDecoration = 'none';
				stylizeElement(message);
				message.style.opacity = '.6';

				return message;
			}
		}
	};

	global.VRButton = VRButton;

})(typeof self !== 'undefined' ? self : this);
