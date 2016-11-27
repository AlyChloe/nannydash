(function() {
  'use strict';
  angular
    .module('app')
    .component('jobDetails', {
      bindings: {
        job: '<'
      },
      templateUrl: 'jobs-list-details.html',
      controller: ['allJobsAPI', '$stateParams', '$scope', jobDetailsController]
    });

  function jobDetailsController(allJobsAPI, $stateParams, $scope) {
    var ctrl = this;

    ctrl.jobId = $stateParams.jobId;
    ctrl.updateNewJob = {};

    ctrl.$onInit = function() {
    };

    ctrl.updateCurrent = function(key, value) {
      ctrl.updateNewJob[key] = value;
      console.log(ctrl.updateNewJob);
    };

    ctrl.save = function(id) {
      allJobsAPI.saveJob(id, ctrl.updateNewJob);
    };

    ctrl.delete = function(id) {
      allJobsAPI.deleteJob(id).then(function() {
        $scope.$emit('updateCount', {});

      });
    };

  }
})();
