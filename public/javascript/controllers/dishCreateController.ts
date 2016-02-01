"use strict";
namespace app.Controllers {
  export class DishCreateController{
    public dish = {};

    public createDish(){
      this.geocoder(()=>{
        this.HomeService.saveDish(this.dish).then((res) =>{
          this.$location.path('/')
        })
      })
    }

    public geocoder(cb){
      var geo = new google.maps.Geocoder();
      geo.geocode( { "address": this.dish.restaurant.address }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
          this.dish.restaurant.location = results[0].geometry.location;
          cb();
        }
      });
    }

    constructor(
      private HomeService: app.Services.HomeService,
      private $location: ng.ILocationService
    ){}
  }
  angular.module('app').controller('DishCreateController', DishCreateController);
}
