angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory("CommonServices", function($http, $q, $ionicLoading) {
  return {
    getResponsePromise: getResponsePromise,
  };

  function getResponsePromise(interface_name, request) {
    var deferred = q.defer();
    var link_url = "http://salehelper.pinhui001.cn";
    http({
            method: "post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            url: link_url + interface_name, //'/base/site/area-list',  //'/api/login',
            data: request_data_body,
            timeout: 15000
        }).success(function(response, status, headers, config) {
            deferred.resolve(response);
        })
        .error(function(msg, code, headers, config) {
            deferred.reject(msg);
            $ionicLoading.hide();
            $ionicLoading.show({
                template: config.err_msg,
                duration: 3000
            });
        });
    return deferred.promise;
}
})

.factory('CommonGetAddressFromGPS', function ($q, CommonServices) {
  return {
      getAddress: getAddress,
  };

  function getAddress() {
    var deferred = $q.defer();
    alert(11);
    alert("window.cordova" + JSON.stringify(window.cordova));
    if (window.cordova) {
      alert(22);
      alert(JSON.stringify(cordova.plugins));
        cordova.plugins.amap4yxt.getCurrentPosition(
            function (resp) {
                var req_data = { lat: resp.latitude, lng: resp.longitude };
                CommonServices.getResponsePromise('/base/site/regeo', req_data).then(
                    function (resp) {
                        deferred.resolve(
                            resp
                        );
                    }
                );
            },
            function (err) {
                deferred.resolve({
                    data: {
                        lat: 0,
                        lng: 0
                    },
                    msg: "GPS获取当前位置失败,请再次点击定位</br>注：此功能必须打开手机定位功能！",
                    status: -1
                });
            });
    }
    return deferred.promise;
}

  
});
