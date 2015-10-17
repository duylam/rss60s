angular.module("App", [])
  .directive("void", function() {
    return {
      restrict: "A",
      compile: function(element) {
        element.attr("href", "javascript:void(0);"); 
      }
    };
  })
  .value("chrome", chrome)
  .service("db", ["chrome", window.DbService]);
  .controller("MainCtrl", function($scope, $timeout, db) {
    $scope.appearance = {
      newSourceNamePlaceholderText: chrome.i18n.getMessage('news_newSourceNamePlaceholderText'),
      newSourceUrlPlaceholderText: chrome.i18n.getMessage('news_newSourceUrlPlaceholderText'),
      newSourceSectionText: chrome.i18n.getMessage('news_newSourceSectionText')
    };

    $scope.updateEntry = function(entry) {
      entry.edit = false;
    };

    $scope.createNewEntry = function() {

    };

    db.getAll().then(function(items) {
      $timeout(function() {
        // TODO: handle case of empty data
        $scope.entries = _.map(items, function(it) {
          return _.assign({ edit: false }, it);
        });
      }, 0);
    }, function() {
      // TODO: now what ?
    });
  });