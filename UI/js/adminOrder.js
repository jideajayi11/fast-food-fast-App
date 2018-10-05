const adminId = jwt_decode(localStorage.getItem('fastFoodToken')).adminId;
let username;
if(adminId)
	username = jwt_decode(localStorage.getItem('fastFoodToken')).fullName;
let fetchUrl = `/api/v1/orders`;
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
grandChild.innerHTML = `Manage Orders:`;
child.appendChild(grandChild);
grandChild = document.createElement('div');
grandChild.setAttribute('class', 'top-text');
grandChild.innerHTML = `<span class="text-theme"></span> 
													<strong>${username}</strong>`;
child.appendChild(grandChild);
pageBody.appendChild(child);
child = document.createElement('div');
child.setAttribute('class', 'table-responsive');
child.innerHTML = `<table class="mt-20" id="tableId">
											<tr><td class="preload">
												Your Orders...
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
                  <th>Customer</th>
                  <th>Phone Number</th>
                  <th>Delivery Address</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>`;
		data.orders.forEach((item) => {
			tableId.innerHTML = `
				${tableId.innerHTML}
						<tr>
							<td>${item.fullname}</td>
							<td>${item.phonenumber}</td>
							<td>${item.deliveryaddress}</td>
							<td>${item.foodname}</td>
							<td>${item.price}</td>
							<td>${item.quantity}</td>
							<td>${item.price * item.quantity}</td>
							<td><button id="order_${item.id}" title="click to update order">${item.orderstatus}</button></td>
						</tr>`;
		});
	} else {
		tableId.innerHTML = `
							<tr><td class="preload">You have no order.</td></tr>`;
	}
})
.catch((error) => {
	tableId.innerHTML = `<table class="mt-20" id="tableId">
													<tr><td class="preload">
														Your Orders...
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
		const getStatus = document.getElementById('getStatus');
		modalNo.addEventListener('click', (event1) => {
			getStatus.value = '';
			modal.style.display = 'none';
		});
		modalYes.addEventListener('click', (event2) => {
			const value = getStatus.value;
			if(value !== '') {
				fetchUrl = `/api/v1/orders/${id}`;
				fetchMethod = 'PUT';
				const fetchBody = {
					orderStatus: value
				};

				fetch(requestFetch(fetchUrl, fetchMethod, fetchBody))
				.then(resp => resp.json())
				.then((data) => {
					window.location.href = 'adminOrder.html';
				})
				.catch((error) => {
				});
				getStatus.value = '';
				modal.style.display = 'none';
			}
		});
	}
});

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
	localStorage.removeItem('fastFoodToken');
	window.location.href = 'adminLogin.html'
});