var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/home.html'
    }).state('albums', {
      url: '/albums',
      templateUrl: '/albums.html',
      controller: 'AlbumsCtrl',
      resolve: {
        albumPromise: function(albums){
          return albums.getAll();
        }
      }
    }).state('photos', {
      url: '/photos/{id}',
      templateUrl: '/photos.html',
      controller: 'PhotosCtrl',
      resolve: {
        album: function($stateParams, albums){
          return albums.get($stateParams.id);
        }
      }
    }).state('picture', {
      url: '/picture/{albumId}/{id}',
      templateUrl: '/picture.html',
      controller: 'PictureCtrl'
    }).state('links', {
      url: '/links',
      templateUrl: '/links.html',
    }).state('contact', {
      url: '/contact',
      templateUrl: '/contact.html',
      controller: 'contactCtrl'
    }).state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'AuthCtrl',
      onEnter: function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }
    }).state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'AuthCtrl',
      onEnter: function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }
    });
    $urlRouterProvider.otherwise('home');
  }
);
app.factory('albums', function($http, auth){
  var o = {
    albums: []
  };

  o.create = function(album){
    return $http.post('/albums', album, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.albums.push(data);
    });
  }
  o.getAll = function(){
    return $http.get('/albums').success(function(data){
      angular.copy(data, o.albums);
    });
  }
  o.get = function(id){
    return $http.get('/albums/' + id).then(function(res){
      return res.data;
    });
  }
  o.upvote = function(album){
    return $http.put('/albums/' + album._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      album.upvotes++;
    });
  }

  o.addComment = function(id, comment){
    return $http.post('/albums/'+id+'/comments', comment, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  }
  o.upvoteComment = function(album, comment){
    return $http.put('/albums/' + album._id + '/comments/' + comment._id + '/upvote', null, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      comment.upvotes++;
    });
  }

  return o;
});
app.factory('auth', function($http, $window){
  var auth = {};

  auth.saveToken = function(token){
    $window.localStorage['vandaelefotografie-token'] = token;
  }

  auth.getToken = function(){
    return $window.localStorage['vandaelefotografie-token'];
  }

  auth.isLoggedIn = function(){
    var token = auth.getToken();

    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }else{
      return false;
    }
  }

  auth.currentUser = function(){
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  }

  auth.register = function(user){
    return $http.post('/register', user).success(function(data){
      auth.saveToken(data.token);
    });
  }

  auth.logIn = function(user){
    return $ttp.post('/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  }

  auth.logOut = function(){
    $window.localhost.removeItem('vandaelefotografie-token');
  }

  return auth;
})

app.controller('AlbumsCtrl', function($scope, albums, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
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

  $scope.addAlbum = function(){
      if(!$scope.name || $scope.title === ''){return;}
      albums.create({
        name: $scope.title,
      });
      $scope.title = '';
  }

  $scope.incrementUpvotes = function(album){
    albums.upvote(album);
  }
});
app.controller('PhotosCtrl', function($scope, albums, album, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.album = album;
  $scope.addComment = function(){
    if ($scope.body === ''){return;}
    albums.addComment(album._id, {
      body: $scope.body,
      author: 'user'
    }).success(function(comment){
      $scope.album.comments.push(comment);
    });
    $scope.body = '';
  }
  $scope.incrementUpvotesPhoto = function(photo){
    photo.upvotes++;
  }
  $scope.incrementUpvotesComment = function(comment){
    albums.upvoteComment(album, comment);
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
app.controller('ContactCtrl', function($scope){
   //
});
app.controller('AuthCtrl', function($scope, $state, auth){
  $scope.user = {};
  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  }
  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  }
})
app.controller('NavCtrl', function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
});
