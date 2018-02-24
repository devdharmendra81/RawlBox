angular.module("rawlApp")
    .constant('ApiConstant', {
        URL: {
            api: 'http://localhost:3001/api'
        },
        API_URL: {
            login: '/user/signin',
            signUp: '/user/signup',
            logout: '/user/logout',    
            me: '/user/me',    
            uploadFile: '/upload/uploadFile',
            getUploadFile: '/upload/getUploadedFileByUser'
        }
    });