const signupForm = document.forms['signupForm'];

signupForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const fetchUrl = '/api/v1/auth/signup';
  const fetchMethod = 'POST';
  const fetchBody = {
    fullName: signupForm.fullName.value,
		phoneNumber: signupForm.phoneNumber.value,
		deliveryAddress: signupForm.address.value,
		email: signupForm.email.value,
		password: signupForm.password.value,
		confirmPassword: signupForm.cPassword.value
  };
	fetch(requestFetch(fetchUrl, fetchMethod, fetchBody))
	.then(resp => resp.json())
	.then((data) => {
		if(data.status === 'success') {
			window.location.href = 'viewFood.html';
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