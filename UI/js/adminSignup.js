const signupFormAdmin = document.forms['signupFormAdmin'];

signupFormAdmin.addEventListener('submit', (event) => {
	event.preventDefault();
	const uri = '/api/v1/admin/signup';
  const methodF = 'POST';
  const bodyF = {
    restaurant: signupFormAdmin.restaurant.value,
		phoneNumber: signupFormAdmin.phoneNumber.value,
		email: signupFormAdmin.email.value,
		password: signupFormAdmin.password.value,
		confirmPassword: signupFormAdmin.cPassword.value
  };
	fetch(requestFetch(uri, methodF, bodyF))
	.then(resp => resp.json())
	.then((data) => {
		console.log(data);
		if(data.status === 'success') {
			window.location.href = 'adminOrder.html';
			localStorage.setItem('fastFoodToken', data.token);
			localStorage.setItem('userName', data.data.fullName);
		} else {
			document.querySelector('#errorMessage').innerHTML = data.message;
		}
	})
	.catch((error) => {
		console.log(error);
		document.querySelector('#errorMessage').innerHTML = `
			Something is not right. Try checking your connection.`;
	});

});
