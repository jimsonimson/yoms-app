"use strict";
namespace app.Controllers {
  export class DishPageController{
    public dish;
    public review;

    constructor(
      private HomeService: app.Services.HomeService,
      // private ReviewService: app.Services.ReviewService,
      private $routeParams: ng.route.IRouteParamsService,
      private UserService: app.Services.UserService,
      private $location: ng.ILocationService
    ){
      this.dish = HomeService.getDish( $routeParams['id']);
    }
  }
  angular.module('app').controller('DishPageController', DishPageController);
}
