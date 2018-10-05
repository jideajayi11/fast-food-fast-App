const userId = jwt_decode(localStorage.getItem('fastFoodToken')).userId;
let username;
if(userId)
	username = jwt_decode(localStorage.getItem('fastFoodToken')).fullName;
let uri = '/api/v1/admin';
let methodF = 'GET';
const restaurantDetails = document.createElement('select');
restaurantDetails.setAttribute('id', 'getList');
restaurantDetails.innerHTML = `
<option value="" selected>Select Restaurant</option>`;

fetch(requestFetch(uri, methodF))
.then(resp => resp.json())
.then((data) => {
	data.restaurant.forEach((item) => {
		restaurantDetails.innerHTML = `
			${restaurantDetails.innerHTML}
			<option value="${item.id}">${item.restaurantname}</option>`;
	});
})
.catch((error) => {
	console.log(error);
});

const pageBody = document.getElementById('pageBody');
let child = document.createElement('div');
child.setAttribute('class', 'mb-70');
pageBody.appendChild(child);
child = document.createElement('div');
child.setAttribute('class', 'spread-in mt-20');
child.appendChild(restaurantDetails);
let grandChild = document.createElement('div');
grandChild.setAttribute('class', 'pageTitle');
grandChild.innerHTML = `Restaurants:`;
child.appendChild(grandChild);
grandChild = document.createElement('div');
grandChild.setAttribute('class', 'top-text');
grandChild.innerHTML = `<span class="text-theme">User: </span> 
													<strong>${username}</strong>`;
child.appendChild(grandChild);
pageBody.appendChild(child);
child = document.createElement('div');
child.setAttribute('class', 'table-responsive');
child.innerHTML = `<table class="mt-20" id="tableId">
											<tr><td class="preload">
												Select a restaurant to view food menu
											</td></tr>
									</table>`;
pageBody.appendChild(child);



const tableId = document.getElementById('tableId');
const restaurant = document.getElementById('getList');
restaurant.addEventListener('change', () => {
	uri = `/api/v1/menu?id=${restaurant.value}`;
	
	
	fetch(requestFetch(uri, methodF))
	.then(resp => resp.json())
	.then((data) => {
		if(data.menus[0]) {
			tableId.innerHTML = `
								<tr>
									<th>Food Item</th>
									<th>Description</th>
									<th>Price</th>
									<th>Quantity</th>
									<th>Order</th>
								</tr>`;
			data.menus.forEach((item) => {
				tableId.innerHTML = `
					${tableId.innerHTML}
							<tr>
								<td><img src="${item.imageurl}"></td>
								<td>${item.foodname}</td>
								<td>${item.price}</td>
								<td><input id="quantity_${item.id}" type="number" value="1"></td>
								<td><button id="food_${item.id}" title="click to order">Order</button></td>
							</tr>`;
			});
		} else {
			tableId.innerHTML = `
								<tr><td class="preload">No food found in the restaurant.</td></tr>`;
		}
	})
	.catch((error) => {
		tableId.innerHTML = `<table class="mt-20" id="tableId">
														<tr><td class="preload">
															Select a restaurant to view food menu
														</td></tr>
												</table>`;
	});
});



tableId.addEventListener('click', (event) => {
	if (event.target && event.target.nodeName == "BUTTON") {
		const id = parseInt(event.target.id.replace("food_", ""), 10);
		const modal = document.querySelector('.overlay');
		modal.style.display = 'flex';
		const modalYes = document.getElementById('makeOrder');
		const modalNo = document.getElementById('cancelOrder');
		modalNo.addEventListener('click', (event1) => {
			modal.style.display = 'none';
		});
		modalYes.addEventListener('click', (event2) => {
			uri = '/api/v1/orders';
			methodF = 'POST';
			const bodyF = {
				quantity: document.getElementById(`quantity_${id}`).value,
				foodId: id
			};
			
			fetch(requestFetch(uri, methodF, bodyF))
			.then(resp => resp.json())
			.then((data) => {
				
			})
			.catch((error) => {
				console.log(error);
			});
			modal.style.display = 'none';
		});
	}
});

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
	localStorage.removeItem('fastFoodToken');
	window.location.href = 'index.html'
});