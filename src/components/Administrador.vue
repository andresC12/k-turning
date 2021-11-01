<template>
	<div class="content-dashboard">
		<div class="header-dashboard">
			<div class="logo-section">
				<h4>K-Turning</h4>
			</div>
			<div class="button-section">
				<!--<button class="user" @click="status_user= true">Registrar usuario</button>-->
				<button @click="status_date = true" class="cita">Registrar disponibilidad</button>
				<button class="logout" @click="logout()">Cerrar sesión</button>
			</div>
		</div>
		<div class="header-calendar">
			<!--<h4>Calendario de citas</h4>
			<button @click="status_date = true">Registrar cita</button>-->
			<div class="select-fecha">
				<div class="variantes">					
					<div class="variante1">
						<select v-model="date_selected" @change="listEvents(date_selected)">
							<option v-for="option in dates" v-bind:value="option.fecha">
							    {{ option.text }}
							</option>
						</select>	
					</div>
				</div>
			</div>
			<div class="calendar">
				<table id="dates2">
					<tr>
						<th>Modulo</th>
						<th v-for="item in ranges">{{item}}</th>
					</tr>					
				</table>
			</div>
		</div>
		
		<div class="container-detail-likes" v-show="status_date">
			<div class="content-likes-list">
				<div class="header-dates-popup">
					<h4>Registrar cita</h4>
					<i class="fas fa-times" @click="status_date = false"></i>
				</div>
				<div class="enter-information">
					<div class="entrance-information2">
						<h4>Modulo:</h4>
						<div class="variantes">					
							<div class="variante1">
								<select name="select" v-model="form_date.modulo">
								 	<option value="0" disabled selected>Seleccione</option>
									<option>CG</option>
									<option>MG</option>
								</select>	
							</div>
						</div>
					</div>
					<div class="entrance-information2">
						<h4>Fecha:</h4>
						<DatePicker v-model="date" :input-debounce="500">
						  <template v-slot="{ inputValue, inputEvents }">
						    <input
						      class="bg-white border px-2 py-1 rounded"
						      :value="inputValue"
						      v-on="inputEvents"
						    />
						  </template>
						</DatePicker>
					</div>
					<div class="entrance-information2">
						<h4>Hora</h4>
						<div class="variantes">					
							<div class="variante1">
								<select name="select" v-model="form_date.hora">
								 	<option value="0" disabled selected>Seleccione</option>
									<option v-for="item in ranges">{{item}}</option>
								</select>	
							</div>
						</div>
					</div>
					<div class="entrance-information2">
						<h4>Tipo</h4>
						<div class="variantes">					
							<div class="variante1">
								<select name="select" v-model="form_date.tipo_de_cita">
								 	<option value="0" disabled selected>Seleccione</option>
									<option>Contenedor exportación</option>
									<option>Contenedor Importación</option>
								</select>	
							</div>
						</div>
					</div>
					<div class="entrance-information2">
						<h4>Cupos:</h4>
						<input type="text" placeholder="Numero de cupos" v-model="form_date.cupos">
					</div>
				</div>
				<div class="register-button">
					<button @click="insertDate()">Registrar cita</button>
				</div>
				<div class="table-dates">
					<table id="dates">
						<tr>
							<th>Modulo</th>
							<th>Fecha</th>
							<th>Hora</th>
							<th>Tipo</th>
							<th>Cupos</th>
							<th>Estado</th>
						</tr>
						<tr v-for="(item, index) in dateList" :key="index">
							<td align="center">{{ item.modulo }}</td>
							<td align="center">{{ item.fecha }}</td>
							<td align="center">{{ item.hora }}</td>
							<td align="center">{{ item.tipo_de_cita }}</td>
							<td align="center">{{ item.cupos }}</td>
							<td align="center">{{ item.estado }}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div class="container-detail-likes" v-show="status_user">
			<div class="content-likes-list">
				<div class="header-dates-popup">
					<h4>Registrar usuario</h4>
					<i class="fas fa-times" @click="status_user = false"></i>
				</div>
				<div class="enter-information">
					<div class="entrance-information">
						<h4>Usuario:</h4>
						<input type="text" placeholder="Correo electronico" v-model="form.email">
					</div>
					<div class="entrance-information">
						<h4>Contraseña:</h4>
						<input type="text" placeholder="Digite la contraseña" v-model="form.password">
					</div>
					<div class="entrance-information">
						<h4>Rol:</h4>
						<div class="variantes">					
							<div class="variante1">
								<select name ="select" @change="showInput()" v-model="form.id_rol">
								 	<option value="0" disabled selected>Tipo de usuario</option>
									<option value="1">Transportador</option>
									<option value="2">Operario de oficina</option>
									<option value="3">Operario entrada</option>
								</select>	
							</div>
						</div>
					</div>
					<div class="entrance-information" v-show="status_transportador">
						<h4>Placa del camión:</h4>
						<input type="text" placeholder="Digite la placa" v-model="form.placa">
					</div>
				</div>
				<div class="register-button">
					<button @click="insertUser()">Registrar usuario</button>
				</div>
				<div class="table-dates">
					<table id="dates">
						<tr>
							<th>Usuario</th>
							<th>Contraseña</th>
							<th>Rol</th>
							<th>Placa</th>
						</tr>
						<tr v-for="(item, i) in userList" :key="i">
							<td align="center">{{ item.email }}</td>
							<td align="center">{{ item.password }}</td>
							<td align="center" v-if="item.id_rol == 2">Operario oficina</td>
							<td align="center" v-if="item.id_rol == 1">Transportador</td>
							<td align="center" v-if="item.id_rol == 3">Operario entrada</td>
							<td align="center">{{ item.placa ? item.placa : "Sin definir"}}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<style>

	*{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.select-fecha{
		padding: 10px 0px;
	}


	.border2{
		border: 1px solid #ddd;
		padding: 3px;
		width: 100%;
		background-color: #5390C9;
		font-weight: 600;
		color: #fff;
		display:block;
		margin-top: 7px;
	}
	.register-button, .table-dates{
		padding: 10px 20px;
	}

	.calendar{
		width: 100%;
		background: #fff;
	}

	#dates2{
		width: 100%;
	}

	#dates th {
	  padding-top: 12px;
	  padding-bottom: 12px;
	  background: #7BBD8F;
	  color: white;
	  text-align: center;
	}
	.center{
		width: 100%;
		text-align: center;		
		font-weight: 600;
	}

	#dates td, #dates th {
	  border: 1px solid #ddd;
	  padding: 8px;
	}

	#dates tr:nth-child(even){background-color: #f2f2f2;}

	#dates tr:hover {background-color: #ddd;}

	#dates2 th {
	  padding-top: 12px;
	  padding-bottom: 12px;
	  background: #7BBD8F;
	  color: white;
	  text-align: center;
	}

	#dates2 td, #dates2 th {
	  border: 1px solid #ddd;
	  padding: 6px;
	  font-size: 14px;
	}

	#dates2 tr{background-color: #f2f2f2;}

	.table-dates table{
		width: 100%;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 13px;
		border-collapse: collapse;
	}

	.variantes{
		width: 100%;
	}

	.variantes select{
		width: 100%;
		padding: 8px 5px;
		color: #51565A;
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

	.self{
		align-self: flex-end;
	}

	.enter-information{
		width: 100%;
		display: flex;
		padding: 10px 20px;
		justify-content: flex-start;
		align-items: center;
	}

	.register-button button{
		background: #7BBD8F;
		color: #fff;
		border: none;
		cursor: pointer;
		border-radius: 5px;
		padding: 9px 18px;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 13px;
	}

	.entrance-information h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 600;
		font-size: 14px;
		color: #2B2D2C;
		margin-bottom: 5px;
	}

	.entrance-information input{
		padding: 8px 5px;
		border-radius: 5px;
		border: 1px solid #ddd;
	}

	.entrance-information{
		width: 20%;
		text-align: left;
		display: block;
		margin-right: 40px;
	}

	.entrance-information2 h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 600;
		font-size: 14px;
		color: #2B2D2C;
		margin-bottom: 5px;
	}

	.entrance-information2 input{
		padding: 8px 5px;
		border-radius: 5px;
		border: 1px solid #ddd;
		width: 100%;
	}

	.entrance-information2{
		width: 17%;
		text-align: left;
		display: block;
		margin-right: 20px;
	}

	.header-dates-popup{
		width: 100%;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-dates-popup h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 19px;
	}

	.header-dates-popup i{
		font-size: 17px;
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
		z-index: 5000000000;
	}

	.content-likes-list{
		width: 60%;
		height: 80vh;
		background: #fff;
		border-radius: 20px;
		z-index: 5000000000;
	}

	.header-calendar{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 20px;

	}

	.header-calendar h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 19px;
	}

	.cita{
		background: #7BBD8F;
		color: #fff;
		border: none;
		cursor: pointer;
		border-radius: 5px;
		padding: 9px 18px;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 13px;
		margin-right: 10px;
	}

	.header-dashboard{
		width: 100%;
		background: #fff;
		height: 12vh;
		border-bottom: 1px solid #ddd;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0px 35px;
	}

	.logo-section{
		width: 50%;
		text-align: left;
	}

	.logo-section h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 22px;
	}

	.button-section{
		width: 50%;
		text-align: right;
	}

	.logout{
		background: #5493C9;
		color: #fff;
		border: none;
		cursor: pointer;
		border-radius: 5px;
		padding: 9px 18px;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 13px;
	}

	.user{
		border: 1px solid #5493C9;
		color: #5493C9;
		background: #fff;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 13px;
		border-radius: 5px;
		padding: 8px 18px;
		cursor: pointer;
		margin-right: 10px;
	}

	.user:hover{
		transform: scale(1.01);
		transition: all .2s ease-in-out;
	}

	.logout:hover{
		transform: scale(1.01);
		transition: all .2s ease-in-out;
	}

