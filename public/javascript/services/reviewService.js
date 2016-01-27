'use strict';
var app;
(function (app) {
    var Services;
    (function (Services) {
        var ReviewService = (function () {
            function ReviewService($resource) {
                this.$resource = $resource;
                this.reviewResource = $resource('/api/reviews/:id');
            }
            ReviewService.prototype.saveReview = function (review) {
                return this.reviewResource.save(review).$promise;
            };
            return ReviewService;
        }());
        Services.ReviewService = ReviewService;
        angular.module('app').service('ReviewService', ReviewService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
;
