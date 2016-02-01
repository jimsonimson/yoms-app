"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var DishUpdateController = (function () {
            function DishUpdateController(HomeService, $location, $routeParams) {
                var _this = this;
                this.HomeService = HomeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                HomeService.getDish($routeParams['id']).then(function (res) {
                    _this.dish = res;
                });
            }
            DishUpdateController.prototype.updateDish = function () {
                var _this = this;
                this.HomeService.updateDish(this.dish).then(function (res) {
                    _this.$location.path('/');
                });
            };
            ;
            return DishUpdateController;
        }());
        Controllers.DishUpdateController = DishUpdateController;
        angular.module('app').controller('DishUpdateController', DishUpdateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
