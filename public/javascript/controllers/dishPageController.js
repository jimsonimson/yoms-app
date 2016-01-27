"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var DishPageController = (function () {
            function DishPageController(HomeService, $routeParams, UserService, $location) {
                this.HomeService = HomeService;
                this.$routeParams = $routeParams;
                this.UserService = UserService;
                this.$location = $location;
                this.dish = HomeService.getDish($routeParams['id']);
            }
            return DishPageController;
        }());
        Controllers.DishPageController = DishPageController;
        angular.module('app').controller('DishPageController', DishPageController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
