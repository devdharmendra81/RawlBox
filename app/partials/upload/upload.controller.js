angular.module('rawlApp')
    .controller('UploadController', UploadController);

UploadController.$inject = ['$scope','$state', 'UploadService', '$rootScope', 'AppService'];

function UploadController($scope, $state, UploadService, $rootScope, AppService) {
   //variable
   $scope.uploadingFile = [];
   $scope.userUplaodedFiles = [];
   //method
   $scope.changeUplaodFile = changeUplaodFile;
   $scope.uploadFile = uploadFile;
   $scope.getUploadedFile = getUploadedFile;

   function changeUplaodFile(files){
     	if (files != null) {
          $scope.$apply(function () {
              for (var i = 0; i < files.length; i++) {
                  if(files[i].size > 1000000){
                    alert('This file cannot be uploaded as file size must be less than 1MB');
                  } else {
                    $scope.uploadingFile.push(files[i]);  
                  }
              }
          });
      }
   }

   function uploadFile() {
       var formData = new FormData();
       for (var i = 0; i < $scope.uploadingFile.length; i++) {
           formData.append("attachment", $scope.uploadingFile[i]);
       }
       formData.append("username", AppService.getUsername());
       $rootScope.loadingImage = true;
       UploadService.uploadFile(formData).then(function (response) {
           if (response.status === 201) {
               $rootScope.loadingImage = false;
               $scope.uploadingFile = [];  
               angular.element("#dxfFileUpload1").val(null);
               $scope.getUploadedFile();
           } else {
               $rootScope.loadingImage = false;
               alert('Oops something went wrong while uploading the file!')
           }
       });
   }

   function getUploadedFile(){
      $rootScope.loadingImage = true; 
      var username = AppService.getUsername();
      UploadService.getUploadedFile(username).then(function (response) {
         if (response.status === 200 || response.status === 204) {
             $scope.userUplaodedFiles = response.data;
             $rootScope.loadingImage = false;
         } else {
             $rootScope.loadingImage = false;
             alert('Oops something went wrong while retrieving uploaded file!');
         }
     });
   }

  //load the uploaded file from this user
   $scope.getUploadedFile();
}