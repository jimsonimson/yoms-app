'use strict';
namespace app.Controllers {
  export class HomeController {
    public dishes;

    constructor(private HomeService: app.Services.HomeService) {
      this.dishes = HomeService.getAll();
    }
  }

  angular.module('app').controller('HomeController', HomeController);
}
