angular.module('rawlApp')
    .controller('AuthController', AuthController);

AuthController.$inject = ['$scope', '$rootScope', 'AuthService', '$state', '$stateParams','AppService'];

function AuthController($scope, $rootScope, AuthService, $state, $stateParams, AppService) {
    //variables
    $scope.user = {
        fullName: null,
        password: null,
        email: null
    };
    $scope.loginErrorMsg = null;
    $scope.signupErrorMsg = null;
    $scope.queryLink = false;

    //methods declaration
    $scope.resetUserModel = resetUserModel;
    $scope.signIn = signIn;
    $scope.signUp = signUp;
    $scope.clickSignInLink = clickSignInLink;
    $scope.clickSignUpLink = clickSignUpLink;
    //set page title
    AppService.setPageTitle('RawlBox | Login');

    //method definition
    function resetUserModel() {
        $scope.user = {
            email: null,
            password: null,
            fullName : null
        };
    }
    //when user logs in
    function signIn() {
        $rootScope.loadingImage = true;
        $scope.loginErrorMsg = null;

        var postData = {
            username: $scope.user.email,
            password: $scope.user.password
        };
        AuthService.loginApi(postData).then(function (response) {
                AppService.setUsername(response.data.username);
                $state.go('home.inner');
            })
            .catch(function (err) {
                $scope.loginErrorMsg = err.data.message;
            })
            .finally(function () {
                $rootScope.loadingImage = false;
            });
    }
    //when user register a new account
    function signUp() {
        if ($scope.user.password !== $scope.confirmPassword) {
            $scope.passwordMismatch = true;
            return;
        }
        $scope.signupErrorMsg = null;
        $scope.passwordMismatch = false;
        $rootScope.loadingImage = true;

        var postData = {
            username: $scope.user.email,
            password: $scope.user.password,
            fullName : $scope.user.fullName
        };
        AuthService.signupApi(postData).then(function (response) {
                $state.go('home.inner');
            })
            .catch(function (err) {
                $scope.signupErrorMsg = err.data.message;
            })
            .finally(function () {
                $rootScope.loadingImage = false;
         });
    }
     //show sign in form
    function clickSignInLink() {
        $scope.resetUserModel();
        $scope.loginErrorMsg = null;
        $scope.signInForm.$setPristine();
        $scope.signInForm.$setUntouched();
    }

    //show register form
    function clickSignUpLink() {
        $scope.resetUserModel();
        $scope.signupErrorMsg = null;
        $scope.confirmPassword = '';
        $scope.passwordMismatch = false;
        $scope.signUpForm.$setPristine();
        $scope.signUpForm.$setUntouched();
    }
}