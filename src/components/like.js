function like(id, favList){
	//recorremos la lista de favoritos y agremamos 1 like al producto seleccionado
	favList.forEach((item) =>{
		if (item.id_product == id) {
			item.likes++;
		}
	});
	//organizamos el codigo de manera descedente antes de actualizarlo en el localStorage
	favList.sort(function(a, b){return b.likes - a.likes});
	localStorage.setItem('favList', JSON.stringify(favList));
}

export{
	like
}