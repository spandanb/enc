//Setup jquery in console
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
// ... give time for script to load, then type.
jQuery.noConflict();


/*Facebook encrypt message being posted*/
var div = document.getElementsByClassName("_552h")[0];   //gets wrapper div
var tarea = div.getElementsByTagName("textarea")[0];  //get text area
var oldf = tarea.getAttribute("onkeydown");         //get default onkeydown
tarea.setAttribute("onkeydown", "encf()");           //set onkeydown method to custom method

encf = function(){    
    var div = document.getElementsByClassName("_552h")[0]; //use bind instead
    var tarea = div.getElementsByTagName("textarea")[0];
    var raw = tarea.value; //Get text in text area         
    console.log("Current text is: " + raw);
    if (event.keyCode == 13) { //"Return" key entered      
        //console.log(tarea);
        //var raw = tarea.value; //Get text in text area         
        //console.log("Current text is: " + raw);
        enc = function(raw){  //encrypt text
            return "A"+raw+"Z";
        }();
        tarea.value = enc;    //set textarea text to encrypted text
    }    
    eval(oldf); //execute default code
}

//get key press
document.onkeypress = function (e) {
    console.log(e.keyCode)
};


