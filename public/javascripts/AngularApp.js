var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/home.html'
    }).state('albums', {
        url: '/albums',
        templateUrl: '/albums.html',
        controller: 'AlbumsCtrl',
        resolve: {
            albumPromise: function(albums) {
                return albums.getAll();
            }
        }
    }).state('photos', {
        url: '/photos/{id}',
        templateUrl: '/photos.html',
        controller: 'PhotosCtrl',
        resolve: {
            album: function($stateParams, albums) {
                return albums.get($stateParams.id);
            }
        }
    }).state('picture', {
        url: '/picture/{albumId}/{id}',
        templateUrl: '/picture.html',
        controller: 'PictureCtrl',
        resolve: {
            album: function($stateParams, albums) {
                return albums.get($stateParams.albumId);
            },
            photo: function($stateParams, albums) {
                return albums.getPhoto($stateParams.albumId, $stateParams.id);
            }
        }
    }).state('links', {
        url: '/links',
        templateUrl: '/links.html',
    }).state('login', {
        url: '/login',
        templateUrl: '/login.html',
        controller: 'AuthCtrl',
        onEnter: function($state, auth) {
            if (auth.isLoggedIn()) {
                $state.go('home');
            }
        }
    }).state('register', {
        url: '/register',
        templateUrl: '/register.html',
        controller: 'AuthCtrl',
        onEnter: function($state, auth) {
            if (auth.isLoggedIn()) {
                $state.go('home');
            }
        }
    });
    $urlRouterProvider.otherwise('home');
});
app.factory('albums', function($http, auth) {
    var o = {
        albums: []
    };

    o.create = function(album) {
        return $http.post('/albums', album, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        }).success(function(data) {
            o.albums.push(data);
        });
    }

    o.getAll = function() {
        return $http.get('/albums').success(function(data) {
            angular.copy(data, o.albums);
        });
    }
    o.get = function(id) {
        return $http.get('/albums/' + id).then(function(res) {
            return res.data;
        });
    }
    o.getPhoto = function(albumId, photoId) {
        return $http.get('/albums/' + albumId + '/photos/' + photoId).then(function(res) {
            return res.data;
        });
    }
    o.upvote = function(album) {
        return $http.put('/albums/' + album._id + '/upvote', null, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        }).success(function(data) {
            album.upvotes++;
        });
    }
    o.upvotePhoto = function(album, photo) {
        return $http.put('/albums/' + album._id + '/photos/' + photo._id + '/upvote', null, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        }).success(function(data) {
            photo.upvotes++;
        });
    }

    o.addComment = function(id, comment) {
        return $http.post('/albums/' + id + '/comments', comment, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        });
    }
    o.addCommentPhoto = function(albumId, photoId, comment) {
        return $http.post('/albums/' + albumId + '/photos/' + photoId + '/comments', comment, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        });
    }
    o.upvoteComment = function(album, comment) {
        return $http.put('/albums/' + album._id + '/comments/' + comment._id + '/upvote', null, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        }).success(function(data) {
            comment.upvotes++;
        });
    }
    o.upvoteCommentPhoto = function(album, photo, comment) {
        return $http.put('/albums/' + album._id + '/photos/' + photo._id + '/comments/' + comment._id + '/upvote', null, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        }).success(function(data) {
            comment.upvotes++;
        });
    }

    o.addPhoto = function(id, photo) {
        return $http.post('/albums/' + id + '/photos', photo, {
            headers: {
                Authorization: 'Bearer ' + auth.getToken()
            }
        });
    }

    return o;
});
app.factory('auth', function($http, $window) {
    var auth = {};

    auth.saveToken = function(token) {
        $window.localStorage['vandaelefotografie-token'] = token;
    }

    auth.getToken = function() {
        return $window.localStorage['vandaelefotografie-token'];
    }

    auth.isLoggedIn = function() {
        var token = auth.getToken();

        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    auth.isAdmin = function(username) {
        return username == 'marita van daele';
    }

    auth.currentUser = function() {
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    }

    auth.register = function(user) {
        return $http.post('/register', user).success(function(data) {
            auth.saveToken(data.token);
        });
    }

    auth.logIn = function(user) {
        return $http.post('/login', user).success(function(data) {
            auth.saveToken(data.token);
        });
    }

    auth.logOut = function() {
        $window.localStorage.removeItem('vandaelefotografie-token');
    }

    return auth;
})

app.controller('AlbumsCtrl', function($scope, albums, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.isAdmin = auth.isAdmin(auth.currentUser());
    $scope.albums = albums.albums;

    $scope.addAlbum = function() {
        if ($scope.title === '' || $scope.thumb === '') {
            return;
        }
        albums.create({
            name: $scope.title,
            thumb: $scope.thumb
        });
        $scope.title = '';
        $scope.thumb = '';
    }

    $scope.incrementUpvotes = function(album) {
        albums.upvote(album);
    }
});
app.controller('PhotosCtrl', function($scope, albums, album, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.isAdmin = auth.isAdmin(auth.currentUser());
    $scope.album = album;
    $scope.addPhoto = function() {
        if ($scope.name === '' || $scope.extensie === '') {
            return;
        }
        albums.addPhoto(album._id, {
            name: $scope.name,
            extensie: $scope.extensie
        }).success(function(photo) {
            $scope.album.photos.push(photo);
        });
        $scope.name = '';
    }
    $scope.addComment = function() {
        if ($scope.body === '') {
            return;
        }
        albums.addComment(album._id, {
            body: $scope.body,
            author: 'user'
        }).success(function(comment) {
            $scope.album.comments.push(comment);
        });
        $scope.body = '';
    }
    $scope.incrementUpvotesPhoto = function(photo) {
        albums.upvotePhoto(album, photo);
    }
    $scope.incrementUpvotesComment = function(comment) {
        albums.upvoteComment(album, comment);
    }
});
app.controller('PictureCtrl', function($scope, albums, album, photo, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.album = album;
    $scope.photo = photo;
    $scope.addComment = function() {
        if ($scope.body === '') {
            return;
        }
        albums.addCommentPhoto(album._id, photo._id, {
            body: $scope.body,
            author: 'user'
        }).success(function(comment) {
            $scope.photo.comments.push(comment);
        });
        $scope.body = '';
    }
    $scope.incrementUpvotes = function(comment) {
        albums.upvoteCommentPhoto(album, photo, comment);
    }
});

app.controller('AuthCtrl', function($scope, $state, auth) {
    $scope.user = {};
    $scope.register = function() {
        auth.register($scope.user).error(function(error) {
            $scope.error = error;
        }).then(function() {
            $state.go('home');
        });
    }
    $scope.logIn = function() {
        auth.logIn($scope.user).error(function(error) {
            $scope.error = error;
        }).then(function() {
            $state.go('home');
        });
    }
})
app.controller('NavCtrl', function($scope, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;
});
