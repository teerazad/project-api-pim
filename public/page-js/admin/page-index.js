var element2 = document.getElementById('dash');
element2.classList.add("active");
const listX = []
const listY = []

const listV1 = []
const listV2 = []
const listV3 = []
const listV4 = []
const listV5 = []
const listV6 = []
const listV7 = []
const listV8 = []
const listV9 = []
const listV10 = []

const listVLN = []
const listVLW = []
const listVLD = []

const listXRN = []
const listXRD = []

const listCDN = []
const listCDW = []
const listCDD = []

const province = []
const numberP = []
const mapTh = new Map();
console.log(mapTh.get("สึนา"))
axios('https://pim.phanomhospital.online/api/pim/data/patient?search=')
  .then(function (response) {
    console.log(response.data);
    (response.data).forEach(async (values, item) => {
      var num = mapTh.get(values.province) == undefined?0:mapTh.get(values.province);
      mapTh.set(values.province,num+1)
      console.log(mapTh)
        // const amphoe = [];
        // await fetch('../assets/system/jquery.Thailand.js/database/raw_database/raw_database.json')
        //     .then((response) => response.json())
        //     .then(async(json) => {
        //         await console.log(json)
        //         await json.forEach(element => {
        //             amphoe.push(element.amphoe)
        //             mapTh.set(element.province,amphoe)
        //         });
        //         await console.log(mapTh)
    
        //     });
    
      if (values.place == 'พนม') {
        listV1.push(values.napNo)
      } else if (values.place == 'ต้นยวน') {
        listV2.push(values.napNo)
      } else if (values.place == 'คลองศก') {
        listV3.push(values.napNo)
      } else if (values.place == 'พลูเถื่อน') {
        listV4.push(values.napNo)
      } else if (values.place == 'พังกาญจน์') {
        listV5.push(values.napNo)
      } else if (values.place == 'คลองชะอุ่น') {
        listV6.push(values.napNo)
      }
      
      if (values.prefix == 'นาย') {
        listX.push(values.napNo)

      } else {
        listY.push(values.napNo)
      }

      (values.appointmentDisease).forEach((values2, item) => {
        if(values2.type=='vl'){
          if(values2.checkType<=50){
            listVLN.push(values.napNo)
          }else if (values2.checkType<=1000){
            listVLW.push(values.napNo)
          }else if (values2.checkType>=1001){
            listVLD.push(values.napNo)
          }
        }

        if(values2.type=='cd4'){
          if(values2.checkType<=500){
            listCDN.push(values.napNo)
          }else if (values2.checkType<=1500){
            listCDW.push(values.napNo)
          }else if (values2.checkType>=1501){
            listCDD.push(values.napNo)
          }
        }

        if(values2.type=='x-rey'){
          if(values2.checkType == 'ปกติ'){
            listXRN.push(values.napNo)
          }else if (values2.checkType == 'ผิดปกติ'){
            listXRD.push(values.napNo)
          }
        }
      })
      
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
  const labels2 = ['เพศชาย', 'เพศหญิง'];
  const data2 = {
    labels: labels2,
    datasets: [{
      label: "ผู้ป่วยโรค PL เเต่ละเพศ",
      data: [listX.length, listY.length],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  for (let [key, value] of mapTh) {
    province.push(key)
    numberP.push(value)
  }

  const labels = province;
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: numberP,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          min: 0,
          max: 100,
          title: {
            display: true,
            text: '(คน)',
            font: {
              size: 25
          }
          }
        },
        // x: {
        //   title: {
        //     display: true,
        //     text: ''
        //   }
        // }
      }
    },
  };

  const ctx1 = document.getElementById('myChart1');
  new Chart(ctx1, config);

  const config2 = {
    type: 'pie',
    data: data2,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          //   text: 'Chart.js Pie Chart'
        }
      }
    },
  };

  const ctx2 = document.getElementById('myChart2');
  new Chart(ctx2, config2);

  
    const labels3 = ['ปกติ', ' ควบคุมโรคไม่ได้','เสี่ยงภาวะดื้อยา'];
    const data3 = {
      labels: labels3,
      datasets: [{
        label: "ข้อมูล VL ของผู้ป่วยเเต่ละประเภท",
        data: [listVLN.length, listVLW.length, listVLD.length],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 159, 64)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1
      }]
    };
  const config3 = {
    type: 'pie',
    data: data3,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          //   text: 'Chart.js Pie Chart'
        }
      }
    },
  };

  const ctx3 = document.getElementById('myChart3');
  new Chart(ctx3, config3);

  const labels4 = ['ปกติ', ' ควบคุมโรคไม่ได้','ภาวะเสี่ยง'];
  const data4 = {
    labels: labels4,
    datasets: [{
      label: "ข้อมูล VL ของผู้ป่วยเเต่ละประเภท",
      data: [listCDN.length, listCDW.length, listCDD.length],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgb(75, 192, 192)',
        'rgb(255, 159, 64)',
        'rgb(255, 99, 132)',
      ],
      borderWidth: 1
    }]
  };
  const config4 = {
    type: 'pie',
    data: data4,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          //   text: 'Chart.js Pie Chart'
        }
      }
    },
  };
  const ctx4 = document.getElementById('myChart4');
  new Chart(ctx4, config4);


  const labels5 = ['ปกติ', 'ผิดปกติ'];
  const data5 = {
    labels: labels5,
    datasets: [{
      label: "ข้อมูล VL ของผู้ป่วยเเต่ละประเภท",
      data: [listXRN.length,listXRD.length],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgb(75, 192, 192)',
        'rgb(255, 159, 64)',
        'rgb(255, 99, 132)',
      ],
      borderWidth: 1
    }]
  };
  const config5 = {
    type: 'pie',
    data: data5,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          //   text: 'Chart.js Pie Chart'
        }
      }
    },
  };
  const ctx5 = document.getElementById('myChart5');
  new Chart(ctx5, config5);
  

}, 2000);


