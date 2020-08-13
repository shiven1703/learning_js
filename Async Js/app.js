document.querySelector("#fetchSingleProductBtn").addEventListener('click', loadProduct);
document.querySelector("#fetchAllProductsBtn").addEventListener('click', loadProduct);


let dataPlaceholder = document.querySelector("#dataPlaceholder");



function loadProduct(e){

	const isFetchAllProducts = e.target.id === "fetchSingleProductBtn" ? false : true;

	const xhr = new XMLHttpRequest();

	if(isFetchAllProducts){
		xhr.open('GET', 'http://localhost/all_products.json', true);	
	}else{
		xhr.open('GET', 'http://localhost/product.json', true);
	}
	
	xhr.onload = function(){
		if(this.status === 200){
			const productData = JSON.parse(this.response);
			dataPlaceholder.innerHTML = generateListOfProducts(productData).innerHTML;
		}
	}

	xhr.onerror = function(){
		dataPlaceholder.innerHTML = "Error fetching data. Try again.";
	}

	xhr.send();

}

function generateListOfProducts(productData){
	let ul = document.createElement("ul");
	productData.forEach(function(product){
		let li = document.createElement("li");
		li.innerHTML = `Name: ${product.product_name} || Price: ${product.price}.`;
		ul.appendChild(li);
	});

	return ul;
}