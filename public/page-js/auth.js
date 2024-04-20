Array.from(document.getElementsByClassName('form-control border-0 shadow-none')).forEach(function (el) {
    el.addEventListener('input', function (e) {
        const searchParams = new URLSearchParams(window.location.search)
        searchParams.set("search", el.value)
        const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString()
        history.pushState(null, "", newRelativePathQuery)
    })
});


fetch('https://pim.phanomhospital.online/api/users/auth', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
})
.then(response => response.json())
.then(data => {
    console.log(data.status)
    if (data.statusCode == '200' && data.status === "officer"){

        document.getElementById('userall').hidden=true;

        const para = document.createElement("p");
        const node = document.createTextNode(data.name);
        para.style.cssText='font-weight: bold;'
        para.appendChild(node);
        const element = document.getElementById("nameItem");
        element.appendChild(para);

    }else if(data.statusCode == '200' && data.status === "admin"){
        const para = document.createElement("p");
        const node = document.createTextNode(data.name);
        para.style.cssText='font-weight: bold;'
        para.appendChild(node);
        const element = document.getElementById("nameItem");
        element.appendChild(para);
    }
    else {
        setTimeout(() => {
            window.location = "/login"
            localStorage.removeItem('token')
        }, 1000);
        Swal.fire({
            icon: 'error',
            title: 'login failed',
            showConfirmButton: false,
            text: 'กรุณากรอก User เเละ รหัสผ่านใหม่ !!!!!'
        })
        
    }
})
.catch((error) => {
    setTimeout(() => {
            window.location = "/login"
            localStorage.removeItem('token')
        }, 1000);
        Swal.fire({
            icon: 'error',
            title: 'login failed',
            showConfirmButton: false,
            text: 'กรุณากรอก User เเละ รหัสผ่านใหม่ !!!!!'
        })
});