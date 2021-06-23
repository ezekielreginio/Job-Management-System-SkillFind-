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
            let command = "opening login page"
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
            window.location.replace('/handicapped/login')
        },

        "resume":()=>{
            let command = "Opening resume page"
            location.replace("/handicapped/resume")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "application status":()=>{
            let command = "Opening application page"
            location.replace("/pwdapplications")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

        "open sign up page":()=>{
            let command = "opening signup page"
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
            window.location.replace('/handicapped/signup')
        },

        "log in":()=>{
            let command = "Loging in"
            let login_form = document.getElementById("id_pwd_login")
            login_form.submit()
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
        },

        "sign up":()=>{
            let command = "Signing in"
            let login_form = document.getElementById("id_pwd_signup")
            login_form.submit()
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
        },

        "submit experience":()=>{
            let command = "adding experience"
            let login_form = document.getElementById("id_pwd_exp")
            login_form.submit()
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
        },

        "submit education":()=>{
            let command = "adding education"
            let login_form = document.getElementById("id_pwd_edu")
            login_form.submit()
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         
        "submit skill":()=>{
            let command = "adding skill"
            document.getElementById("id_pwd_sk").submit()
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "submit language":()=>{
            let command = "adding language"
            document.getElementById("id_pwd_lang").submit()
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "edit portfolio":()=>{
            let command = "Opening portfolio"
            location.replace("/handicapped/pwd-eeone")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "experience":()=>{
            let command = "Opening experience page"
            location.replace("/handicapped/pwd-eeone")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "education":()=>{
            let command = "Opening education page"
            location.replace("/handicapped/pwd-edtwo")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },


         "skill":()=>{
            let command = "Opening skill page"
            location.replace("/handicapped/pwd-sltree")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "language":()=>{
            let command = "Opening language page"
            location.replace("/handicapped/pwd-llfour")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "add experience":()=>{
            let command = "experience form is visible. the available fields are position title, company name, start date, end date, specialization, role, country, industry, position level, salary currency, salary, and experience description"
            document.getElementById("btn-add-experience").classList.add('d-none')
            document.getElementById("div-experience-form").classList.remove("d-none")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "add education":()=>{
            let command = "education form is visible. the available fields are university, date graduated, qualification, university location, field of study, major, grade, and additional information"
            document.getElementById("btn-add-education").classList.add('d-none')
            document.getElementById("div-education-form").classList.remove("d-none")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "add skill":()=>{
            let command = "skill form is visible. the available fields are skill name and proficiency"
            document.getElementById("btn-add-skill").classList.add('d-none')
            document.getElementById("div-skill-form").classList.remove("d-none")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "add language":()=>{
            let command = "language form is visible. the available fields are language name and proficiencey"
            document.getElementById("btn-add-language").classList.add('d-none')
            document.getElementById("div-language-form").classList.remove("d-none")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "cancel experience":()=>{
            let command = "canceling add experience"
            location.replace("/handicapped/pwd-eeone")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "cancel education":()=>{
            let command = "canceling add education"
            location.replace("/handicapped/pwd-edtwo")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "cancel skill":()=>{
            let command = "canceling add skill"
            location.replace("/handicapped/pwd-sltree")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },


         "cancel language":()=>{
            let command = "canceling add language"
            location.replace("/handicapped/pwd-llfour")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "find job":()=>{
            document.activeElement.blur()
            let command = "Searching Job"
            let search_form = document.getElementById("pwdsearchbar")
            search_form.submit()
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "forgot password?":()=>{
            let command = "opening reset password page"
            location.replace("/login/handicapped/password_reset/")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "submit email":()=>{
            let command = "Your Email has been submmited. Please check your email to continue"
            document.getElementById("form-reset-password").submit()
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "home":()=>{
            let command = "Opening Home Page"
            location.replace("/handicapped/index")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
         },

         "command list":()=>{
            let command = "Opening command list Page"
            location.replace("/handicapped/commands")
            let speech = new SpeechSynthesisUtterance(command)  
            tts.speak(speech)
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
                let input=document.activeElement.getAttribute("placeholder")
                document.activeElement.value = ""
                console.log(activein)
                let command = "you're in "+input+" field"
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
                 let active =document.activeElement.getAttribute("id")
                 let next = null
                 try{
                    next = document.getElementById(active).parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild   
                 }

                 catch(e){
                    next = null
                 }
        
                 if(next != null ){
                    next.focus()
                 }
                 else{
                     document.activeElement.blur()
                 }
                
                 let input = document.activeElement.getAttribute("placeholder")
                 let command = "your in"+input+"field"
                 
                 let speech = new SpeechSynthesisUtterance(command)  
                 tts.speak(speech) 

                
                   
            
            
            }
            

            
            let command = commands[text_command.toLowerCase()];
            command()



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
