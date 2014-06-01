/* To append:

s=document.createElement("script")
s.setAttribute("src", "/Users/spandan/Documents/pproj/enc/enc_fb2.js")
document.getElementsByTagName("Head")[0].appendChild(s) 
 
*/

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


MsgParser = {
    parse: function(rawstr){
        if (rawstr.indexOf("user-generated-message") < 0) {
            return null;
        }
        var dec = decodeURIComponent(rawstr);  //decoded string
        var x=dec.split("&"); //splits diff entries
        root = {}
        for(var i=0; i<x.length; i++){
            var ptr = root;
            var y=x[i].split("="); //split key value pairs
            var val = y[1];
            var key = y[0];
            
            kv = filter(function(x){return !!x}, key.split(/[\[\]]/)); //key vector
            
            for(var j=0; j<kv.length-1; j++){        
                if( !ptr.hasOwnProperty(kv[j]) ){ 
                    ptr[kv[j]] = {};
                }
                ptr = ptr[kv[j]];        
            }
            ptr[kv[j]] = val;
        }
    
        
    }
        
    
}