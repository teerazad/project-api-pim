
var element1 = document.getElementById('useradmin');
element1.classList.add("active");

var element2 = document.getElementById('userall');
element2.classList.add("active");

Array.from(document.getElementsByClassName('btn btn-primary')).forEach(function (el) {
    el.addEventListener('click', function (e) {
        const jsondata = {
            
            prefix:document.getElementById('a1').value,
            firstName: document.getElementById('a2').value,
            lastName: document.getElementById('a3').value,
            jobPosition: document.getElementById('a4').value,
            username:document.getElementById('a5').value,
            password: document.getElementById('a6').value,
            status : "admin"
        }
        console.log(jsondata)
        
        axios.post('https://pim.phanomhospital.online/api/users/register/admins', jsondata)
            .then(function (response) {
                console.log(response.data);
                if (response.data.statusCode == "200") {
                    setTimeout(() => {
                        window.location.href = 'page-admin'
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