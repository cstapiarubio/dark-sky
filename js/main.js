$.ajax({
			url: 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&nojsoncallback=1"',
			type: 'GET',
			datatype: 'JSON',
			success: function(response){
				console.log(response);
				$.each(response.flavor_text_entries, function(z, info){ 
					console.log(info);
					var texto= info.flavor_text[2];
					console.log(texto);
					$("#contenedorPoke").append("<div id='pokemon'>"+'<h1>Pokemon</h1>'+ '<h3>'+ info.name +'</h3>' + '<p>' + texto + '</p>' +  '<p>Habilidades:'+ info.abilities[0].name + '</p>'+ '<p>Tipo:'+ info.types[0].name + '</p>'+  '<p>Altura:'+ info.height + '</p>' + '<p>Peso:'+ info.weight + '</p>' +"</div>");		
				});

			},
			error: function(request, status, error){
				console.log("error");
			}

		});



/*function weatherReport(latitude, longitude) {
	// variables config for coordinates, url and api key
	// latitude and longitude are accepted arguments and passed
	// once a user has submitted the form.
	var apiKey       = 'c2887edce82244fb317fcd00d1664ab9',
			url          = 'https://api.darksky.net/forecast/',
			lati         = latitude,
			longi        = longitude,
			api_call     = url + apiKey + "/" + lati + "," + longi + "?extend=hourly&callback=?";

	// Hold our days of the week for reference later.
	var days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	// Hold hourly values for each day of the week.
	// This will store our 24 hour forecast results.
	var sunday    = [],
			monday    = [],
			tuesday   = [],
			wednesday = [],
			thursday  = [],
			friday    = [],
			saturday  = [];

	// Celsius button check. Is it toggled or not?
	var isCelsiusChecked = $('#celsius:checked').length > 0;

	// Hourly report method to reference in our daily loop
	function hourlyReport(day, selector) {
		for(var i = 0, l = day.length; i < l; i++) {
			$("." + selector + " " + "ul").append('<li>' + Math.round(day[i]) + '</li>');
		}
	}

	// Call to the DarkSky API to retrieve JSON
	$.getJSON(api_call, function(forecast) {

		// Loop thru hourly forecasts
		for(var j = 0, k = forecast.hourly.data.length; j < k; j++) {
			var hourly_date    = new Date(forecast.hourly.data[j].time * 1000),
					hourly_day     = days[hourly_date.getDay()],
					hourly_temp    = forecast.hourly.data[j].temperature;

			// If Celsius is checked then convert degrees to celsius
			// for general forecast report.
			if(isCelsiusChecked) {
				hourly_temp = fToC(hourly_temp);
				hourly_temp = Math.round((hourly_temp));
			}

			// push 24 hour forecast values to our empty days array
			switch(hourly_day) {
				case 'Sunday':
					sunday.push(hourly_temp);
					break;
				case 'Monday':
					monday.push(hourly_temp);
					break;
				case 'Tuesday':
					tuesday.push(hourly_temp);
					break;
				case 'Wednesday':
					wednesday.push(hourly_temp);
					break;
				case 'Thursday':
					thursday.push(hourly_temp);
					break;
				case 'Friday':
					friday.push(hourly_temp);
					break;
				case 'Saturday':
					saturday.push(hourly_temp);
					break;
				default: console.log(hourly_date.toLocaleTimeString());
					break;
			}
		}

		// Loop thru daily forecasts
		for(var i = 0, l = forecast.daily.data.length; i < l - 1; i++) {

			var date     = new Date(forecast.daily.data[i].time * 1000),
					day      = days[date.getDay()],
					skicons  = forecast.daily.data[i].icon,
					time     = forecast.daily.data[i].time,
					humidity = forecast.daily.data[i].humidity,
					summary  = forecast.daily.data[i].summary,
					temp    = Math.round(forecast.hourly.data[i].temperature),
					tempMax = Math.round(forecast.daily.data[i].temperatureMax);

			// If Celsius is checked then convert degrees to celsius
			// for 24 hour forecast results
			if(isCelsiusChecked) {
				temp    = fToC(temp);
				tempMax = fToC(tempMax);
				temp = Math.round(temp);
				tempMax = Math.round(tempMax);
			}

			// Append Markup for each Forecast of the 7 day week
			$("#forecast").append(
				'<li class="shade-'+ skicons +'"><div class="card-container"><div><div class="front card"><div>' +
					"<div class='graphic'><canvas class=" + skicons + "></canvas></div>" +
					"<div><b>Day</b>: " + date.toLocaleDateString() + "</div>" +
					"<div><b>Temperature</b>: " + temp + "</div>" +
					"<div><b>Max Temp.</b>: " + tempMax + "</div>" +
					"<div><b>Humidity</b>: " + humidity + "</div>" +
					'<p class="summary">' + summary + '</p>' +
					'</div></div><div class="back card">' +
					'<div class="hourly' + ' ' + day + '"><b>24hr Forecast</b><ul class="list-reset"></ul></div></div></div></div></li>'
			);

			// Daily forecast report for each day of the week
			switch(day) {
				case 'Sunday':
					hourlyReport(sunday, days[0]);
					break;
				case 'Monday':
					hourlyReport(monday, days[1]);
					break;
				case 'Tuesday':
					hourlyReport(tuesday, days[2]);
					break;
				case 'Wednesday':
					hourlyReport(wednesday, days[3]);
					break;
				case 'Thursday':
					hourlyReport(thursday, days[4]);
					break;
				case 'Friday':
					hourlyReport(friday, days[5]);
					break;
				case 'Saturday':
					hourlyReport(saturday, days[6]);
					break;
			}
		}

		skycons(); // inject skycons for each forecast
		staggerFade(); // fade-in forecast cards in a stagger-esque fashion

	});
}

/*obteniendo datos de clima de api Dark Sky Weather*/
/*$(document).ready(function(){
	    var latitud = $("#lat").val();
		var longitud = $("#long").val();
	$.ajax({
		url : "https://api.darksky.net/forecast/c2887edce82244fb317fcd00d1664ab9/" + latitud + ","+ longitud + "?exclude=minutely,hourly,daily,alerts,flags",
		type: 'GET',
		datatype: 'jsonp',
		
		success: function(response){
			/*veo en la consola lo que llamo con la fx, todos los console son para corroborar info en este caso*/
			/*console.log(response);
			/*al archivo json le faltan los corchetes al principio, por lo que la fx each no funciona, 
			así que con esto transformo el json en un string y le agrego los corchetes*/
			/*var data_json = "[" + JSON.stringify(response) + "]";
			console.log(data_json);

			/*es para "borrar" una sección de mi html 
			$("div[class='container']").html("");*/

