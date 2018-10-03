const signinFormAdmin = document.forms['signinFormAdmin'];
signinFormAdmin.addEventListener('submit', (event) => {
	event.preventDefault();
	const uri = '/api/v1/admin/login';
  const methodF = 'POST';
  const bodyF = {
		email: signinFormAdmin.email.value,
		password: signinFormAdmin.password.value
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