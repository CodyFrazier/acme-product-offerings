const API = 'https://acme-users-api-rev.herokuapp.com/api/';
const productData = [];

const loadData = async () => {
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

	console.log(products);
	console.log(companies);
	console.log(offerings);
};

loadData();

const displayList = document.querySelector('#products');

const renderProducts = () => {
	const html = productList
		.map(
			(entry) =>
				`<div class='product-card'>
      <div>${entry.name}</div>
      <div>${entry.description}</div>
      <div>${entry.suggestedPrice}</div>
    </div>`
		)
		.join('');
	displayList.innerHTML = html;
};

console.log(productData);
renderProducts();
