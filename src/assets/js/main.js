// document.getElementById('rut').addEventListener('input', function(evt) {
//     let value = this.value.replace(/\./g, '').replace('-', '');

//     if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
//       value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
//     }
//     else if (value.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
//       value = value.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
//     }
//     else if (value.match(/^(\d)(\d{3})(\d{0,2})$/)) {
//       value = value.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3');
//     }
//     else if (value.match(/^(\d)(\d{0,2})$/)) {
//       value = value.replace(/^(\d)(\d{0,2})$/, '$1.$2');
//     }
//     this.value = value;
//   });


/* MSOTRAR BUSCADOR */
$('.show-no-cliente').on('click', function() {
    $('.contacto').addClass('active animated fadeIn');
    $('.cliente-uno').removeClass('active');
    $('.no-cliente-dos').addClass('active animated fadeIn');
});

/* SELECTOR BUSCADOR 1 */
(function() {
    $(document).ready(function() {
        var $button, $tooltip
        $button = $('#picker-1')
        $tooltip = $('.selection-1')
        return $button.click(() => {
            if ($tooltip.attr('hidden') === 'hidden') {
                $tooltip.removeAttr('hidden')
                return $button.attr('aria-expanded', true)
            } else {
                $tooltip.attr('hidden', true)
                return $button.attr('aria-expanded', false)
            }
        })
    })
}.call(this))

/* SCROLL DE BOTON BUSCADOR */
function smoothscroll() {
    if ($(window).width() > 990) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 550, behavior: 'smooth' });
    }
};

function smoothscroll2() {
    if ($(window).width() < 990) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 550, behavior: 'smooth' });
    }
};

/* GALERIA DE FOTOS PORTAL */
$(document).ready(function() {
    $("#gallery").simplegallery({
        galltime: 400,
        gallcontent: '.content',
        gallthumbnail: '.thumbnail',
        gallthumb: '.thumb'
    });
});


/* MENU MOBILE */
function abrirNav() {
    document.getElementById("menu-mobile-izquierda").style.width = "250px";
    document.getElementById("opacidad").style.visibility = "visible";
    document.getElementById("opacidad").style.opacity = "1";
    document.getElementById("opacidad").style.minHeight = "10000px";
    document.body.style.overflow = "hidden";
}

function cerrarNav() {
    document.getElementById("menu-mobile-izquierda").style.width = "0";
    document.getElementById("opacidad").style.visibility = "hidden";
    document.getElementById("opacidad").style.opacity = "0";
    document.getElementById("opacidad").style.minHeight = "1px";
    document.body.style.overflow = "visible";
}

/* MEGA MENU */
$(function() {
    $('.toggle-menu').click(function() {
        $('.exo-menu').toggleClass('display');
    });
});

/* IMAGEN MODAL  */
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
}

/* TABS INTERIOR */
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body
function abrirNav() {
document.getElementById("menu-mobile-izquierda").style.width = "250px";

document.getElementById("opacidad").style.opacity = "0.5"; 
document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
$('.opacidad').addClass('opacidad-block');
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white 
function cerrarNav() {
document.getElementById("menu-mobile-izquierda").style.width = "0";
/*document.body.style.backgroundColor = "white";
$('.opacidad').addClass('opacidad-none');
} */







/*$(window).scroll(function(){
var scroll = $(window).scrollTop();
scroll_header(scroll);  
});

function scroll_header(scroll){
if(scroll < 50 ){ 
  $('.logo-top-img').css('width', '80%'); 
}if else (scroll > 50 ){
  $('.logo-top-img').css('width', '60%');
}};


/*function scroll_header(scroll){
if(scroll < 50 ){ 
  if($(".logo-top-img").hasClass("img-width")){
  }else{
    $('.fixed-top').css('background', 'transparent', 'transition', 'all 0.3s ease-in-out 0s');
  }   
} else{
    $('.fixed-top').css('background', 'rgba(0, 0, 0, 0.6)');
}
}*/

/* IMAGEN MODAL */
/*
$(document).ready(function(){
      var current = {x: 0, y: 0, zoom: 1};
$(document).on("click","#modal-zoom-photo",function(e){
  
  if(current.zoom > 1){
    current = {x: 0, y: 0, zoom: 1};
    $(this).removeClass().addClass("zoom-in-cursor");
  }
  else{
    $(this).removeClass().addClass("zoom-out-cursor");
     var coef = e.shiftKey || e.ctrlKey ? 0.5 : 2,
      delm = document.documentElement,
      oz = current.zoom,
      nz = current.zoom * coef,
      sx = delm.scrollLeft,
      sy = delm.scrollTop,
      ox = 50 + 21,
      oy = 50 + 22,
      mx = e.clientX - ox + sx,
      my = e.clientY - oy + sy,
      ix = (mx - current.x) / oz,
      iy = (my - current.y) / oz,
      nx = ix * nz,
      ny = iy * nz,
      cx = (ix + (mx - ix) - nx),
      cy = (iy + (my - iy) - ny)
    ;
      current.zoom = nz;
      current.x = cx;
      current.y = cy;
  }
    
  $(".modal-zoom-large-photo-wrap").css({
    '-webkit-transform' : 'translate('+current.x+'px, '+current.y+'px) scale(' + current.zoom + ')',
    '-moz-transform'    : 'translate('+current.x+'px, '+current.y+'px) scale(' + current.zoom + ')',
    '-ms-transform'     : 'translate('+current.x+'px, '+current.y+'px) scale(' + current.zoom + ')',
    '-o-transform'      : 'translate('+current.x+'px, '+current.y+'px) scale(' + current.zoom + ')',
    'transform'         : 'translate('+current.x+'px, '+current.y+'px) scale(' + current.zoom + ')'
  });
  return false;
});
    
    
  });
*/