if(location.href.indexOf('login/applicant/') != -1 || location.href.indexOf('login/employer/') != -1){
    document.getElementById("btn-handicap-ui").remove()
    document.getElementById("btn-login-applicant").textContent = "Signin | Applicant"
    login_employer_btn = document.createElement("a")
    login_employer_btn.classList.add("btn", "btn-primary", "my-2", "my-sm-0", "mr-1")
    login_employer_btn.textContent = "For Employers"
    login_employer_btn.setAttribute("href", "/login/employer")
    document.getElementById("btn-login-applicant").after(login_employer_btn)

    let input_dark = document.getElementsByClassName("form-control")
    for(let i=0; i<input_dark.length; i++){
        input_dark[i].classList.add("input-dark-theme")
    }
    
    
    
}





