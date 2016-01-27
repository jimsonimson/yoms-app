'use strict';
namespace app.Controllers {
  export class DishPageController {
    public percent;
    public overStar;
    public dish;
    public review;

    public rate = 3;
    public max = 5;
    public isReadonly = false;

    public hoveringOver(value) {
      this.overStar = value;
      this.percent = 100 * (value / this.max);
    };

    public addReview(){
      let review = {
        reviewComment: this.review.reviewComment,
        rate: this.review.rate,
        dish: this.dish._id,
        createdBy: this.UserService.status._id
      };
      this.ReviewService.saveReview(review).then((res)=>{
        this.dish.reviews.push(res);
        this.$location.path('/yummydish/' + this.dish._id)
      });
    }

    constructor(
      private HomeService: app.Services.HomeService,
      private $routeParams: ng.route.IRouteParamsService,
      private UserService: app.Services.UserService,
      private ReviewService: app.Services.ReviewService,
      private $location: ng.ILocationService
    ){
      this.dish = HomeService.getDish( $routeParams['id']);
    }
  }
  angular.module('app').controller('DishPageController', DishPageController);
}
