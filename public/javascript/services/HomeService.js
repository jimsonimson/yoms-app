"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService($resource) {
                this.$resource = $resource;
                this.DishResource = $resource('/api/dishes/:id', null, {
                    'update': { method: 'PUT' }
                });
            }
            HomeService.prototype.getAll = function () {
                return this.DishResource.query();
            };
            HomeService.prototype.getDish = function (dishId) {
                return this.DishResource.get({ id: dishId }).$promise;
            };
            HomeService.prototype.saveDish = function (dish) {
                return this.DishResource.save(dish).$promise;
            };
            HomeService.prototype.updateDish = function (dish) {
                return this.DishResource.update({ id: dish._id }, dish).$promise;
            };
            HomeService.prototype.deleteDish = function (dishId) {
                return this.DishResource.delete({ _id: dishId }).$promise;
            };
            return HomeService;
        }());
        Services.HomeService = HomeService;
        angular.module('app').service('HomeService', HomeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
