var app = angular.module('app', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $stateProvider.state('albums', {
      url: '/albums',
      templateUrl: '/albums.html',
      controller: 'AlbumsCtrl'
    }).state('photos', {
      url: '/photos/{id}',
      templateUrl: '/photos.html',
      controller: 'PhotosCtrl'
    });
    $urlRouterProvider.otherwise('albums');
  }
]);
app.factory('albums', [function(){
  var o = {
    albums: []
  };
  return o;
}]);

app.directive("menuList", function(){
  return function(scope, element, attrs){
    //get data from list "menu items"
    var data = scope[attrs["menuList"]];
    if(!angular.isArray(data)){
      console.log("something went wrong. No data here.")
      return;
    }
    var arrayItem = attrs["arrayItem"];
    //create div for menu
    var menu = angular.element("<div id='navigation'>");
    element.append(menu);
    //create ul for list "menu"
    var listElem = angular.element("<ul>");
    menu.append(listElem);
    //add menu items to list
    for (var i=0; i<data.length; i++){
      var name = data[i].name;
      var link = scope.homeDir + data[i].link;
      //create li for menu item
      var item = angular.element("<li id='"+name+"'>");
      //add link to menu item
      var a = "<a href='"+link+"'>";
      if (scope.currentPage == data[i].link){a = "<a class='currentPage' href='"+link+"'>";}
      item.append(angular.element(a).text(name));
      listElem.append(item);
    }
  }
});
app.controller('MenuCtrl', function($scope, $location){
  //get current directory & page
  var currentURL = $location.absUrl();
  var index = currentURL.indexOf("VanDaeleFotografie");
  $scope.homeDir = currentURL.substring(0, index+19);
  $scope.currentPage = currentURL.substring(index+19, currentURL.indexOf(".html")+5);
  //menu items declareren
  $scope.menuItems = [
    {name: "Home", link: "index.html"},
    {name: "Albums", link: "html/albums.html"},
    {name: "Links", link: "html/links.html"},
    {name: "Contact", link: "html/contact.html"}
  ];
});

