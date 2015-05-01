(function (){
  var docReadyCallbacks = [], docReady = false;
  document.addEventListener("DOMContentLoaded", function(){
    docReady = true;
    docReadyCallbacks.forEach(function(funct) {
      funct();
    });
  });

  var addDocReadyCallback = function(callback){
    if (docReady) {
      callback();
    } else {
       docReadyCallbacks.push(callback);
    }
  };

  var $l = window.$l = function (arg) {
    var elementArr;
    var functionArray = [];
    if ( typeof arg === "string"){
      var elementList = document.querySelectorAll(arg);
      elementArr = Array.prototype.slice.call(elementList);
      return new DOMNodeCollection(elementArr);
    } else if (arg instanceof HTMLElement) {
      elementArr = [arg];
      return new DOMNodeCollection(elementArr);
    } else if (typeof arg === "function") {
      addDocReadyCallback(arg);
    };
  };

  $l.extend = function() {
    var result = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      for (var attrname in arguments[i]) {
          result[attrname] = arguments[i][attrname];
      }
    }
    return result;
  };

  $l.ajax = function(options) {
    var defaults = {
      type: 'GET'
    };
    var requestedContent = $l.extend(defaults, options);
    var promise = new MyPromise(function(resolve, reject){

      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 ) {
           if(xmlhttp.status == 200){
              resolve(xmlhttp.responseText);
           } else if(xmlhttp.status == 400) {
             reject("There was an error 400")
           } else {
             reject('something else other than 200 was returned')
           }
        }
      }
      xmlhttp.open(requestedContent["type"], requestedContent["url"], true);
      xmlhttp.send();
    });
    promise.then(requestedContent.success, requestedContent.error);
    return promise;
  };

  function DOMNodeCollection(htmlElements) {
    this.htmlElements = htmlElements;
  };

  DOMNodeCollection.prototype.html = function(str) {
    if (str) {
      this.htmlElements.forEach(function(node) {
        node.innerHTML = str;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  };

  DOMNodeCollection.prototype.empty = function() {
    this.htmlElements.forEach(function(node) {
      node.innerHTML = "";
    });
  };

  DOMNodeCollection.prototype.forEach = function(callback){
    this.htmlElements.forEach(callback);
  };

  DOMNodeCollection.prototype.append = function(collection){
    var parent = this.htmlElements[0];
    collection.forEach(function(node){
      parent.appendChild(node);
    })
  };

  DOMNodeCollection.prototype.attr = function(attr_name, value) {
    if (value) {
      this.htmlElements.forEach(function(node) {
        node.setAttribute(attr_name, value);
      });
    } else {
      if (this.htmlElements[0].hasAttribute(attr_name)) {
        return this.htmlElements[0].getAttribute(attr_name);
      };
    }
  };

  DOMNodeCollection.prototype.addClass = function(className) {
    this.htmlElements.forEach(function(node) {
      node.classList.add(className);
    });
  };

  DOMNodeCollection.prototype.removeClass = function(className) {
    this.htmlElements.forEach(function(node) {
      node.classList.remove(className);
    });
  };

  DOMNodeCollection.prototype.children = function() {
    var foundChildren = [];
    this.htmlElements.forEach(function(node) {
      foundChildren.push(node.children);
    });
    return new DOMNodeCollection(foundChildren);
  };

  DOMNodeCollection.prototype.parent = function() {
    var parents = [];
    this.htmlElements.forEach(function(node) {
      if (parents.indexOf(node.parentNode) === -1) {
        parents.push(node.parentNode);
      }
    });
    return new DOMNodeCollection(parents);
  };

  DOMNodeCollection.prototype.find = function(selector) {
    var descendantsArray = [];
    this.htmlElements.forEach(function(node) {
        var selected = Array.prototype.slice.call(node.querySelectorAll(selector));
        descendantsArray = descendantsArray.concat(selected);
    });
    return new DOMNodeCollection(descendantsArray);
  };

  DOMNodeCollection.prototype.remove = function() {
    this.htmlElements.forEach(function(node) {
      node.parentNode.removeChild(node);
    });
  };

  DOMNodeCollection.prototype.on = function(evt, funct) {
    this.htmlElements.forEach(function(node) {
      node.addEventListener(evt, funct);
    });
  };

  DOMNodeCollection.prototype.off = function(evt, funct) {
    this.htmlElements.forEach(function(node) {
      node.removeEventListener(evt, funct);
    });
  };

})();