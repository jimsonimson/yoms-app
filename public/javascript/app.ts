'use strict';
namespace App {
  angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngAnimate'])
  .config((
    $routeProvider: ng.route.IRouteProvider,
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider) => {

    $routeProvider.when('/', {
      templateUrl: '/templates/Home.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: '/templates/login.html',
      controller: app.Controllers.UserController,
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: '/templates/register.html',
      controller: app.Controllers.UserController,
      controllerAs: 'vm'
    })
    .when('/addDish', {
      templateUrl: '/templates/dishCreate.html',
      controller: app.Controllers.DishCreateController,
      controllerAs: 'vm'
    })
    .when('/yummydish/:id', {
      templateUrl: '/templates/dishPage.html',
      controller: app.Controllers.DishPageController,
      controllerAs: 'vm'
    })
    .when('/update/:id', {
      templateUrl: 'templates/dishUpdate.html',
      controller: app.Controllers.DishUpdateController,
      controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('HTTPFactory');
  });
}
