//Singleton Factory Design Pattern for Speech AI

export let speech_ai = (()=>{
    //private members
    function voice_input(recognition, fields, buttons){

        recognition.addEventListener("result", (e)=> {
            let text = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            let tts = window.speechSynthesis

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
                 if(Object.values(fields).includes(document.activeElement.getAttribute("id")))
                    if(document.activeElement.getAttribute("id")=="id_password"){
                        document.activeElement.value = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ").join("")
                    }
                    else{
                        document.activeElement.value = text.toLowerCase()
                    }
                    
            }

            else if(text_command.toLowerCase() == "help"){
                let command = "Hello. welcome to skillfind, I am your virtual assistant"
                let speech = new SpeechSynthesisUtterance(command)  
                tts.speak(speech)
            }

            if(text_command.toLowerCase().indexOf("clear") != -1){
                document.activeElement.value = ""
                let command = "Field Cleared"
                let speech = new SpeechSynthesisUtterance(command)  
                tts.speak(speech)
            }

            

            

            // if(fields.includes(text)){
            //     document.getElementById("id_login").focus() 
            //     let command = "you're in "+text+" field"
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
            // }
            // if(text=="email"){
            //     document.getElementById("id_login").focus() 
            //     let command = "you're in email field"
            //     let speech = new SpeechSynthesisUtterance(command)  
            //     tts.speak(speech)
                
                
            // }

            // if(text=="password"){
            //     document.getElementById("id_password").focus()
            //     let command = "you're in password field"
            //     let speech = new SpeechSynthesisUtterance(command)   
            //     tts.speak(speech)
                
            // }



        })
    }

    //public Members
    return{
        getInstance : (fields)=>{
            window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            const recognition = new window.SpeechRecognition()
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