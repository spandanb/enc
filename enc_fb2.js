/* To append:

s=document.createElement("script")
s.setAttribute("src", "https://raw.githubusercontent.com/spandanb/enc/master/enc_fb2.js")
document.getElementsByTagName("Head")[0].appendChild(s) 
 
*/

/*Get 3 character random alphanumeric string */
rand = function() {
    return Math.random().toString(36).substr(2, 3)
}

/* EO Utility functions */

/*send debug-v1 */
(function() {
    
    window.oldsend = XMLHttpRequest.prototype.send
    
    XMLHttpRequest.prototype.send = function() {
        console.log("In send method. r is "); 
        var r = rand();
        window[r] =arguments;
        console.log(r);
    }
})();


//Simple encryptor
enc = function(str){
    return "ENC__" + str + "__ENC"
}

MsgParser = {
    //Parses, encrypts message and posts message
    parseMin: function(rawstr){
        if (rawstr.indexOf("user-generated-message") < 0) {
            return null;
        }        
        key = "message_batch[0][body]=";
        console.log(key)
        var ridx = rawstr.indexOf(key)
        var eidx = ridx+rawstr.substring(ridx).indexOf("&")        
        var en = rawstr.substring(ridx+key.length, eidx); //string to be replaced
        var dec = decodeURIComponent(en);
        //console.log
        
        var encs = enc(dec)
        //Encrypt this string
        var reqstr = rawstr.substring(0, ridx+key.length) +encodeURI(encs)+ rawstr.substring(eidx)
        console.log(reqstr)
        window.oldsend(reqstr)
        
    }
    ,
    //Return object represented by raw string
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
        return root;
    }
    ,
    
    encode: function(obj){
        //Convert obj to string
        return ""
    }   
}