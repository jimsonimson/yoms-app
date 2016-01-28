'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(HomeService) {
                this.HomeService = HomeService;
                this.dishes = HomeService.getAll();
            }
            HomeController.prototype.delete = function (id) {
                var _this = this;
                this.HomeService.deleteDish(id).then(function (res) {
                    _this.dishes = _this.dishes.filter(function (d) { return d._id !== id; });
                });
            };
            ;
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module('app').controller('HomeController', HomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
