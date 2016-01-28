'use strict';
namespace app.Controllers {
  export class HomeController {
    public dishes;

    public delete(id) {
      this.HomeService.deleteDish(id).then((res)=>{
        this.dishes = this.dishes.filter((d) => d._id !== id);
      });
    };

    constructor(
      private HomeService: app.Services.HomeService
    ) {
      this.dishes = HomeService.getAll();
    }
  }

  angular.module('app').controller('HomeController', HomeController);
}
