"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var DishUpdateController = (function () {
            function DishUpdateController(HomeService, $location, $routeParams) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.dish = HomeService.getDish($routeParams['id']);
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
