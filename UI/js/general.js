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
showPopupAlert = (title, message) => {
	document.getElementById('popupAlertTitle').innerHTML = title;
	document.getElementById('popupAlertMessage').innerHTML = message;
	const popup = document.querySelector('.popupAlertOverlay');
	popup.style.display = 'flex';
	const okBtn = document.getElementById('popupAlertOK');
	okBtn.addEventListener('click', (event) => {
		popup.style.display = 'none';
	});
}
showPopupAlert('test', 'This is a popup alert test.');