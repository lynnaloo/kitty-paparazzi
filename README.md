# Kitty-Paparazzi

This is a little Kitty Paparazzo bot with a Spark Core AND a Tessel (+ Camera module) that travels
 around and automatically takes photos of kitties every few minutes.
 
TODO: Upload photos to @kittypaparazzi Twitter Account.

The Spark Core and the Tessel for the Kitty-Paparazzi bot travel on
[Makenai's](https://github.com/makenai) [Sumobot-Jr](https://github.com/makenai/sumobot-jr).

The code that controls the servos on the bot is also inspired by the
spark-sumo [code-example](https://github.com/makenai/sumobot-jr/blob/master/code_example/spark-sumo.js).

### To Operate the Spark SumoBot
* Place a `.env` file in the `spark` folder with the Spark Core Token information (see `sample.env`)
```
cd spark`
npm install
node sumo-controller.js
```

### To Start the Tessel Camera
```
cd tessel
npm install
tessel use camera.js 
```

