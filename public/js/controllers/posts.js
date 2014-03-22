'use strict';

angular.module('mean.posts').controller('PostsController', ['$scope', '$stateParams', '$location', 'Global', 'Posts', function ($scope, $stateParams, $location, Global, Posts) {
    $scope.global = Global;

    $scope.create = function() {
        var post = new Posts({
            content:      this.content,
            attachments:  this.attachments,
            category_ids: this.category_ids,
            tag_ids:      this.tag_ids
        });
        post.$save(function(response) {
            $location.path('posts/' + response._id);
        });

        this.content = '';
        this.attachments = '';
        this.category_ids = '';
        this.tag_ids = '';
    };

    $scope.remove = function(post) {
        if (post) {
            post.$remove();

            for (var i in $scope.posts) {
                if ($scope.posts[i] === post) {
                    $scope.posts.splice(i, 1);
                }
            }
        }
        else {
            $scope.post.$remove();
            $location.path('posts');
        }
    };

    $scope.update = function() {
        var post = $scope.post;
        if (!post.updated) {
            post.updated = [];
        }
        post.updated.push(new Date().getTime());

        post.$update(function() {
            $location.path('posts/' + post._id);
        });
    };

    $scope.find = function() {
        Posts.query(function(posts) {
            $scope.posts = posts;
        });
    };

    $scope.findOne = function() {
        Posts.get({
            postId: $stateParams.postId
        }, function(post) {
            $scope.post = post;
        });
    };
}]);