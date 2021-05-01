

  if(location.href.indexOf('portfolio') != -1){

    let clicked_card = document.getElementsByClassName("portfolio_detail")
    for(let i = 0; i<clicked_card.length; i++){
      clicked_card[i].addEventListener("click", function(){
        document.getElementById("show-portfolio").classList.remove("d-none")
        
       if(clicked_card[i].classList.contains("task")){
        clicked_card[i].classList.replace("task", "task_click")
        //for show all cards
       
      
       }

       else if(clicked_card[i].classList.contains("task_click")){
        clicked_card[i].classList.replace("task_click", "task")
        document.getElementById("show-portfolio2").classList.add("d-none")
       }

       
      
      })
      
    }
    
    
    //For Card Showall/Hideall Button

      //ShowAll

      //class for adding eventlistiner for showall card
      let cardbtn = document.getElementById("show-portfolio")
          cardbtn.addEventListener("click", () =>{
          cardbtn.classList.add("d-none")
          document.getElementById("show-portfolio2").classList.remove("d-none")
        let Task = document.getElementsByClassName("portfolio_detail")
        for(let i = 0; i<Task.length; i++){
          if(Task[i].classList.contains("task")){
            Task[i].classList.replace("task", "task_click")
          }
        }
        
  
      })

      let cardbtn2 = document.getElementById("show-portfolio2")
          cardbtn2.addEventListener("click", () =>{
          cardbtn2.classList.add("d-none")
          document.getElementById("show-portfolio").classList.remove("d-none") 
        let Task = document.getElementsByClassName("portfolio_detail")
        for(let i = 0; i<Task.length; i++){
          if(Task[i].classList.contains("task_click")){
            Task[i].classList.replace("task_click", "task")
          }
        }
 
        
      })


    

 




   

    
  }