angular.module('rawlApp')
    .factory('HomeInnerService', HomeInnerService);

HomeInnerService.$inject = ['$http', 'ApiConstant'];

function HomeInnerService($http, ApiConstant) {
    var homeInnerService = {};
    return homeInnerService;
}