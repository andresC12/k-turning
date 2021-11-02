<template>
	<div class="content-autoritation">
		<div class="header-auto">
			<h4>Autorizaciones</h4>
		</div>
		<div class="autorization-list">
			<div class="single-autorization" v-for="(item, index) in auth_list" :key="index" @click="openDetail(item)">
				<div class="icon-content">
					<i class="fas fa-truck"></i>
				</div>
				<div class="text-content">
					<h4>{{ item.codigo }}</h4>
					<h5><span>Tipo:</span> {{ item.tipo }}</h5>
				</div>
				<div class="accept-content">
					<i class="fas fa-chevron-right"></i>
				</div>
			</div>
		</div>
		<div class="confirm-button">
			<button class="button" id="accept" v-show="status_button" @click="accept()">Continuar</button>
		</div>
	</div>
</template>

<style scoped>

	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.content-autoritation{
		width: 100%;
		height: auto;
	}

	.header-auto{
		width: 100%;
		text-align: left;
		background: #fff;
		padding: 20px;
		border-bottom: 1px solid #ddd;
	}

	.header-auto h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 20px;
		color: #2B2D2C;
	}

	.autorization-list{
		width: 100%;
		text-align: left;
		padding: 20px;
	}

	.single-autorization{
		background: #fff;
		padding: 25px 20px;
		border-radius: 10px;
		border: 1px solid #ddd;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 15px;
	}

	.icon-content{
		text-align: center;
		width: 15%;
		border-right: 1px solid #ddd;
		padding-right: 10px;
	}

	.icon-content i{
		color: #5493C9;
		font-size: 25px;
	}

	.text-content{
		width: 80%;
		display: block;
		padding: 0px 10px 0px 10px;
	}

	.text-content h4{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 600;
		font-size: 15px;
		color: #2B2D2C;
		margin-bottom: 2px;
	}

	.text-content h5{
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 13px;
		color: #2B2D2C;
	}

	.text-content span{
		font-weight: 600;
	}

	.accept-content{
		width: 5%;
		text-align: right;
	}

	.accept-content i{
		color: #5493C9;
	}

	.confirm-button{
		width: 100%;
		padding: 20px;
	}

	.confirm-button button{
		width: 100%;
		background: #5493C9;
		color: #fff;
		border-radius: 5px;
		padding: 17px 0px;
		font-family: 'Roboto Slab',sans-serif;
		font-weight: 500;
		font-size: 15px;
		border: none;
	}

</style>

<script>
	export default{
		data(){
			return{
				styleObject:{
					backgroundColor: "green"
				},
				status_button: false,
				auth_list:[
					{
						codigo: "78278781149",
						tipo: "Ingreso de contenedor"
					},
					{
						codigo: "98912343263",
						tipo: "Retiro de contenedor"
					},
					{
						codigo: "52818349019",
						tipo: "Retiro de contenedor"
					},
					{
						codigo: "89182646261",
						tipo: "Ingreso de contenedor"
					}
				],
				DB: null
			}
		},
		methods:{
			openDetail(item){
				localStorage.setItem('autorizacion', item.codigo);
				this.status_button= true;
			},
			accept(){
				location.href = "dates";
			}
		},
		mounted(){
			this.DB = openDatabase('kturning', '1.0', 'This is a client side database', 50 * 1024 * 1024);
			if (!localStorage.getItem('id_user_transportador')) {
				location.href = "/";
			}
		}
	}
</script>