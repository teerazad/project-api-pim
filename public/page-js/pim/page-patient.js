
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
            ucepId: "1",
            name: document.getElementById('a15').value,
            village: document.getElementById('a16').value,
            place: document.getElementById('a17').value,
            canton: document.getElementById('a18').value,
            province: document.getElementById('a19').value,
            postalCode: document.getElementById('a20').value
        }
        console.log(jsondata)
        
        axios.post('https://pim.phanomhospital.online/api/pim/save/patient', jsondata)
            .then(function (response) {
                console.log(response.data);
                if (response.data.statusCode == "200") {
                    setTimeout(() => {
                        window.location.href = 'page-patient-form'
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

setTimeout(async () => {
    const mapTh = new Map();
    const amphoe = [];
    await fetch('../assets/system/jquery.Thailand.js/database/raw_database/raw_database.json')
        .then((response) => response.json())
        .then(async(json) => {
            await console.log(json)
            await json.forEach(element => {
                element.province
                amphoe.push(element.amphoe)
                mapTh.set(element.province,amphoe)
            });
            await console.log(mapTh)

        });


        for (let [key, value] of mapTh) {
            // console.log(key + " is " + value);
            const sel = document.getElementById("a19");
            const opt = document.createElement("option");
            opt.value = key;
            opt.text = key;
            sel.add(opt, null);
        }
}, 1000);


Array.from(document.getElementsByClassName('mb-3 province')).forEach(function (el) {
    el.addEventListener('click', function async (e) {
        const selAll = document.getElementById("a18");
        var length = selAll.options.length;
        console.log(length)
        for (var i =length; i >0;i--) {
            selAll.remove(i);
        }

        const selAll2 = document.getElementById("a17");
        var length2 = selAll2.options.length;
        console.log(length2)
        for (var i =length; i >0;i--) {
            selAll2.remove(i);
        }
       
    })
});


Array.from(document.getElementsByClassName('mb-3 amphoe')).forEach(function (el) {
    el.addEventListener('click', function async (e) {
        // const selAll = document.getElementById("a18");
        // var length = selAll.options.length;
        // console.log(length)
        // for (var i =length-1; i >0;i--) {
        //     selAll.remove(i);
        // }
        const amphoeTH = new Map();
        const district =[];
        fetch('../assets/system/jquery.Thailand.js/database/raw_database/raw_database.json')
        .then((response) => response.json())
        .then(async(json) => {
            var data_filter = json.filter( element => element.province ==`${document.getElementById("a19").value}`)
            console.log(data_filter);
            data_filter.forEach(element => {
                district.push(element.district)
                amphoeTH.set(element.amphoe,district)
            });
        });
        setTimeout(async () => {
            for (let [key, value] of amphoeTH) {
                console.log(key + " is " + value);
                const sel = document.getElementById("a18");
                const opt = document.createElement("option");
                opt.value = key;
                opt.text = key;
                sel.add(opt, null);
            }
        }, 2000);
        
        // for (var i in amphoe) {

        //     amphoeTH.set(amphoe[i],amphoe)
        //     console.log(amphoe[i]);
        //     const sel = document.getElementById("a18");
        //     const opt = document.createElement("option");
        //     opt.value = amphoe[i];
        //     opt.text = amphoe[i];
        //     sel.add(opt, null);
        // }

    })
});


Array.from(document.getElementsByClassName('mb-3 district')).forEach(function (el) {
    el.addEventListener('click', function async (e) {
        const amphoeTH = new Map();
        const district =[];
        fetch('../assets/system/jquery.Thailand.js/database/raw_database/raw_database.json')
        .then((response) => response.json())
        .then(async(json) => {
            var data_filter = json.filter( element => element.province ==`${document.getElementById("a19").value}` &&  element.amphoe == `${document.getElementById("a18").value}`)
            console.log(data_filter);
            data_filter.forEach(element => {
                district.push(element.zipcode)
                amphoeTH.set(element.district,district)
            });
        });
        setTimeout(async () => {
            for (let [key, value] of amphoeTH) {
                console.log(key + " is " + value);
                const sel = document.getElementById("a17");
                const opt = document.createElement("option");
                opt.value = key;
                opt.text = key;
                sel.add(opt, null);
            }
        }, 2000);
        
        // for (var i in amphoe) {

        //     amphoeTH.set(amphoe[i],amphoe)
        //     console.log(amphoe[i]);
        //     const sel = document.getElementById("a18");
        //     const opt = document.createElement("option");
        //     opt.value = amphoe[i];
        //     opt.text = amphoe[i];
        //     sel.add(opt, null);
        // }

    })
});

Array.from(document.getElementsByClassName('mb-3 district')).forEach(function (el) {
    el.addEventListener('input', function async (e) {
        fetch('../assets/system/jquery.Thailand.js/database/raw_database/raw_database.json')
        .then((response) => response.json())
        .then(async(json) => {
            var data_filter = json.filter( element => element.province ==`${document.getElementById("a19").value}` &&  element.amphoe == `${document.getElementById("a18").value}` &&  element.district == `${document.getElementById("a17").value}`)
            console.log(data_filter);
            data_filter.forEach(element => {
                document.getElementById("a20").value=element.zipcode;
            });
        });

    })
});


function calculateAge(birthDate) {
    var today = new Date();
    var birthDate = new Date(birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
  
  
  
  
  Array.from(document.getElementsByClassName('mb-3 bday')).forEach(function (el) {
    el.addEventListener('input', function (e) {
      var birthDate = document.getElementById('a6').value;
      console.log("อายุของคุณคือ " + calculateAge(birthDate) + " ปี");
      var birthDate = document.getElementById('a7').value= calculateAge(birthDate);
      
    })
  });

// Array.from(document.getElementsByClassName('mb-3 zipcode')).forEach(function (el) {
//     el.addEventListener('input', function async (e) {
//         const selAll = document.getElementById("a19");
//         var length = selAll.options.length;
//         console.log(length)
//         for (var i =length; i >0;i--) {
//             selAll.remove(i);
//         }

//         fetch('../assets/system/jquery.Thailand.js/database/raw_database/raw_database.json')
//         .then((response) => response.json())
//         .then(async(json) => {
//             var data_filter = json.filter( element => element.zipcode ==`${document.getElementById("a20").value}`)
//             console.log(data_filter);
//             data_filter.forEach(element => {

//                 const sel1 = document.getElementById("a17");
//                 const opt1 = document.createElement("option");
//                 opt1.value = element.district;
//                 opt1.text = element.district;
//                 sel1.add(opt1, null);

//                 const sel2 = document.getElementById("a18");
//                 const opt2 = document.createElement("option");
//                 opt2.value = element.amphoe;
//                 opt2.text = element.amphoe;
//                 sel2.add(opt2, null);

//                 const sel3 = document.getElementById("a19");
//                 const opt3 = document.createElement("option");
//                 opt3.value = element.province;
//                 opt3.text = element.province;
//                 sel3.add(opt3, null);
               
//             });
//         });

//     })
// });


