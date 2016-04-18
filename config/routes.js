var async = require('async');

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    var trackers = require('../app/controllers/trackers');
    var trackerpositions = require('../app/controllers/trackerpositions');
    var usertrackers = require('../app/controllers/usertrackers');
    var authenticate = require('../app/controllers/authenticate');
//    app.get('/signin', users.signin);
//    app.get('/signup', users.signup);
//    app.get('/signout', users.signout);


    //users
    app.get('/users', authenticate.checkToken,users.showAll)
    app.post('/users', users.create);
    app.delete('/users',authenticate.checkToken, users.deleteAll);
    app.put('/users/:userId',authenticate.checkToken, users.update);
    app.get('/users/:userId',authenticate.checkToken, users.show);
    app.delete('/users/:userId', authenticate.checkToken,users.destroy);
    //trackers
    app.get('/trackers',authenticate.checkToken, trackers.showAll)
    app.post('/trackers',authenticate.checkToken, trackers.create);
    app.delete('/trackers', authenticate.checkToken,trackers.deleteAll);
    app.put('/trackers/:trackerId',authenticate.checkToken, trackers.update);
    app.get('/trackers/:trackerId',authenticate.checkToken, trackers.show);
    app.delete('/trackers/:trackerId',authenticate.checkToken, trackers.destroy);
    //trackers position
    app.get('/trackerpositions',authenticate.checkToken, trackerpositions.showAll)
    app.post('/trackers/:trackerId/trackerpositions',authenticate.checkToken, trackerpositions.create);
    app.delete('/trackerpositions', authenticate.checkToken,trackerpositions.deleteAll);
    app.get('/trackerpositions/:trackerPositionId',authenticate.checkToken, trackerpositions.show);
    app.get('/trackers/:trackerId/trackerpositions', authenticate.checkToken,trackerpositions.showByTrackerId);
    app.delete('/trackerpositions/:trackerPositionId', authenticate.checkToken,trackerpositions.destroy);
    //user trackers
    app.get('/usertrackers',authenticate.checkToken, usertrackers.showAll);
    app.post('/users/:userId/trackers/:trackerId/usertrackers', authenticate.checkToken,usertrackers.create);
    
    app.post('/authentication',
	passport.authenticate('local', {}),
	authenticate.authentication
	);


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
