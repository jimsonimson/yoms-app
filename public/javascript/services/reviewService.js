'use strict';
var app;
(function (app) {
    var Services;
    (function (Services) {
        var ReviewService = (function () {
            function ReviewService($resource) {
                this.$resource = $resource;
                this.reviewResource = $resource('/api/reviews/:id');
                this.favoriteResource = $resource('/api/bananas/:id');
            }
            ReviewService.prototype.saveReview = function (review) {
                return this.reviewResource.save(review).$promise;
            };
            ReviewService.prototype.saveFavorite = function (favDish) {
                return this.favoriteResource.save(favDish).$promise;
            };
            ReviewService.prototype.getAll = function () {
                return this.favoriteResource.query();
            };
            return ReviewService;
        }());
        Services.ReviewService = ReviewService;
        angular.module('app').service('ReviewService', ReviewService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
;
