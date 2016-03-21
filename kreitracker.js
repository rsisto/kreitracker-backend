var gpstracker = require("./lib/server");

var server = gpstracker.create().listen(1337, function(){
    console.log('listening your gps trackers on port', 1337);
});

server.trackers.on("connected", function(tracker){
    
    console.log("tracker connected with imei:", tracker.imei);

    tracker.on("log", function(data){
        console.log(new Date().toISOString() + " Event: "+ data);
    });

    tracker.on("help me", function(){
        console.log(tracker.imei + " pressed the help button!!".red);
    });

    tracker.on("position", function(position){
        console.log("tracker {" + tracker.imei +  "}: lat", 
                            position.lat, "lng", position.lng);
    });
    tracker.on("error", function(position){
        console.log("error {" + tracker.imei +  "}: " + position );
    });

    tracker.trackEvery(150).meters();
});