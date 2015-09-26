(function(global) {
  // inject font file (Foundation Font Icon package) into document
  var fontFaceCssElement = document.createElement('style');
  fontFaceCssElement.type = 'text/css';
  fontFaceCssElement.textContent = '@font-face { font-family: "foundation-icons"; src: url("' +
    chrome.extension.getURL('fonts/foundation-icons.woff') +
    '") format("woff"); font-weight: normal; font-style: normal; }';
  document.head.appendChild(fontFaceCssElement);

  var rootElement = angular.element(
    '<div id="rss24hContainer" class="rss60s" ng-controller="MainController" ng-show="appearance.visible">' +
      '<div class="outter">' +
        '<div class="content">' +
          '<div ng-show="appearance.httpsBlocking" class="https-warning">' +
            '<div class="icon"></div>' +
            '<div ng-bind="appearance.httpsBlockingWarningText" class="text"></div>' +
          '</div>' +
          '<div ng-hide="appearance.httpsBlocking">' +
            '<form>' +
              '<select ' + 
                'ng-options="opt.name for opt in data.sources track by opt.id" ' +
                'ng-model="data.selectedSource" ' +
                'ng-change="onRssSourceChanged()">' +
              '</select>'+
              '<span class="animated infinite" ng-class="{ \'flash\': appearance.inLoadingProgress }" ng-bind="appearance.loadingText" ng-show="appearance.inLoadingProgress"></span>' +
            '</form>' +
            '<slideshow items="data.rssItems"></slideshow>' +
          '</div>' +
        '</div>' + 
        '<div class="options">' +
          '<a void ng-click="openOptionsPage()"><i class="fi-widget"></i></a>' +
          '<span class="close-button" '+
            'title="{{ appearance.closeButtonTitle }}" ' +
            'ng-click="appearance.visible = false">X</span>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
  $("body").append(rootElement);
  angular.bootstrap($("#rss24hContainer").get(0), ['rss24h']);

  // appear again
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (sender.tab == null /* message comes from extension */) {
      if (request.type === 'appear') {
        // update scope model to show up the panel
        rootElement.scope().appearance.visible = true;
        rootElement.injector().get('$timeout')();
      }
    }
  });

  // mark that the app is loaded
  global.RSS60S = {};
})(window);