//Singleton Factory Design Pattern for Speech AI

export let speech_ai = (()=>{

    let tts = window.speechSynthesis

    //Prototype onject
    let commands = {
        "help": ()=>{
            let command = "Hello. welcome to skillfind, I am your virtual assistant. commands for signing in, email login for email field, and password login for password field"
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
        },

        "open login page":()=>{
            window.location.replace('http://127.0.0.1:8000/handicapped/login')
        },

        "open signup page":()=>{
            window.location.replace('http://127.0.0.1:8000/handicapped/signup')
        },
        "open sign up page":()=>{
            window.location.replace('http://127.0.0.1:8000/handicapped/signup')
        },
    }
    
    //private members
    function voice_input(recognition, fields, buttons){

        recognition.addEventListener("result", (e)=> {
            let text = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            
            

            let text_command = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")

           

            console.log(text)
            
            if(Object.keys(fields).includes(text_command.toLowerCase())){
                document.getElementById(fields[text_command.toLowerCase()]).focus() 
                document.activeElement.value = ""
                let command = "you're in "+text+" field"
                let speech = new SpeechSynthesisUtterance(command)  
                tts.speak(speech)
                
            }
              
            
           else if(document.activeElement.tagName == "INPUT"){
                 if(Object.values(fields).includes(document.activeElement.getAttribute("id"))){
                    if(document.activeElement.getAttribute("id")=="id_password" || document.activeElement.getAttribute("id")=="id_password1" || document.activeElement.getAttribute("id")=="id_password2"){
                        let text_pass = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ").join("")
                        document.activeElement.value = text_pass.toLowerCase()                     
                    }
                    else if((document.activeElement.getAttribute("id")=="id_login" || document.activeElement.getAttribute("id")=="id_email")){
                        document.activeElement.value = text.toLowerCase()
                    }
                    else{    
                        document.activeElement.value = text_command
                    }
                let command = "you entered"+text
                let speech = new SpeechSynthesisUtterance(command)  
                tts.speak(speech)
                 } 
                 document.activeElement.blur()
                 let command = "field unselected"
                 let speech = new SpeechSynthesisUtterance(command)  
                 tts.speak(speech)      
            }
            
            let command = commands[text_command.toLowerCase()];
            command();

            // if(text_command.toLowerCase() == "help"){
            //     let command = "Hello. welcome to skillfind, I am your virtual assistant. commands for signing in, email login for email field, and password login for password field"
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("clear") != -1){
            //     document.activeElement.value = ""
            //     let command = "Field Cleared"
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("open sign up page") != -1){
            //     let command = "Opening signup page"
            //     window.location.replace('http://127.0.0.1:8000/handicapped/signup')
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("open login page") != -1){
            //     let command = "Opening login page"
            //     window.location.replace('http://127.0.0.1:8000/handicapped/login')
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }
            
            // //submit
            // if(text_command.toLowerCase().indexOf("submit login") != -1){
            //     let command = "Loging in"
            //     let login_form = document.getElementById("id_pwd_login")
            //     login_form.submit()
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }
            // if(text_command.toLowerCase().indexOf("submit sign up") != -1){
            //     let command = "Signing in"
            //     let login_form = document.getElementById("id_pwd_signup")
            //     login_form.submit()
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("submit experience") != -1){
            //     let command = "adding experience"
            //     let login_form = document.getElementById("id_pwd_exp")
            //     login_form.submit()
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("submit form edu") != -1){
            //     let command = "adding education"
            //     let login_form = document.getElementById("id_pwd_edu")
            //     login_form.submit()
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("submit form sk") != -1){
            //     let command = "adding skill"
            //     document.getElementById("id_pwd_sk").submit()
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("submit form lg") != -1){
            //     let command = "adding language"
            //     document.getElementById("id_pwd_lang").submit()
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }
            
            // //open page
            // if(text_command.toLowerCase().indexOf("edit portfolio") != -1){
            //     let command = "Opening portfolio"
            //     location.replace("/handicapped/pwd-eeone")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("experience") != -1){
            //     let command = "Opening experience page"
            //     location.replace("/handicapped/pwd-eeone")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("education") != -1){
            //     let command = "Opening education page"
            //     location.replace("/handicapped/pwd-edtwo")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("skill") != -1){
            //     let command = "Opening skill page"
            //     location.replace("/handicapped/pwd-sltree")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("language") != -1){
            //     let command = "Opening language page"
            //     location.replace("/handicapped/pwd-llfour")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // //add
            // if(text_command.toLowerCase().indexOf("add exp") != -1){
            //     let command = "experience form is visible"
            //     document.getElementById("btn-add-experience").classList.add('d-none')
            //     document.getElementById("div-experience-form").classList.remove("d-none")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("add edu") != -1){
            //     let command = "education form is visible"
            //     document.getElementById("btn-add-education").classList.add('d-none')
            //     document.getElementById("div-education-form").classList.remove("d-none")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("add sk") != -1){
            //     let command = "skill form is visible"
            //     document.getElementById("btn-add-skill").classList.add('d-none')
            //     document.getElementById("div-skill-form").classList.remove("d-none")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("add lg") != -1){
            //     let command = "language form is visible"
            //     document.getElementById("btn-add-language").classList.add('d-none')
            //     document.getElementById("div-language-form").classList.remove("d-none")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }
            
            // //cancel
            // if(text_command.toLowerCase().indexOf("cancel exp") != -1){
            //     let command = "canceling add experience"
            //     location.replace("/handicapped/pwd-eeone")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("cancel edu") != -1){
            //     let command = "canceling add education"
            //     location.replace("/handicapped/pwd-edtwo")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            // if(text_command.toLowerCase().indexOf("cancel sk") != -1){
            //     let command = "canceling add skill"
            //     location.replace("/handicapped/pwd-sltree")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            
            // if(text_command.toLowerCase().indexOf("cancel lg") != -1){
            //     let command = "canceling add language"
            //     location.replace("/handicapped/pwd-llfour")
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }

            

            
           


        })
    }

    //public Members
    return{
        getInstance : (fields)=>{
            window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
            let grammar ="#JSGF V1.0"
            const recognition = new window.SpeechRecognition()
            const sppechRecognitionGrammarList = new  window.SpeechGrammarList()
            sppechRecognitionGrammarList.addFromString(grammar, 1)
            recognition.grammars = sppechRecognitionGrammarList
            recognition.interimResults = false
            recognition.addEventListener("end", ()=>{
                recognition.start()
            })

            recognition.start()

            window.onunload = function(event){
                recognition.stop()
            };

            voice_input(recognition, fields)
            
        }
    }
})()
