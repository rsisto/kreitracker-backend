var async = require('async');

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    var trackers = require('../app/controllers/trackers');
    var trackerpositions = require('../app/controllers/trackerpositions');
    var usertrackers = require('../app/controllers/usertrackers');
    var usertrackers = require('../app/controllers/authenticate');
//    app.get('/signin', users.signin);
//    app.get('/signup', users.signup);
//    app.get('/signout', users.signout);


    //users
    app.get('/users', users.showAll)
    app.post('/users', users.create);
    app.delete('/users', users.deleteAll);
    app.put('/users/:userId', users.update);
    app.get('/users/:userId', users.show);
    app.delete('/users/:userId', users.destroy);
    //trackers
    app.get('/trackers', trackers.showAll)
    app.post('/trackers', trackers.create);
    app.delete('/trackers', trackers.deleteAll);
    app.put('/trackers/:trackerId', trackers.update);
    app.get('/trackers/:trackerId', trackers.show);
    app.delete('/trackers/:trackerId', trackers.destroy);
    //trackers position
    app.get('/trackerpositions', trackerpositions.showAll)
    app.post('/trackers/:trackerId/trackerpositions', trackerpositions.create);
    app.delete('/trackerpositions', trackerpositions.deleteAll);
    app.get('/trackerpositions/:trackerPositionId', trackerpositions.show);
    app.get('/trackers/:trackerId/trackerpositions', trackerpositions.showByTrackerId);
    app.delete('/trackerpositions/:trackerPositionId', trackerpositions.destroy);
    //user trackers
    app.get('/usertrackers', usertrackers.showAll);
    app.post('/users/:userId/trackers/:trackerId/usertrackers', usertrackers.create);
    //authentication
    //app.post('/authentication',passport.authenticate('local', {
    //    failureRedirect: '/signin',
    //    failureFlash: 'Invalid email or password.'
    //}), authenticate.authentication);
	


/*

    //Setting up the users api
   
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
   

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    //Finish with setting up the articleId param
    app.param('articleId', articles.article);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);
*/
};