</style>

<script>
	import { /*Calendar,*/ DatePicker } from 'v-calendar';
	import moment from 'moment';
	import '@fullcalendar/core/vdom' // solves problem with Vite
	import FullCalendar from '@fullcalendar/vue3'
	import dayGridPlugin from '@fullcalendar/daygrid'
	import interactionPlugin from '@fullcalendar/interaction'
	import esLocale from "@fullcalendar/core/locales/es";
	export default{
		components: {
		    DatePicker,
		    FullCalendar
		},
		data(){
			return{
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
				ranges: ['00-01','01-02','02-03','03-04','04-05','05-06','06-07','07-08','08-09','09-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17','17-18','18-19','19-20','20-21','21-22','22-23'],
				date: moment().format('YYYY-MM-DD'),
				status_date: false,
				date_selected:moment().format('YYYY-MM-DD'),
				status_user: false,
				status_transportador: false,
				events: [],
				modulos: ['CG','MG'],
				form:{
					email: "",
					password: "",
					id_rol: 0,
					placa: ""
				},
				form_date:{
					modulo: 0,
					hora: 0,
					cupos: "",
					estado: "Creada",
					tipo_de_cita: 0,
				},
				DB: null,
				userList: [],
				dateList: [],
				calendarOptions: {
			        plugins: [ dayGridPlugin, interactionPlugin ],
			        locale: esLocale,
			        initialView: 'dayGridMonth',
			        dateClick: this.handleDateClick,
			        events: [
			          { title: 'Retiro - 15:00', date: '2021-10-30' },
			          { title: 'Ingreso - 23:00', date: '2021-10-31' },
			          { title: 'Retiro - 18:00', date: '2021-10-31' },
			          { title: 'Ingreso - 21:00', date: '2021-10-31' },
			          { title: 'Retiro - 20:00', date: '2021-10-31' }
			        ]
			    }
			}
		},
		methods:{
			logout(){
				location.href = "/";
			},
			insertDate(){
				var self = this;
				this.DB.transaction(function (exe) {
				    exe.executeSql(`insert into cita (fecha, hora, cupos, disponible, estado, tipo_de_cita, modulo, fecha_registro) values('${moment(self.date).format('YYYY-MM-DD')}','${self.form_date.hora}','${self.form_date.cupos}', '${self.form_date.cupos}', '${self.form_date.estado}', '${self.form_date.tipo_de_cita}', '${self.form_date.modulo}', '${moment().format('YYYY-MM-DD HH:mm:ss')}')`, [], function(tran, data){
				    	self.listDates();
						self.clearForm(true);
				    });
				});
			},
			clearForm(bandera){
				// el numero 1 representa el formulario de Usuarios y el numero 2 representa el formulario de citas
				if (!bandera) {
					this.form.email = "";
					this.form.password = "";
					this.form.id_rol = 0;
					this.form.placa = "";
					this.status_transportador = false;
				}
				if (bandera) {
					this.form_date.modulo = 0;
					this.form_date.hora = 0;
					this.form_date.cupos = "";
					this.form_date.tipo_de_cita = 0;
				}
	         	
	        },
			showInput(){
				if (this.form.id_rol == 1) {
					this.status_transportador =true;
				}else{
					this.status_transportador =false;
				}
			},
			insertUser(){
				var self = this;
				this.DB.transaction(function (exe) {
				    exe.executeSql(`insert into user (id_rol, email, password, placa) values('${self.form.id_rol}','${self.form.email}','${self.form.password}', '${self.form.placa}')`, [], function(tran, data){
				    	self.listUsers();
						self.clearForm(1);
				    });
				});
			},
			listUsers(){
				var self = this;
				this.DB.transaction(function (tran) {
              		tran.executeSql(`select * from user`, [], function (tran, data) {
                   		if (data.rows.length > 0) {
                   			self.userList = data.rows;
                   		}
               		});
           		});
			},
			listDates(){
				var self = this;
				this.DB.transaction(function (tran) {
              		tran.executeSql(`select * from cita`, [], function (tran, data) {
                   		if (data.rows.length > 0) {
                   			self.dateList = data.rows;
                   		}
               		});
           		});
			},
			listEvents(date){
				date = moment(date).format('YYYY-MM-DD');	
				var self = this;	
				var aux = 0;
				self.events = [];	
				this.DB.transaction(function (tran) {
              		tran.executeSql(`select c.modulo,c.hora,u.placa,c.cupos,c.disponible,c.fecha from cita_detalle cd join cita c on cd.id_cita = c.id join user u on cd.id_user_transportador = u.id where c.fecha = '${date}' and cd.estado = 'Tomada' order by 1,2 asc`, [], function (tran, data) {
              			self.clearTable();
              			console.log(`select c.modulo,c.hora,u.placa,c.cupos,c.disponible,c.fecha from cita_detalle cd join cita c on cd.id_cita = c.id join user u on cd.id_user_transportador = u.id where c.fecha = '${date}' and cd.estado = 'Tomada' order by 1,2 asc`);
                   		if (data.rows.length > 0) {
							   
							   for(let i = 0; i < data.rows.length; i++){
								   self.events.push(data.rows[i])
							   }			   
							   if(aux == 0)self.drawRows();
							   aux++;
                   		}
               		});
           		});
			},
			clearTable(){
				this.modulos.forEach((modulo) => {
					var nodo = document.getElementById(modulo);
					if (nodo) {
						if (nodo.parentNode) {
						  nodo.parentNode.removeChild(nodo);
						}	
					}
					var table = document.getElementById("dates2");
					table.innerHTML += `<tr id="${modulo}"><th>${modulo}</th></tr>`;
				});
			},
			drawRows(){						
				var self = this;
				this.modulos.forEach((modulo) => {//CG,MG		
					var trRow =  document.getElementById(modulo);
					self.events.forEach((event) => {
						if(modulo == event.modulo){//EJEMPLO CG == CG
							self.ranges.forEach((range) => {	
								var exist = document.getElementById(modulo+'_'+range)
								if(exist){
									if(range == event.hora)exist.innerHTML += `<td ><span class="border2">${event.placa}</span></td>`;				
											
								}else{
									if(range == event.hora){									
										trRow.innerHTML += 	`									
											<tr>
												<td id='${modulo}_${range}'>
													<span class="center">CUP: ${event.disponible}</span>
													<span class="border2">${event.placa}</span>
												</td>
											</tr>
										`;
									
									}else {
										trRow.innerHTML += 	`<td id='${modulo}_${range}'></td>`;
									}
								}
								

							});
						}	
						
						
					});
				});
				
				
			}
		},
		mounted(){
			this.DB = openDatabase('kturning', '1.0', 'This is a client side database', 50 * 1024 * 1024);
			this.listUsers();
			this.listDates();
			this.listEvents(moment().format('YYYY-MM-DD'));
			if (!localStorage.getItem('id_user_admin')) {
				location.href = "/";
			}
		}
	}
</script>