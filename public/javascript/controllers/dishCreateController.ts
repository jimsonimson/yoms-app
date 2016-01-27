"use strict";
namespace app.Controllers {
  export class DishCreateController{
    public dish = {};

    public createDish(){
      this.HomeService.saveDish(this.dish).then((res) =>{
        this.$location.path('/')
      })
    }

    constructor(
      private HomeService: app.Services.HomeService,
      private $location: ng.ILocationService
    ){}
  }
  angular.module('app').controller('DishCreateController', DishCreateController);
}
