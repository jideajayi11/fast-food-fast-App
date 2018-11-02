const signinFormAdmin = document.forms['signinFormAdmin'];
signinFormAdmin.addEventListener('submit', (event) => {
	event.preventDefault();
	const fetchUrl = '/api/v1/admin/login';
  const fetchMethod = 'POST';
  const fetchBody = {
		email: signinFormAdmin.email.value,
		password: signinFormAdmin.password.value
  };
	fetch(requestFetch(fetchUrl, fetchMethod, fetchBody))
	.then(resp => resp.json())
	.then((data) => {
		hideLoading();
		if(data.status === 'success') {
			window.location.href = 'adminOrder.html';
			localStorage.setItem('fastFoodToken', data.token);
		} else {
			document.querySelector('#errorMessage').innerHTML = data.message;
		}
	})
	.catch((error) => {
		hideLoading();
		document.querySelector('#errorMessage').innerHTML = `
			Something is not right. Try checking your connection.`;
	});

});