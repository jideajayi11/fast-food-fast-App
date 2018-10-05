const signupFormAdmin = document.forms['signupFormAdmin'];

signupFormAdmin.addEventListener('submit', (event) => {
	event.preventDefault();
	const fetchUrl = '/api/v1/admin/signup';
  const fetchMethod = 'POST';
  const fetchBody = {
    restaurant: signupFormAdmin.restaurant.value,
		phoneNumber: signupFormAdmin.phoneNumber.value,
		email: signupFormAdmin.email.value,
		password: signupFormAdmin.password.value,
		confirmPassword: signupFormAdmin.cPassword.value
  };
	fetch(requestFetch(fetchUrl, fetchMethod, fetchBody))
	.then(resp => resp.json())
	.then((data) => {
		if(data.status === 'success') {
			window.location.href = 'adminOrder.html';
			localStorage.setItem('fastFoodToken', data.token);
		} else {
			document.querySelector('#errorMessage').innerHTML = data.message;
		}
	})
	.catch((error) => {
		document.querySelector('#errorMessage').innerHTML = `
			Something is not right. Try checking your connection.`;
	});

});
