'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var UserFavoriteController = (function () {
            function UserFavoriteController(ReviewService) {
                this.ReviewService = ReviewService;
                this.favDishes = ReviewService.getAll();
            }
            return UserFavoriteController;
        }());
        Controllers.UserFavoriteController = UserFavoriteController;
        angular.module('app').controller('UserFavoriteController', UserFavoriteController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
