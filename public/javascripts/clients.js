/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 2/08/2014
 */

angular.module('erealm').factory('client', ['$http', function ($http) {
    return {
        getManagement:function() {
            return $http.get('/data/management.json');
        },
        getTechnologies: function() {
            return $http.get('/data/technology.json');
        },
        getFlickrPhotos: function() {
            return $http.jsonp('http://api.flickr.com/services/feeds/groups_pool.gne?id=2678732@N20&lang=en-us&format=json&jsoncallback=JSON_CALLBACK');
        },
        submitMessage: function(name, email, message) {
            return $http.post('/app/message', {name: name, email:email, message: message});
        },
        submitProjectplan: function(name, email,company,message,type,telephone,budget) {
            return $http.post('/app/projectplan', {name: name, email:email, message: message,company:company,type:type,telephone:telephone,budget:budget});
        },
        getEmployeeInfo:function(language){
            return $http.get('/app/personnel/'+language);
        },
        getPartnersInfo:function(language){
            return $http.get('/app/partners/'+language);
        },
        getProjectsInfo:function(language,projects){
            return $http.get('/app/projects/' + language + '/' + projects);
        },
        getProjectsDetailsInfo:function(hash,language){
            return $http.get('/app/projectDetails' + '/' + hash + '/' + language);
        },
        getContactsInfo:function(language){
            return $http.get('/app/contact/'+language);
        }
    };
}]);
/**
 * Created by root on 26.09.2014.
 */
