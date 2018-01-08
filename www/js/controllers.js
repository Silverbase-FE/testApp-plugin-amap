angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $interval, $ionicLoading, CommonGetAddressFromGPS) {
    var _interval;

    $scope.$on("$ionicView.beforeEnter", function () {
      $scope.time = new Date().valueOf();
      _interval = $interval(function () {
        $scope.time = $scope.time + 1000;
      }, 1000);
    });

    $scope.$on("$ionicView.leave", function () {
      $interval.cancel(_interval);
    });

    $scope.reLocation = function () {
      $scope.getPosition();
    };

    // get address from GPS for checkon
    $scope.getPosition = function () {
      if (window.cordova) {
        $ionicLoading.show();
        CommonGetAddressFromGPS.getAddress().then(function (resp) {
          if (resp.status == 200) {
            var addressStr = resp.data.address;
            var longitude = resp.data.lng,
            latitude = resp.data.lat;
            $ionicLoading.hide();
            var scale = new AMap.Scale({
                visible: true
              }),
              toolBar = new AMap.ToolBar({
                visible: true
              }),
              map = new AMap.Map('container', {
                resizeEnable: true,
                zoom: 16,
                center: [longitude, latitude]
              }),
              marker = new AMap.Marker({
                icon: "img/location.png",
                offset: new AMap.Pixel(-24, -24),
                position: map.center,
                zIndex: 101
              });
            marker.setMap(map);
            map.addControl(scale);
            map.addControl(toolBar);

          } else {
            $ionicLoading.show({
              template: resp.msg,
              duration: 1500
            });
          }
        });

      } else {
        $ionicLoading.show({
          template: "请在APP中打开该页面",
          duration: 1500
        });
      }

    };
    $scope.getPosition();
  })

  .controller('ChatsCtrl', function ($scope, CommonGetAddressFromGPS) {

    $scope.getAddress = function () {
      CommonGetAddressFromGPS.getAddress().then(
          function (resp) {
              if (resp.status == 200) {
                  $scope.address = resp.data.address;
              } else {
                  $ionicLoading.show({
                      template: resp.msg,
                      duration: 1500
                  });
              }
          }
      );
  };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
