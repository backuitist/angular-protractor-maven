angular.module("itemApp")
    .constant("itemUrl", "/api/items")
    .controller("itemService", itemService);

itemService.$inject = ['$http', '$log', 'itemUrl'];
function itemService($http, $log, itemUrl) {

    var service = {
        loadItems: loadItems,
        items: []
    };

    loadItems();
    return service;

    function loadItems() {
        return $http.get(itemUrl).then(function (response) {
            service.items = response.data;
            return service.items;
        });
    }
}