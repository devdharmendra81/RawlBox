angular.module('rawlApp')
    .controller('HomeInnerController', HomeInnerController);

HomeInnerController.$inject = ['$scope', '$state', 'AppService', 'AuthService', '$rootScope', 'HomeInnerService'];

function HomeInnerController($scope, $state, AppService, AuthService, $rootScope, HomeInnerService) {
   //set page title
   AppService.setPageTitle('RawlBox | Home');
}