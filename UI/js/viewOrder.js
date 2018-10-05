const userId = jwt_decode(localStorage.getItem('fastFoodToken')).userId;
let username;
if(userId)
	username = jwt_decode(localStorage.getItem('fastFoodToken')).fullName;
let fetchUrl = `/api/v1/users/${userId}/orders`;
let fetchMethod = 'GET';


const pageBody = document.getElementById('pageBody');
let child = document.createElement('div');
child.setAttribute('class', 'mb-70');
pageBody.appendChild(child);
child = document.createElement('div');
child.setAttribute('class', 'spread-in mt-20');
let grandChild = document.createElement('span');
child.appendChild(grandChild);
grandChild = document.createElement('div');
grandChild.setAttribute('class', 'pageTitle');
grandChild.innerHTML = `My Orders:`;
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
												Order History...
											</td></tr>
										</table>`;
pageBody.appendChild(child);

const tableId = document.getElementById('tableId');
	
fetch(requestFetch(fetchUrl, fetchMethod))
.then(resp => resp.json())
.then((data) => {
	if(data.orders[0]) {
		tableId.innerHTML = `
								<tr>
                  <th>Restaurant</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>`;
		data.orders.forEach((item) => {
			if(item.orderstatus === 'New') {
				tableId.innerHTML = `
					${tableId.innerHTML}
							<tr>
								<td>${item.restaurantname}</td>
								<td>${item.foodname}</td>
								<td>${item.price}</td>
								<td>${item.quantity}</td>
								<td>${item.price * item.quantity}</td>
								<td><button id="order_${item.id}" title="click to cancel order">${item.orderstatus}</button></td>
							</tr>`;
			} else {
				tableId.innerHTML = `
					${tableId.innerHTML}
							<tr>
								<td>${item.restaurantname}</td>
								<td>${item.foodname}</td>
								<td>${item.price}</td>
								<td>${item.quantity}</td>
								<td>${item.price * item.quantity}</td>
								<td>${item.orderstatus}</td>
							</tr>`;
			}
		});
	} else {
		tableId.innerHTML = `
							<tr><td class="preload">No order history was found.</td></tr>`;
	}
})
.catch((error) => {
	tableId.innerHTML = `<table class="mt-20" id="tableId">
													<tr><td class="preload">
														Order History...
													</td></tr>
											</table>`;
});


tableId.addEventListener('click', (event) => {
	if (event.target && event.target.nodeName == "BUTTON") {
		const id = parseInt(event.target.id.replace("order_", ""), 10);
		const modal = document.querySelector('.overlay');
		modal.style.display = 'flex';
		const modalYes = document.getElementById('yesBtn');
		const modalNo = document.getElementById('noBtn');
		modalNo.addEventListener('click', (event1) => {
			modal.style.display = 'none';
		});
		modalYes.addEventListener('click', (event2) => {
			fetchUrl = `/api/v1/cancel/${id}`;
			fetchMethod = 'PUT';
			const fetchBody = {};
			
			fetch(requestFetch(fetchUrl, fetchMethod, fetchBody))
			.then(resp => resp.json())
			.then((data) => {
				window.location.href = 'viewOrder.html';
			})
			.catch((error) => {
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