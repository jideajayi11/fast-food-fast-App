const signinForm = document.forms['signinForm'];
signinForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const uri = '/api/v1/auth/login';
  const methodF = 'POST';
  const bodyF = {
		email: signinForm.email.value,
		password: signinForm.password.value
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
		document.querySelector('#errorMessage').innerHTML = `
			Something is not right. Try checking your connection.`;
	});

});