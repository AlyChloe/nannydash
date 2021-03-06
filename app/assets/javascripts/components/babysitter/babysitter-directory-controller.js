angular.module('app')
    .controller('babysitterDirectoryController', ["$state", "babysitterDirectoryAPI", function ($state, babysitterDirectoryAPI) {
      /*************************
      Variables
      *************************/
      var self = this;
      this.babysitters = babysitterDirectoryAPI.totalBabysitters;
      this.totalUsers = 0;
      this.usersPerPage = 6;
      this.dropIt = false;
      this.counties;
      /*************************
      Toggle county dropdown
      *************************/
      this.dropdown = function() {
        self.dropIt = !self.dropIt;
      };

      /*************************
      When page first loads, load in babysitters
      *************************/
      babysitterDirectoryAPI.list().success(function(response) {
        babysitterDirectoryAPI.totalBabysitters = response.sitters;
        self.babysitters = babysitterDirectoryAPI.totalBabysitters;
        self.totalUsers = response.sitters.length;
        self.counties = response.counties;
      }, function(response) {
        alert('Failed');
      });
      /*************************
      Transforming full date/time string to just plain date
      *************************/
      this.getDate = function(data) {
        var objectDate = data.joined;
        var convertDate = new Date(objectDate);
        return newDate = convertDate.getMonth() + '/' + convertDate.getDate() + '/' + convertDate.getFullYear();
      };
      /*************************
      Calculating age
      *************************/
      this.calculateAge = function(age) {
        var userBirthday = new Date(age);
        var nowDate = Date.now();
        var ageDif = nowDate - userBirthday.getTime();
        var ageDate = new Date(ageDif);
        return age = Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      /*************************
      Checking to see if CPR is true/false .. then displaying color & new text
      *************************/
      this.cprCheck = function(value) {
        if(value === true) {
          return 'yes';
        } else {
          return 'no';
        }
      };
      /*************************
      When user clicks on profile, it will store data and post on new profile page
      *************************/
      this.userClick = function(personId) {
        babysitterDirectoryAPI.userProfile(personId).success(function(response) {
          $state.go('babysitter-profile', {babysitterParam: {sitter: response}, sitterId: personId}, {reload: true});
        });
      };
    }]);
