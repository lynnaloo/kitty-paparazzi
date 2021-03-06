// ================================================
// Sumobot Jr demo program (wireless with Spark-IO)
// ================================================

var five     = require("johnny-five");
var Spark    = require("spark-io");
var keypress = require('keypress');
var Sumobot = require("sumobot")(five);
var dotenv = require('dotenv');

keypress(process.stdin);

// load the spark token and device id from .env file
dotenv.load();

var board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_ID
  })
});

board.on("ready", function() {

  console.log("Welcome to Sumobot Jr!");

  // Initialize a new Sumobot.
  // - Left Servo is attached to pin D0
  // - Right Servo is attached to pin D1
  // - Speed set to 0.50 (half of max speed)
  //
  var bot = new Sumobot({
    left: "D0",
    right: "D1",
    speed: 0.50
  });

  // Maps key names to bot methods
  var actions = {
    up: "fwd",
    down: "rev",
    left: "left",
    right: "right",
    space: "stop"
  };

  var mode;

  var mode;

  // Ensure the bot is stopped
  bot.stop();

  // A bit of keypress ceremony ;)
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.setRawMode(true);

  process.stdin.on("keypress", function(ch, key) {
    var action;

    if (!key) {
      return;
    }

    action = actions[key.name] || key.name;

    if (action == "q") {
      console.log("Quitting");
      bot.stop();
      setTimeout(process.exit, 500);
    }

    if (bot[action]) {
      if (mode === action) {
        return;
      }
      console.log(action);
      bot[action]();
      mode = action;
    }
  });
});
