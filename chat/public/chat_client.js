$(document).ready(function(){

	var socket = io();

	var d = new Date();
	var hours = d.getHours();
	console.log(hours);

	$.ajax({
	  url : "http://api.wunderground.com/api/e81f4372c7048507/geolookup/conditions/q/MA/Boston.json",
	  dataType : "jsonp",
	  success : function(parsed_json) {
		  var location = parsed_json['location']['city'];
		  var temp_f = parsed_json['current_observation']['temp_f'];
		  $("body").css("background-color", "rgb(" + (Math.round(temp_f*2.5)) + ",90,90)");
		  console.log(temp_f);
	  }
	});

	$("#chat-start").click(function(){
		$.ajax({
			url: "get_archive",
			success: function(data){
				$("#chat-log ul li").remove();
				for(var i=0;i<data.length;i++)
				{
					var msg = data[i];
					if(msg.username == $("#chat-name").val())
					{
						$("#chat-log ul").append("<li class='me-line'><b>" + msg.username + "</b>: " + msg.text + "</li>");
					}else{
						$("#chat-log ul").append("<li class='them-line'><b>" + msg.username + "</b>: " + msg.text + "</li>");
					}
				}
			}
		});
	});
	
	$("#chat-form").submit(function(){
		var messageObject = {};
		messageObject.username = $("#chat-name").val();
		messageObject.text = $("#chat-input").val();

		socket.emit("chat message", messageObject);
		$("#chat-input").val("");
		return false;
	});

	

	socket.on('chat message', function(msg){

		//determine the length in letters of the message

		var msgSize = msg.text.length/10;
		var msgSizeStyle = "font-size:"+msgSize+"px";

		console.log(msgSize);

		if(msg.username == $("#chat-name").val())
		{
			$("#chat-log ul").append("<li class='me-line' style=" +msgSizeStyle+ "><b>" + msg.username + "</b>: " + msg.text + "</li>");
		}else{
			$("#chat-log ul").append("<li class='me-line' style=" +msgSizeStyle+ "><b>" + msg.username + "</b>: " + msg.text + "</li>");
		}
	});

});












