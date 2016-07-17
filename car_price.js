$(document).ready(function(){

	$("#set-price-submit").click(function(e){
		e.preventDefault();

		var data = {};
		data.title = "title";
		data.message = "message";

		console.log($('#car-price').val())
        $.ajax({
            url: "http://localhost:3000/set_price",
            type: "GET",
            data: {
                price: $('#car-price').val()
            }
          });
    });
});