const adminId = jwt_decode(localStorage.getItem('fastFoodToken')).adminId;
let username;
if(adminId)
	username = jwt_decode(localStorage.getItem('fastFoodToken')).fullName;
let fetchUrl = `/api/v1/menu`;
let fetchMethod = 'GET';
let fetchBody = {};

const pageBody = document.getElementById('pageBody');
let child = document.createElement('div');
child.setAttribute('class', 'mb-100');
pageBody.appendChild(child);
child = document.createElement('div');
child.setAttribute('class', 'spread-in mt-20');
let grandChild = document.createElement('button');
grandChild.setAttribute('id', 'addBtn');
grandChild.setAttribute('title', 'click to add food');
grandChild.innerHTML = `Add Food`;
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
	hideLoading();
	tableId.innerHTML = `<table class="mt-20" id="tableId">
													<tr><td class="preload">
														Menu List...
													</td></tr>
											</table>`;
});


tableId.addEventListener('click', (event) => {
	if (event.target && event.target.nodeName == "BUTTON") {
		if(event.target.id.match("delete_")) {
			const id = parseInt(event.target.id.replace("delete_", ""), 10);
			const modal = document.querySelector('.overlay3');
			modal.style.display = 'flex';
			const modalYes = document.getElementById('yesBtn');
			const modalNo = document.getElementById('noBtn');
			modalNo.addEventListener('click', (event1) => {
				modal.style.display = 'none';
			});
			modalYes.addEventListener('click', (event2) => {
				fetchUrl = `/api/v1/menu/${id}`;
				fetchMethod = 'DELETE';

				modal.style.display = 'none';
				fetch(requestFetch(fetchUrl, fetchMethod))
				.then(resp => resp.json())
				.then((data) => {
					hideLoading();
					showPopupAlert('Delete menu', 'Food was deleted successfully.', () => {
						window.location.href = 'adminFood.html';
					});
				})
				.catch((error) => {
					hideLoading();
				});
				modal.style.display = 'none';
			});
		} else if(event.target.id.match("edit_")) {
			const id = parseInt(event.target.id.replace("edit_", ""), 10);
			const modal = document.querySelector('.overlay2');
			const editFoodForm = document.forms['editFoodForm'];
			const xBtn2 = document.getElementById('xBtn2');
			xBtn2.addEventListener('click', (event1) => {
				event1.preventDefault();
				modal.style.display = 'none';
				editFoodForm.reset();
			});
			let imageurl;
			try {
				fetchUrl = `/api/v1/menu`;
				fetchMethod = 'GET';
				fetch(requestFetch(fetchUrl, fetchMethod))
				.then(resp => resp.json())
				.then((data) => {
					if(data.menus[0]) {
						data.menus.forEach((item) => {
							if(item.id == id) {
								imageurl = item.imageurl;
								editFoodForm.food.value = item.foodname;
								editFoodForm.price.value = item.price;
								document.getElementById('imgTitle').innerHTML = 'Upload New Image (only if you want to replace the existing image)';
							}
						});
						hideLoading();
					} else {
						
					}
				})
				.catch((error) => {
				});
			}
			finally {
				modal.style.display = 'flex';
				editFoodForm.addEventListener('submit', (event2) => {
					event2.preventDefault();
					modal.style.display = 'none';
					const foodImg = editFoodForm.foodImg;
					if(foodImg.files[0]) {
						fetchUrl = 'https://api.cloudinary.com/v1_1/dagrsqjmc/image/upload';
						fetchMethod = 'POST';

						const form = new FormData();
						form.append('upload_preset','cugasn7d');
						form.append('file', foodImg.files[0]);

						showLoading();
						fetch(fetchUrl, {
							method: fetchMethod,
							body: form
						})
						.then(resp => resp.json())
						.then((data) => {
							updateMenuFetch(data.secure_url);
						})
						.catch((error) => {
							hideLoading();
							editFoodForm.reset();
						});
					} else {
						updateMenuFetch(imageurl);
					}

				});
			}
			
			const updateMenuFetch = (imgUrl) => {
				fetchUrl = `/api/v1/menu/${id}`;
				fetchMethod = 'PUT';
				fetchBody = {
					foodDescription: editFoodForm.food.value,
					foodPrice: editFoodForm.price.value,
					imageURL: imgUrl
				};
				fetch(requestFetch(fetchUrl, fetchMethod, fetchBody))
				.then(resp => resp.json())
				.then((data1) => {
					hideLoading();
					showPopupAlert('Edit Menu', 'Food was updated successfully.', () => {
						window.location.href = 'adminFood.html';
					});
				})
				.catch((error) => {
					hideLoading();
					editFoodForm.reset();
					modal.style.display = 'none';
				});
			}
			
		}
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
		fetchUrl = 'https://api.cloudinary.com/v1_1/dagrsqjmc/image/upload';
		fetchMethod = 'POST';
		modal.style.display = 'none';
		
		const form = new FormData();
		const foodImg = document.getElementById('foodImg');
		form.append('upload_preset','cugasn7d');
		form.append('file', foodImg.files[0]);
		
		showLoading();
		fetch(fetchUrl, {
			method: fetchMethod,
			body: form
		})
		.then(resp => resp.json())
		.then((data) => {
			const imgUrl = data.secure_url;
			fetchUrl = '/api/v1/menu';
			fetchMethod = 'POST';
			fetchBody = {
				foodDescription: addFoodForm.food.value,
				foodPrice: addFoodForm.price.value,
				imageURL: imgUrl
			};
			fetch(requestFetch(fetchUrl, fetchMethod, fetchBody))
			.then(resp => resp.json())
			.then((data1) => {
				hideLoading();
				showPopupAlert('Add Menu', 'Food was added to menu successfully.', () => {
					window.location.href = 'adminFood.html';
				});
			})
			.catch((error) => {
				hideLoading();
				addFoodForm.reset();
				modal.style.display = 'none';
			});
		})
		.catch((error) => {
			hideLoading();
			addFoodForm.reset();
		});
	});
});