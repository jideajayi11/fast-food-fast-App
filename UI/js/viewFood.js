const userId = jwt_decode(localStorage.getItem('fastFoodToken')).userId;
let username;
if(userId)
	username = jwt_decode(localStorage.getItem('fastFoodToken')).fullName;
let fetchUrl = '/api/v1/admin';
let fetchMethod = 'GET';
const restaurantDetails = document.createElement('select');
restaurantDetails.setAttribute('id', 'getList');
restaurantDetails.innerHTML = `
<option value="" selected>Select Restaurant</option>`;

fetch(requestFetch(fetchUrl, fetchMethod))
.then(resp => resp.json())
.then((data) => {
	hideLoading();
	data.restaurant.forEach((item) => {
		restaurantDetails.innerHTML = `
			${restaurantDetails.innerHTML}
			<option value="${item.id}">${item.restaurantname}</option>`;
	});
})
.catch((error) => {
	hideLoading();
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
	fetchUrl = `/api/v1/menu?id=${restaurant.value}`;
	
	fetch(requestFetch(fetchUrl, fetchMethod))
	.then(resp => resp.json())
	.then((data) => {
		hideLoading();
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
			hideLoading();
		} else {
			tableId.innerHTML = `
								<tr><td class="preload">No food found in the restaurant.</td></tr>`;
			hideLoading();
		}
		hideLoading();
	})
	.catch((error) => {
		hideLoading();
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
			fetchUrl = '/api/v1/orders';
			fetchMethod = 'POST';
			const fetchBody = {
				quantity: document.getElementById(`quantity_${id}`).value,
				foodId: id
			};
			
			fetch(requestFetch(fetchUrl, fetchMethod, fetchBody))
			.then(resp => resp.json())
			.then((data) => {
				hideLoading();
			})
			.catch((error) => {
				hideLoading();
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