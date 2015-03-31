
var tessel = require('tessel'),
  port = process.env.PORT || 1234,
  interval = 60000, // 2 minutes
  notificationLED = tessel.led[3];

var camera = require('camera-vc0706').use(tessel.port['A'], {
  compression: 0.2,
  resolution: 'vga'
});

var dotenv = require('dotenv');
// load the spark token and device id from .env file
dotenv.load();

// Blue light on!
camera.on('ready', function(){
  tessel.led[1].write(1);

  // Start Photographers!
  console.log('Kitty Paparazzi, go!');
  // first photo
  kittyPhoto();
  setInterval(kittyPhoto, interval);
});

// Toggle Blue to Red
camera.on('error', function(){
  console.log('Uh oh. Error.');
  tessel.led[1].write(0);
  tessel.led[2].write(1);
});

var kittyPhoto = function () {
  camera.takePicture(function(err, image) {
    if (err) {
      console.log('error taking image', err);
    } else {
      console.log('SAY CHEESE, KITTY!');
      notificationLED.high();
      // Name the image with the time
      var name = 'picture-' + Date.now() + '.jpg';
      // Save the image to the path
      console.log('Picture saving as', name, '...');

      // callback?
      process.sendfile(name, image);

      // TODO: send this file somewhere that is compatible with Tessel!
    }
  });
};
