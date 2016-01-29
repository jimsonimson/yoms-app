'use strict'
namespace app.Services {
  export class ReviewService {
    public reviewResource;
    public favoriteResource;

    saveReview(review){
      return this.reviewResource.save(review).$promise;
    }

    saveFavorite(favDish){
      return this.favoriteResource.save(favDish).$promise;
    }

    getAll(){
      return this.favoriteResource.query();
    }

    constructor(
      private $resource: ng.resource.IResourceService
    ){
      this.reviewResource = $resource('/api/reviews/:id')
      this.favoriteResource = $resource('/api/bananas/:id')
    }
  }
  angular.module('app').service('ReviewService', ReviewService);
};
