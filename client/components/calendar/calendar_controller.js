angular.module('medicationReminderApp')
  .controller('DatepickerDemoCtrl', function($rootScope, $scope, medService) {

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.changedate = function(){
      $rootScope.dt = $scope.dt;
      var dayStart = moment($rootScope.dt).format('MM/DD/YYYY');
      var dayEnd = moment($rootScope.dt).add(1, 'day').format('MM/DD/YYYY');
      medService.get(dayStart, dayEnd).success(function(meds){
        console.log(meds)
        $rootScope.meds = meds;
      });
    }
});