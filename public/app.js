var serverAngularModule = angular.module("serverAngularModule",[]);

serverAngularModule.controller("serverAngularController", function($http){
    var app = this;
    var url = "http://localhost:3000";

    app.saveServer = function(newServer){
        $http.post(url + "/add", {Server_id:newServer}).success(function(){
            loadServers();
        })
    }
    function loadServers() {
        $http.get(url).success(function (server) {
            app.server = server;
        })
    }

    loadServers();
})