
var element1 = document.getElementById('fromPatient');
element1.classList.add("active");

var element2 = document.getElementById('patient');
element2.classList.add("active");

Array.from(document.getElementsByClassName('btn btn-primary')).forEach(function (el) {
    el.addEventListener('click', function (e) {
        const jsondata = {
            napNo:document.getElementById('a1').value,
            prefix: document.getElementById('a2').value,
            firstName: document.getElementById('a3').value,
            lastName: document.getElementById('a4').value,
            nickname: document.getElementById('a5').value,
            birthday: document.getElementById('a6').value,
            age: document.getElementById('a7').value,
            hn: document.getElementById('a8').value,
            idcard: document.getElementById('a9').value,
            phoneNumber: document.getElementById('a10').value,
            weight: document.getElementById('a11').value,
            height: document.getElementById('a12').value,
            job: document.getElementById('a13').value,
            ucepId: document.getElementById('a14').value,
            name: document.getElementById('a15').value
        }
        console.log(jsondata)
        
        axios.post('https://pim.phanomhospital.online/api/pim/save/patient', jsondata)
            .then(function (response) {
                console.log(response.data);
                if (response.data.statusCode == "200") {
                    setTimeout(() => {
                        window.location.href = 'page-patient-form'
                        localStorage.setItem('token', response.data.access_token);
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