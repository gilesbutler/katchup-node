'use strict';

//Articles service used for organisations REST endpoint
angular.module('mean.organisations').factory('Organisations', ['$resource', function($resource) {
    return $resource('organisations/:organisationId', {
        organisationId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);