/*luego cambio mi archivo string a un json y lo recorro, la i es el índice 
y el item es la variable con que rescataré los valores que me interesan*/
/*$.each(JSON.parse(data_json), function(i, item) {
	/*nuevamente recorro la variable que me interesa solo porque es un arreglo de objetos, la j es el índice 
	y el data_pokemon es la variable con que rescataré los valores que quiero*/
	/*$.each(item.currently, function(j, data_pokemon){
		/*para rescatar el id de mi pokemon, rescato el valor resource_uri (ejem: /api/v1/description/349/)
		y lo separo por el / ya que el link lo contiene y luego accedo a la posición 3 en donde está el id*/
		/*var v_id_pokemon = data_pokemon.humidity;	
		/*finalmente inserto todos mis datos rescatados dentro de un div en el html*/		    	
		/*$("div[class='container']").append("<div id='dv_pokemon_" + j + "'>" + v_id_pokemon+ "<div>");			    	
	});

});

},
/*esto se ejecuta cuando hay un error*/
/*error: function(request, status, error){
	console.log("error");
}

});
})

	/*$("#boton").on("click", function(){
		var latitud = $("#lat").val();
		var longitud = $("#long").val();
		$.ajax({
			url: 'http://pokeapi.co/api/v2/pokemon-species/' + nombrePoke,
			type: 'GET',
			datatype: 'JSON',
			success: function(response){
				console.log(response);
				$.each(response.flavor_text_entries, function(z, info){ 
					console.log(info);
					var texto= info.flavor_text[2];
					console.log(texto);
					$("#contenedorPoke").append("<div id='pokemon'>"+'<h1>Pokemon</h1>'+ '<h3>'+ info.name +'</h3>' + '<p>' + texto + '</p>' +  '<p>Habilidades:'+ info.abilities[0].name + '</p>'+ '<p>Tipo:'+ info.types[0].name + '</p>'+  '<p>Altura:'+ info.height + '</p>' + '<p>Peso:'+ info.weight + '</p>' +"</div>");		
				});

			},
			error: function(request, status, error){
				console.log("error");
			}

		});
	});

$(document).ready(function(){
	$("#boton").on("click", function(){
		var latitud = $("#lat").val();
		var longitud = $("#long").val();
		var clave = "c2887edce82244fb317fcd00d1664ab9";
		
		$.ajax({
			url: 'https://api.darksky.net/forecast/'+ clave + "/"+latitud+ "," +longitud,
			type: 'GET',
			datatype: 'JSON'
		})

		.done(function(response){
             //div vacio//
             $("#contenedor").append("<div id='datos'>"+'<h1>Pronóstico</h1>'+ '<i>'+ response.icon + '</i>'+ '<p>Temperatura minima:'+ response.temperatureMin + '</p>'+ '<p>Temperatura máxima:'+ response.temperatureMax + '</p>'+  '<p>Presión:'+ response.pressure + '</p>' + '<p>Humedad:'+ response.humidity + '</p>' + '<p>Viento:'+ response.windSpeed + '</p>'+"</div>")
             console.log(response);
         })

		.fail(function(error){
			console.log("error");
		})
	});
})*/

