function MyPromise(executor){
  var value = null;
  var state = "pending";
  var deferredFunctions = [];

  this.then = function(onResolved, onRejected){
    return new MyPromise(function(nextPromiseResolve){
      addDeffered({
        onResolved: onResolved,
        onRejected: onRejected,
        nextPromiseResolve: nextPromiseResolve
      });
    });
  };

  //resolve all deferred functions
  var resolveDeferreds = function(){
    var result = value;
    while(deferredFunctions.length > 0){
      var deferred = deferredFunctions.shift();
      if(state === "resolved"){
        //there is a chance someone might func.then() without providing args
        if(deferred.onResolved){
          result = deferred.onResolved(value);
        }
      } else {
        //rejected!
        if(deferred.onRejected){
          //result is error reason
          result = deferred.onRejected(value);
        }
      }
      //resolve the next promise
      deferred.nextPromiseResolve(result);
    }
  };

  var addDeffered = function(deferred){
    deferredFunctions.push(deferred);
    if (state !== "pending"){
      resolveDeferreds();
    }
  }

  function resolve(resolution){
    if(resolution && resolution.then){
      //FLATTENING!
      //this is a promise, we must wait for it to resolve
      //so we can use its resolution to resolve ourself
      resolution.then(function(realResolution){
        resolve(realResolution);
      });
    } else {
      //this is a NORMAL non-promise value, we can resolve ourself
      //immediately with this value
      value = resolution;
      state = 'resolved';
      resolveDeferreds();
    }
  };

  var reject = function(reason){
    value = reason;
    state = 'rejected';
    resolveDeferreds();
  }
  executor(resolve, reject);
}


function fiveMachine(){
  return new MyPromise(function(resolve, reject){
    setTimeout(function(){
      resolve(5);
    }, 1000);
  });
}

function addSixMachine(num){
  alert('in the six machine');
  return new MyPromise(function(resolve, reject){
    setTimeout(function(){
      resolve(num + 6);
    }, 1000);
  });
}

// fiveMachine().then(addSixMachine).then(function(val){ alert(val)});
