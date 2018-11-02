const signinForm = document.forms['signinForm'];
signinForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const fetchUrl = '/api/v1/auth/login';
  const fetchMethod = 'POST';
  const fetchBody = {
		email: signinForm.email.value,
		password: signinForm.password.value
  };
	fetch(requestFetch(fetchUrl, fetchMethod, fetchBody))
	.then(resp => resp.json())
	.then((data) => {
		hideLoading();
		if(data.status === 'success') {
			window.location.href = 'viewFood.html';
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