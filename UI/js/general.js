function requestFetch(fetchUrl, fetchMethod, fetchBody = {}) {
  const baseURL = 'https://fast-food-fast-delivery.herokuapp.com';

  if (fetchMethod == 'GET' || fetchMethod == 'DELETE') {
    return request = new Request(baseURL + fetchUrl, {
      method: fetchMethod,
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('fastFoodToken'),
				mode: 'cors'
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
