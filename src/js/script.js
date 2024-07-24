$(document).ready(function () {
	$('.carousel__inner').slick({
		speed: 1200,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider/left.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/slider/right.png"></button>',
		responsive: [
			{
				breakpoint: 991,
				settings: {
					dots: false,
					arrows: false
				}
			}
		]
	});


	// JQuery catalog active switcher
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	// JQuery catalog link switcher
	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	// Modal pop up
	$('[data-modal="consultation"]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow');
	});

	$('.button_mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__desc').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	// Validating configuration
	function validateForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 10
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "We need your name to contact you",
					minlength: jQuery.validator.format("At least {0} characters required!")
				},
				phone: "Please input you phone number",
				email: {
					required: "Please input your email",
					email: "Incorrect type of email"
				}
			}
		});
	}

	validateForms('#consultation-form');
	validateForms('#order form');
	validateForms('#consultation form');

	// Validation for irish citizen
	$('input[name=phone]').mask("+35 3(99) 999-99-99");
});
