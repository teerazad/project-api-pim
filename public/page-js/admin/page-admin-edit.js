


axios('https://pim.phanomhospital.online/api/users/data/admin?search='+localStorage.getItem('userAdmin'))
    .then(function (response) {
        console.log(response.data);
        (response.data).forEach((values, item) => {
            document.getElementById('a1').value = values.prefix;
            document.getElementById('a2').value = values.firstName;
            document.getElementById('a3').value = values.lastName;
            document.getElementById('a4').value =values.jobPosition;
            document.getElementById('a5').value = values.username;
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