app.controller('AlbumsCtrl', function($scope, albums){
  $scope.albums = albums.albums;
  //albums declareren
  $scope.albums = [
    {name: "katten", thumb: "kat0.jpg", photos : [
      {name: "kitten", link:"kat0.jpg"},
      {name: "rosse kat", link:"kat1.jpg"},
      {name: "grijs kitten", link:"kat2.jpg"},
      {name: "spelend kitten", link:"kat3.jpg"},
      {name: "spelende kat", link:"kat4.jpg"},
      {name: "wassende kat", link:"kat5.jpg"},
      {name: "katten broeders", link:"kat6.jpg"},
      {name: "grijze kat", link:"kat7.jpg"},
      {name: "slapende kat", link:"kat8.jpg"},
    ], upvotes: 5, comments : [
      {author: "Me", body: "Mooie katten", upvotes: 1},
      {author: "NotMe", body: "heel Mooie katten", upvotes: 2},
      {author: "SomeoneElse", body: "schattig!", upvotes: 0}
    ]},
    {name: "katten2", thumb: "kat1.jpg", photos : [
      {name: "kitten", link:"kat0.jpg"},
      {name: "rosse kat", link:"kat1.jpg"},
      {name: "grijs kitten", link:"kat2.jpg"},
      {name: "spelend kitten", link:"kat3.jpg"},
      {name: "spelende kat", link:"kat4.jpg"},
      {name: "wassende kat", link:"kat5.jpg"},
      {name: "katten broeders", link:"kat6.jpg"},
      {name: "grijze kat", link:"kat7.jpg"},
      {name: "slapende kat", link:"kat8.jpg"},
    ], upvotes: 6, comments : [
      {author: "Me", body: "Mooie katten", upvotes: 1},
      {author: "NotMe", body: "heel Mooie katten", upvotes: 2},
      {author: "SomeoneElse", body: "schattig!", upvotes: 0}
    ]},
    {name: "katten3", thumb: "kat2.jpg", photos : [
      {name: "kitten", link:"kat0.jpg"},
      {name: "rosse kat", link:"kat1.jpg"},
      {name: "grijs kitten", link:"kat2.jpg"},
      {name: "spelend kitten", link:"kat3.jpg"},
      {name: "spelende kat", link:"kat4.jpg"},
      {name: "wassende kat", link:"kat5.jpg"},
      {name: "katten broeders", link:"kat6.jpg"},
      {name: "grijze kat", link:"kat7.jpg"},
      {name: "slapende kat", link:"kat8.jpg"},
    ], upvotes: 3, comments : [
      {author: "Me", body: "Mooie katten", upvotes: 1},
      {author: "NotMe", body: "heel Mooie katten", upvotes: 2},
      {author: "SomeoneElse", body: "schattig!", upvotes: 0}
    ]},
    {name: "katten4", thumb: "kat3.jpg", photos : [
      {name: "kitten", link:"kat0.jpg"},
      {name: "rosse kat", link:"kat1.jpg"},
      {name: "grijs kitten", link:"kat2.jpg"},
      {name: "spelend kitten", link:"kat3.jpg"},
      {name: "spelende kat", link:"kat4.jpg"},
      {name: "wassende kat", link:"kat5.jpg"},
      {name: "katten broeders", link:"kat6.jpg"},
      {name: "grijze kat", link:"kat7.jpg"},
      {name: "slapende kat", link:"kat8.jpg"},
    ], upvotes: 9, comments : [
      {author: "Me", body: "Mooie katten", upvotes: 1},
      {author: "NotMe", body: "heel Mooie katten", upvotes: 2},
      {author: "SomeoneElse", body: "schattig!", upvotes: 0}
    ]},
    {name: "katten5", thumb: "kat4.jpg", photos : [
      {name: "kitten", link:"kat0.jpg"},
      {name: "rosse kat", link:"kat1.jpg"},
      {name: "grijs kitten", link:"kat2.jpg"},
      {name: "spelend kitten", link:"kat3.jpg"},
      {name: "spelende kat", link:"kat4.jpg"},
      {name: "wassende kat", link:"kat5.jpg"},
      {name: "katten broeders", link:"kat6.jpg"},
      {name: "grijze kat", link:"kat7.jpg"},
      {name: "slapende kat", link:"kat8.jpg"},
    ], upvotes: 0, comments : [
      {author: "Me", body: "Mooie katten", upvotes: 1},
      {author: "NotMe", body: "heel Mooie katten", upvotes: 2},
      {author: "SomeoneElse", body: "schattig!", upvotes: 0}
    ]},
    {name: "katten6", thumb: "kat5.jpg", photos : [
      {name: "kitten", link:"kat0.jpg"},
      {name: "rosse kat", link:"kat1.jpg"},
      {name: "grijs kitten", link:"kat2.jpg"},
      {name: "spelend kitten", link:"kat3.jpg"},
      {name: "spelende kat", link:"kat4.jpg"},
      {name: "wassende kat", link:"kat5.jpg"},
      {name: "katten broeders", link:"kat6.jpg"},
      {name: "grijze kat", link:"kat7.jpg"},
      {name: "slapende kat", link:"kat8.jpg"},
    ], upvotes: 3, comments : [
      {author: "Me", body: "Mooie katten", upvotes: 1},
      {author: "NotMe", body: "heel Mooie katten", upvotes: 2},
      {author: "SomeoneElse", body: "schattig!", upvotes: 0}
    ]}
  ];
});
app.controller('PhotosCtrl', function($scope, $stateParams, albums){
  $scope.number = 1;
  $scope.album = albums.albums[$stateParams.id];
  $scope.photos = $scope.album.photos;
});

app.controller('MailCtrl', function($scope){
   //
});
