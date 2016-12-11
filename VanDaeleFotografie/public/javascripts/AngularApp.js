var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'AlbumsCtrl'
    }).state('albums', {
      url: '/albums/{id}',
      templateUrl: '/albums.html',
      controller: 'PhotosCtrl'
    }).state('picture', {
      url: '/picture/{albumId}/{id}',
      templateUrl: '/picture.html',
      controller: 'PictureCtrl'
    });
    $urlRouterProvider.otherwise('home');
  }
);
app.factory('albums', [function(){
  var o = {
    albums: []
  };

  o.create = function(album){
    o.albums.push(album);
  }

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
      //var link = scope.homeDir + data[i].link;
      var link = data[i].link;
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
  //menu items declareren
  $scope.menuItems = [
    {name: "Home", link: "/index.html"},
    {name: "Albums", link: "/albums.html"},
    {name: "Links", link: "/links.html"},
    {name: "Contact", link: "/contact.html"}
  ];
});

app.controller('AlbumsCtrl', function($scope, albums){
  $scope.albums = albums.albums;
  //albums declareren
  if (albums.albums.length == 0){
    albums.create({
      name: "katten", thumb: "kat0.jpg", photos : [
        {name: "kitten", link:"kat0.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "rosse kat", link:"kat1.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "grijs kitten", link:"kat2.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "spelend kitten", link:"kat3.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "spelende kat", link:"kat4.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "wassende kat", link:"kat5.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "katten broeders", link:"kat6.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "grijze kat", link:"kat7.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "slapende kat", link:"kat8.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]}
      ], upvotes: 5, comments : [
        {author: "Me", body: "Mooie katten", upvotes: 1},
        {author: "NotMe", body: "heel Mooie katten", upvotes: 2},
        {author: "SomeoneElse", body: "schattig!", upvotes: 0}
      ]
    });
    albums.create({
      name: "katten2", thumb: "kat1.jpg", photos : [
        {name: "kitten", link:"kat0.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "rosse kat", link:"kat1.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "grijs kitten", link:"kat2.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "spelend kitten", link:"kat3.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "spelende kat", link:"kat4.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "wassende kat", link:"kat5.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "katten broeders", link:"kat6.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "grijze kat", link:"kat7.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "slapende kat", link:"kat8.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
      ], upvotes: 5, comments : [
        {author: "Me", body: "Mooie katten", upvotes: 1},
        {author: "NotMe", body: "heel Mooie katten", upvotes: 2},
        {author: "SomeoneElse", body: "schattig!", upvotes: 0}
      ]
    });
    albums.create({
      name: "katten3", thumb: "kat2.jpg", photos : [
        {name: "kitten", link:"kat0.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "rosse kat", link:"kat1.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "grijs kitten", link:"kat2.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "spelend kitten", link:"kat3.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "spelende kat", link:"kat4.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "wassende kat", link:"kat5.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "katten broeders", link:"kat6.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "grijze kat", link:"kat7.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "slapende kat", link:"kat8.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
      ], upvotes: 5, comments : [
        {author: "Me", body: "Mooie katten", upvotes: 1},
        {author: "NotMe", body: "heel Mooie katten", upvotes: 2},
        {author: "SomeoneElse", body: "schattig!", upvotes: 0}
      ]
    });
    albums.create({
      name: "katten4", thumb: "kat3.jpg", photos : [
        {name: "kitten", link:"kat0.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "rosse kat", link:"kat1.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "grijs kitten", link:"kat2.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "spelend kitten", link:"kat3.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "spelende kat", link:"kat4.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "wassende kat", link:"kat5.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "katten broeders", link:"kat6.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "grijze kat", link:"kat7.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "slapende kat", link:"kat8.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
      ], upvotes: 5, comments : [
        {author: "Me", body: "Mooie katten", upvotes: 1},
        {author: "NotMe", body: "heel Mooie katten", upvotes: 2},
        {author: "SomeoneElse", body: "schattig!", upvotes: 0}
      ]
    });
    albums.create({
      name: "katten5", thumb: "kat4.jpg", photos : [
        {name: "kitten", link:"kat0.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "rosse kat", link:"kat1.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "grijs kitten", link:"kat2.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "spelend kitten", link:"kat3.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "spelende kat", link:"kat4.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "wassende kat", link:"kat5.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "katten broeders", link:"kat6.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "grijze kat", link:"kat7.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "slapende kat", link:"kat8.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
      ], upvotes: 5, comments : [
        {author: "Me", body: "Mooie katten", upvotes: 1},
        {author: "NotMe", body: "heel Mooie katten", upvotes: 2},
        {author: "SomeoneElse", body: "schattig!", upvotes: 0}
      ]
    });
    albums.create({
      name: "katten6", thumb: "kat5.jpg", photos : [
        {name: "kitten", link:"kat0.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "rosse kat", link:"kat1.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "grijs kitten", link:"kat2.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "spelend kitten", link:"kat3.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "spelende kat", link:"kat4.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "wassende kat", link:"kat5.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "katten broeders", link:"kat6.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "grijze kat", link:"kat7.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
        {name: "slapende kat", link:"kat8.jpg", upvotes: 0, comments : [
          {author: 'Not Me', body: 'nooice', upvotes: 1},
          {author: 'someone else', body: 'cute', upvotes: 3}
        ]},
      ], upvotes: 5, comments : [
        {author: "Me", body: "Mooie katten", upvotes: 1},
        {author: "NotMe", body: "heel Mooie katten", upvotes: 2},
        {author: "SomeoneElse", body: "schattig!", upvotes: 0}
      ]
    });
  }


  $scope.incrementUpvotes = function(album){
    album.upvotes++;
  }
});
app.controller('PhotosCtrl', function($scope, $stateParams, albums){
  $scope.album = albums.albums[$stateParams.id];
  $scope.albumId = $stateParams.id;
  $scope.addComment = function(){
    if ($scope.body === ''){return;}
    $scope.album.comments.push({
      author: 'me',
      body: $scope.body,
      upvotes: 0
    });
    $scope.body = '';
  }
  $scope.incrementUpvotesPhoto = function(photo){
    photo.upvotes++;
  }
  $scope.incrementUpvotesComment = function(comment){
    comment.upvotes++;
  }
});
app.controller('PictureCtrl', function($scope, $stateParams, albums){
  $scope.album = albums.albums[$stateParams.albumId];
  $scope.photo = $scope.album.photos[$stateParams.id];
  $scope.addComment = function(){
    if ($scope.body === ''){return;}
    $scope.photo.comments.push({
      author: 'me',
      body: $scope.body,
      upvotes: 0
    });
    $scope.body = '';
  }
  $scope.incrementUpvotes = function(comment){
    comment.upvotes++;
  }
});


app.controller('MailCtrl', function($scope){
   //
});
