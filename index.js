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
			acc += `<li>Offered by: ${ coms[0].name } at $${ offer.price.toFixed(2) }</li>`;
			return acc;
		}, ``);
		return `
			<div class='product-card'>
			<h2 style='text-decoration:underline'>${ product.name }</h2>
			<div>${ product.description }</div><br>
			<div>$${ product.suggestedPrice.toFixed(2) }</div>
			<ul>${ offerList }</ul>
			</div>`;
	}).join('');
};

loadData();
let singleDisplay = false;
document.querySelector('#products').addEventListener('click', ({ target }) => {
	if(target.tagName === 'H2'){
		const productArr = document.querySelectorAll('.product-card');
		productArr.forEach(product => {
			if(product !== target.parentNode && !singleDisplay){
				product.style.display = 'none';
			}else{
				product.style.display = 'flex';
			}
		});
	target.style.display = 'flex';
	singleDisplay ? singleDisplay = false : singleDisplay = true;
});



