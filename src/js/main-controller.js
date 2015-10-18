angular
  .module("rss24h")
  .controller("MainController", ["$scope", "network", "db", function(scope, network, db) {
    scope.appearance = {
      httpsBlocking: location.protocol === 'https:',
      httpsBlockingWarningText: chrome.i18n.getMessage('news_httpsBlockingWarningText').replace('{0}', `${location.protocol}\/\/${location.host}`),
      optionButtonTooltipText: chrome.i18n.getMessage('news_ButtonTooltipButtonText'),
      inLoadingProgress: false,
      visible : true,
      closeButtonTitle: chrome.i18n.getMessage('news_closeButton'),
      loadingText: chrome.i18n.getMessage('news_loadingText')
    };

    scope.onRssSourceChanged = function() {
      scope.appearance.inLoadingProgress = true;
      network.fetchRss(scope.data.selectedSource.url).then(function(response) {
        // TODO: display warning message for non-200 status code
        if (200 <= response.status && response.status <= 299) {
          scope.data.rssItems = response.data;
        }
      })['finally'](function() {
        scope.appearance.inLoadingProgress = false;
      });
    };

    scope.openOptionsPage = function() {
      // code from sample in Google document
      if (chrome.runtime.openOptionsPage) {
        // if Chrome 42+
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('pages/options/index.htm'));
      }
    };

    db.getAll().then(function(items) {
      if (items.length == 0) {
        // TODO: handle empty data
        
      } else {
        scope.data = {
          selectedSource: items[0],
          sources: items,
          rssItems: [ ]
        };
        scope.onRssSourceChanged(); // show selected rss source
      }
    }, function() {
      // TODO: save new entry unsuccessfully, now what ?
      
    });
  }]);
