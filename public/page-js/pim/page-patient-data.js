import { h } from "https://unpkg.com/gridjs?module";
var element1 = document.getElementById('fromPatientData');
element1.classList.add("active");

var element2 = document.getElementById('patientData');
element2.classList.add("active");


const list = []

axios('https://pim.phanomhospital.online/api/pim/data/patient?search=')
    .then(function (response) {
        console.log(response.data);
        (response.data).forEach((values, item) => {
            var listdata = []
            listdata.push(item + 1)
            listdata.push(values.prefix + ' ' + values.firstName + '  ' + values.lastName)
            listdata.push(values.napNo)
            list.push(listdata)
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


function delAdmin(id) {
    Swal.fire({
        title: "คุณแน่ใจไหม?",
        text: "คุณจะไม่สามารถย้อนกลับสิ่งนี้ได้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่ ลบมัน!",
        cancelButtonText: "ยกเลิก"
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete('https://pim.phanomhospital.online/api/pim/del/patient/'+id)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.statusCode == "200") {
                        setTimeout(() => {
                            window.location.href = 'page-patient'
                        }, 1750)
                        Swal.fire({
                            title: "ลบเสร็จเรียบร้อย",
                            text: "ข้อมูลถูกลบเเล้ว",
                            icon: "success"
                        });

                    } else if (response.data.status == "400") {
                        alert('login failed user')
                    }
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
        }
    });
}

setTimeout(() => {
    new gridjs.Grid({
        columns: ["ลำดับ", "ชื่อนามสกุล", "รหัสผู้ป่วย",
            {
                name: 'เเก้ไข',
                formatter: (cell, row) => {
                    return h('button', {
                        className: 'btn btn-warning',
                        onClick: () => {localStorage.setItem('userPatient', row.cells[2].data);window.location.href = 'page-patient-edit';}
                    }, 'Edit');
                }
            },
            {
                name: 'ลบ',
                formatter: (cell, row) => {
                    return h('button', {
                        className: 'btn btn-danger',
                        onClick: () => {delAdmin(row.cells[2].data);}
                    }, 'Delete');
                }
            }
        ],

        search: true,
        pagination: {
            limit: 10
        },
        data: list,
        style: {
            table: {
                border: '3px solid #ccc'
            },
            th: {
                'background-color': 'rgba(0, 0, 0, 0.1)',
                color: '#000',
                'border-bottom': '3px solid #ccc',
                'text-align': 'center'
            },
            td: {
                'text-align': 'center'
            }
        },
    }).render(document.getElementById("wrapper"));
}, 2000);

Array.from(document.getElementsByClassName('btn btn-primary z')).forEach(function (el) {
    el.addEventListener('click', function (e) {
        setTimeout(() => {
            window.location = "/api/pim/data/patient/excel"
        }, 1000);
        Swal.fire({
            icon: 'success',
            title: 'Expost Excel Success',
            showConfirmButton: false,
            timer: 1800
        })
    })
});