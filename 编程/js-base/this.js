var scope = "global";

function log() {
  var args = Array.prototype.join.call(arguments, ",");
  console.log(this.scope + ":" + args);
}

var dog = {
  scope: "dog",
  yelp: function () {
    var scope = "dog.yelp";
    log("wow");
  },
};

dog.yelp();
// global:wow Node 环境下 undefined:wow

dog.yelp.call(dog);
// global:wow Node 环境下 undefined:wow

log.call(dog, "created");
// dog:created
