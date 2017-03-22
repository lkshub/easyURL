$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(".navbar-header button").addClass('collapsed');
   $(".navbar-header button").removeClass('active');
   $(".navbar-header button").attr({
   	"aria-expanded": 'false'
   });
   $("#navbar-collapse").removeClass('in');
   $("#navbar-collapse").attr({
   	"aria-expanded": 'false'
   });
   $(this).parent().addClass("active");
});

$(document).on('input', "#long-home", function(e){
   if(this.value.length==0) {
      $("#submit-btn-home").attr({
         "disabled" : "disabled"
      });
   }else{
      $("#submit-btn-home").removeAttr('disabled');
   }
});

$(document).on('input', "#long-customize, #short-customize", function(e){
   if($("#long-customize").val().length==0 || $("#short-customize").val().length==0) {
      $("#submit-btn-customize").attr({
         "disabled" : "disabled"
      });
   }else{
      $("#submit-btn-customize").removeAttr('disabled');
   }
});

$(document).on('click', '#submit-btn-home', function(e){
   var long_url  = $("#form-home").serializeArray()[0].value;
   if(validateUrl(long_url)){
      $.ajax({
         url: '/generate',
         type: 'POST',
         dataType: 'json',
         data: {longURL : long_url},
      })
      .done(function(res) {
         console.log("success");
         var modal = $('#modal-success');
         modal.find('.modal-body').text("Your short url: ");
         var link = $('<a/>');
         link.text("ezurls.cc/"+res.shortURL);
         link.attr({
            href: "http://ezurls.cc/"+res.shortURL
         });
         modal.find('.modal-body').append(link);
         $('#modal-success').modal('show');
      })
      .fail(function() {
         console.log("error");
      })
      .always(function() {
         console.log("complete");
      });
   }
});

$(document).on('click', '#submit-btn-customize', function(e){
   var long_url  = $("#form-customize").serializeArray()[0].value;
   var short_url = $("#form-customize").serializeArray()[1].value;
   console.log($("#form-customize").serializeArray());
   if(validateUrl(long_url)){
      $.ajax({
         url: '/customize',
         type: 'POST',
         dataType: 'json',
         data: {longURL : long_url, shortURL : short_url},
      })
      .done(function(res) {
         console.log("success");
         console.log(res);
         if(res.inserted){
            var modal = $('#modal-success');
            modal.find('.modal-body').text("Your short url: ");
            var link = $('<a/>');
            link.text("ezurls.cc/"+res.shortURL);
            link.attr({
               href: "http://ezurls.cc/"+res.shortURL,
               target: "_blank"
            });
            console.log(link);
            modal.find('.modal-body').append(link);
            $('#modal-success').modal('show');
         }
      })
      .fail(function() {
         console.log("error");
      })
      .always(function() {
         console.log("complete");
      });
   }
});

function validateUrl(value) {
      return /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i.test(value);
}



