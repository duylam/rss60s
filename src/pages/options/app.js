angular.module("App", [])
  .directive("void", function() {
    return {
      restrict: "A",
      compile: function(element) {
        element.attr("href", "javascript:void(0);"); 
      }
    };
  })
  .value("ChromeStorage", chrome.storage)
  .service("db", ["ChromeStorage", window.DbService]);
  .controller("MainCtrl", function($scope, db) {
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

    $scope.entries = [
      {
        edit: false,
        id: 1,
        name: 'test',
        url: 'http://local1.com'
      },
      {
        edit: false,
        id: 2,
        name: 'test2',
        url: 'http://local2.com'
      }
    ];
  });