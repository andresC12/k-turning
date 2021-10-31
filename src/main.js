import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
var DB = openDatabase('kturning', '1.0', 'This is a client side database', 50 * 1024 * 1024);


DB.transaction(function (exe) {
	//CREAR RELACION ROL
	exe.executeSql("CREATE TABLE IF NOT EXISTS rol (id INTEGER PRIMARY KEY, name VARCHAR)");
    //CREAR RELACION USER
	exe.executeSql("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY,id_rol integer, email VARCHAR, password VARCHAR, placa VARCHAR)");
	//CREAR RELACION CITA
	exe.executeSql("CREATE TABLE IF NOT EXISTS cita (id INTEGER PRIMARY KEY,fecha VARCHAR,hora VARCHAR, cupos integer,disponible integer,estado VARCHAR, tipo_de_cita VARCHAR, modulo VARCHAR, fecha_registro VARCHAR)");
	//CREAR RELACION CITA DETALLE
	/* 
		OBSERVACIONES:
		1. ESTADOS DE CITA [NO DISPONIBLE, CREADA].
		1. ESTADOS DE CITA DETALLE [TOMADA, COMPLETADA, VENCIDA(ESTA LA DEFINE EL OPERARIO ENTRADA)]. 
	*/
	exe.executeSql("CREATE TABLE IF NOT EXISTS cita_detalle (id INTEGER PRIMARY KEY, id_user_transportador integer,id_user_operario integer, peso_entrada float, peso_salida float,peso_neto float,autorizacion VARCHAR, estado VARCHAR,fecha_registro VARCHAR)");

});	


function insertRoles(){
	DB.transaction(function (exe) {
	    exe.executeSql("insert into rol ('name') values('Transportador')");
		exe.executeSql("insert into rol ('name') values('Operario Oficina')");
		exe.executeSql("insert into rol ('name') values('Operario Entrada')");            
	});   
}

function insertUser(){
	DB.transaction(function (exe) {
	    exe.executeSql("insert into user (id_rol, email, password) values(2,'administrador','12345')");
	    exe.executeSql("insert into user (id_rol, email, password, placa) values(1,'transporte@klever.com','12345', 'RCA-442')");
	});   
}

function validarRegistros(){	
	var tables = ['rol','user'];
	tables.forEach(function(table) {
    	DB.transaction(function (exe) {		
			exe.executeSql(`select * from ${table}`,  [], function (tran, data) {						
		    	if(data.rows.length == 0 && table == 'rol')insertRoles();
		    	if(data.rows.length == 0 && table == 'user')insertUser();   		    	
		    });
   		})
	});
	
}

//SE VALIDA QUE LOS REGISTROS INICIALES NO SEAN INSERTADOS MAS DE UNA VEZ.
validarRegistros();
