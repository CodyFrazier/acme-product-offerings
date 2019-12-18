async function loadData(){
	const API = 'https://acme-users-api-rev.herokuapp.com/api/';
	const responses = await Promise.all([
		fetch(`${API}products`),
		fetch(`${API}companies`),
		fetch(`${API}offerings`)
	]);
	const [ products, companies, offerings ] = await Promise.all(
		responses.map(function(response) {
			return response.json();
		})
	);
	
	//***************************************************************
	console.log(products);		//properly displayed.
	console.log(companies);		//properly displayed.
	console.log(offerings);		//properly displayed.
	//***************************************************************
	
	renderProducts(products, companies, offerings);
};

function renderProducts(products, companies, offerings){
	document.querySelector('#products').innerHTML = products.map(product => {
		const offerList = offerings.filter(offer => {
			return offer.productId === product.id;
		}).reduce((acc, offer, idx) => {
			coms = companies.filter(company => {
				return company.id === offer.companyId;
			});
			acc += `<li>Offered by: ${ coms[0].name } at ${ offer.price }</li>`;
			return acc;
		}, ``);
		return `
			<div class='product-card'>
			<h2 style='text-decoration:underline'>${ product.name }</h2>
			<div>${ product.description }</div><br>
			<div>$${ product.suggestedPrice }.00</div>
			<ul>${ offerList }</ul>
			</div>`;
	}).join('');
	
};

loadData();