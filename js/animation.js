$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(".navbar button").addClass('collapsed');
   $(".navbar button").removeClass('active');
   $(".navbar button").attr({
   	"aria-expanded": 'false'
   });
   $("#navbar-collapse").removeClass('in');
   $("#navbar-collapse").attr({
   	"aria-expanded": 'false'
   });
   $(this).parent().addClass("active");
});

