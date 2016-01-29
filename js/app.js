/*global angular */
var fsCosmeticsApp = angular.module('fsCosmeticsApp', ['ngRoute', 'ngResource', 'ngAnimate', 'angularUtils.directives.dirDisqus', 'wu.masonry'], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

// ROUTES
fsCosmeticsApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/', {
            templateUrl: '/angular/product-template.html',
            controller: 'productList'
        })
        .when('/:category', {
            templateUrl: '/angular/product-template.html',
            controller: 'categoryController'
        })
        .when('/:category/:slug', {
            templateUrl: function (params) {
                return '/products/' + params.category + '/' + params.slug;
            },
            controller: 'productController'
        })
    ;
});

fsCosmeticsApp.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    new Blazy({
                        breakpoints: [{
                            src: 'data-src'
                        }],
                        success: function(element){
                            setTimeout(function(){
                                var parent = element.parentNode;
                                parent.className = parent.className.replace(/\bloading\b/,'');
                            }, 200);
                        }
                    });
                });
            }
        }
    }
});

fsCosmeticsApp.filter('range', function(){
    return function(n) {
        var res = [];
        for (var i = 0; i < n; i++) {
            res.push(i);
        }
        return res;
    };
});

fsCosmeticsApp.animation('.reveal-animation', function() {
    return {
        enter: function(element, done) {
            element.css('display', 'none');
            element.fadeIn(500, done);
            return function() {
                element.stop();
            }
        },
        leave: function(element, done) {
            element.fadeOut(500, done);
            return function() {
                element.stop();
            }
        }
    }
});

fsCosmeticsApp.factory('myService', function ($http) {
    return {
        getProducts: function () {
            return $http.get('/api/products.json')
                .then(function (result) {
                    //resolve the promise as the data
                    return result.data;
                });
        },
        getCategoryProducts: function (category) {
            console.log(category);
            return $http.get('/api/categories/' + category + '.json')
                .then(function (result) {
                    //resolve the promise as the data
                    return result.data;
                });
        }
    }
});

fsCosmeticsApp.controller('productList', ['$scope', 'myService', function ($scope, myService) {
    $scope.loading = true;
    myService.getProducts().then(function(products) {
        $scope.data = products;
        $scope.loading = false;
    });
}]);

fsCosmeticsApp.controller('categoryController', ['$scope', '$routeParams', 'myService', function ($scope, $routeParams, myService) {
    $scope.loading = true;
    myService.getCategoryProducts($routeParams.category.toLowerCase()).then(function(products) {
        $scope.data = products;
        $scope.loading = false
    });

}]);

fsCosmeticsApp.controller('productController', ['$scope', '$location', '$routeParams', 'myService', '$animate', '$filter', function ($scope, $location, $routeParams, myService, $animate, $filter) {
    $scope.url = $location.path();
    var colorOptions = $(".swatches .swatch");
    colorOptions.on('click mouseenter', function(){
        colorOptions.each(function(){
            $(this).removeClass('selected');
        });
        $(this).addClass('selected');
    });

    var shuffleArray = function(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    };

    myService.getCategoryProducts($routeParams.category.toLowerCase()).then(function(products) {
        var slug = $routeParams.slug.replace(".html", "");
        $scope.relatedProducts = shuffleArray($filter('filter')(products, {slug: "!"+slug}, true));
        if($scope.relatedProducts.length === 0){
            new Blazy({
                breakpoints: [{
                    src: 'data-src'
                }],
                success: function(element){
                    setTimeout(function(){
                        var parent = element.parentNode;
                        parent.className = parent.className.replace(/\bloading\b/,'');
                    }, 200);
                }
            })
        }
    });

    $animate.enabled(false);
    $('[data-toggle="tooltip"]').tooltip();
}]);
