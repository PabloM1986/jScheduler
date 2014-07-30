function Scheduler () {
	this.count = 0;
	this.afterAll = function () {};
	this.executed = false;
}

Scheduler.prototype.register = function (callback) {
	var self = this;
	this.count++;
	return function () {
		if ( callback ) {
			callback.apply(null, arguments);
		}
		self.step();
	}
};

Scheduler.prototype.step = function () {
	this.count--;
	if (this.executed) {
		throw new Error("Attempt to run an already executed schedule. Remember to register your callbacks before using them");
	} else {
		if (this.count == 0) {
			this.executed = true;
			this.afterAll();
		}
	}
};

Scheduler.prototype.finally = function (callback) {
	if (typeof callback == "function") {
		this.afterAll = callback;
	} else {
		throw new Error("Callback must be a function");
	}
};

module.exports = Scheduler;
