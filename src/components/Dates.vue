<template>
	<div class="dates-content">
		<div class="dates-header">
			<div class="options-header">
				<h4>Consultar citas</h4>
				<h5 @click="logout()">Cerrar sesión</h5>
			</div>
			<div class="filter-options">
				<div class="first-option">
					<div class="variantes">					
						<div class="variante1">
							<select v-model="selected">
							  <option v-for="option in dates" v-bind:value="option.fecha">
							    {{ option.text }}
							  </option>
							</select>	
						</div>
					</div>
				</div>
				<div class="second-option">
					<button @click="listDates(selected)">Consultar</button>
				</div>
			</div>
		</div>
		<div class="dates-list">
			<div class="single-date" v-for="(item, index) in dateList" :key="index">
				<div class="single-header-date">
					<h4>{{ item.tipo_de_cita }}</h4>
					<h5>Modulo: {{ item.modulo }}</h5>
				</div>
				<div class="single-date-info">
					<h4><i class="far fa-calendar-alt"></i> {{ item.fecha }}</h4>
					<h4><i class="far fa-clock"></i> {{ item.hora }}</h4>
					<h4 class="state" v-show="item.disponible > 0"><i class="fas fa-circle"></i>Disponible</h4>
					<h4 class="state2" v-show="item.disponible == 0"><i class="fas fa-circle"></i>Sin disponibilidad</h4>
				</div>
				<div class="single-date-button">
					<button @click="validarCita(item)" v-show="item.disponible > 0">Tomar cita</button>
				</div>
			</div>
		</div>
		
		<div class="container-detail-likes" v-show="status_confirm">
			<div class="content-likes-list">
				<div class="content-wrapper">
					<i class="far fa-calendar-check"></i>
					<h4>Cita registrada exitosamente</h4>
					<button @click="status_confirm = false">Aceptar</button>
				</div>
			</div>
		</div>
		<div class="flotant-option" @click="user_status = true">
			<i class="far fa-calendar-alt"></i>
		</div>
		<div class="container-detail-likes" v-show="user_status">
			<div class="content-likes-list-2">
				<div class="likes-wrapper">
					<h4>Mis citas</h4>
					<div class="date-list-info" v-for="(item, index) in listUser" :key="index">
						<h5>Autorización: {{ item.autorizacion }}</h5>
						<div class="single-date-info-2">
							<h4><i class="far fa-calendar-alt"></i> {{ item.fecha_registro.split(" ")[0] }}</h4>
							<h4><i class="far fa-clock"></i> {{ item.fecha_registro.split(" ")[1] }}</h4>
							<h4 class="state" v-if="item.estado == 'Cumplida'"><i class="fas fa-circle"></i>{{ item.estado }}</h4>
							<h4 class="state3" v-if="item.estado == 'Tomada' && item.fecha >= date"><i class="fas fa-circle"></i>{{ item.estado }}</h4>
							<h4 class="state4" v-if="item.fecha < date && !item.peso_entrada"><i class="fas fa-circle"></i>Vencida</h4>
						</div>
					</div>
				</div>
				<div class="button-option">
					<button @click="user_status = false">Cerrar</button>	
				</div>
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

	.button-option{
		width: 100%;
	}

	.options-header h5{
		font-size: 14px;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		color: #5493C9;
	}

	.options-header{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.button-option button{
		width: 100%;
		color: #fff;
		background: #5493C9;
		border: none;
		padding: 15px 0px;
		border-radius: 5px;
	}

	.likes-wrapper{
		width: 100%;
		display: block;
		padding: 10px 0px;
		height:60vh;
	}

	.date-list-info{
		width: 100%;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		align-self: flex-start;
		margin-top: 10px;
		text-align: left;
	}

	.date-list-info h5{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 15px;
		padding-bottom: 5px;
	}

	.content-wrapper button{
		width: 100%;
		border: none;
		color: #fff;
		background-color:#43B984;
		margin-top: 15px;
		padding:12px 0px;
		border-radius: 5px;
	}

	.flotant-option{
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: #5493C9;
		position: fixed;
		right: 25px;
		bottom: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.flotant-option i{
		color: #fff;
		font-size: 18px;
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
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.content-likes-list-2{
		width: 85%;
		height: 80vh;
		background: #fff;
		border-radius: 20px;
		padding: 20px;
		text-align: center;
		display: flex;
		flex-wrap: wrap;
		text-align: left;
	}

	.content-likes-list-2 h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 18px;
	}

	.content-likes-list i {
		color: #43B984;
		font-size: 80px;
		margin-bottom: 15px;
		width: 100%;
	}

	.content-likes-list h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 18px;
		width: 100%;
	}

	.dates-header{
		width: 100%;
		padding: 20px;
		border-bottom: 1px solid #ddd;
	}

	.dates-header h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 21px;
		color: #2B2D2C;
	}

	.variantes{
		width: 100%;
	}

	.variantes select{
		width: 100%;
		padding: 8px 5px;
		color: #51565A;
		background: #fff;
		cursor: pointer;
		border: 1px solid #ddd;
		border-radius: 5px;
		appearance: none;
		-webkit-appearance: none;
		background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
		background-repeat: no-repeat;
		background-size: 28px;
		background-position-x: 100%;
	  	background-position-y: 3px;
	}

	.variantes select:focus{
		outline: none;
	}

	.filter-options{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 15px 0px 0px 0px;
	}

	.first-option{
		width: 60%;
	}

	.second-option{
		width: 40%;
		text-align: right;
	}

	.second-option button{
		width: 80%;
		background: #5493C9;
		color: #fff;
		border: none;
		padding: 9px 0px;
		border-radius: 5px;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 13px;
	}

	.dates-list{
		width: 100%;
		padding: 20px;
		display: block;
	}

	.single-date{
		width: 100%;
		border: 1px solid #ddd;
		border-radius: 10px;
		margin-bottom: 15px;
	}

	.single-header-date{
		width: 100%;
		padding: 15px 15px 10px 15px;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}

	.single-header-date h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 16px;
		color: #2B2D2C;
	}

	.single-header-date h5{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 14px;
		color: #2B2D2C;
	}

	.single-date-info{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 15px 15px 5px 15px;
	}

	.single-date-info h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 13px;
		margin-right: 10px;
		color: #2B2D2C;
	}

	.single-date-info i{
		margin-right: 5px;
		font-size: 13px;
	}

	.single-date-info-2{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 5px 0px;
	}

	.single-date-info-2 h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 12px;
		margin-right: 10px;
		color: #2B2D2C;
	}

	.single-date-info-2 i{
		margin-right: 5px;
		font-size: 12px;
	}

	.state i{
		color: green;
	}

	.state2 i{
		color: red;
	}

	.state3 i{
		color: orange;
	}

	.state4 i{
		color: red;
	}

	.single-date-button{
		width: 100%;
		padding: 5px 15px 15px 15px;
	}

	.single-date-button button{
		background: #5493C9;
		color: #fff;
		border: none;
		padding: 10px 30px;
		border-radius: 5px;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 13px;
	}
