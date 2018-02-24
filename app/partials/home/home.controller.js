angular.module('rawlApp')
    .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', 'AppService','$state', 'AuthService', '$timeout'];

function HomeController($scope, AppService, $state, AuthService, $timeout) {
   
   //methods
   $scope.init = init;
   $scope.clickHomeMenu = clickHomeMenu;
   $scope.clickUploadMenu = clickUploadMenu;
   $scope.clickOrderMenu = clickOrderMenu;
   $scope.logOut = logOut;

   function clickHomeMenu(menuName){
    $scope.isActive = 'home';
     $timeout(function(){
       $state.go('home.inner');
     });
   }

   function clickUploadMenu(menuName){
      $timeout(function(){
        $state.go('home.upload');
      });
      $scope.isActive = 'upload';
   }

   function clickOrderMenu(menuName){
      $scope.isActive = 'order';
   }

   function init(){
     	$scope.isActive = $state.current.pagename;
   }

   function logOut() {
      AuthService.logout().then(function (response) {
          $('body').css('background', '#676262');
          $state.go('login');
      });
    }

   $scope.init();
   $('body').css('background', '#fff');
}