angular.module('rawlApp')
    .service('AppService', AppService);

AppService.$inject = ['$rootScope'];

function AppService($rootScope) {
    this.appData = {};

    this.setPageTitle = function (title) {
        this.appData.pageTitle = title;
        $rootScope.$broadcast('title:updated', this.appData);
    };
    this.getPageTitle = function () {
        return this.appData.pageTitle;
    };

    this.setName = function (name) {
        this.appData.name = name;
    };
    this.getName = function () {
        return this.appData.name;
    };

    this.setUsername = function (username) {
        this.appData.username = username;
    };
    this.getUsername = function () {
        return this.appData.username;
    };
}