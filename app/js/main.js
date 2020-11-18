window.onload = function(){

/*----- BURGER ----- 
СДЕЛАТЬ ПЕРЕДАЧУ ПАРАМЕТРОВ ЧЕРЕЗ ОБЪЕКТ
drop:
close:
burger:
swipe: yes or no
if YES select swipe body 
*/

	DropMenu('.btndrop', '.btnclose', '.burger', '.menu-swipe');

	function DropMenu(drop, close, burger, swipe){
		var	btnDrop 	 = document.querySelector(drop),
				btnClose 	 = document.querySelector(close),
				btnBurger  = document.querySelector(burger),
				blockSwipe = document.querySelector(swipe);
		

		btnDrop.addEventListener('click', function(){
			fDrop();
		});

		btnClose.addEventListener('click', function(){
			fClose();
		});
		

	  var menuSwipeLeft = new Hammer(blockSwipe);
	  menuSwipeLeft.on('swipeleft', function(){
			fDrop();
	  })

	  var menuSwipeRight = new Hammer(btnBurger);
	  menuSwipeRight.on('swiperight', function(){
			fClose();
	  })


	  function fDrop(){
	  	btnDrop.style.display  = 'none';
			btnClose.style.display = 'block';
			btnBurger.style.right  = '0px';
		}

		function fClose(){
			btnDrop.style.display  = 'block';
			btnClose.style.display = 'none';
			btnBurger.style.right  = '-300px';
		}

		closeBurger = fClose;
	}




// function abcd(obj){
// 	console.log(obj.name); 
// }



/* ----- SLIDER ----- */

Slider('.btnprev', '.btnnext', '.slides .slide');

function Slider(prev, next, slide){
	var btnPrev = document.querySelectorAll(prev),
  		btnNext = document.querySelectorAll(next),
  		slides 	= document.querySelectorAll(slide),
  		i 			= 0,
  		current = document.querySelector('.counter .current'),
  		all 		= document.querySelector('.counter .all'),
  		slider  = document.querySelector('.slider');
 

  var sLeft  = new Hammer(slider);
  var sRight = new Hammer(slider);

  sLeft.on('swipeleft', function(){
  	fNext(slides, current);
  })
  sRight.on('swiperight', function(){
  	fPrev(slides, current);
  })

	for (var j = 0; j < btnPrev.length; j++){
		btnPrev[j].addEventListener('click', function(){
			fPrev(slides, current);
		})
	}

	for (var j = 0; j < btnNext.length; j++){
		btnNext[j].addEventListener('click', function(){
			fNext(slides, current);
		})
	}


  function fPrev(sl, cur){
		sl[i].className = 'slide';
		i--; 
		if(i < 0) i = sl.length - 1;
		sl[i].className = 'slide showed prev';
		cur.innerText = i + 1;
  }

  function fNext(sl, cur){
		sl[i].className = 'slide';
		i++; 
		if(i >= sl.length) i = 0;
		sl[i].className = 'slide showed next';
		cur.innerText = i + 1;
  }

	current.innerText = i + 1;
  all.innerText = slides.length;
}



/* ----- TRIM TEXT ----- */

	var colH1 = document.querySelectorAll('.trim'),
  		colP  = document.querySelectorAll('.slide p');

  TrimTagText(colH1, 13);
  TrimTagText(colP, 90);	

	function TrimTagText(tag, len){
		for(var t = 0; t < tag.length; t++){
			if(tag[t].innerHTML.length > len + 3){
				var trimText = tag[t].innerHTML.substr(0, len) + '...';
				tag[t].innerText = trimText;
				return trimText;
			}
		}
	}


/* ----- MODAL WINDOW ----- */

	ModalWindow('.more', '.modal', '.close-modal');

	function ModalWindow(btnCall, modalWnd, closeBtn){
		var more  = document.querySelectorAll(btnCall),
			  modal = document.querySelector(modalWnd),
			  close = document.querySelector(closeBtn);

		for(var m = 0; m < more.length; m++){
			more[m].addEventListener('click', function(){
				openModal();
			})
		}

		modal.addEventListener('click', function(e){
			if(e.target.className != 'modal') return false;
			closeModal();
		})

		close.addEventListener('click', function(){
			closeModal();
		})

		function openModal(){
			modal.style.top = '0';
		}

		function closeModal(){
			modal.style.top = '-100vh';
		}

	}


		


/*  ----- SCROLL TO BLOCK -----
* link - на что нажимаем
* block - куда скролим
* Параментры передаем с "." или "#"
*/
	ScrollToSection(".scroll-down", ".about-us");

	ScrollToSection("#about-us", ".about-us");
	ScrollToSection("#services", ".services");
	ScrollToSection("#project", ".gallery");
	ScrollToSection("#charger", ".charger");
	ScrollToSection("#order", ".order");

	function ScrollToSection(link, block){

		var p_link  = document.querySelectorAll(link),
				p_block = document.querySelector(block),
				scroll  = p_block.getBoundingClientRect().top + window.pageYOffset;

		for(s = 0; s < p_link.length; s++){
			p_link[s].addEventListener("click", function() {
				
				var th = this.parentNode;
				if(th.parentNode.className == "burger-nav"){
					closeBurger();
				}

			  var sc 	 = window.pageYOffset,
			  	  gbcr = p_block.getBoundingClientRect().top,
			   	  diff = window.pageYOffset + gbcr;

			  var intB = setInterval(function() {
			    window.scrollTo(0, sc);
			    sc += 15;
			    if (sc >= scroll) clearInterval(intB);
			  }, 1);

			  if(document.documentElement.scrollTop > gbcr){
			  	var intT = setInterval(function() {
				    window.scrollTo(0, document.documentElement.scrollTop);
				    document.documentElement.scrollTop -= 15;
				    if (document.documentElement.scrollTop <= diff) clearInterval(intT);
				  }, 1);
			  }
			})
		}
	}


	/* ----- SCROLL TOP -----
	*show - кол-во пикселей прокрутки до появления кнопки, default - 700
	*t - время прокрутки, default - 3, 1 - быстро, 2 медленее и т.д., max - 10, min - 1
	*/

	ScrollTop('.scroll-top', '700', 3);

	function ScrollTop(tag, show, t){

		if(tag.split('')[0] != '.' && tag.split('')[0] != '#'){//исп. && т.к. "||" запинается на правде
			alert('Введите правильный тег в функции ' + arguments.callee.name); 
			return;
		} 

		if(parseInt(show) < 0) show = 700;

		if(t > 10) t = 10;
		if(t < 1) t = 1;

		var scrollTopBtn = document.querySelector(tag);

		var showBtn = setInterval(function() {
			if((window.pageYOffset || document.documentElement.scrollTop) > (show || '700')){
				scrollTopBtn.style.display = "block";
			} else{
				scrollTopBtn.style.display = "none";
			}
			}, 100);

		scrollTopBtn.addEventListener("click", function() {
			var interval = setInterval(function() {
			var px = document.documentElement.scrollTop || window.pageYOffset;
			px -= 15;
			window.scrollTo(0, px);
			if (px <= 0) clearInterval(interval);
			}, t || 3);
		});
	}

		
	

/*--------меньше изображений на телефоне с возможностью открыть все---------*/
	var galleryImages = document.querySelectorAll('.block-img'),
			moreImg 			= document.querySelector('.more-img');	

	hideImg();
	window.addEventListener('resize', hideImg);

	moreImg.onclick = function(){
		for (var img = 2; img < galleryImages.length; img++) {
		 	galleryImages[img].style.display = 'block';
		 }
	}

	function hideImg(){
		if(document.documentElement.clientWidth <= '720'){
			for (img = 2; img < galleryImages.length; img++) {
			 	galleryImages[img].style.display = 'none';
			 }
		}else{
			for (img = 2; img < galleryImages.length; img++) {
			 	galleryImages[img].style.display = 'block';
			 }
		}
	}

/*----Говнокодерская валидация формы(18+)-----*/
	var formInputName  = document.querySelector('.form-block #name'),
			formInputEmail = document.querySelector('.form-block #email'),
			formInputTel 	 = document.querySelector('.form-block #tel'),
			formLabels		 = document.querySelectorAll('.form-block label'),
			formSubmit		 = document.querySelector('.form-submit'),
			form 					 = document.querySelector('.form');

	var elemFA_times = document.querySelectorAll('.condition .fa-times'),
			elemFA_check = document.querySelectorAll('.condition .fa-check'),
			elemP	 = document.querySelectorAll('.condition p');

	//formInput.addEventListener('change', validationForm);//подействует после потери фокуса на инпуте
	formInputName.addEventListener('input', validationInputName);//действует в реальном времени
	formInputEmail.addEventListener('input', validationInputEmail);//действует в реальном времени
	formInputTel.addEventListener('input', validationInputTel);//действует в реальном времени
	form.addEventListener('input',validationForm);

	function validationForm(){
		
		for (var v = 0; v < elemP.length; v++) {
			if(elemP[v].style.color != "green"){
				formSubmit.setAttribute("disabled","");
				formSubmit.style.cursor = "not-allowed";
			}

			if(elemP[v].style.color == "green"){
				formSubmit.removeAttribute("disabled");
				formSubmit.removeAttribute("style");
			}
		}

	}

	formInputName.onchange = function(){
		if(formInputName.value.length > 0){formLabels[0].style.opacity = "0"};
		if(formInputName.value.length == 0){formLabels[0].style.opacity = "1"};
	}

	formInputEmail.onchange = function(){
		if(formInputEmail.value.length > 0){formLabels[1].style.opacity = "0"};
		if(formInputEmail.value.length == 0){formLabels[1].style.opacity = "1"};
	}

	formInputTel.onchange = function(){
		if(formInputTel.value.length > 0){formLabels[2].style.opacity = "0"};
		if(formInputTel.value.length == 0){formLabels[2].style.opacity = "1"};
	}


	function validationInputName(){
		var inputName_length = 40,
				inputName_regul = this.value.match(/[^a-zA-Zа-яА-Я]/);

		if(this.value.length <= inputName_length && !inputName_regul){
			elemP[0].style.color = "green";
			elemFA_check[0].style.opacity = "1";
			elemFA_times[0].removeAttribute("style");
		} 
		if(this.value == ''){
			elemP[0].removeAttribute("style");
			elemFA_check[0].removeAttribute("style");
			elemFA_times[0].removeAttribute("style");
		}
		if(this.value.length > inputName_length){
			elemP[0].style.color = "red";
			elemFA_check[0].removeAttribute("style");
			elemFA_times[0].style.opacity = "1";
		}
		if(inputName_regul){
			elemP[0].style.color = "red";
			elemFA_check[0].removeAttribute("style");
			elemFA_times[0].style.opacity = "1";
		}

		if(elemP[1].style.color != "green" && elemP[2].style.color != "green"){
				formSubmit.setAttribute("disabled","");
				formSubmit.style.cursor = "not-allowed";
			}

		if(elemP[1].style.color == "green" && elemP[2].style.color == "green"){
			formSubmit.removeAttribute("disabled");
			formSubmit.removeAttribute("style");
		}
		
	}

	function validationInputEmail(){
		var inputEmail_length = 40,
				inputEmail_regul = /^\w{1,}@\w{2,7}\.\w{2,5}$/;

		if(this.value.length <= inputEmail_length && inputEmail_regul.test(this.value)){
			elemP[1].style.color = "green";
			elemFA_check[1].style.opacity = "1";
			elemFA_times[1].removeAttribute("style");
		} 
		if(this.value == ''){
			setTimeout((function() {
        return function() {
            elemP[1].removeAttribute("style");
            elemFA_check[1].removeAttribute("style");
						elemFA_times[1].removeAttribute("style");
        }
    	})(elemP[1]), 10);
		}

		if(this.value.length > inputEmail_length){
			elemP[1].style.color = "red";
			elemFA_check[1].removeAttribute("style");
			elemFA_times[1].style.opacity = "1";
		}
		if(!inputEmail_regul.test(this.value)){
			elemP[1].style.color = "red";
			elemFA_check[1].removeAttribute("style");
			elemFA_times[1].style.opacity = "1";
		}

		if(elemP[0].style.color != "green" && elemP[2].style.color != "green"){
				formSubmit.setAttribute("disabled","");
				formSubmit.style.cursor = "not-allowed";
			}

		if(elemP[0].style.color == "green" && elemP[2].style.color == "green"){
			formSubmit.removeAttribute("disabled");
			formSubmit.removeAttribute("style");
		}
	}

	function validationInputTel(){
		var inputTel_length = 15,
				inputTel_regul = /^\+?\d{12,15}$/;

		if(this.value.length <= inputTel_length && inputTel_regul.test(this.value)){
			elemP[2].style.color = "green";
			elemFA_check[2].style.opacity = "1";
			elemFA_times[2].removeAttribute("style");
		} 

		if(this.value == ''){
			setTimeout((function() {
        return function() {
            elemP[2].removeAttribute("style");
            elemFA_check[2].removeAttribute("style");
						elemFA_times[2].removeAttribute("style");
        }
    	})(elemP[2]), 10);
		}

		if(this.value.length > inputTel_length){
			elemP[2].style.color = "red";
			elemFA_check[2].removeAttribute("style");
			elemFA_times[2].style.opacity = "1";
		}
		if(!inputTel_regul.test(this.value)){
			elemP[2].style.color = "red";
			elemFA_check[2].removeAttribute("style");
			elemFA_times[2].style.opacity = "1";
		}

		if(elemP[0].style.color != "green" && elemP[1].style.color != "green"){
				formSubmit.setAttribute("disabled","");
				formSubmit.style.cursor = "not-allowed";
			}

		if(elemP[0].style.color == "green" && elemP[1].style.color == "green"){
			formSubmit.removeAttribute("disabled");
			formSubmit.removeAttribute("style");
		}

	}
	
	for (var v = 0; v < elemP.length; v++) {
		if(elemP[v].style.color != "green"){
			formSubmit.setAttribute("disabled","");
			formSubmit.style.cursor = "not-allowed";
		}
	}

	formSubmit.onclick = function(e){
		for (var v = 0; v < elemP.length; v++) {
			if(elemP[v].style.color != "green"){
				e.preventDefault();
				document.querySelector('.alert').innerHTML = 'Заполните все поля';
				document.querySelector('.alert').style.color = "red";
			}
		}
	}

	
}