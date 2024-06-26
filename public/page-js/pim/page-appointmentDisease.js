import { h } from "https://unpkg.com/gridjs?module";

var element1 = document.getElementById('fromPatient');
element1.classList.add("active");

var element2 = document.getElementById('appointmentDisease');
element2.classList.add("active");

const list = []

axios('https://pim.phanomhospital.online/api/pim/data/patient')
    .then(function (response) {
        console.log(response.data);
        (response.data).forEach((values, item) => {
            var listdata = []
            listdata.push(item + 1)
            listdata.push(values.napNo)
            listdata.push(values.prefix + ' ' + values.firstName + '  ' + values.lastName)
            list.push(listdata)
            if (values.napNo == localStorage.getItem('patient')) {
                document.getElementById('a1').value = values.napNo;
                document.getElementById('a2').value = values.prefix + ' ' + values.firstName + '  ' + values.lastName
            }
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

setTimeout(() => {
    new gridjs.Grid({
        columns: ["ลำดับ", "รหัสผู้ป่วย", "ชื่อนามสกุล",
            {
                name: 'เลือก',
                formatter: (cell, row) => {
                    return h('button', {
                        className: 'btn btn-success',
                        onClick: () => {
                            localStorage.setItem('patient', row.cells[1].data);
                            setTimeout(() => {
                                location.reload();
                            }, 1750)
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                showConfirmButton: false,
                                timer: 1800
                            })
                        }
                    }, 'ยืนยัน');
                }
            }
        ],

        search: true,
        pagination: {
            limit: 5
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

Array.from(document.getElementsByClassName('btn btn-primary b')).forEach(function (el) {
    el.addEventListener('click', function (e) {
        const jsondata = {
            napNo: document.getElementById('a1').value,
            aitDt: document.getElementById('a3').value,
            type: document.getElementById('a4').value,
            checkType: document.getElementById('a5').value,
            other: document.getElementById('a6').value
        }
        console.log(jsondata)

        axios.post('https://pim.phanomhospital.online/api/pim/save/appointmentDisease', jsondata)
            .then(function (response) {
                console.log(response.data);
                if (response.data.statusCode == "200") {
                    setTimeout(() => {
                        window.location.href = 'page-appointmentDisease-form'
                        localStorage.removeItem('patient')
                    }, 1750)
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        showConfirmButton: false,
                        timer: 1800
                    })

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
    });
});


const list2 = []

axios('https://pim.phanomhospital.online/api/pim/data/appointmentDisease?search=')
    .then(function (response) {
        console.log(response.data);
        (response.data).forEach((values, item) => {
            var listdata = []
            listdata.push(item + 1)
            listdata.push(values.aitId)
            listdata.push(values.napNo.napNo)
            listdata.push((values.napNo.prefix + ' ' + values.napNo.firstName + '  ' + values.napNo.lastName))
            const date = new Date(Date.parse(values.aitDt))

            const result = date.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour:'numeric',
                minute:'numeric'
            })
            listdata.push(result)
            listdata.push(values.type)
            listdata.push(values.checkType)
            listdata.push(values.other)

            list2.push(listdata)
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

function delDrug(id) {
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
            axios.delete('https://pim.phanomhospital.online/api/pim/del/appointmentDisease/' + id)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.statusCode == "200") {
                        setTimeout(() => {
                            window.location.href = 'page-appointmentDisease-form'
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
        columns: ["ลำดับ", "ID", "รหัสผู้ป่วย", "ชื่อนามสกุล", "เวลาตรวจโรค","วิธีตรวจ","ค่าในตรวจ","รายละเอียด",
            {
                name: 'ลบ',
                formatter: (cell, row) => {
                    return h('button', {
                        className: 'btn btn-danger',
                        onClick: () => delDrug(`${row.cells[1].data}`)
                    }, 'Delete');
                }
            }
        ],

        search: true,
        pagination: {
            limit: 5
        },
        data: list2,
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
    }).render(document.getElementById("wrapper2"));
}, 1000);


function isPastDate(dateToCheck) {
    var now = new Date();
    var givenDate = new Date(dateToCheck);
    
    return givenDate < now;
}


  Array.from(document.getElementsByClassName('mb-3 day')).forEach(function (el) {
    el.addEventListener('input', function (e) {
      var Date = document.getElementById('a3').value;
        if (isPastDate(Date)) {
            Swal.fire({
                        icon: "error",
                        title: "กรุณากรอกข้อมูลวันเวลามากกว่าวันปัจจุบัน"
                    });
            document.getElementById('a3').value="";
        } else {
            console.log("วันและเวลาที่เช็คไม่ได้อยู่ในอดีต");
        }
      
    })
  });