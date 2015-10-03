angular
  .module("rss24h")
  .controller("MainController", ["$scope", "network", function(scope, network) {
    const rssSources = [
      {
        id: 1,
        name: 'Thời sự - VnExpress',
        url: 'http://vnexpress.net/rss/thoi-su.rss'
      },
      {
        id: 2,
        name: 'Công nghệ - Thanh Niên',
        url: 'http://www.thanhnien.com.vn/rss/cong-nghe-thong-tin.rss'
      },
      {
        id: 3,
        name: 'Thể thao - VnExpress',
        url: 'http://vnexpress.net/rss/the-thao.rss'
      }
    ];
    
    scope.appearance = {
      httpsBlocking: location.protocol === 'https:',
      httpsBlockingWarningText: chrome.i18n.getMessage('news_httpsBlockingWarningText').replace('{0}', `${location.protocol}\/\/${location.host}`),
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

    scope.data = {
      selectedSource: rssSources[0],
      sources: rssSources,
      rssItems: [ ]
    };

    scope.onRssSourceChanged(); // show selected rss source

  }]);
