var element1 = document.getElementById('userofficer');
element1.classList.add("active");

var element2 = document.getElementById('userall');
element2.classList.add("active");



axios('https://pim.phanomhospital.online/api/pim/data2/patient?search='+localStorage.getItem('userPatient'))
    .then(function (response) {
        console.log(response.data);
        (response.data).forEach((values, item) => {
            document.getElementById('a1').value = values.napNo;
            document.getElementById('a2').value = values.prefix;
            document.getElementById('a3').value = values.firstName;
            document.getElementById('a4').value = values.lastName;
            document.getElementById('a5').value = values.nickname;
            document.getElementById('a6').value = values.birthday;
            document.getElementById('a7').value = values.age;
            document.getElementById('a8').value = values.hn;
            document.getElementById('a9').value = values.idcard;
            document.getElementById('a10').value = values.phoneNumber;
            document.getElementById('a11').value = values.weight;
            document.getElementById('a12').value = values.height;
            document.getElementById('a13').value = values.job;
            document.getElementById('a15').value = values.name;
            document.getElementById('a16').value = values.village;
            document.getElementById('a17').value = values.place;
            document.getElementById('a18').value = values.canton;
            document.getElementById('a19').value = values.province;
            document.getElementById('a20').value = values.postalCode;
        })
    })
    .catch(function (error) {

        if (error.response.data.message[0].message != undefined) {
            Swal.fire({
                icon: "error",
                title: error.response.data.message[0].message
            });
        } else {
            console.log(error.response.data)
            Swal.fire({
                icon: "error",
                title: error.response.data.message
            });
        }
    });

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
                ucepId: "1",
                name: document.getElementById('a15').value,
                village: document.getElementById('a16').value,
                place: document.getElementById('a17').value,
                canton: document.getElementById('a18').value,
                province: document.getElementById('a19').value,
                postalCode: document.getElementById('a20').value
            }
            console.log(jsondata)
            
            axios.post('https://pim.phanomhospital.online/api/pim/edit/patient', jsondata)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.statusCode == "200") {
                        setTimeout(() => {
                            window.location.href = 'page-patient'
                        }, 1750)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            showConfirmButton: false,
                            timer: 1800
                        })
    
                    } else if(response.data.status=="400") {
                        alert('failed')
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