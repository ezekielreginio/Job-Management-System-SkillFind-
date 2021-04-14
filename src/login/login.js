 function login(username,password){
    console.log(`Username: ${username} || Password: ${password}`) // "Username: "+ username 
}



if(location.href.indexOf('login') != -1){

    let log_input = document.getElementsByClassName("form-control")
    for(let i= 0; i<log_input.length; i++){
        log_input[i].classList.add("log-input")
    }

}