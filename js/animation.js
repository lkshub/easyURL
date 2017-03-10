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



