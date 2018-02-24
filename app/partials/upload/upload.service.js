angular.module('rawlApp')
    .factory('UploadService', UploadService);

UploadService.$inject = ['$http', 'ApiConstant'];

function UploadService($http, ApiConstant) {
    var uploadService = {};
    uploadService.uploadFile = uploadFile;
    uploadService.getUploadedFile = getUploadedFile;

    function uploadFile(postData) {
        return $http({
            method  : 'POST',
            url 	: ApiConstant.URL.api + ApiConstant.API_URL.uploadFile,
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined},
            data   : postData
        })
    }

    // api for user details
    function getUploadedFile(username) {
        return $http({
            method: 'GET',
            url: ApiConstant.URL.api + ApiConstant.API_URL.getUploadFile + '?username=' + username
        });
    }

    return uploadService;
}