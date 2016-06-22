var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
  db: process.env.MONGOHQ_URL,
  fcm_key: 'AIzaSyDmZStpK-K7501x1vtmRVWusePVgs4Emws'

}
