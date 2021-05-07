if(location.href.indexOf('login-handicapped') != -1 ){
    
    document.getElementById("btn-sign").addEventListener("click", function(){
        this.classList.replace("btn-pwd-nonactive", "btn-pwd")
        document.getElementById("btn-login").classList.replace("btn-pwd", "btn-pwd-nonactive")
        document.getElementById("login-content").classList.add("d-none")
        document.getElementById("signup-content").classList.remove("d-none")
    })

    document.getElementById("btn-login").addEventListener("click", function(){
        this.classList.replace("btn-pwd-nonactive", "btn-pwd")
        document.getElementById("btn-sign").classList.replace("btn-pwd", "btn-pwd-nonactive")
        document.getElementById("signup-content").classList.add("d-none")
        document.getElementById("login-content").classList.remove("d-none")
       
    })
  
  


      
}