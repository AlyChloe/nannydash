angular.module('app')
    .controller('messageController', ["$scope", "$http", "$state", "$stateParams", "dashboardAPI", function ($scope, $http, $state, $stateParams, dashboardAPI) {
      /*************************
      Variables
      *************************/
      var self = this;
      this.messageId = $stateParams.messageParam.message.message_id;
      this.messageConvoId = $stateParams.messageParam.message.conversation_id;
      this.replyShow = false;
      this.message;
      console.log(this.messageId);
      console.log(this.messageConvoId);

      function init() {
        dashboardAPI.message(self.messageConvoId, self.messageId).success(function(response) {
            return self.message = response;
        });
      }
      init();

      this.backToMessages = function(id) {
        dashboardAPI.allMessages(id).success(function(response) {
          console.log(response);
          $state.go('messages', {
            messagesParam: {
              messages: response
            },
              conversationId: id
            },
            {
              reload: true
            });
        });
      }

      this.replyMessage = function(body, subject) {
        var replyObject = {};
        replyObject['id'] = self.message.sender_id;
        replyObject['conversation_id'] = self.message.conversation_id;
        replyObject['subject'] = subject;
        replyObject['body'] = body;

        console.log(replyObject);
        dashboardAPI.reply(replyObject);
      }
    }]);
