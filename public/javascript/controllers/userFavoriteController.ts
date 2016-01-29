'use strict';
namespace app.Controllers {
  export class UserFavoriteController{
    public favDishes;


    constructor(
      private ReviewService: app.Services.ReviewService
    ){
      this.favDishes = ReviewService.getAll();
    }
  }
  angular.module('app').controller('UserFavoriteController', UserFavoriteController);
}
