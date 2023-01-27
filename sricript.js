import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'


// slider of section advantage
  const swiper = new Swiper('.slider-advantage .swiper',{
    slidesPerView: 'auto',

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  })

  // menu script
  let menuMobile= document.querySelector('.header__mobile')
  let btnOpenMenu= document.querySelector('.header__burger')
  let btnCloseMenu=document.querySelector('.menu__close-button')

  const openMenu =()=>{
    menuMobile.classList.add('active')
    document.body.classList.add('body-blocked')

  }
  const closeMenu =()=>{
    menuMobile.classList.remove('active')
    document.body.classList.remove('body-blocked')

  }

  btnOpenMenu.addEventListener('click',function(e){
    openMenu();
  })
  btnCloseMenu.addEventListener('click',function(e){
    closeMenu()
  })

  window.addEventListener('resize',function(e){
    if(window.innerWidth>1200){
      closeMenu()
    }
    
  })

  // modal script
    let btnOpenModal= document.querySelector('.introduction-main__button')
    btnOpenModal.addEventListener('click',function(e){
      Fancybox.show([
        {
         src:'#modal',
         type:'inline' 
        }
      ])
    })

    // form validation
    const validateEmail = (email) => {
      let req= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return req.test(email.toLowerCase())
        
    };
    let incorrectFeld=[];
    let inputs = [...document.querySelectorAll('input[type=text],input[type=email')];
    incorrectFeld=[...inputs]

    inputs.forEach(input=>{
      input.addEventListener('input',function(e){
        // проверка на pseudo
        if(this.getAttribute('name').toLowerCase() ==='pseudo'){
          if(!incorrectFeld.includes(this)){
            if(this.value.length <=3){
              incorrectFeld.push(this)
            }
          }else{
            if(this.value.length >=3){
              incorrectFeld.push(this)
              let newArr= incorrectFeld.filter(el=> el!== this)
              incorrectFeld= [...newArr]
              this.classList.remove('error')
            }
           
          }

         
        }
         // проверка на email
        if(this.getAttribute('name').toLowerCase() ==='email'){
          
          if(!incorrectFeld.includes(this)){
            if(!validateEmail(this.value)){
              incorrectFeld.push(this)
            }
          }else{
            if(validateEmail(this.value)){
              incorrectFeld.push(this)
              let newArr= incorrectFeld.filter(el=> el!== this)
              incorrectFeld= [...newArr]
              this.classList.remove('error')
            }
          }
        }
      })
    })

    // отправка форма
    const postData= async (data,url)=>{
      return await fetch(url,{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:data
      })
    }
    let btnSubmit= document.querySelector('.modal input[type=submit]')
    btnSubmit.addEventListener('click',function(e){
      e.preventDefault();
      if(incorrectFeld.length===0){
        let pseudo = document.querySelector('.modal input[name=pseudo]').value.toLowerCase()
        let email = document.querySelector('.modal input[name=email]').value.toLowerCase()
        let message=  document.querySelector('.modal textarea').value.toLowerCase()
       let data ={
        pseudo,
        email,
        message
       }

     alert(` отправить данные на сервер через функцию postData и redirect to page  "cпасибо"  ${JSON.stringify(data)}`)

      //  let response= postData(JSON.stringify(data),'apiTest/serverPage.php')
     

      Fancybox.close()

      inputs.forEach(input=>{
        input.value=''
      })
      document.querySelector('.modal textarea').value=''

      /*
      if(response.ok){
       window.location.href ='test.html' redirect
      }
      */
    

       

       
      }else{
       
        incorrectFeld.forEach(input=>{
          input.classList.add('error')
        })
      }

     

    })


  
    