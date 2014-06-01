//Load jQuery
(function(){
  var newscript = document.createElement('script');
     newscript.type = 'text/javascript';
     newscript.async = true;
     newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
})();

//Test if jQuery loaded
$("p")

$.ajaxSetup({
    beforeSend: function (jqXHR, settings) {
        console.log("Settings type is " + settings.type);
        console.log(settings);
        //if(settings.type === "POST")
        //      settings.type = "GET";
    }
});

//Modifies open method to keep count of number of open connections
(function() {
  var oldOpen = XMLHttpRequest.prototype.open;
  window.openHTTPs = 0;
  XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
    window.openHTTPs++;
    this.addEventListener("readystatechange", function() {
        if(this.readyState == 4) {
          window.openHTTPs--;
          console.log("Number of open connection changed to: " + window.openHTTPs );
        }
      }, false);
    oldOpen.call(this, method, url, async, user, pass);
  }
})();

//Modifies the open method
(function() {
    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
        console.log("In open method. url is " + url);
        console.log(method);
    }
})();


//
//   Utilitity functions
//
//Gets type of object
var toType = function(obj) {  
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}


//Get 3 character random alphanumeric string
rand = function() {
    return Math.random().toString(36).substr(2, 3)
}

/// EO Utility functions

//send debug-v1 
(function() {
    XMLHttpRequest.prototype.send = function() {
        console.log("In send method. r is "); 
        var r = rand();
        window[r] =arguments;
        console.log(r);
    }
})();

log = function(obj){console.log(obj);}

//Get user message
getmsg = function(rawstr){
    log("In getmsg. rawstr is " + rawstr);
    log(rawstr);
    if (rawstr.indexOf("user-generated-message") < 0) {
        return null;
    }
    var dec = decodeURIComponent(rawstr); //decoded string
    var kvvect = dec.split("&"); //key value pair vector
    var kvobj = null;
    for (var i=0; i<kvvect.length; i++) {
        if(kvvect[i].indexOf("=") > 0){
            var kv = kvvect[i].split("="); //tuple of key and value
            kvobj[kv[0]] = kvobj[1];
        }
    }
    return kvobj;   
}

MsgParser = {

    parse: function(rawstr){
        if (rawstr.indexOf("user-generated-message") < 0) {
            return null;
        }
        var dec = decodeURIComponent(rawstr);
        var kvvect = dec.split("&");
        var kvobj = {};
        for (var i=0; i<kvvect.length; i++) {
            if(kvvect[i].indexOf("=") > 0){
            var kv = kvvect[i].split("="); //tuple of key and value
            kvobj[kv[0]] = kvobj[1];
        }    
        }
        return kvobj;
    }
    
}


//send debug-v2 
(function() {
    XMLHttpRequest.prototype.send = function() {
        console.log("In send message");
        console.log(getmsg(arguments));        
    }
})();




parser=new DOMParser();
var doc = parser.parseFromString(txt,"text/xml");
var doc = parser.parseFromString(txt, "application/xml");
var doc = parser.parseFromString(txt, "multipart/form-data");
var doc = parser.parseFromString(txt, "application/x-www-form-urlencoded");
//Decode encoded uri
decodeURIComponent(encoded_uri) 
