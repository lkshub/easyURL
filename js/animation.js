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


