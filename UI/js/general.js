function requestFetch(fetchUrl, fetchMethod, fetchBody = {}) {
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

function createLoader () {
	const loading = document.createElement('div');
	const image = document.createElement('img');
	image.setAttribute('src', 'images/download.png');
	image.setAttribute('class', 'loading-img');
	loading.setAttribute('class', 'loading');
	loading.appendChild(image);
	document.querySelector('body').appendChild(loading);
}
createLoader();

function showLoading () {
	const load = document.querySelector('.loading');
	load.style.display = 'flex';
}
function hideLoading () {
	const unload = document.querySelector('.loading');
	unload.style.display = 'none';
}
