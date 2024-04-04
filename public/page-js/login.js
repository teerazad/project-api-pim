Array.from(document.getElementsByClassName('btn btn-primary d-grid w-100')).forEach(function (el) {
    el.addEventListener('click', function (e) {
        const jsondata = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }
        console.log(jsondata)
        
        axios.post('https://pim.phanomhospital.online/api/users/login', jsondata)
            .then(function (response) {
                console.log(response.data);
                if (response.data.statusCode == "200" && response.data.status == 'officer') {
                    setTimeout(() => {
                        window.location.href = '/officer/index'
                        localStorage.setItem('token', response.data.access_token);
                    }, 1750)
                    Swal.fire({
                        icon: 'success',
                        title: 'Login User Success',
                        showConfirmButton: false,
                        timer: 1800
                    })

                } else if (response.data.statusCode == "200" && response.data.status == 'admin') {
                    setTimeout(() => {
                        window.location.href = '/admin/index'
                        localStorage.setItem('token', response.data.token);
                    }, 1750)
                    Swal.fire({
                        icon: 'success',
                        title: 'Login User Success',
                        showConfirmButton: false,
                        timer: 1800
                    })
                } else if(response.data.status=="400") {
                    alert('login failed user')
                }
            })
            .catch(function (error) {
                
                if(error.response.data.message[0].message != undefined){
                    Swal.fire({
                        icon: "error",
                        title: error.response.data.message[0].message
                    });
                }else{
                    console.log(error.response.data)
                    Swal.fire({
                        icon: "error",
                        title: error.response.data.message
                    });
                }

            });
    });
});