(function($) {

	'use strict';

	$(document).ready(function(){
		switcherInit();
	});

	var switcherInit = function(){
		var $btn = $('#eut-switcher-button'),
			$optionBtn = $('.eut-switcher-btn'),
			$overlay = $('.eut-switcher-overlay'),
			$switcher = $('#eut-switcher'),
			showSwitcher = false;

		setTimeout(function(){
			$btn.removeClass('hide');
		},300);


		$btn.on('click',function(){
			var $that = $(this);
			$that.addClass('hide');
			toggleSwitcher();
		});

		$overlay.on('click',function(){
			toggleSwitcher();
		});

		$optionBtn.on('click', function(e){
			e.preventDefault();
			var $that = $(this),
				value = $that.attr('href'),
				type = $that.parent().data('type');
			$that.addClass('active').siblings().removeClass('active');
			$( '#eut-switcher-' + type ).val(value);
		});

		$("#eut-switcher-form").submit(function() {
			$('.eut-switcher-option').each(function(){
				var $that = $(this);
				if($that.val()== "") {
					$that.prop('disabled', true);
				}
			});
		});

		setActiveButton();

		function setActiveButton() {
			var styles = location.search.replace('?','').split('&');
			if( styles != '' ) {
				$.each(styles,function(key,val){
					var t = val.split('='),
						$activeBtn = $('.eut-switcher-element').find('[href="'+ t[1] +'"]');
					$activeBtn.addClass('active').siblings().removeClass('active');
					$( '#eut-switcher-' + t[0] ).val(t[1]);
				});
			}
		}

		function toggleSwitcher(){
			if( !showSwitcher ){
				setTimeout(function(){
					$overlay.addClass('show');
					$switcher.addClass('show');
					showSwitcher = true;
				},300);
			} else {
				$switcher.removeClass('show');
				setTimeout(function(){
					$btn.removeClass('hide');
					$overlay.removeClass('show');
					showSwitcher = false;
				},300);
			}
		}
	}


})(jQuery);