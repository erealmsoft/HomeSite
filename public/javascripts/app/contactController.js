/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 3/08/2014
 */

angular.module('erealm').controller('ContactController', ['$scope','client','$translate',function($scope, client,$translate) {

    'use strict';

    angular.extend($scope,{subTitle: "CONTACT", mainTitle: "Say Hello", currentPage: "contact-page"});

    //var google = window.google;

    $scope.loadData = function(language) {
        if (!language){
            language = $translate.uses();
        }

        client.getContactsInfo(language).then(function(response){
            var contact = response.data;
            $scope.contacts = contact;
            $scope.changeMap(response.data[0]);
        });
    };
    $scope.loadData();

    $scope.changeMap = function(contactInfo) {

        $scope.activeMap = contactInfo.name;

        var latLng = contactInfo.map.latLng;
        var location = contactInfo.map.point;
        var map = new BMap.Map("google_map");
        var point = new BMap.Point(latLng[1],latLng[0]);
        var center = new BMap.Point(location[1],location[0]);
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
        map.disable3DBuilding();
        map.setMapStyle({style:'grassgreen'});
        map.centerAndZoom(point, 15);


        var locationIcon = new BMap.Icon('/images/icon_marker.png', new BMap.Size(300,157));
        var marker = new BMap.Marker(center);
        map.addOverlay(marker);
        var opts = {
            width : 200,
            height: 100,
            title : "eRealm Info & Tech",
            enableMessage:false
        };

        var address = contactInfo.info.address + ' ' + contactInfo.info.region + ' ' + contactInfo.info.county;

        var infoWindow = new BMap.InfoWindow(address, opts);
        marker.addEventListener("click", function(){
            map.openInfoWindow(infoWindow, center);
        });
    };

    /*
    $scope.changeMap = function(contactInfo) {
        $scope.activeMap = contactInfo.name;

        var latLng = contactInfo.map.latLng;
        var point = contactInfo.map.point;
        var latlng = new google.maps.LatLng(latLng[0],latLng[1]);
        var settings = {
            zoom: 15,
            center: latlng,
            scrollwheel: false,
            scaleControl: false,
            streetViewControl: false,
            draggable: true,
            mapTypeControl: true,
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
            navigationControl: true,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("google_map"), settings);
        var pointInfo = new google.maps.LatLng(point[0],point[1]);

        var image = new google.maps.MarkerImage(
            '/images/icon_marker.png',
            new google.maps.Size(42,62),
            new google.maps.Point(0,0),
            new google.maps.Point(21,62)
        );

        var shadow = new google.maps.MarkerImage(
            '/images/icon_marker_shadow.png',
            new google.maps.Size(76,62),
            new google.maps.Point(0,0),
            new google.maps.Point(21,62)
        );



        var shape = {
            coord: [27,0,29,1,31,2,33,3,34,4,35,5,36,6,37,7,38,8,38,9,39,10,39,11,40,12,40,13,40,14,41,15,41,16,41,17,41,18,41,19,41,20,41,21,41,22,41,23,41,24,41,25,41,26,40,27,40,28,40,29,40,30,39,31,39,32,39,33,38,34,38,35,37,36,37,37,37,38,36,39,36,40,35,41,35,42,34,43,34,44,33,45,33,46,32,47,31,48,31,49,30,50,30,51,29,52,28,53,28,54,27,55,26,56,26,57,25,58,24,59,23,60,22,61,20,61,18,60,17,59,17,58,16,57,15,56,14,55,14,54,13,53,12,52,12,51,11,50,11,49,10,48,9,47,9,46,8,45,8,44,7,43,7,42,6,41,6,40,5,39,5,38,4,37,4,36,4,35,3,34,3,33,2,32,2,31,2,30,2,29,1,28,1,27,1,26,1,25,1,24,0,23,0,22,0,21,0,20,0,19,0,18,0,17,1,16,1,15,1,14,1,13,2,12,2,11,3,10,3,9,4,8,5,7,6,6,7,5,8,4,9,3,10,2,12,1,15,0,27,0],
            type: 'poly'
        };

        new google.maps.Marker({
            draggable: true,
            raiseOnDrag: false,
            icon: image,
            shadow: shadow,
            shape: shape,
            map: map,
            position: pointInfo,
            title: "eRealm Info & Tech"
        });


        var red_road_styles = [
            {
                featureType: "all",
                stylers: [
                    { saturation: -100 }
                ]
            },
            {
                featureType: "road.highway",
                stylers: [
                    { hue: "#39a9a4" },
                    { saturation: 100 }
                ]
            }
        ];

        map.setOptions({styles: red_road_styles});
    };
    */

    $scope.sendMessage = function() {
        if(!$scope.contact_form.$invalid){
            $scope.loading = true;
            client.submitMessage($scope.name, $scope.email, $scope.message).then(function(){
            });
        }
    };

    $scope.reloading = function(){
        $scope.loading = false;
        $scope.contact_form.$setPristine();
    };
}]);