/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 9/08/2014
 */
angular.module('erealm').controller('WorkDetailsController', ['$scope','client','$translate','$timeout', function($scope, client, $translate, $timeout) {

    'use strict';

    angular.extend($scope, {subTitle: "WORK", mainTitle: "what we did", currentPage: "work-page"});
    var hash = location.hash.substring(1);  //remove the '#' from the ID

    $scope.loadData = function(language){
        if (!language){
            language = $translate.uses();
        }

        client.getProjectsDetailsInfo(hash,language).then(function(response){
            var projectDetails = response.data;
            $scope.projectDetails = projectDetails;

            $timeout(rangeImages, 0);
        });
    };
    $scope.loadData();

    var rangeImages = function() {

        window.imagesLoaded('#project_details', function() {
            // Prepare layout options.
            var options = {
                itemWidth: 400, // Optional min width of a grid item
                autoResize: true, // This will auto-update the layout when the browser window is resized.
                container: $('#project_details'), // Optional, used for some extra CSS styling
                offset: 25, // Optional, the distance between grid items
                outerOffset: 20, // Optional the distance from grid to parent
                flexibleWidth: '50%' // Optional, the maximum width of a grid item
            };

            // Get a reference to your grid items.
            var handler = $('#project_details li');

            var $window = $(window);
            $window.resize(function() {
                var windowWidth = $window.width(),
                    newOptions = { flexibleWidth: '50%' };

                // Breakpoint
                if (windowWidth < 1024) {
                    newOptions.flexibleWidth = '100%';
                }

                handler.wookmark(newOptions);
            });

            // Call the layout function.
            handler.wookmark(options);
        });
    };
}]);
