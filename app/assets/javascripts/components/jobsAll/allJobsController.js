(function() {
    'use strict';
    angular.module('app')
        .controller('allJobsController', ['$state', 'allJobsAPI', function($state, allJobsAPI) {
            var self = this;

            allJobsAPI.jobsList().success(function(response) {
                self.totalJobs = response;
            });

            this.name = function(firstName, lastName) {
                return firstName + " " + lastName;
            };
            this.time = function(startTime, endTime) {
                return startTime + " - " + endTime;
            };
            this.confirmed = function(confirmation) {
                if (confirmation === true) {
                    return "True";
                } else {
                    return "False";
                }
            };
            this.jobClicked = function(jobId) {
                allJobsAPI.jobDetails(jobId).success(function(response) {
                  self.jobDetails = response;
console.log(response);
                    $state.go('jobs-list-details', {
                        params: {
                            job: response
                        },
                        jobDetail: jobId
                    }, {reload: true});
                });
            };
        }]);
})();
