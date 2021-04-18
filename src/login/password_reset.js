if((location.href == "http://127.0.0.1:8000/login/applicant/password_reset/")||(location.href == "http://127.0.0.1:8000/login/employer/password_reset/")){

    document.getElementById("id_email").classList.add("form-control")
    document.getElementById("id_email").classList.add("pass-reset-input")
      

}


else if(location.href.indexOf('password_reset_confirm') != -1){

    document.getElementById("id_new_password1").classList.add("form-control")
    document.getElementById("id_new_password1").classList.add("pass-reset-input")
    document.getElementById("id_new_password2").classList.add("form-control")
    document.getElementById("id_new_password2").classList.add("pass-reset-input")

}