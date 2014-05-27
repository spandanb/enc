#Load jQuery
(function(){
  var newscript = document.createElement('script');
     newscript.type = 'text/javascript';
     newscript.async = true;
     newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
})();

#Test 
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

(function() {
    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
        console.log("In open method. url is " + url);
        console.log(method);
    }
})();


(function() {
    XMLHttpRequest.prototype.send = function() {
        console.log("In send method. r is ");
        var r = rand();
        window[r]
        console.log(arguments);
    }
})();

rand = function() {
    return Math.random().toString(36).substr(2, 3)
}




"message_batch[0][action_type]=ma-type%3Auser-generated-message&message_batch[0][thread_id]=mid.1377353860395%3A0dcf589fd6876b5672&message_batch[0][author]=fbid%3A542985460&message_batch[0][author_email]&message_batch[0][coordinates]&message_batch[0][timestamp]=1401222833307&message_batch[0][timestamp_absolute]=Today&message_batch[0][timestamp_relative]=4%3A33pm&message_batch[0][timestamp_time_passed]=0&message_batch[0][is_unread]=false&message_batch[0][is_cleared]=false&message_batch[0][is_forward]=false&message_batch[0][is_filtered_content]=false&message_batch[0][is_spoof_warning]=false&message_batch[0][source]=source%3Achat%3Aweb&message_batch[0][source_tags][0]=source%3Achat&message_batch[0][body]=hello%20world&message_batch[0][has_attachment]=false&message_batch[0][html_body]=false&&message_batch[0][specific_to_list][0]=fbid%3A542985460&message_batch[0][specific_to_list][1]=fbid%3A542985460&message_batch[0][signatureID]=1ede20c6&message_batch[0][ui_push_phase]=V3&message_batch[0][status]=0&message_batch[0][message_id]=%3C1401222833307%3A2177927765-1706697862%40mail.projektitan.com%3E&&client=mercury&__user=542985460&__a=1&__dyn=7n8anEAMCBynzpQ9UoHaEWy6zECQqbx2mbAKGiyGGEVF4YxUpBxCviG9zo&__req=1a&fb_dtsg=AQGhITzGAOLs&ttstamp=2658171104738412271657976115&__rev=1264587"