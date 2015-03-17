/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 2/08/2014
 */

angular.module('erealm').factory('client', ['$http', function ($http) {
    return {
        getManagement:function(language) {
            return $http.get('/app/management/'+language);
        },
        getTechnologies: function() {
            return $http.get('/app/technology');
        },
        getFlickrPhotos: function() {
            return $http.get('/app/teamphotos');//http://api.flickr.com/services/feeds/groups_pool.gne?id=2678732@N20&lang=en-us&format=json&jsoncallback=JSON_CALLBACK');
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
        },
        getPosts: function(language) {
            return $http.get('/app/posts/' + language);
        },
        checkPosts: function(language) {
            return $http.get('/back/postscheck/' + language);
        },

        //admin
        login: function(user) {
            return $http.post('/app/admin/login', user);
        },
        getUsers: function() {
            return $http.get('/app/admin/users');
        },
        signup: function(user) {
            return $http.post('/app/admin/createuser', user);
        },
        changePassword: function(passwords){
            return $http.post('/app/admin/changepassword', passwords);
        },
        getLogList: function(){
            return $http.get('/app/admin/loglist');
        },
        getLogText: function(fileName){
            return $http.post('/app/admin/logtext',{log: fileName});
        },
        getDBList: function() {
            return $http.get('/app/admin/dblist');
        },
        restoreDB: function(file) {
            return $http.post('/app/admin/restoredb', {db: file.split('.')[0]});
        },
        backupDB: function() {
            return $http.get('/app/admin/backupdb');
        },
        buildProject: function() {
            return $http.post('/app/admin/buildProject');
        },
        getMessageList: function() {
            return $http.get('/app/admin/messages');
        }
    };
}]);