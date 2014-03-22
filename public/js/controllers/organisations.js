'use strict';

angular.module('mean.organisations').controller('OrganisationsController', ['$scope', '$stateParams', '$location', 'Global', 'Organisations', function ($scope, $stateParams, $location, Global, Organisations) {
    $scope.global = Global;

    $scope.create = function() {

        var organisation = new Organisations({
            name:             this.name,
            url:              this.url,
            sector:           this.sector,
            logo_url:         this.logo_url,
            twitter_username: this.twitter_username,
            facebook_url:     this.facebook_url
        });
        organisation.$save(function(response) {
            $location.path('organisations/' + response._id);
        });

        this.name = '';
        this.url = '';
        this.sector = '';
        this.logo_url = '';
        this.twitter_username = '';
        this.facebook_url = '';
    };

    $scope.remove = function(organisation) {
        if (organisation) {
            organisation.$remove();

            for (var i in $scope.organisations) {
                if ($scope.organisations[i] === organisation) {
                    $scope.organisations.splice(i, 1);
                }
            }
        }
        else {
            $scope.organisation.$remove();
            $location.path('organisations');
        }
    };

    $scope.update = function() {
        var organisation = $scope.organisation;
        if (!organisation.updated) {
            organisation.updated = [];
        }
        organisation.updated.push(new Date().getTime());

        organisation.$update(function() {
            $location.path('organisations/' + organisation._id);
        });
    };

    $scope.find = function() {
        Organisations.query(function(organisations) {
            $scope.organisations = organisations;
        });
    };

    $scope.findOne = function() {
        Organisations.get({
            organisationId: $stateParams.organisationId
        }, function(organisation) {
            $scope.organisation = organisation;
        });
    };
}]);