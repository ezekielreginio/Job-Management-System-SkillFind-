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


  
    const text = document.querySelector('.form-control')

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition


    const recognition = new window.SpeechRecognition()
    recognition.interimResults = true

    

    recognition.addEventListener("result", (e)=> {
        const text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
        let tts = window.speechSynthesis
       
        console.log(text)

        if(text=="email"){
            document.getElementById("email").focus() 
            let command = "your in email field"
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
            
            
        }

        if(text=="password"){
            document.getElementById("pass").focus()
            let command = "your in password field"
            let speech = new SpeechSynthesisUtterance(command)   
            tts.speak(speech)
            
        }



    })

    recognition.addEventListener("end", ()=>{
        recognition.start()
    })
    

    recognition.start()


    window.onunload = function(event)
    {
        recognition.stop()
    };
    
      
}