'use strict'
namespace app.Services {
  export class ReviewService {
    public reviewResource;

    saveReview(review){
      return this.reviewResource.save(review).$promise;
    }

    constructor(
      private $resource: ng.resource.IResourceService
    ){
      this.reviewResource = $resource('/api/reviews/:id')
    }
  }
  angular.module('app').service('ReviewService', ReviewService);
};
