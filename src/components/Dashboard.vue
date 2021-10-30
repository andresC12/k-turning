<template>
	<div class="content-dash-all">
		<div class="header-dash">
			<div class="first-section">
				<div class="name-dash">
					<h4>Mis productos</h4>
				</div>
				<div class="products-count">
					<h4><span>{{productList.length}}</span> productos en la tienda</h4>
				</div>
			</div>
			<div class="second-section">
				<div class="product-search">
					<input type="text" placeholder="buscar"  id="buscar" v-model="texto" @keyup="search()">
					<div class="search-container">
						<i class="fas fa-search"></i>
					</div>
				</div>
				<div class="report-options">
					<div class="icon-container">
						<i class="fas fa-list" @click="status_likes = true"></i>
					</div>
				</div>
				<div class="report-options2">
					<div class="icon-container">
						<i class="fas fa-sign-out-alt" @click="logout()"></i>
					</div>
				</div>
			</div>		
		</div>
		<div class="container-products">
			<div class="single-product" v-for="(item,index) in productList" :key="index" v-bind:id="'product_'+item.id">
				<div class="image-container" @click="openDetail(item.id, item.nombre, item.imagen, item.categoria, item.precio, item.descripcion)">
					<img :src="item.imagen">
				</div>
				<div class="product-description">
					<div class="product-category">
						<h4>{{ item.categoria }}</h4>
					</div>
					<div class="product-name">
						<h4>{{ item.nombre }}</h4>
					</div>
					<div class="product-price">
						<h4>{{ new Intl.NumberFormat("de-DE").format(item.precio) }}</h4>
					</div>
				</div>
				<div class="wishlist">
					<i class="far fa-heart" @click="saveLike(item.id,this.favList)"></i>
				</div>
			</div>
		</div>
		<div class="container-detail-product" v-show="status_container">
			<div class="product-detail-content">
				<div class="image-section">
					<img :src="productInfo.imagen">
				</div>
				<div class="information-section">
					<div class="close-option">
						<i class="fas fa-times" @click="status_container = false"></i>
					</div>
					<div class="info-product-category">
						<h4>{{ productInfo.categoria }}</h4>
					</div>
					<div class="info-product-category">
						<h4>Likes: {{ productInfo.likes }}</h4>
					</div>
					<div class="info-product-name">
						<h4>{{productInfo.nombre}}</h4>
					</div>
					<div class="info-product-price">
						<h4>{{ new Intl.NumberFormat("de-DE").format(productInfo.precio) }}</h4>
					</div>
					<div class="info-product-description">
						<p>{{productInfo.descripcion}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="container-detail-likes" v-show="status_likes" :key="index">
			<div class="content-likes-list">
				<div class="tittle-popup">
					<h4>No. de likes</h4>
					<i class="fas fa-times" @click="status_likes = false"></i>
				</div>
				<div class="likes-list" v-for="(item,index) in favList">
					<div class="list-item">
						<div class="product-likes-name">
							<h4>{{item.name}}</h4>
						</div>
						<div class="product-likes-count">
							<h4><i class="far fa-heart"></i> {{ item.likes }}</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import './style.css';
	import {like} from './like.js'
	import axios from 'axios';
	export default{
		data(){
			return{
				status_likes: false,
				texto: "",
				status_container:false,
				productList: [],
				productInfo:{
					likes: "",
					nombre: "",
					imagem: "",
					categoria: "",
					precio: "",
					descripcion: ""
				},
				favList: localStorage.getItem('favList') ? JSON.parse(localStorage.getItem('favList')) : []
			}
		},
		methods:{
			getList(){
				var self = this;
				axios.get("http://localhost:8000/api/get-list")
				.then(res => {
					this.productList = res.data;
					//realizamos la validacion si tenemos una lista guardada en el localStorage
					if (this.favList.length == 0) {
						this.productList.forEach((item) => {
							this.favList.push({
								id_product: item.id,
								name: item.nombre,
								likes: 0
							})
						});
						localStorage.setItem('favList', JSON.stringify(this.favList));
					}
				})
				.catch(err =>{
					console.log(err);
				});
			},
			openDetail(id, nombre, imagen, categoria, precio, descripcion){

				var self = this;
				//recibimos la informacion proveniente del producto seleccionado y llenamos el objeto que vamos a visualizar
				this.productInfo.nombre = nombre;
				this.productInfo.imagen = imagen;
				this.productInfo.categoria = categoria;
				this.productInfo.precio = precio;
				this.productInfo.descripcion = descripcion;
				//acivamos la variable que nos muestra el detalle del producto
				this.favList.forEach((item) => {
					if (item.id_product == id) {
						self.productInfo.likes = item.likes;
					}
				});
				this.status_container = true;
			},
			search(){
				//con el metodo keyup, realizamos los siguientes procedimientos con cada tecla que digita el usuario
				var texto = document.getElementById('buscar').value;
	            if(texto.trim() != ""){
	                this.productList.forEach((producto) =>{
	                    if(!producto.nombre.trim().toUpperCase().includes(texto.trim().toUpperCase())){
	                        document.getElementById("product_"+producto.id).style.display = "none";
	                    }else{
	                        document.getElementById("product_"+producto.id).style.display = "";
	                    }
	                });
	            }else{
	                this.productList.forEach((producto) =>{             
	                  	document.getElementById("product_"+producto.id).style.display = "";
	                });
	            }
			},
			saveLike(id,favList){
				like(id,favList);
			},
			logout(){
				location.href = "/";
			}
		},
		mounted(){
			this.getList();
		}
	}
</script>