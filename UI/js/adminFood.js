const adminId = jwt_decode(localStorage.getItem('fastFoodToken')).adminId;
let username;
if(adminId)
	username = jwt_decode(localStorage.getItem('fastFoodToken')).fullName;
let uri = `/api/v1/menu`;
let methodF = 'GET';


const pageBody = document.getElementById('pageBody');
let child = document.createElement('div');
child.setAttribute('class', 'mb-70');
pageBody.appendChild(child);
child = document.createElement('div');
child.setAttribute('class', 'spread-in mt-20');
let grandChild = document.createElement('button');
grandChild.setAttribute('id', 'addBtn');
grandChild.setAttribute('title', 'click to add food');
grandChild.innerHTML = `Add Food`;
child.appendChild(grandChild);
grandChild = document.createElement('div');
grandChild.setAttribute('class', 'pageTitle');
grandChild.innerHTML = `Manage Food:`;
child.appendChild(grandChild);
grandChild = document.createElement('div');
grandChild.setAttribute('class', 'top-text');
grandChild.innerHTML = `<span class="text-theme">Admin: </span> 
													<strong>${username}</strong>`;
child.appendChild(grandChild);
pageBody.appendChild(child);
child = document.createElement('div');
child.setAttribute('class', 'table-responsive');
child.innerHTML = `<table class="mt-20" id="tableId">
											<tr><td class="preload">
												Menu List...
											</td></tr>
										</table>`;
pageBody.appendChild(child);



const tableId = document.getElementById('tableId');
	
fetch(requestFetch(uri, methodF))
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
							<td>${item.deliveryAddress}</td>
							<td>${item.foodname}</td>
							<td>${item.price}</td>
							<td>${item.quantity}</td>
							<td>${item.price * item.quantity}</td>
							<td><button id="order_${item.id}" title="click to update order">${item.orderstatus}</button></td>
						</tr>`;
		});
	} else {
		tableId.innerHTML = `
							<tr><td class="preload">You have no food in menu.</td></tr>`;
	}
})
.catch((error) => {
	tableId.innerHTML = `<table class="mt-20" id="tableId">
													<tr><td class="preload">
														Menu List...
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
				uri = `/api/v1/orders/${id}`;
				methodF = 'PUT';
				bodyF = {
					orderStatus: value
				};

				fetch(requestFetch(uri, methodF, bodyF))
				.then(resp => resp.json())
				.then((data) => {
					window.location.href = 'adminOrder.html';
				})
				.catch((error) => {
					console.log(error);
				});
				getStatus.value = '';
				modal.style.display = 'none';
			}
		});
	}
});