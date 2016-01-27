"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var DishCreateController = (function () {
            function DishCreateController(HomeService, $location) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.dish = {};
            }
            DishCreateController.prototype.createDish = function () {
                var _this = this;
                this.HomeService.saveDish(this.dish).then(function (res) {
                    _this.$location.path('/');
                });
            };
            return DishCreateController;
        }());
        Controllers.DishCreateController = DishCreateController;
        angular.module('app').controller('DishCreateController', DishCreateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
