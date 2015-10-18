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
  .service("db", ["chrome", window.DbService])
  .controller("MainCtrl", function($scope, $timeout, db) {
    var maxItemId;
    $scope.appearance = {
      newSourceNamePlaceholderText: chrome.i18n.getMessage('news_newSourceNamePlaceholderText'),
      newSourceUrlPlaceholderText: chrome.i18n.getMessage('news_newSourceUrlPlaceholderText'),
      newSourceSectionText: chrome.i18n.getMessage('news_newSourceSectionText')
    };
    $scope.newEntry = { name: '', url: '' };

    $scope.updateEntry = function(entry) {
      db.save(entry).then(
        function() {
          $timeout(function() {
            entry.edit = false;
          });
        },
        handleIOError
      );
    };

    $scope.createNewEntry = function() {
      var newEntry = _.assign({ id: ++maxItemId }, $scope.newEntry);
      db.save(newEntry).then(
        function() {
          $timeout(function() {
            $scope.newEntry = { name: '', url: '' };
            $scope.entries.push(addExtraField(newEntry));
          });
        }, 
        handleIOError
      );
    };

    db.getAll().then(function(items) {
      maxItemId = _.reduce(items, function(maxId, item) { return Math.max(maxId, item.id) }, 0);
      $timeout(function() {
        // TODO: handle case of empty data
        $scope.entries = _.map(items, addExtraField);
      });
    }, function() {
      // TODO: now what ?
    });
          
    function addExtraField(item) { return _.assign({ edit: false }, item); }
    
    function handleIOError() {
      // TODO: save new entry unsuccessfully, now what ?
      
    }
  });