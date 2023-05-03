//----------------------------------------------------------------------
// mainServidorREST.js
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
const cors = require('cors')
const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const LogicaUsuario = require( "../Logica/LogicaUsuario.js" )
//----------------------------------------------------------------------
//----------------------------------------------------------------------
function cargarLogicaUsuario( fichero ) {
	return new Promise( (resolver, rechazar) => {
		var laLogicaUsuario = new LogicaUsuario( fichero,
		function( err ) {
			if ( err ) {
				rechazar( err )
			} else {
				resolver( laLogicaUsuario )
			}
		}) // new
	}) // Promise
} // ()
//----------------------------------------------------------------------
// main()
//----------------------------------------------------------------------
async function main() {	
	var laLogicaUsuario = await cargarLogicaUsuario( "../bd/robotanica.bd" )
	// creo el servidor
	var servidorExpress = express()
	// CORS
	servidorExpress.use(cors())
	// para poder acceder a la carga de la petición http
	// asumiendo que es JSON
	servidorExpress.use ( bodyParser.text({type: 'application/json'}) )
	// cargo las reglas REST
	var reglas = require( "./ReglasREST.js")
	reglas.cargar( servidorExpress, laLogicaUsuario )
	// arranco el servidor
	var servicio = servidorExpress.listen( 8080, function() {
		console.log( "servidor REST escuchando en el puerto 8080 ")
	})
	// capturo control-c para cerrar el servicio ordenadamente
	process.on('SIGINT', function() {
		console.log (" terminando ")
		servicio.close ()
	})
} // ()
//----------------------------------------------------------------------
//----------------------------------------------------------------------
main()
//----------------------------------------------------------------------
//----------------------------------------------------------------------