<template>
	<div class="content-consult">
		<div class="header-consult">
			<div class="header-options">
				<h4>Consultar citas</h4>
				<h5 @click="logout()">Cerrar sesión</h5>
			</div>
			<div class="search-template">
				<input type="text" placeholder="Ingrese el codigo" v-model="codigo">
				<div class="content-icon">
					<i class="fas fa-search" @click="consultDate(codigo)"></i>
				</div>
			</div>
		</div>
		<div class="result-consult" v-if="form.length > 0">
			<div class="header-result">
				<div class="icon-container">
					<i class="far fa-user"></i>
				</div>
				<div class="transporter-info">
					<h4>Correo:</h4>
					<h5>{{ form[0].email }}</h5>
				</div>
			</div>
			<div class="dates-detail">
				<h4><i class="far fa-calendar-alt"></i> {{form[0].fecha}}</h4>
			</div>
			<div class="dates-detail">
				<h4><i class="far fa-clock"></i> {{ form[0].hora }}</h4>
			</div>
			<div class="dates-detail">
				<h4><span>Modulo:</span> {{ form[0].modulo }}</h4>
			</div>
			<div class="dates-detail">
				<h4><span>Tipo:</span> {{ form[0].tipo_de_cita }}</h4>
			</div>
			<div class="dates-detail">
				<h4><span>Estado:</span> {{ form[0].estado }}</h4>
			</div>
			<div class="data-weight">
				<div class="dates-detail">
					<h4><span>Peso de entrada:</span> {{ form[0].peso_entrada }}</h4>
				</div>
				<div class="dates-detail">
					<h4><span>Peso de salida:</span> {{ form[0].peso_salida }}</h4>
				</div>
				<div class="dates-detail">
					<h4><span>Peso neto:</span> {{ form[0].peso_neto }}</h4>
				</div>
			</div>
			<div class="register-button">
				<button @click="status_peso = true">Registrar peso</button>
			</div>
		</div>
		<div class="container-detail-likes" v-if="status_peso">
			<div class="content-likes-list">
				<h4>Registrar peso</h4>
				<div class="input-options">
					<input type="text" placeholder="Peso de entrada" v-model="peso_entrada">
					<input type="text" placeholder="Peso de salida" v-model="peso_salida">
				</div>
				<!--<div class="result-peso">
					<h5>Peso neto: {{form[0].peso_neto}}</h5>
				</div>-->
				<button @click="updatePeso()">Calcular</button>
			</div>
		</div>
	</div>
</template>

<style>

	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.header-options{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-options h5{
		font-size: 14px;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		color: #5493C9;
	}

	.result-peso{
		width: 100%;
		padding-bottom: 10px;
		text-align: left;
	}

	.result-peso h5{
		font-size: 16px;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
	}

	.container-detail-likes{
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0,.7);
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content-likes-list{
		width: 75%;
		height: 40vh;
		background: #fff;
		border-radius: 20px;
		padding: 20px;
	}

	.content-likes-list button{
		width: 100%;
		color: #fff;
		padding: 15px 0px;
		border: none;
		font-size: 15px;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		border-radius: 10px;
		background: #5493C9;
	}

	.content-likes-list h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 17px;
	}

	.content-consult{
		width: 100%;
		height: auto;
	}

	.header-consult{
		width: 100%;
		height: 19vh;
		background: #F4F5FA;
		padding: 20px;
		display: block;
	}

	.header-consult h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 20px;
		color: #2B2D2C;
	}

	.search-template{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: #fff;
		border-radius: 10px;
		padding: 11px 20px;
		margin-top: 13px;
	}

	.search-template input{
		width: 90%;
		background: transparent;
		border: none;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 15px;
	}

	.content-icon{
		background: #5493C9;
		padding: 5px 7px;
		border-radius: 5px;
	}

	.content-icon i{
		color: #fff;
		font-size: 14px;
	}

	.result-consult{
		background: #fff;
		border-radius: 20px;
		height: 80vh;
		margin-top: -10px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
		padding: 30px 25px;
	}

	.header-result{
		width: 100%;
		display: block;
		border-bottom: 1px solid #ddd;
	}

	.icon-container{
		width: 65px;
		height: 65px;
		border-radius: 50%;
		background: #5493C9;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}

	.icon-container i{
		color: #fff;
		font-size: 17px;
	}

	.transporter-info{
		width: 100%;
		padding: 15px 0px;
		text-align: center;
	}

	.transporter-info h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 17px;
		margin-bottom: 5px;
	}

	.transporter-info h5{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 14px;
	}

	.dates-detail{
		width: 100%;
		padding-top: 15px;
	}

	.dates-detail h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 14px;
	}

	.dates-detail span{
		font-weight: 600;
	}

	.data-weight{
		width: 100%;
		padding-bottom: 15px;
		border-top: 1px solid #ddd;
		margin-top: 10px;
		border-bottom: 1px solid #ddd;
	}

	.register-button{
		width: 100%;
		text-align: center;
		padding: 20px 0px;
	}

	.register-button button{
		width: 100%;
		color: #fff;
		padding: 15px 0px;
		border: none;
		font-size: 15px;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		border-radius: 10px;
		background: #5493C9;
	}

	.input-options{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 10px 0px;
	}

	.input-options input{
		width: 100%;
		margin-bottom:10px ;
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: 15px 5px;
	}

</style>

<script>
	export default{
		data(){
			return{
				peso_entrada: 0,
				peso_salida: 0,
				peso_neto: 0,
				id_user: localStorage.getItem('id_user_operario'),
				codigo: "",
				form: [],
				status_peso: false,
				DB: null
			}
		},
		methods:{
			logout(){
				localStorage.clear();
				location.href = "/";
			},
			updatePeso(){
				var self = this;
				if (self.form[0].tipo_de_cita == "Contenedor exportación") {
					self.peso_neto = self.peso_salida - self.peso_entrada;
				}
				if (self.form[0].tipo_de_cita == "Contenedor importación") {
					self.peso_neto = self.peso_entrada - self.peso_salida;
				}
				this.DB.transaction(function (tran) {
              		tran.executeSql(`update cita_detalle set peso_entrada = ${self.peso_entrada}, peso_salida = ${self.peso_salida}, peso_neto = ${self.peso_neto}, id_user_operario = ${self.id_user}, estado = 'Finalizada' where id =${self.form[0].id} `, [], function (tran, data) {
                   		self.consultDate(self.codigo);
                   		self.status_peso = false;
               		});
           		});
			},
			consultDate(autorization){
				var self = this;
				this.DB.transaction(function (tran) {
              		tran.executeSql(`select c.fecha, u.email,c.hora,c.modulo,c.tipo_de_cita,cd.estado,cd.id, coalesce(peso_entrada,0) as peso_entrada,coalesce(peso_salida,0) as peso_salida,coalesce(peso_neto,0) as peso_neto from cita c join cita_detalle cd join user u on u.id = cd.id_user_transportador where cd.autorizacion = ${autorization} order by cd.id desc LIMIT 1;`, [], function (tran, data) {
                   		if (data.rows.length > 0) {
                   			self.form = data.rows;
                   			self.peso_entrada = self.form[0].peso_entrada;
                   			self.peso_salida = self.form[0].peso_salida;
                   			self.peso_neto = self.form[0].peso_neto;
                   		}
               		});
           		});
			}
		},
		mounted(){
			this.DB = openDatabase('kturning', '1.0', 'This is a client side database', 50 * 1024 * 1024);
			if (!localStorage.getItem('id_user_operario')) {
				location.href = "/";
			}
		}
	}
</script>