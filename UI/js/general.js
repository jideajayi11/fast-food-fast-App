requestFetch = (fetchUrl, fetchMethod, fetchBody = {}) => {
  const baseURL = 'https://fast-food-fast-delivery.herokuapp.com';
	showLoading();

  if (fetchMethod == 'GET' || fetchMethod == 'DELETE') {
    return request = new Request(baseURL + fetchUrl, {
      method: fetchMethod,
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('fastFoodToken')
      }),
    });
  }

	return request = new Request(baseURL + fetchUrl, {
		method: fetchMethod,
		headers: new Headers({
			'Content-Type': 'application/json',
			'x-access-token': localStorage.getItem('fastFoodToken'),
		}),
		body: JSON.stringify(fetchBody),
	});
}

createLoader = () => {
	const loading = document.createElement('div');
	const image = document.createElement('img');
	image.setAttribute('src', 'images/download.png');
	image.setAttribute('class', 'loading-img');
	loading.setAttribute('class', 'loading');
	loading.appendChild(image);
	document.querySelector('body').appendChild(loading);
}
createLoader();

showLoading = () => {
	const load = document.querySelector('.loading');
	load.style.display = 'flex';
}
hideLoading = () => {
	const unload = document.querySelector('.loading');
	unload.style.display = 'none';
}

popupAlert = () => {
	const popup = document.createElement('div');
	popup.setAttribute('class', 'popupAlertOverlay');
	const child = document.createElement('div');
	child.setAttribute('class', 'popup');
	let grandChild = document.createElement('div');
	grandChild.setAttribute('class', 'popup-head');
	grandChild.innerHTML = `<strong id="popupAlertTitle"></strong>`;
	child.appendChild(grandChild);
	grandChild = document.createElement('div');
	grandChild.setAttribute('class', 'popup-body');
	grandChild.innerHTML = `<span id="popupAlertMessage"></span>
						<div class="mt-20 spread-out">
							<button id="popupAlertOK">OK</button>
            </div>`;
	child.appendChild(grandChild);
	popup.appendChild(child);
	document.querySelector('body').appendChild(popup);
}
popupAlert ();
showPopupAlert = (title, message, callbackFunc) => {
	document.getElementById('popupAlertTitle').innerHTML = title;
	document.getElementById('popupAlertMessage').innerHTML = message;
	const popup = document.querySelector('.popupAlertOverlay');
	popup.style.display = 'flex';
	const okBtn = document.getElementById('popupAlertOK');
	okBtn.addEventListener('click', (event) => {
		popup.style.display = 'none';
		callbackFunc();
	});
}

checkAuth = () => {
	let address = window.location.href;
	address = address.replace(/^.+[\/\\]/, "");
	
	const fetchUrl = `/api/v1/verifytoken`;
	const fetchMethod = 'GET';
	const logout = document.getElementById('logout');
	
	if(address === 'adminFood.html'
		|| address === 'adminOrder.html') {
		logout.addEventListener('click', () => {
			localStorage.removeItem('fastFoodToken');
			window.location.href = 'adminLogin.html';
		});
	} else if(address === 'viewFood.html'
		|| address === 'viewOrder.html') {
		logout.addEventListener('click', () => {
			localStorage.removeItem('fastFoodToken');
			window.location.href = 'index.html';
		});
	}
	
	fetch(requestFetch(fetchUrl, fetchMethod))
	.then(resp => resp.json())
	.then((data) => {
		hideLoading();
		if(address === 'adminFood.html'
			|| address === 'adminOrder.html') {
			if(data.message !== 'admin verified') {
				window.location.href = 'adminLogin.html';
			}
		} else if(address === 'viewFood.html'
			|| address === 'viewOrder.html') {
			if(data.message !== 'user verified') {
				window.location.href = 'index.html';
			}
		} else if(address === 'adminLogin.html'
			|| address === 'adminRegister.html') {
			if(data.message === 'admin verified') {
				window.location.href = 'adminOrder.html';
			}
		} else if(address === 'index.html'
			|| address === 'register.html') {
			if(data.message === 'user verified') {
				window.location.href = 'viewFood.html';
			}
		}
	})
	.catch((err) => {
		hideLoading();
	});
}
checkAuth();