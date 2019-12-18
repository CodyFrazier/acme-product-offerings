let id = '';
let data = [];
const product = 'https://acme-users-api-rev.herokuapp.com/api/products';
const companies = 'https://acme-users-api-rev.herokuapp.com/api/companies';
const offerings = 'https://acme-users-api-rev.herokuapp.com/api/offerings';
const dataSteal = async () => {
	const responses = await Promise.all([ fetch(product), fetch(companies), fetch(offerings) ]);
	const [ productList, companyList, offeringList ] = await Promise.all(responses.map((response) => response.json()));
	productList.forEach((product) => {
		data.push(product);
	});
	render();
};
dataSteal();

const displayList = document.querySelector('#products');

const render = () => {
	const html = data
		.map(
			(datum) =>
				`<div class='product-card'>
      <div>${datum.name}</div>
      <div>${datum.description}</div>
      <div>$${datum.suggestedPrice}</div>
    </div>`
		)
		.join('');
	displayList.innerHTML = html;
};

console.log(data);
render();
