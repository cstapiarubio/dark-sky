/**/
$(document).ready(function(){
	$("#boton").on("click", function(){
		var longitud = $("#nombre").val();
		var latitud = $("#nombre").val();
		$.ajax({
			url: 'http://pokeapi.co/api/v1/pokemon/' + longitud +latitud,
			type: 'GET',
			datatype: 'JSON',

		})

		.done(function(response){
             //div vacio//
             $("#contenedorPoke").append("<div id='pokemon'>"+'<h1>Pokemon</h1>'+ '<h3>'+ response.name +'</h3>' + '<p>Habilidades:'+ response.abilities[0].name + '</p>'+ '<p>Tipo:'+ response.types[0].name + '</p>'+  '<p>Altura:'+ response.height + '</p>' + '<p>Peso:'+ response.weight + '</p>' +"</div>")
             console.log(response.name);
         })

		.fail(function(error){
			console.log("error");
		})
	});

	$.ajax({
			url: 'http://pokeapi.co/api/v1/pokemon/',
			type: 'GET',
			datatype: 'JSON',
			data:{
				"limit":"20"
			}
		})

		.done(function(response){
			console.log(response);
			response.objects.forEach(function(elemento){
				console.log(elemento);
				var nombre=elemento.name.toLowerCase();

				var imagen=$('<img/>', {'src':'https://img.pokemondb.net/sprites/x-y/normal/' + nombre + '.png'});
				$("#contenedorPoke").append(imagen);
console.log(imagen);

			})
             //url:iv vacio//
            /* $("#contenedorPoke").append("<div id='pokemon'>"+'<h1>Pokemon</h1>'+ '<h3>'+ response.name +'</h3>' + '<p>Habilidades:'+ response.abilities[0].name + '</p>'+ '<p>Tipo:'+ response.types[0].name + '</p>'+  '<p>Altura:'+ response.height + '</p>' + '<p>Peso:'+ response.weight + '</p>' +"</div>")
             console.log(response.name);*/
         })

		.fail(function(error){
			console.log("error");
		})
})


