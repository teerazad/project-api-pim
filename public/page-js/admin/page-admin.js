var element1 = document.getElementById('useradmin');
element1.classList.add("active");

var element2 = document.getElementById('userall');
element2.classList.add("active");

const list = []

axios('https://pim.phanomhospital.online/api/users/data/officers?search=')
    .then(function (response) {
        console.log(response.data);
        (response.data).forEach((values, item) => {
            var listdata = []
            listdata.push(item + 1)
            listdata.push(values.prefix + ' ' + values.firstName + '  ' + values.lastName)
            listdata.push(values.username)
            listdata.push(values.jobPosition)
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
    
import {h} from "https://unpkg.com/gridjs?module";
new gridjs.Grid({
    columns: ["ลำดับ", "ชื่อนามสกุล", "ชื่อผู้ใช้งาน", "ตำเเหน่ง",
        {
            name: 'เเก้ไข',
            formatter: (cell, row) => {
                return h('button', {
                  className: 'btn btn-warning',
                  onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
                }, 'Edit');
              }
        },
        {
            name: 'ลบ',
            formatter: (cell, row) => {
                return h('button', {
                  className: 'btn btn-danger',
                  onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
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