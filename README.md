jScheduler
==============
Parallel execution of asynchronous callbacks. Faster than a queue, does not ensure order in response.

Installation
------------
npm:
`npm install --save jscheduler`


Usage
-----
require the library into the current file
```javascript
var Scheduler = require("jscheduler");
```
Create a new schedule object
```javascript
s = new Scheduler();
```
It's a good idea to first register the finally function before calling the async methods. This way if the async operations finish unexpectedly fast we won't have to worry of a race condition happenning where the finally function is called before being set
```javascript
s.finally(function () {
  //some operation that requires the other operations to finish before being called
});
```
Finally we call the asynchronous operations but wrapping the callbacks using register to let the schedule track them
```javascript
asyncOperation(s.register(function () {
  //...
}));
```
