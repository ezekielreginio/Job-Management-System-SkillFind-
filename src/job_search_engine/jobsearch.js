document.getElementById("searchbar").addEventListener("submit", (e)=>{
    e.preventDefault()
    let query = document.getElementById("input-searchbar").value
    location.replace("/jobs?q="+query)
})