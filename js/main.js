/*obteniendo datos de clima de api Dark Sky Weather*/
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
})

/*funcion ver los datos del pokemon buscado*/
$(document).ready(function(){
	$.ajax({
		url: 'http://pokeapi.co/api/v1/pokedex/1/',
		type: 'GET',
		datatype: 'JSON',
		
		success: function(response){
			/*veo en la consola lo que llamo con la fx, todos los console son para corroborar info en este caso*/
			console.log(response);
			/*al archivo json le faltan los corchetes al principio, por lo que la fx each no funciona, 
			así que con esto transformo el json en un string y le agrego los corchetes*/
			var data_json = "[" + JSON.stringify(response) + "]";
			console.log(data_json);

			/*es para "borrar" una sección de mi html 
			$("div[class='container']").html("");*/

/*luego cambio mi archivo string a un json y lo recorro, la i es el índice 
y el item es la variable con que rescataré los valores que me interesan*/
$.each(JSON.parse(data_json), function(i, item) {
	/*nuevamente recorro la variable que me interesa solo porque es un arreglo de objetos, la j es el índice 
	y el data_pokemon es la variable con que rescataré los valores que quiero*/
	$.each(item.pokemon, function(j, data_pokemon){
		/*para rescatar el id de mi pokemon, rescato el valor resource_uri (ejem: /api/v1/description/349/)
		y lo separo por el / ya que el link lo contiene y luego accedo a la posición 3 en donde está el id*/
		var v_id_pokemon = data_pokemon.resource_uri.split("/")[3];	
		/*finalmente inserto todos mis datos rescatados dentro de un div en el html*/		    	
		$("div[class='container']").append("<div id='dv_pokemon_" + j + "'>" + data_pokemon.name + "<img src='https://pokeapi.co/media/img/" + v_id_pokemon + ".png' ><div>");			    	
	});

});

},
/*esto se ejecuta cuando hay un error*/
error: function(request, status, error){
	console.log("error");
}

});


	$("#botonVerPoke").on("click", function(){
		var nombrePoke = $("#nombre").val();
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
})