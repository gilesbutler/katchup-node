'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('all posts', {
        url: '/posts',
        templateUrl: 'views/posts/list.html'
    })
      .state('create post', {
        url: '/posts/create',
        templateUrl: 'views/posts/create.html'
    })
      .state('edit post', {
        url: '/posts/:postId/edit',
        templateUrl: 'views/posts/edit.html'
    })
      .state('post by id', {
        url: '/posts/:postId',
        templateUrl: 'views/posts/view.html'
    })
      .state('all organisations', {
        url: '/organisations',
        templateUrl: 'views/organisations/list.html'
    })
      .state('create organisation', {
        url: '/organisations/create',
        templateUrl: 'views/organisations/create.html'
    })
      .state('edit organisation', {
        url: '/organisations/:organisationId/edit',
        templateUrl: 'views/organisations/edit.html'
    })
      .state('organisation by id', {
        url: '/organisations/:organisationId',
        templateUrl: 'views/organisations/view.html'
    })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
