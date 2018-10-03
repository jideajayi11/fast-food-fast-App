const signupForm = document.forms['signupForm'];
signupForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const uri = '/api/v1/auth/signup';
  const methodF = 'POST';
  const bodyF = {
    fullName: signupForm.fullName.value,
		phoneNumber: signupForm.phoneNumber.value,
		deliveryAddress: signupForm.address.value,
		email: signupForm.email.value,
		password: signupForm.password.value,
		confirmPassword: signupForm.cPassword.value
  };
	fetch(requestFetch(uri, methodF, bodyF))
	.then(resp => resp.json())
	.then((data) => {
		console.log(data);
		if(data.status === 'success') {
			window.location.href = 'viewFood.html';
			localStorage.setItem('fastFoodToken', data.token);
			localStorage.setItem('userName', data.data.fullName);
		} else {
			document.querySelector('#errorMessage').innerHTML = data.message;
		}
	})
	.catch((error) => {
		console.log(error);
	});

});