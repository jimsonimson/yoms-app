'use strict';
namespace app.Controllers {
  export class DishPageController {
    public percent;
    public overStar;
    public dish = { _id: null, reviews: [], restaurant: { location: { lat: null, lng: null}}};
    public review;
    public map;
    public markers;

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

    public addFavorite(){
      let favoritedDish = {
        dish: this.dish._id,
      };
      this.ReviewService.saveFavorite(favoritedDish).then((res) =>{
        console.log(res);
        this.$location.path('/') //add ngToast here
      })
    }



    constructor(
      private HomeService: app.Services.HomeService,
      private $routeParams: ng.route.IRouteParamsService,
      private UserService: app.Services.UserService,
      private ReviewService: app.Services.ReviewService,
      private $location: ng.ILocationService,
      private uiGmapGoogleMapApi
    ){
      HomeService.getDish( $routeParams['id']).then((dish)=>{
        this.dish = dish;
        this.markers = [{ id: 0, options:{ title: this.dish.restaurant.name}, latitude: dish.restaurant.location.lat, longitude: dish.restaurant.location.lng}]
        this.uiGmapGoogleMapApi.then((maps) => {
          this.map = { center: { latitude: this.dish.restaurant.location.lat, longitude: this.dish.restaurant.location.lng }, zoom: 10 };
        });
      });
    }
  }
  angular.module('app').controller('DishPageController', DishPageController);
}
