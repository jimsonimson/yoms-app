'use strict';
namespace App {
  angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngAnimate', 'uiGmapgoogle-maps'])

  .config((uiGmapGoogleMapApiProvider) => {
    uiGmapGoogleMapApiProvider.configure({
      //key: 'api key given' (only needed when you need more than 25k map reloads in a day)
      Key: 'AIzaSyDcawZHhZEZT-COq4TFbrIzbHi6cOjtyzY',
      v: '3.20',
      libraries: 'weather, geometry, visualization'
    });
  })

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
    .when('/userProfile', {
      templateUrl: '/templates/userFavorites.html',
      controller: app.Controllers.UserFavoriteController,
      controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('HTTPFactory');
  });
}
