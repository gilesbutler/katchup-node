'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Posts',
        'link': 'posts'
    }, {
        'title': 'Create New Post',
        'link': 'posts/create'
    }, {
        'title': 'Organisations',
        'link': 'organisations'
    }, {
        'title': 'Create New Organisation',
        'link': 'organisations/create'
    }];

    $scope.isCollapsed = false;
}]);