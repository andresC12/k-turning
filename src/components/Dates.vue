<template>
	<div class="dates-content">
		<div class="dates-header">
			<h4>Consultar citas</h4>
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
					<h4 class="state2" v-show="item.disponible == 0"><i class="fas fa-circle"></i>Vencida</h4>
				</div>
				<div class="single-date-button">
					<button>Tomar cita</button>
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

	.state i{
		color: green;
	}

	.state2 i{
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
			listDates(fecha){
				alert(fecha);
				this.dateList = [];
				var self = this;
				this.DB.transaction(function (tran) {
              		tran.executeSql(`select * from cita where fecha = '${fecha}'`, [], function (tran, data) {
                   		if (data.rows.length > 0) {
                   			self.dateList = data.rows;
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
		}
	}
</script>