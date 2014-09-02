/**
 * Created by root on 8/27/2014.
 */

angular.module('erealm').controller('DBController', ['$scope','$http',function($scope, $http) {

    'use strict';

    var JsonUti = {

        convertToString: function(json, options) {
            var reg = null,
                formatted = '',
                pad = 0,
                PADDING = '    '; // one can also use '\t' or a different number of spaces

            // optional settings
            options = options || {};
            // remove newline where '{' or '[' follows ':'
            options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
            // use a space after a colon
            options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

            // begin formatting...
            if (typeof json !== 'string') {
                // make sure we start with the JSON as a string
                json = JSON.stringify(json);
            } else {
                // is already a string, so parse and re-stringify in order to remove extra whitespace
                json = JSON.parse(json);
                json = JSON.stringify(json);
            }

            // add newline before and after curly braces
            reg = /([\{\}])/g;
            json = json.replace(reg, '\r\n$1\r\n');

            // add newline before and after square brackets
            reg = /([\[\]])/g;
            json = json.replace(reg, '\r\n$1\r\n');

            // add newline after " and comma
            reg = /(\",)/g;
            json = json.replace(reg, '$1\r\n');

            // remove multiple newlines
            reg = /(\r\n\r\n)/g;
            json = json.replace(reg, '\r\n');

            // remove newlines before commas
            reg = /\r\n\,/g;
            json = json.replace(reg, ',');

            // optional formatting...
            if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
                reg = /\:\r\n\{/g;
                json = json.replace(reg, ':{');
                reg = /\:\r\n\[/g;
                json = json.replace(reg, ':[');
            }
            if (options.spaceAfterColon) {
                reg = /\:/g;
                json = json.replace(reg, ': ');
            }

            $.each(json.split('\r\n'), function (index, node) {
                var i = 0,
                    indent = 0,
                    padding = '';

                if (node.match(/\{$/) || node.match(/\[$/)) {
                    indent = 1;
                } else if (node.match(/\}/) || node.match(/\]/)) {
                    if (pad !== 0) {
                        pad -= 1;
                    }
                } else {
                    indent = 0;
                }

                for (i = 0; i < pad; i++) {
                    padding += PADDING;
                }

                formatted += padding + node + '\r\n';
                pad += indent;
            });

            return formatted;
        }
    };

    $http.get('/app/dbCollections').then(function(response){
        var collections = response.data;
        $scope.collections = collections;
    });

    $scope.queryCollection = function() {
        if(!$scope.queryForm.$invalid){
            $scope.loading = true;
            $http.get('/app/dbQuery' + '/' + $scope.collectionName.name).then(function(response){
                $scope.loading = false;
                var collectionContent = response.data;
//                $scope.collectionContent = JSON.stringify(collectionContent);
                $scope.collectionContent = JsonUti.convertToString(collectionContent);    //format the collectionContent
                $scope.message = "qurey successfully";
            }, function(){
                $scope.loading = false;
                $scope.message = "query failure";
            });
        }
    };

    $scope.saveCollection = function() {
        if(!$scope.saveForm.$invalid) {
            $scope.loading = true;
            //Before delivery the params,shall transfer the variable type from String to JSON.
            $http.post('/app/dbSave', {collectionName: $scope.collectionName.name,collectionContent:JSON.parse($scope.collectionContent)}).then(function(){
                $scope.saveMessage = "saved successfully";
            }, function(){
                $scope.loading = false;
                $scope.saveMessage = "saved failure";
            });
        }
    };

}]);
