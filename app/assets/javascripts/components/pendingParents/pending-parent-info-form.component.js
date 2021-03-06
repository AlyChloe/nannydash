(function() {
  'use strict';
  angular
    .module('app')
    .component('pendingParentInfoForm', {
      templateUrl: 'pending-parent-info-form.html',
      bindings: {
        info: '<'
      },
      controller: ['pendingParentsAPI', '$scope', '$state', PendingParentInfoForm]
    });

    function PendingParentInfoForm(pendingParentsAPI, $scope, $state) {
      var ctrl = this;
      ctrl.visibility= false;

      ctrl.popup = function() {
        ctrl.visibility = !ctrl.visibility;
        console.log('pop');
      };

      ctrl.handleToggle = function(id) {
        pendingParentsAPI.toggleApprove(id).then( function() {
          ctrl.info.active = !ctrl.info.active;
          $scope.$emit('updateCount', {});
          $state.go('pendingParents');
        });
      };

      ctrl.delete = function(id) {
        ctrl.visibility = false;
        pendingParentsAPI.deleteParent(id).then(function() {
          $scope.$emit('updateCount', {});
          $state.go('pendingParents');
        });
      };
    }

})();
