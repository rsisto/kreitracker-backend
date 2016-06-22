var async = require('async');

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    var trackers = require('../app/controllers/trackers');
    var trackerpositions = require('../app/controllers/trackerpositions');
    var authenticate = require('./middlewares/authenticate');
    var alarms = require('../app/controllers/alarms');
    //var alarmtrackers = require('../app/controllers/alarmtrackers');
    var authorization = require('./middlewares/authorization');

   
    app.get('/users', authorization.checkToken,users.showAll)
    app.post('/users', users.create);
    app.delete('/users',authorization.checkToken, users.deleteAll);
    app.put('/users/:userId',authorization.checkToken, users.update);
    app.get('/users/:userId',authorization.checkToken, users.show);
    app.delete('/users/:userId', authorization.checkToken,users.destroy);
    
	
    //trackers
    app.get('/trackers',authorization.checkToken, trackers.showAll)
    app.get('/trackersAll',authorization.checkToken, trackers.showAllAll)
   // app.get('/trackers',authorization.checkToken, trackers.showAll)
    app.post('/trackers',authorization.checkToken, trackers.create);
    app.delete('/trackers', authorization.checkToken,trackers.deleteAll);
    app.put('/trackers/:trackerId',authorization.checkToken, trackers.update);
    app.get('/trackers/:trackerId',authorization.checkToken, trackers.show);
    app.delete('/trackers/:trackerId',authorization.checkToken, trackers.destroy);
    //trackers position
    app.get('/trackerpositions',authorization.checkToken, trackerpositions.showAll)
    app.post('/trackers/:trackerId/trackerpositions',authorization.checkToken, trackerpositions.create);
    app.delete('/trackerpositions', authorization.checkToken,trackerpositions.deleteAll);
    app.get('/trackerpositions/:trackerPositionId',authorization.checkToken, trackerpositions.show);
    app.get('/trackers/:trackerId/trackerpositions', authorization.checkToken,trackerpositions.showByTrackerId);
    app.delete('/trackerpositions/:trackerPositionId', authorization.checkToken,trackerpositions.destroy);

    app.get('/alarms',alarms.showAll)
    app.post('/users/:userId/alarms',alarms.create);
    app.delete('/alarms',authorization.checkToken, alarms.deleteAll);
    app.put('/alarms/:alarmId',authorization.checkToken,auth.alarms.hasAuthorization, alarms.update);
    app.get('/alarms/:alarmId',authorization.checkToken, auth.alarms.hasAuthorization,alarms.show);
    app.delete('/alarms/:alarmId', authorization.checkToken,auth.alarms.hasAuthorization,alarms.destroy);
    app.put('/alarmsturnon/:alarmId', authorization.checkToken,auth.alarms.hasAuthorization,alarms.turnOn);
    app.put('/alarmsturnoff/:alarmId', authorization.checkToken,auth.alarms.hasAuthorization,alarms.turnOff);
    app.post('/users/alarms/trackers',authorization.checkToken,alarms.createFirstTracker);
    app.put('/alarmsturn', authorization.checkToken,alarms.turn);
    


/*
    //user trackers
    app.get('/usertrackers',authorization.checkToken, usertrackers.showAll);
    app.post('/users/:userId/trackers/:trackerId/usertrackers', authenticate.checkToken,usertrackers.create);
    
	


    //user alarmtrackers
    app.get('/alarmtrackers',usertrackers.showAll);
    app.post('/alarms/:alarmId/trackers/:trackerId/alarmtrackers', alarmtrackers.create);
   

    //user trackers
    app.get('/usertrackers',usertrackers.showAll);
    app.post('/users/:userId/trackers/:trackerId/usertrackers',usertrackers.create);
    
*/

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
