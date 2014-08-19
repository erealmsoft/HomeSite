/**
 * Copyright 2014 eRealm Sdn.Bhd.
 *
 * Created by dang on 2/08/2014
 */

angular.module('erealm').factory('client', ['$http', function ($http) {
    return {
        getWorks: function() {
            return $http.get('/data/works.json');
        },
        getContacts: function() {
          return $http.get('/data/contact.json');
        },
        getFlickrPhotos: function() {
            return $http.jsonp('http://api.flickr.com/services/feeds/groups_pool.gne?id=2678732@N20&lang=en-us&format=json&jsoncallback=JSON_CALLBACK');
        },
        submitMessage: function(name, email, message) {
            return $http.post('/app/message', {name: name, email:email, message: message});
        },

        getStaff:function(){
            return $http.get('/app/personnel');
        }
    }
}]);
