angular
  .module('rss24h')
  .directive("void", function() {
    return {
      restrict: "A",
      compile: function(element) {
        element.attr("href", "javascript:void(0);"); 
      }
    };
  });
