// Funçao para integrar o JS ao corpo HTML, caso disponivel
(function () {

  // Detectando e substituindo css por JS // //
  var $body = document.querySelector('body')
  $body.classList.remove('no-js')
  $body.classList.add('js')

  /*Atribui ao menu uma variavel, que enquanto aqueles elementos 
  obedecerem aos parametros será ou não alterada NO MENU*/
  var menu = new Menu({
    container: '.header__nav',
    toggleBtn: '.header__btnMenu',
    widthEnabled: 1025 // tamanho maximo do objeto visivel
  })
  /*Js reponsavel pelo carrosel*/
  var carouselImgs = new Carousel({
    container: '.laptop-slider .slideshow',
    itens: 'figure',
    btnPrev: '.prev',
    btnNext: '.next'
  })

  /*Js reponsavel pelas notas em baixo*/
  var carouselQuotes = new Carousel({
    container: '.quote-slideshow',
    itens: 'figure',
    btnPrev: '.prev',
    btnNext: '.next'
  })
})()

// ///////////////////MENU////////////////////////
function Menu (config) {
  this.nav = (typeof config.container === 'string') ?
    document.querySelector(config.container) : config.container

  this.btn = (typeof config.toggleBtn === 'string') ?
    document.querySelector(config.toggleBtn) : config.toggleBtn

  this.maxWidth = config.widthEnabled || false

  var _opened = false
  var _this = this

  this.btn.removeAttribute('style')

  /*'zerar' o js quando a pagina estiver acima de 1024px 
  e manter o menu fechado*/

  if (this.maxWidth) {
    window.addEventListener('resize', e => {
      if (window.innerWidth > _this.maxWidth) {
        _this.nav.removeAttribute('style')
        _opened = true
      }else if (!this.nav.getAttribute('style')) {
        closeMenu()
      }
    })
    if (window.innerWidth <= _this.maxWidth) {
      closeMenu()
    }
  }

  this.btn.addEventListener('click', open0rClose)

  function open0rClose () {
    if (!_opened) {
      openMenu()
    }else {
      closeMenu()
    }
  }
  function openMenu () {
    var _top = _this.nav.getBoundingClientRect().top + 'px'

    var _style = {
      maxHeight: 'calc(100vh - ' + _top + ')',
      overflow: 'hidden'
    }
    applyStyleToNav(_style)

    _opened = true
  }
  function applyStyleToNav (_style) {
    Object.keys(_style).forEach(stl => {
      _this.nav.style[stl] = _style[stl]
    })
  }

  function closeMenu () {
    var _style = {
      maxHeight: '0px',
      overflow: 'hidden'
    }
    applyStyleToNav(_style)

    _opened = false
  }
}

/////////////////////CAROUSEL////////////////////

function Carousel(config) {
    this.container = (typeof config.container === 'string') ?
      document.querySelector(config.container) : config.container
  
    this.itens = (typeof config.container === 'string') ?
      this.container.querySelectorAll(config.itens) : config.itens
  
    this.btnPrev = (typeof config.btnPrev === 'string') ?
      this.container.querySelector(config.btnPrev) : config.btnPrev
  
    this.btnNext = (typeof config.btnNext === 'string') ?
      this.container.querySelector(config.btnNext) : config.btnNext
    
      var _this = this;
      var _currentSlide = 0
    
      init()
  
      function init(){
          var _show = _this.container.querySelectorAll('.show');
  
          Array.prototype.forEach.call(_show, function (sh){
              sh.classList.remove('show');
          
          })
          
          _this.itens[0].classList.add('show');
          
          _this.btnNext.removeAttribute('style');
          _this.btnPrev.removeAttribute('style')
  
          addListeners()
      }
  
      function addListeners (){
          _this.btnNext.addEventListener('click', showNextSlide)
          _this.btnPrev.addEventListener('click', showPrevSlide)
      }
  
      function showNextSlide(){
          _currentSlide++;
          showSlide()
      }
      function showPrevSlide(){
          _currentSlide--;
          showSlide()
      }
      function showSlide(){
          var qtd = _this.itens.length;
          var slide = _currentSlide % qtd;
          slide = Math.abs(slide);
  
          _this.container.querySelector('.show').classList.remove('show')
          _this.itens[slide].classList.add('show')
      }
  
  }
  