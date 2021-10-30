<template>
	<div class="contenedor-login">
		<div class="user-data-container">
			<div class="user-container-img">
				<i class="far fa-user"></i>
			</div>
			<!--<div class="header-login">
				<i class="far fa-user"></i>
				<h4>Bienvenido</h4>
			</div>-->
			<div class="input-container">
				<input type="text" name="" placeholder="Usuario" v-model="form.user">
				<input type="password" name="" placeholder="Contraseña" v-model="form.password">
				<button @click="validateSession()">Ingresar</button>
				<div class="status-login" v-show="loginresponse" v-bind:style="styleObject">
					<span>{{ statusText }}</span>
				</div>
			</div>
			<div class="copyright">
				<span>Developed by <b>Andrés Cáceres</b></span>
			</div>
		</div>
	</div>
</template>

<style>

	@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	*:focus{
		outline: none;
		box-shadow: none;
	}

	@media only screen and (min-width: 345px) and (max-width: 450px){
	    .user-data-container{
			background: #fff;
			height: 100vh !important;
			border-radius: 0 !important;
			padding-top: 25% !important;
		}
	  }

	.header-login{
		padding: 30px 40px 20px 40px;
		text-align: center;
	}

	.header-login h4{
		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		font-size: 25px;
		color: #2B2D2C;
	}

	.header-login i{
		font-size: 30px;
		color: #5493C9;
	}

	.contenedor-login{
		width: 100%;
		height: 100vh;
		background: url('/puerto.jpg');
		background-size: cover;
		background-position: bottom center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.user-data-container{
		background: #fff;
		width: 400px;
		padding-top: 5%;
		height: 85vh;
		border-radius: 20px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
		display: block;
	}

	.user-container-img{
		width: 110px;
		height: 110px;
		border-radius: 50%;
		margin: 0 auto;
		background: #5493C9;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20px;
	}

	.user-container-img i{
		color: #fff;
		font-size: 35px;
	}

	.input-container{
		width: 100%;
		display: block;
		padding: 0px 40px;
	}

	.input-container input{
		width: 100%;
		border: none;
		border-radius: 25px;
		padding: 15px 25px;
		background: rgba(68, 108, 255,.2);
		margin-bottom: 15px;
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		font-size: 14px;
	}

	.input-container button{
		border: none;
		color: #fff;
		background: #5493C9;
		width: 100%;
		border-radius: 25px;
		padding: 15px 0px;
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		font-size: 15px;
		margin-top: 10px;
		cursor: pointer;
	}

	.input-container button:hover{
		transform: scale(1.02);
		transition: all .3s ease-in-out;
	}

	.copyright{
		width: 100%;
		text-align: center;
		padding-top: 35px;
	}

	.copyright span{
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		font-size: 12px;
	}

	.status-login{
		width: 100%;
		padding: 15px 0px;
		text-align: center;
		margin-top: 10px;
		border-radius: 15px;
	}

	.status-login span{
		color: #fff;
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		font-size: 12px;
	}

	.success{
		background-color: green;
	}

	.danger{
		background-color: red;
	}
</style>

<script>
	import axios from 'axios';
	export default{
		data(){
			return{
				form:{
					user: null,
					password: null
				},
				statusText: "",
				loginresponse: false,
				styleObject:{
					backgroundColor: "green"
				}
			}
		},
		methods:{
			validateLogin(){
				var self = this;
				//realizamos la petición al endpoint desarrollado que valida las credenciales
				axios.post("http://127.0.0.1:8000/api/login", this.form)
				.then(res => {
					//activamos el mensaje emergente cuando obtenemos una respuesta
					this.loginresponse = true;
					if (res.data.statusCode == 200) {
						//manejamos los estilos del mensaje de forma dinamica, mendiante el uso de un objeto y la propiedad v-bind-style
						//si obtenemos una respuesta positiva, le asignamos un color verde
						this.styleObject.backgroundColor = "green";
						this.statusText = res.data.statusText;

					}else{
						//si obtenemos una respuesta negativa, le asignamos un color rojo 
						this.styleObject.backgroundColor = "red";
						this.statusText = res.data.statusText;
					}
					//despues de un determinado tiempo, ocultamos el mensaje emergente y realizamos la recirección al dashboard
					setTimeout(function(){
						self.loginresponse = false;
						if (res.data.statusCode == 200) {
							location.href = "dashboard"
						}
					},1000);
				})
				.catch(err =>{
					console.log(err);
				});
			},
			validateSession(){
				var self = this;
				var DB = openDatabase('kturning', '1.0', 'This is a client side database', 50 * 1024 * 1024);
				DB.transaction(function (tran) {
              		tran.executeSql(`select * from user where email = '${self.form.user}' and password = '${self.form.password}'`, [], function (tran, data) {
                   		if (data.rows.length > 0) {
                   			self.loginresponse = true;
                   			self.styleObject.backgroundColor = "green";
                   			self.statusText = "Credenciales correctas";
                   			if(data.rows[0].id_rol == 2){
                   				location.href = "dashboard";
                   			}
                   			if(data.rows[0].id_rol == 1){
                   				location.href = "autorizacion";
                   			}
                   			console.log(data.rows[0])
                   			//location.href = "dashboard";
                   		}else{
                   			self.loginresponse = true;
                   			self.styleObject.backgroundColor = "red";
                   			self.statusText = "Credenciales incorrectas";
                   		}
                   		setTimeout(function(){
							self.loginresponse = false;
						},1000);
               		});
           		});	
			}
		},
		mounted(){
		}
	}
</script>