

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
       }

       
      
      })
      
    }
    
  
     document.getElementById("show-portfolio").addEventListener("click", function(){
      let card_click = document.getElementsByClassName("portfolio_detail")
      for(let i = 0; i<card_click.length; i++){
        
        if(card_click[i].classList.contains("task")){
          card_click[i].classList.replace("task", "task_click")
        }
      
      }
      document.getElementById("show-portfolio2").classList.remove("d-none")
      document.getElementById("show-portfolio").classList.add("d-none") 
        
    })

    document.getElementById("show-portfolio2").addEventListener("click", function(){
      let card_click = document.getElementsByClassName("portfolio_detail")
      for(let i = 0; i<card_click.length; i++){
        
        if(card_click[i].classList.contains("task_click")){
          card_click[i].classList.replace("task_click", "task")
        }

      
      }
      document.getElementById("show-portfolio2").classList.add("d-none")
      document.getElementById("show-portfolio").classList.remove("d-none") 

    })

   

    
  }