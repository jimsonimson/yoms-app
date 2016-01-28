"use strict";
namespace app.Controllers {
  export class DishUpdateController{
    public dish;

    public updateDish(){
      this.HomeService.updateDish(this.dish).then((res)=>{
        this.$location.path('/');
      });
    }

    constructor(
      private HomeService: app.Services.HomeService,
      private $location: ng.ILocationService,
      private $routeParams: ng.route.IRouteParamsService
    ){
      this.dish = HomeService.getDish($routeParams['id']);
    };
  }
  angular.module('app').controller('DishUpdateController', DishUpdateController);
}
