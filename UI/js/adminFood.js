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
grandChild.innerHTML = `<span class="text-theme"></span> 
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
	if(data.menus[0]) {
		tableId.innerHTML = `
                <tr>
                  <th>Food Item</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>`;
		data.menus.forEach((item) => {
			tableId.innerHTML = `
				${tableId.innerHTML}
						<tr>
							<td><img src="${item.imageurl}"></td>
							<td>${item.foodname}</td>
							<td>${item.price}</td>
							<td><button id="edit_${item.id}" title="click to edit">Edit</button></td>
							<td><button id="delete_${item.id}" class="red" title="click to delete">Delete</button></td>
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
				});
				getStatus.value = '';
				modal.style.display = 'none';
			}
		});
	}
});


const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', (event) => {
	const modal = document.querySelector('.overlay');
	modal.style.display = 'flex';
	
	const addFoodForm = document.forms['addFoodForm'];
	const xBtn1 = document.getElementById('xBtn1');
	xBtn1.addEventListener('click', (event1) => {
		addFoodForm.reset();
		modal.style.display = 'none';
	});
	
	addFoodForm.addEventListener('submit', (event2) => {
		event2.preventDefault();
		uri = 'https://api.cloudinary.com/v1_1/dagrsqjmc/image/upload';
		methodF = 'POST';
		
		const form = new FormData();
		const foodImg = document.getElementById('foodImg');
		form.append('upload_preset','cugasn7d');
		form.append('file', foodImg.files[0]);
		
		fetch(uri, {
					method: methodF,
					body: form
		})
		.then(resp => resp.json())
		.then((data) => {
			const imgUrl = data.secure_url;
			uri = '/api/v1/menu';
			methodF = 'POST';
			bodyF = {
				foodDescription: addFoodForm.food.value,
				foodPrice: addFoodForm.price.value,
				imageURL: imgUrl
			};
			fetch(requestFetch(uri, methodF, bodyF))
			.then(resp => resp.json())
			.then((data1) => {
				window.location.href = 'adminFood.html';
			})
			.catch((error) => {
				addFoodForm.reset();
				modal.style.display = 'none';
			});
		})
		.catch((error) => {
			addFoodForm.reset();
		});
	});
});

const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
	localStorage.removeItem('fastFoodToken');
	window.location.href = 'adminLogin.html'
});