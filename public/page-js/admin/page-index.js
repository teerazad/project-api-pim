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


axios('https://pim.phanomhospital.online/api/pim/data/patient?search=')
  .then(function (response) {
    console.log(response.data);
    (response.data).forEach((values, item) => {
      if (values.prefix == 'นาย') {
        listX.push(values.napNo)

      } else {
        listY.push(values.napNo)
      }
      (values.appointmentDisease).forEach((values2, item) => {
        if(values2.type=='vl'){
          if(values2.checkType<=50){
            listVLN.push(values.napNo)
          }else if (values2.checkType>=51 || values.appointmentDisease.checkType<=1000){
            listVLW.push(values.napNo)
          }else if (values2.checkType>=1000){
            istVLD.push(values.napNo)
          }
        }
      })

      if (values.village == 1) {
        listV1.push(values.napNo)
      } else if (values.village == 2) {
        listV2.push(values.napNo)
      } else if (values.village == 3) {
        listV3.push(values.napNo)
      } else if (values.village == 4) {
        listV4.push(values.napNo)
      } else if (values.village == 5) {
        listV5.push(values.napNo)
      } else if (values.village == 6) {
        listV6.push(values.napNo)
      } else if (values.village == 7) {
        listV7.push(values.napNo)
      } else if (values.village == 8) {
        listV8.push(values.napNo)
      } else if (values.village == 9) {
        listV9.push(values.napNo)
      } else if (values.village == 10) {
        listV10.push(values.napNo)
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

  const labels = ['หมู่บ้านที่ 1', 'หมู่บ้านที่ 2', 'หมู่บ้านที่ 3', 'หมู่บ้านที่ 4', 'หมู่บ้านที่ 5', 'หมู่บ้านที่ 6', 'หมู่บ้านที่ 7', 'หมู่บ้านที่ 8', 'หมู่บ้านที่ 9', 'หมู่บ้านที่ 10'];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [
        listV1.length, 
        listV2.length, 
        listV3.length, 
        listV4.length, 
        listV5.length, 
        listV6.length, 
        listV7.length, 
        listV8.length, 
        listV9.length, 
        listV10.length
      ],
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
          beginAtZero: true
        }
      }
    },
  };

  const ctx1 = document.getElementById('myChart1');
  new Chart(ctx1, config);



  // const config2 = {
  //     type: 'bar',
  //     data: data2,
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     },
  // };

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
        data: [listVLN.length, listVLW.length,listVLD.length],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)'
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

}, 2000);
