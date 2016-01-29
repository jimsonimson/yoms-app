"use strict";
namespace app.Services {
  export class HomeService {
    public DishResource;

    public getAll(){
      //GET: /api/dishes
      return this.DishResource.query();
    }

    public getDish(dishId){
      //GET: /api/dishes/{{dishId}}
      return this.DishResource.get({ id: dishId}).$promise;
    }

    public saveDish(dish){
      //POST: /api/dishes
      return this.DishResource.save(dish).$promise;
    }

    public updateDish(dish){
      //PUT: /api/dishes/{{dish._id}}
      return this.DishResource.update({ id: dish._id }, dish).$promise;
    }

    public deleteDish(dishId){
      // DELETE: /api/dishes?_id={{id}}
      return this.DishResource.delete({ _id: dishId }).$promise;
    }

    constructor(
      private $resource: ng.resource.IResourceService
    ) {
      this.DishResource = $resource('/api/dishes/:id', null, {
        'update': { method: 'PUT'}
      });
    }
  }

  angular.module('app').service('HomeService', HomeService);
}
