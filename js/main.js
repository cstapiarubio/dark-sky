/*obteniendo datos de clima de api Dark Sky Weather*/
$(document).ready(function(){
	   	$("#boton").on("click", function(){
		var latitud = $("#lat").val();
		var longitud = $("#long").val();
		$.ajax({
			url: 'https://api.darksky.net/forecast/c2887edce82244fb317fcd00d1664ab9/' + latitud + ","+ longitud,
			type: 'GET',
			datatype: 'JSON',
			success: function(response){
				console.log(response);
				$.each(response.currently, function(z, info){ 
					console.log(info);
					$("#contenedor").append("<div id='infoClima'>" + '<i>'+ info.icon +'</i>' + '<p>' + info.temperature + '</p>' +  '<p>Wind:'+ info.windSpeed + '</p>'+ '<p>Humidity:'+ info.humidity + '</p>'+  '<p>Uv Index:'+ info.uvIndex + '</p>' + '<p>Pressure:'+ info.pressure + '</p>' +"</div>");		
				});

			},
			error: function(request, status, error){
				console.log("error");
			}

		});
	});
});


