angular.module('rawlApp')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: './partials/auth/auth-template.html',
                pagename : 'Login',
                controller: 'AuthController',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                './partials/auth/auth.style.css',
                                './partials/auth/auth.controller.js'
                            ]
                        });
                    }]
                }
            })
            .state('home', {
                abstract: true,
                url: '',
                pagename : 'home',
                templateUrl: './partials/home/home-template.html',
                controller: 'HomeController',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                './partials/home/home.controller.js',
                                './partials/home/home.style.css'
                            ]
                        });
                    }]
                }
            })
            .state('home.inner', {
                url: '/home',
                templateUrl: './partials/home/home-inner.html',
                controller: 'HomeInnerController',
                pagename : 'home',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                './partials/home/home-inner.service.js',
                                './partials/home/home-inner.controller.js'
                            ]
                        });
                    }]
                }
            })
            .state('home.upload', {
                url: '/upload',
                templateUrl: './partials/upload/upload-template.html',
                controller: 'UploadController',
                pagename : 'upload',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            insertBefore: '#ng_load_plugins_before',
                            files: [
                                './partials/upload/upload.service.js',
                                './partials/upload/upload.controller.js',
                                './partials/upload/upload.style.css'
                            ]
                        });
                    }]
                }
            })
        $locationProvider.html5Mode(true);
    })
    .run(['$rootScope', '$state', '$transitions', 'AuthService', 'AppService',
        function ($rootScope, $state, $transitions, AuthService, AppService) {
            //get user details from server on page load
            //get user details from server on page load
            $transitions.onStart({}, function ($transition$) {
                $rootScope.loadingImage = true;
                AuthService.getUserDetail().then(function (res) {
                    $rootScope.loadingImage = false;
                    var toState = $transition$.$to().name;
                    AppService.setUsername(res.data.username);
                    AppService.setName(res.data.name);
                    //prevent login view once the user is logged in
                    if (toState === 'login' && angular.isDefined(res.data.username)) {
                        $transition$.router.stateService.transitionTo('home.inner');
                        return false;
                    }
                    //user is logged in
                    if (angular.isDefined(res.data.username)) {
                        //todo
                    }
                    else {
                        $transition$.router.stateService.transitionTo('login');
                        return false;
                    }
                })
            });
        }]);
