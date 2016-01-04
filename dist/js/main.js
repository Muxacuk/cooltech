var slider = (function(){
	init = function (selector) {
		var el = $(selector),
			max = parseInt(el.data('max')),
			min = parseInt(el.data('min'));
			
		el.slider({
	      range: true,
	      min: min,
	      max: max,
	      values: [ min, max ],
	      slide: function( event, ui ) {
	        $( ".for" ).val( ui.values[ 0 ]);
	        $( '.to' ).val( ui.values[ 1 ]);
	      },
	    });
	}
	return {
		init: init
	}
})();
var reset = (function(){
	_setUpListeners = function () {
		$('.reset').on('click', function (event) {
			$(event.target).parent().find('input:checked').click();
			event.preventDefault();
			return false;
		});
	}
	return {
		init: function  () {
			_setUpListeners();
		}
	}
})();
var tooglers = (function(){
	_setUpListeners1 = function () {
		$('.layout__button').on('click', function (event) {
			$(event.target)
				.addClass('layout__button__active')
				.parent()
				.siblings()
				.find('.layout__button__active')
				.removeClass('layout__button__active');
			$('.products__list')
				.removeClass('list__big')
				.removeClass('tile')
				.removeClass('list__small')
				.addClass($(event.target).data('layout'));
			event.preventDefault();
			return false;
		$('.filter__item__title').on('click',function () {
			$(this)
				.toggleClass('closed')
				.siblings()
				.stop(true,true)
				.slideToggle(300);
			event.preventDefault();
		});

		$('.sort-by__layout').on('click',function () {
			$(this).toggleClass('closed');
			$('.sort-by__list').stop(true,true).slideToggle(300);
		});

		$('.sort-by__item').on('click',function () {
			$('.sort-by__layout').find('span').text($(this).text());
		});

		});
	}
	return {
		init: function  () {
			_setUpListeners1();
		}
	}
})();

slider.init('.cost__slider');
tooglers.init();
reset.init();

(function () {
		$('.products_slideshow-item__inner').on('click',function () {
			$($(this).closest('.products__slideshow')[0]).find('.products__slideshow-display img')[0].src=$(this).find('img')[0].src;
			event.preventDefault();
		});
		$('.info__block .container').columnize({ width: 530 });
})();


