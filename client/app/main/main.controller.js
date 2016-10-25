'use strict';

angular.module('medicationReminderApp').factory('medService', function($http) {
  return {
    get: function(start, end) {
      return $http({
        method: 'GET',
        url: '/api/medications?start=' + start + '&end=' + end,
      });
    }
  };
});

angular.module('medicationReminderApp').controller('MainCtrl', function ($rootScope,$scope, $http, $window,medService, ngAudio) {

    //check if this data before current time
    $scope.checkDate = function(date) {
        var date = moment(date);
        var currentDate = moment();

        if(date < currentDate) {
            return false;
        }
        return true;
    };

    //chech if current time is 5min before a time
    $scope.checkTime = function(time){
        var end_time = moment(time);
        var start_time = moment(time).add(-5, 'minutes');
        var currentTime = moment();
        if(currentTime.isBetween(start_time, end_time, 'seconds')){
            return true;
        }
        return false;
    };
    
    $scope.getMedications = function(start,end){
        medService.get(start, end).success(function(meds){
            // console.log(meds)
            $rootScope.meds = meds;
        });
    }
    
    var start = moment().format('MM/DD/YYYY');
    var end = moment().add(1, 'day').format('MM/DD/YYYY');
    $scope.getMedications(start, end);
        
    //update compelte time and status
    $scope.update_complete = function(id){
        $rootScope.audio.stop();
        $http({
            method:"PUT",
            url:"/api/medications/"+id,
            data:{
                completed: true,
                d:{
                    m:new Date(),
                    f:new Date(),
                }
            }
        }).then(function(meds){
            console.log("updated data:",meds.data);
            var dayStart = moment($rootScope.dt).format('MM/DD/YYYY');
            var dayEnd = moment($rootScope.dt).add(1, 'day').format('MM/DD/YYYY');
            $scope.getMedications(dayStart,dayEnd);
        })
    }

    $window.setInterval(function () {
        $scope.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        $scope.$apply();
    }, 1000);

});

angular.module("medicationReminderApp").directive("calendar", function(){
    return {
        templateUrl: '../components/calendar/calendar.html',
    };
});

angular.module("medicationReminderApp").directive("missed", function(){
    return {
        templateUrl: "../components/medication_panel/missed_panel.html",
    }
});

angular.module("medicationReminderApp").directive("listPanel", function(){
    return {
        templateUrl: "../components/medication_panel/list_panel.html",
    }
});

angular.module("medicationReminderApp").controller("playsounds", function($rootScope,ngAudio,$timeout){
    $rootScope.audio = ngAudio.load('../assets/sounds/MusicCensor.wav');
    $rootScope.audio.play();
    $rootScope.audio.volume = 0.3;
    $rootScope.audio.playbackRate = 0.3;
    $rootScope.audio.loop = true;

    $timeout(function(){
        $rootScope.audio.volume = 1;
        $rootScope.audio.playbackRate = 1.5;
    }, 5*1000*60);
})