</style>

<script>
	import moment from 'moment';
	export default{
		data(){
			return{
				date: moment().format('YYYY-MM-DD'),
				user_status: false,
				listUser: [],
				status:true,
				status_confirm: false,
				id_user_transportador: localStorage.getItem('id_user_transportador'),
				autorizacion: localStorage.getItem('autorizacion'),
				selected: moment().format('YYYY-MM-DD'),
				dates: [
					{
						text: "Hoy",
						fecha: moment().format('YYYY-MM-DD')
					},
					{
						text: "Mañana",
						fecha:moment().add(1, 'days')		
					},
					{
						text: "Pasado mañana",
						fecha:moment().add(2, 'days')		
					}
				],
				dateList: [],
				DB: null
			}
		},
		methods:{
			logout(){
				localStorage.clear();
				location.href = "/";
			},
			validarCita(date){
				var self = this;
				this.DB.transaction(function (exe) {
				    exe.executeSql(`select * from cita_detalle where id_user_transportador = ${self.id_user_transportador} and id_cita = ${date.id} and estado != 'Cumplida'`, [], function(tran, data){
				    	if (data.rows.length > 0) {
				    		alert("Ya has tomado esta cita")
				    	}else{
				    		self.registerDate(date);
				    	}
				    });
				});
			},
			registerDate(date){
				var self = this;
				this.DB.transaction(function (exe) {
				    exe.executeSql(`insert into cita_detalle (id_cita,id_user_transportador, autorizacion, estado, fecha_registro) values(${date.id},'${self.id_user_transportador}', '${self.autorizacion}', 'Tomada', '${moment().format('YYYY-MM-DD HH:mm:ss')}')`, [], function(tran, data){
				    	self.updateDisponible(date.id);
				    	self.status_confirm = true;
				    	self.listDates(self.selected);
				    	self.listDateUser();
				    });
				});
			},
			updateDisponible(id_cita){
				var self = this;
				this.DB.transaction(function (exe) {
				    exe.executeSql(`update cita set disponible = disponible - 1 where id = ${id_cita}`);
				});
			},
			listDates(fecha){
				this.dateList = [];
				var self = this;
				this.DB.transaction(function (tran) {
              		tran.executeSql(`select * from cita where fecha = '${fecha}'`, [], function (tran, data) {
                   		if (data.rows.length > 0) {
                   			self.dateList = data.rows;
                   		}
               		});
           		});
			}, 
			listDateUser(){
				this.listUser = [];
				var self = this;
				this.DB.transaction(function (tran) {
              		tran.executeSql(`select cd.*, c.fecha from cita_detalle cd join cita c on c.id = cd.id_cita where id_user_transportador = '${self.id_user_transportador}'`, [], function (tran, data) {
                   		if (data.rows.length > 0) {
                   			self.listUser = data.rows;
                   		}
               		});
           		});
			}
		},
		mounted(){
			this.DB = openDatabase('kturning', '1.0', 'This is a client side database', 50 * 1024 * 1024);
			this.listDates();
			this.dates.forEach((item) => {
				item.fecha = moment(item.fecha).format('YYYY-MM-DD')
			})
			this.listDates(moment().format('YYYY-MM-DD'));
			if (!localStorage.getItem('id_user_transportador')) {
				location.href = "/";
			}
			this.listDateUser();
		}
	}
</script>