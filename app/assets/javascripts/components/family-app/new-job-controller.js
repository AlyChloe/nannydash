angular.module('familyApp')
    .controller('newJobFormController', ["familyAppAPI", "$http", function (familyAppAPI, $http) {
      /*************************
      Variables
      *************************/
      var self = this;
      this.toggleShow = true;

      familyAppAPI.activeBabysitters().success(function(response) {
        console.log(response);
        self.sitters = response.sitters
      });

      this.loadUser = function(user) {
        self.showUsers = false;
        self.id = user.sitter_id;
        return self.recipient = user.first_name + " " + user.last_name;
      }

      this.sendMessage = function(id, date, startTime, endTime, body) {
        // date format
        var newDate = new Date(date);
        var fullDate = newDate.getFullYear()+'-' + (newDate.getMonth()+1) + '-'+newDate.getDate();

        // start hour format
        var startHours = startTime.getHours();
        var startHours = ("0" + startHours).slice(-2);
        // start minutes format
        var startMins = startTime.getMinutes();
        var startMins = ("0" + startMins).slice(-2);

        // end hour format
        var endHours = endTime.getHours();
        var endHours = ("0" + endHours).slice(-2);
        // end minutes format
        var endMins = endTime.getMinutes();
        var endMins = ("0" + endMins).slice(-2);

        var end = endHours + ':' + endMins;
        var start = startHours + ':' + startMins;

        var newMsg = {};

        if(id != null || '') {
          newMsg['sitter_id'] = id;
        }

        newMsg['date'] = fullDate;
        newMsg['start_time'] = start;
        newMsg['end_time'] = end;
        newMsg['notes'] = body;

        self.toggleShow = !self.toggleShow
        console.log('Before New Job');
        familyAppAPI.newJob(newMsg);
      }


  }]);
