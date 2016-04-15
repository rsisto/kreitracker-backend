var _ = require('underscore');

// Load app configuration

module.exports = _.extend(
    require(__dirname + '/../config/env/all.js'),
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.json') || {});

module.exports = {

    'secret': 'ilovescotchyscotch',
    'database': 'mongodb://localhost:27017/kreitracker'

};

