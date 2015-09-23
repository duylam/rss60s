(function() {
  angular
    .module("rss24h")
    .service("network", ["$http", Service]);

  function Service($http) {
    this.$http = $http;
  }

  Service.prototype.fetchRss = function(url) {
    return this.$http.get(url, {
      transformResponse: function(data, headersGetter, status) {
        // parse xml to json
        var result = data;
        if (200 <= status && status <= 299) {
          var newsItems = $($.parseXML(result)).find('channel > item')
            , counts = _.range(newsItems.size());

          result = _.map(counts, function(index) {
            var it = $(newsItems.get(index));
            return { title: it.find('title').text(), url: it.find('link').text() };
          });
        }

        return result;
      }
    });
  };
})();