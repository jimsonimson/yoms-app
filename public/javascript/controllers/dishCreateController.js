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
                this.geocoder(function () {
                    _this.HomeService.saveDish(_this.dish).then(function (res) {
                        _this.$location.path('/');
                    });
                });
            };
            DishCreateController.prototype.geocoder = function (cb) {
                var _this = this;
                var geo = new google.maps.Geocoder();
                geo.geocode({ "address": this.dish.restaurant.address }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                        _this.dish.restaurant.location = results[0].geometry.location;
                        cb();
                    }
                });
            };
            return DishCreateController;
        }());
        Controllers.DishCreateController = DishCreateController;
        angular.module('app').controller('DishCreateController', DishCreateController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
