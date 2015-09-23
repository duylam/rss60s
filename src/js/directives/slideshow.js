(function() {
  angular
    .module("rss24h")
    .directive("slideshow", function() {
      return {
        restrict: "E",
        scope: {
          "items" : "="
        },
        template: '<div><a class="animated" ng-repeat="item in items" ng-href="{{ item.url }}" ng-bind="item.title" ng-show="$first" target="_blank"></a></div>',
        link: function(scope, element) {
          var intervalParam = {
            element
          };
          setInterval(showNext, 5000, intervalParam);

          function showNext(param) {
            const entranceCssName = "fadeIn";
            var nextItem = param.element.find("a:visible").next();
            
            if ( nextItem.size() == 0 ) nextItem = param.element.find("a").first();

            param.element.find("a").removeClass(entranceCssName).addClass("ng-hide");
            nextItem.removeClass("ng-hide").addClass(entranceCssName); 
          }
        }
      };
    });
})();