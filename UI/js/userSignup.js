function requestFetch(uri, methodF, bodyF = {}) {
  //const baseURL = 'https://fast-food-fast-delivery.herokuapp.com/';
  const baseURL = 'http://localhost:3000';

  if (methodF == 'GET' || methodF == 'DELETE') {
    return request = new Request(baseURL + uri, {
      method: methodF,
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('fastFoodToken'),
      }),
    });
  }

	return request = new Request(baseURL + uri, {
		method: methodF,
		headers: new Headers({
			'Content-Type': 'application/json',
			'x-access-token': localStorage.getItem('fastFoodToken'),
		}),
		body: JSON.stringify(bodyF),
	});
}