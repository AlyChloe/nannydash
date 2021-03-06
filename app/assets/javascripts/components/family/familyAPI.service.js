(function() {
  'use strict';
  angular.module('app').factory('familyAPI', ['$http', function($http) {

    return {
      list: function() {
        return $http.get("/api/v1/families.json").then(function(response) {
          return response.data.families;
        }, function() {
          alert('Failed');
        });
      },
      countyList: function() {
        return $http.get("/api/v1/families.json").then(function(response) {
          return response.data.counties;
        }, function() {
          alert('Failed');
        });
      },

      profileInfo: function(id) {
        return $http.get("/api/v1/family/" + id + ".json").then(function(response) {
          console.log(response.data);
          return response.data;
        }, function() {
          alert('Failed');
        });
      },

      toggleActiveState: function(id) {
        return $http.patch("/api/v1/family/" + id + ".json", {id: id});
      },

      saveProfile: function(id, data) {
        return $http.patch("/api/v1/family/update/" + id + ".json", {user: data, user_id: id});
      },

      deleteProfile: function(id) {
        return $http.patch("/api/v1/family/delete/" + id + ".json", {id: id});
      }
    };
  }]);
})();
