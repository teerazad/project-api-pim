Array.from(document.getElementsByClassName('form-control border-0 shadow-none')).forEach(function (el) {
    el.addEventListener('input', function (e) {
        const searchParams = new URLSearchParams(window.location.search)
        searchParams.set("search", el.value)
        const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString()
        history.pushState(null, "", newRelativePathQuery)
    })
});
