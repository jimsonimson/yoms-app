'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var DishPageController = (function () {
            function DishPageController(HomeService, $routeParams, UserService, ReviewService, $location, uiGmapGoogleMapApi) {
                var _this = this;
                this.HomeService = HomeService;
                this.$routeParams = $routeParams;
                this.UserService = UserService;
                this.ReviewService = ReviewService;
                this.$location = $location;
                this.uiGmapGoogleMapApi = uiGmapGoogleMapApi;
                this.dish = { _id: null, reviews: [], restaurant: { location: { lat: null, lng: null } } };
                this.rate = 3;
                this.max = 5;
                this.isReadonly = false;
                HomeService.getDish($routeParams['id']).then(function (dish) {
                    _this.dish = dish;
                    _this.markers = [{ id: 0, options: { title: _this.dish.restaurant.name }, latitude: dish.restaurant.location.lat, longitude: dish.restaurant.location.lng }];
                    _this.uiGmapGoogleMapApi.then(function (maps) {
                        _this.map = { center: { latitude: _this.dish.restaurant.location.lat, longitude: _this.dish.restaurant.location.lng }, zoom: 15 };
                    });
                });
            }
            DishPageController.prototype.hoveringOver = function (value) {
                this.overStar = value;
                this.percent = 100 * (value / this.max);
            };
            ;
            DishPageController.prototype.addReview = function () {
                var _this = this;
                var review = {
                    reviewComment: this.review.reviewComment,
                    rate: this.review.rate,
                    dish: this.dish._id,
                    createdBy: this.UserService.status._id
                };
                this.ReviewService.saveReview(review).then(function (res) {
                    _this.dish.reviews.push(res);
                    _this.$location.path('/yummydish/' + _this.dish._id);
                });
            };
            DishPageController.prototype.addFavorite = function () {
                var _this = this;
                var favoritedDish = {
                    dish: this.dish._id,
                };
                this.ReviewService.saveFavorite(favoritedDish).then(function (res) {
                    console.log(res);
                    _this.$location.path('/');
                });
            };
            DishPageController.prototype.deleteReview = function (review) {
                var _this = this;
                this.ReviewService.deleteReview(review).then(function (res) {
                    _this.dish.reviews.splice(_this.dish.reviews.indexOf(review), 1);
                });
            };
            ;
            return DishPageController;
        }());
        Controllers.DishPageController = DishPageController;
        angular.module('app').controller('DishPageController', DishPageController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
