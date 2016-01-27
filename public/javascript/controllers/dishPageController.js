'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var DishPageController = (function () {
            function DishPageController(HomeService, $routeParams, UserService, ReviewService, $location) {
                this.HomeService = HomeService;
                this.$routeParams = $routeParams;
                this.UserService = UserService;
                this.ReviewService = ReviewService;
                this.$location = $location;
                this.rate = 3;
                this.max = 5;
                this.isReadonly = false;
                this.dish = HomeService.getDish($routeParams['id']);
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
            return DishPageController;
        }());
        Controllers.DishPageController = DishPageController;
        angular.module('app').controller('DishPageController', DishPageController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
