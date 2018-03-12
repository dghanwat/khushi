
// ================================================================================== //

	// # Document on Ready
	// # Document on Resize
	// # Document on Scroll
	// # Document on Load

	// # Sticky Header
	// # Header
	// # Post Sticky Items
	// # Main Menu
	// # Feature Section
	// # Feature Content Animations
	// # Page Title
	// # Resize Feature
	// # Page Settings
	// # Basic Elements
	// # Isotope
	// # Portfolio Auto Resize Headings
	// # Parallax Section
	// # Set Equal Columns Height
	// # Section Settings
	// # Hover on Touch
	// # Social Bar For Post
	// # Related Post
	// # Scroll Direction
	// # Global Variables
	// # Scrollbar Width
	// # Full Page

	// # Sticky Section

// ================================================================================== //


var EUTHEM = EUTHEM || {};
var debugJs = false;
var spinner = '<div class="eut-spinner"></div>';
var addFeatureSpinner =  false;
var disableTypedTitle = true;
var stickyDeviceSidebar = true;
var anemos_eutf_main_data = {"siteurl":"http:\/\/euthemians.com\/themes\/anemos\/wp-content\/themes\/anemos","ajaxurl":"http:\/\/euthemians.com\/themes\/anemos\/wp-admin\/admin-ajax.php","wp_gallery_popup":"1","back_top_top":"1","string_weeks":"Weeks","string_days":"Days","string_hours":"Hours","string_minutes":"Min","string_seconds":"Sec"};
				/* ]]> */
var onLoadEventsBound = false;				
var prevPath = "";


(function($){

	"use strict";


	// # Document on Ready
	// ============================================================================= //
	EUTHEM.documentReady = {
		init: function(){
			EUTHEM.pageSettings.bodyLoader();
			EUTHEM.pageSettings.removeVideoBg();
			EUTHEM.sectionSettings.init();
			EUTHEM.setColumnHeight.init();

			EUTHEM.headerSettings.init();

			EUTHEM.slideToggleMenu.init( '#eut-hidden-menu', '#eut-hidden-menu .eut-menu' );
			EUTHEM.slideToggleMenu.init( '#eut-main-header.eut-header-side', '#eut-main-menu.eut-vertical-menu .eut-menu' );
			EUTHEM.slideToggleMenu.init( '#eut-sidearea', '.widget_nav_menu' );
			if( $('#eut-feature-section').length > 0 ){
				EUTHEM.featureSection.init();
				EUTHEM.featureSize.init( '#eut-feature-section' );
				EUTHEM.parallaxSection.init('#eut-feature-section.eut-bg-parallax');
			}
			if( $('.eut-page-title').length > 0 ){
				EUTHEM.featureSection.init({ section : '.eut-page-title' });
				EUTHEM.featureSize.init( '.eut-page-title' );
				EUTHEM.parallaxSection.init('.eut-page-title');
			}
			EUTHEM.pageSettings.init();
			EUTHEM.isotope.init();
			EUTHEM.isotope.noIsoFilters();
			EUTHEM.basicElements.init();
			EUTHEM.relatedPost.init();
			EUTHEM.commentsFormToggle.init();
			EUTHEM.fullPage.init();
		}
	};

	// # Document on Resize
	// ============================================================================= //
		EUTHEM.documentResize = {
		init: function(){
			console.log("IN EUTHEM.documentResize")

			if( $('#eut-feature-section').length > 0 ){
				EUTHEM.featureSize.init( '#eut-feature-section' );
			}
			if( $('.eut-page-title').length > 0 ){
				EUTHEM.featureSize.init( '.eut-page-title' );
			}
			EUTHEM.sectionSettings.init();
			EUTHEM.relatedPost.itemWidth();
			EUTHEM.basicElements.imageText();
		}
	};

	// # Document on Scroll
	// ============================================================================= //
	EUTHEM.documentScroll = {
		init: function(){
			var newPath = window.location.pathname
			// console.log("In documentScroll",newPath,prevPath)
			if(prevPath !== newPath) {
				onLoadEventsBound = false;
				prevPath = newPath;
			}

			if(!onLoadEventsBound) {
				EUTHEM.documentReady.init();
				EUTHEM.documentResize.init();
				EUTHEM.documentLoad.init();
				// console.log("Inside document scroll");
				onLoadEventsBound = true;
			}
			EUTHEM.featureSection.stopSlider();
			EUTHEM.socialBar.init();
			EUTHEM.pageSettings.onePageMenu();
		}
	};

	// # Document on Load
	// ============================================================================= //
	EUTHEM.documentLoad = {
		init: function(){
			EUTHEM.pageSettings.anchorMenu();
			EUTHEM.basicElements.iconBox();
			EUTHEM.socialBar.init();
			EUTHEM.pageSettings.fixedFooter();
			EUTHEM.postStickyItems.init( '#eut-single-post-meta-sticky' );
			EUTHEM.postStickyItems.init( '.eut-sticky-post-nav' );
			EUTHEM.pageSettings.stickySidebarWidget();
			EUTHEM.pageSettings.stickySidebar();
			EUTHEM.parallaxSection.init('.eut-section.eut-bg-parallax');
			EUTHEM.pageSettings.socialAnimation();

			// Location Hash
			if (window.location.hash) {
				setTimeout(function() {
					var target = window.location.hash;
					if($(target).offset()) {
						$('html, body').scrollTop( $(target).offset().top );
					}
				}, 0);
			}

		}
	};


	// # Content Height with Sidebar
	// ============================================================================= //
	EUTHEM.commentsFormToggle = {
		init: function(){
			var $btn = $('#reply-title'),
				$form = $('#commentform');

			$btn.on('click',function(){
				if( $(this).hasClass('open') ){
					$form.slideUp(function(){
						EUTHEM.postStickyItems.init( '#eut-single-post-meta-sticky' );
						EUTHEM.postStickyItems.init( '.eut-sticky-post-nav' );
					});
					$(this).removeClass('open');
				} else {
					$form.slideDown(function(){
						EUTHEM.postStickyItems.init( '#eut-single-post-meta-sticky' );
						EUTHEM.postStickyItems.init( '.eut-sticky-post-nav' );
					});
					$(this).addClass('open');
				}
				btnGoToTop( $(this) );
			});

			function btnGoToTop( btn ){
				var $this = btn,
					btnTop = $this.offset().top,
					headerHeight = $('#eut-header').data('sticky') != 'none' ? $('#eut-main-header').outerHeight() : 0,
					offset       = wpBarHeight + headerHeight;
				if( btnTop > 0 ){
					$('html, body').delay(300).animate({
						scrollTop: btnTop - offset
					}, 900, 'easeInOutCubic');
					return false;
				}
			}
		}
	};


	// # Header Settings
	// ============================================================================= //
	EUTHEM.headerSettings = {

		init : function(){

			EUTHEM.headerSettings.stickyTypes();
			EUTHEM.headerSettings.mainMenu();
		},

		stickyTypes : function(){
			var $header = $('#eut-header'),
				stickyType = $header.data('sticky'),
				stickyDevice = $header.data('devices-sticky');

			if( stickyType === 'simple' ) {
				EUTHEM.headerSettings.stickyHeader({
					headerOfsset : false
				});
			}

			if( stickyType === 'shrink' ) {
				EUTHEM.headerSettings.stickyHeader({
					headerOfsset : false
				});
			}

			if( stickyType === 'advanced' ) {
				EUTHEM.headerSettings.stickyHeader({
					headerOfsset : true
				});
			}

			if( stickyType === 'anemos' ) {
				EUTHEM.headerSettings.stickyHeader({
					stickyHeader : '#eut-anemos-sticky-header',
					headerOfsset : true
				});
			}

			if( stickyDevice === 'yes' ) {
				EUTHEM.headerSettings.stickyDeviceHeader();
			}
		},

		stickyHeader : function(settings){
			var config = {
					header: '#eut-header',
					stickyHeader : '#eut-main-header',
					headerOfsset : false
				}

			$.extend(config, settings);

			var $header       = $(config.header),
				$headerSticky = $(config.stickyHeader),
				headerOfsset  = config.headerOfsset,
				stickyType    = $header.data('sticky'),
				headerH, headerT, headerTopH, headerbottomH, offsetT, stickyT, stickyOffset, contentT;

			EUTHEM.headerSettings.stickyHeader.showHeader = false;

			var resize = false,
				typedText = false;

			if( stickyType == 'anemos' ){
				var $menuButton, $mainMenu, $menuItems, $pageTitle, menuItemsL, showMenu, delay;
				toggleMenu();
			}

			resizer();

			if( !isMobile.any() ) {
				$(window).on('resize',resizer);
			} else {
				$(window).on('orientationchange',resizer);
			}

			function resizer(){
				var windowW = $(window).width(),
					delay;
				if(!resize){
					resize = true;
					window.clearTimeout(delay);
					delay = window.setTimeout(function() {
						resetSticky();
						if( windowW + scrollBarWidth > tabletPortrait ) {
							updateParams();
							$(window).on('scroll',update);
						} else {
							$(window).off('scroll',update);
						}
						resize = false;
					}, 500);
				}
			}
			function resetSticky(){
				EUTHEM.headerSettings.stickyHeader.showHeader = false;
				removeFixedHeader();
			}
			function updateParams(){
				headerH       = $header.outerHeight();
				headerT       = $header.offset().top;
				headerTopH    = $('#eut-top-header').outerHeight();
				headerbottomH = $('#eut-bottom-header').outerHeight();
				offsetT       = !headerOfsset ? headerT : headerT + headerH;
				stickyT       = !headerOfsset ? 0 : - headerH;
				stickyOffset  = $header.hasClass('eut-overlapping') && !headerOfsset ? headerT : headerT + headerH;
				contentT      = $('#eut-content').length && $('#eut-content').offset().top > 100 ? $('#eut-content').offset().top : 300;

				update();
			}
			function update(){
				var scroll = $(window).scrollTop();

				if( scroll < 0 ){
					return;
				}

				// Fixed Header
				if (scroll >= offsetT) {
					addFixedHeader();
				} else {
					removeFixedHeader();
				}

				// Sticky Header
				if ( scroll > stickyOffset ) {
					addSticky();
				} else {
					removeSticky();
				}

				// Do Translate
				if( headerOfsset ){
					var translate = headerH;
					if ( scroll > contentT ) {
						if($('#eut-main-header').is('.eut-header-logo-top.eut-advanced-sticky')){
							translate = headerbottomH;
						}
						$headerSticky.css(doTranslate(translate));
						EUTHEM.headerSettings.stickyHeader.showHeader = true;
					} else {
						$headerSticky.css(doTranslate(0));
						EUTHEM.headerSettings.stickyHeader.showHeader = false;
					}
				}

				// Anemos Sticky
				if( stickyType == 'anemos' ){
					if ( scroll > contentT ) {
						typedTitle();
					} else {
						typedText = false;
						hideMenuItems();
					}
				}
			}
			function addFixedHeader(){
				$header.addClass('eut-fixed');
				$headerSticky.css({'top' : stickyT });
			}
			function removeFixedHeader(){
				$header.removeClass('eut-fixed');
				$headerSticky.css({'top' : '' });
			}
			function addSticky(){
				$header.addClass('eut-sticky-header eut-sticky-animate eut-'+ stickyType );
			}
			function removeSticky(){
				$header.removeClass('eut-sticky-header eut-scroll-up eut-'+ stickyType );
			}
			function doTranslate(value){
				return {
					'-webkit-transform' : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
					'-moz-transform'    : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
					'-ms-transform'     : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
					'-o-transform'      : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
					'transform'         : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)'
				}
			}
			function typedTitle(){
				var $typedEl = $headerSticky.find('.eut-page-title-wrapper .eut-title'),
					content = $typedEl.text();

				if(disableTypedTitle) {
					$typedEl.remove();
					return false;
				}

				if(!typedText ){
					typedText = true;
					$typedEl.data('typed', null).typed({
						strings: [content],
						showCursor: false,
						typeSpeed: 30,
					});
				}
			}
			function toggleMenu(){
				$menuButton = $('.eut-toggle-anemos-sticky-menu');
				$mainMenu   = $('#eut-anemos-sticky-menu');
				$menuItems  = $mainMenu.find('.eut-menu > li');
				$pageTitle  = $headerSticky.find('.eut-page-title-wrapper');
				menuItemsL  = $menuItems.length;
				showMenu    = false;
				delay       = 90;

				$menuButton.on('click', function(event){
					event.preventDefault();
					if( !showMenu ) {
						showMenuItems();
					} else {
						hideMenuItems();
					}
				});
			}
			function showMenuItems(){
				$pageTitle.addClass('eut-hide');
				$menuItems.each(function(i,n){
					var $item = $(n);
					setTimeout(function(){
						$item.addClass('show');
						if( i == menuItemsL -1 ){
							showMenu = true;
							$menuButton.addClass('eut-hide');
						}
					}, delay * i );
				});
			}
			function hideMenuItems(){
				$menuItems.removeClass('show');
				$menuButton.removeClass('eut-hide');
				$pageTitle.removeClass('eut-hide');
				showMenu = false;
			}
		},

		stickyDeviceHeader : function(){
			var $header = $('#eut-responsive-header'),
				resize = false,
				headerH, headerT;

			resizer();

			if( !isMobile.any() ) {
				$(window).on('resize',resizer);
			} else {
				$(window).on('orientationchange',resizer);
			}

			function resizer(){
				var windowW = $(window).width(),
					delay;
				if(!resize){
					resize = true;
					window.clearTimeout(delay);
					delay = window.setTimeout(function() {
						resetSticky();
						if( windowW + scrollBarWidth < tabletLandscape ) {
							updateParams();
							$(window).on('scroll',update);
						} else {
							$(window).off('scroll',update);
						}
						resize = false;
					}, 500);
				}
			}
			function resetSticky(){
				removeFixedHeader();
			}
			function updateParams(){
				headerH       = $header.outerHeight();
				headerT       = $header.offset().top;

				update();
			}
			function update(){
				var scroll = $(window).scrollTop();

				if( scroll < 0 ){
					return;
				}

				// Fixed Header
				if (scroll >= headerT) {
					addFixedHeader();
				} else {
					removeFixedHeader();
				}

				// Sticky Header
				if ( scroll > headerT ) {
					addSticky();
				} else {
					removeSticky();
				}
			}
			function addFixedHeader(){
				$header.addClass('eut-fixed');
			}
			function removeFixedHeader(){
				$header.removeClass('eut-fixed');
			}
			function addSticky(){
				$header.addClass('eut-sticky-header eut-sticky-animate');
			}
			function removeSticky(){
				$header.removeClass('eut-sticky-header');
			}
		},

		mainMenu: function(){
			var $menu = $('#eut-header .eut-horizontal-menu'),
				$item = $menu.find('li.menu-item'),
				$menuItem = $menu.find('li.menu-item-has-children'),
				target = '.menu-item-has-children',
				subMenu = '.sub-menu',
				mTimer;

			$menu
				.on('mouseenter', target, over)
				.on('mouseleave', target, out);

			function over(){
				var $this = $(this);
				if ($this.prop('hoverTimeout')) {
					$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
				}
				$this.prop('hoverIntent', setTimeout(function() {
					$this.addClass('mHover');
					menuPosition( $this );
				}, 100));
			}
			function out(){
				var $this = $(this);
				if ($this.prop('hoverIntent')) {
					$this.prop('hoverIntent', clearTimeout($this.prop('hoverIntent')));
				}

				$this.prop('hoverTimeout', setTimeout(function() {
					$this.removeClass('mHover');
				}, 100));
			}

			if( isMobile.any() && $(window).width() > tabletPortrait ) {

				$menuItem.find(' > a').bind('touchstart touchend', function(e) {
					var $this = $(this);
					menuPosition( $this );
					$this.parent().siblings().removeClass('mHover');
					if( $this.attr('href') != '#' || $this.attr('href') === '#' ) {
						if( !$this.parent().hasClass('mHover') ) {
							e.preventDefault();
							$this.parent().addClass('mHover');
						}
					}

				});

				$(document).bind('touchstart touchend', function(e) {
					if ( !$menuItem.is(e.target) && $menuItem.has(e.target).length === 0 ) {
						$menuItem.removeClass('mHover').find('li').removeClass('mHover');
					}
				});

			}
			function menuPosition(item){
				var $item = item,
					$subMenu = $item.find(' > ul '),
					subMenuW = $subMenu.width(),
					subMenuP = $subMenu.offset().left,
					windowWidth = $(window).width();

				if ( (subMenuW + subMenuP) > windowWidth ) {
					$subMenu.addClass('eut-position-right');
				}
			}
		}
	};


	// # Post Sticky Items
	// ============================================================================= //
	EUTHEM.postStickyItems = {
		init : function(el){
			var $element = $(el),
				$wrapper = $('#eut-content'),
				$postTitle = $('#eut-post-title'),
				stickyType = $('#eut-header').data('sticky'),
				stickyHeight = $('#eut-header').data('sticky-height'),
				sideHeader = $('#eut-theme-wrapper').hasClass('eut-header-side') ? true : false,
				boxedLayout = $('body').hasClass('eut-boxed') ? true : false;

			if( stickyType == 'simple' ){
				if( $('#eut-main-header').hasClass('eut-header-logo-top') ){
					stickyHeight = $('#eut-bottom-header').outerHeight();
				} else {
					stickyHeight = $('#eut-main-header').outerHeight();
				}
			}

			if( !$(el).length || !$wrapper.length || sideHeader || boxedLayout ) return;

			// cache jQuery objects
			var $element, windowWidth, elementTop, elementHeight, wrapperTop, wrapperHeight, space, spaceOffset, offset;

			// initialize variables
			var	scrolling = false,
				resizing  = false,
				transition = false,
				disableSticky = false,
				setContentHeight = false;

			// $(window).on('scroll', update);
			$(window).smartresize(reset);

			resetPosition();
			// updateSticky();

			function update() {
				if( !scrolling ) {
					scrolling = true;
					updateSticky();
				}
			}

			function reset() {
				if( !resizing ) {
					resizing = true;
					resetPosition();
				}
			}

			function resetPosition(){
				$(window).off('scroll', update);

				$element.css({
					'position' : '',
					'top' : ''
				});

				resetContentHeight();
				updateParams();
			}

			function resetContentHeight(){
				if( setContentHeight ){
					setContentHeight = false;
					$wrapper.css({
						'min-height' : ''
					});
				}
			}

			function updateParams() {
				windowWidth   = $(window).width();
				elementTop    = $element.offset().top;
				elementHeight = $element.outerHeight();
				wrapperTop    = $wrapper.offset().top;
				wrapperHeight = $wrapper.outerHeight();
				space         = elementTop - wrapperTop,
				offset        = $postTitle.length ? $postTitle.offset().top + $postTitle.outerHeight() : 0;


				if( stickyType != 'none' && stickyType != 'advanced' && stickyHeight >= space){
					spaceOffset = stickyHeight;
				} else {
					spaceOffset = 0;
				}

				if( windowWidth + scrollBarWidth > tabletLandscape ) {

					if( elementHeight + space* 2 >= wrapperHeight ) {
						$wrapper.css( 'min-height', elementHeight + space* 2 );
						disableSticky = true;
						setContentHeight = true;
					}

					update();
					$(window).on('scroll', update);
				}

				resizing = false;
			}

			function updateSticky(){
				var scroll = $(window).scrollTop();

				if( scroll >= offset ) {
					$element.addClass('show');
				} else {
					$element.removeClass('show');
				}

				if(!disableSticky){

					if( scroll > wrapperTop && scroll < wrapperTop + wrapperHeight - ( elementHeight + space*2 + spaceOffset ) ){
						$element.css({
							'position' : 'fixed',
							'top' : space + spaceOffset
						});
						if(!transition && spaceOffset > 0 ) {
							transition = true;
							$element.addClass('is-transition');
						}
					} else if( scroll > wrapperTop ) {
						$element.css({
							'position' : 'absolute',
							'top' : wrapperHeight - ( elementHeight + space )
						});
						if(transition) {
							$element.removeClass('is-transition');
						}
					} else if( scroll < wrapperTop ) {
						$element.css({
							'position' : '',
							'top' : ''
						});
						if(transition && spaceOffset > 0 ) {
							transition = false;
							$element.addClass('is-transition');
						}
					}

				}
				scrolling = false;
			}
		}
	}


	// # Menu Slide or Toggle
	// ============================================================================= //
	EUTHEM.slideToggleMenu = {

		init: function( parrent, element ){

			if( !$(element).length ) return;

			var $menu       = $(element),
				$menuParent = $(parrent),
				$menuItem   = $menu.find('li.menu-item-has-children > a'),
				menuType    = $menuParent.hasClass('eut-slide-menu') ? 'slide' : 'toggle',
				$arrow      = $('<i class="eut-arrow"></i>'),
				$goBack     = $('<li class="eut-goback"><a href="#"><i class="eut-arrow"></i></a></li>');

			if( menuType === 'slide' ) {
				// Add Arrows
				$arrow.appendTo( $menuItem.parent() );
				// Add Go Back Button for Slide Menu
				$goBack.prependTo( $menuItem.parent().find('>ul') );
			} else {
				// Add Arrows
				$arrow.appendTo( $menuItem );
			}

			$menuItem.on('tap click',function(e){
				var $this = $(this),
					link  = $this.attr('href'),
					open  = false;

				if((link != '#' || link === '#') && menuType == 'toggle' ) {
					if( !$this.parent().hasClass('open') && !open ) {
						e.preventDefault();
						$this.parent().addClass('open');
						toggle( $this, open );
					} else {
						open = true;
						toggle( $this, open );
						$this.parent().removeClass('open');
					}
				} else if( link === '#' && menuType == 'slide' ) {
					e.preventDefault();
					var listLevel  = $this.parents('ul').length,
						$firstItem = $this.parent().find('ul').first(),
						menuOffset = $menu.offset().top,
						offset     = $this.offset().top,
						title      = $this.html();

						appendTitle( title, $firstItem );

					$firstItem.addClass('show').css({ 'top' : - ( offset - menuOffset ) });
					var firstItemH = $firstItem.outerHeight();
					animLeftMenu( firstItemH, listLevel );
				}
			});

			if( menuType === 'slide' ) {
				var $arrowBtn = $menuItem.parent().find('.eut-arrow');
				$arrowBtn.on('click',function(){
					var $this = $(this),
						listLevel  = $this.parents('ul').length,
						$firstItem = $this.parent().find('ul').first(),
						menuOffset = $menu.offset().top,
						offset     = $this.offset().top,
						title      = $this.parent().find('a').first().html();

					appendTitle( title, $firstItem );

					$firstItem.addClass('show').css({ 'top' : - ( offset - menuOffset ) });
					var firstItemH = $firstItem.outerHeight();

					animLeftMenu( firstItemH, listLevel );

				});
			}

			$('li.eut-goback a').on('click', function(e) {
				var listLevel  = $(this).parents('ul ul').length - 1,
					$firstItem = $(this).closest('.sub-menu'),
					firstItemH = $firstItem.closest('.menu-item-has-children').closest('ul').height();

				setTimeout(function(){
					$firstItem.removeClass('show');
				},300);
				animLeftMenu( firstItemH, listLevel );
			});

			function toggle( $this, open ){
				var $subMenu = $this.parent().find('>ul');
				if( open ) {
					$subMenu.slideUp(200);
				} else {
					$subMenu.slideDown(200);
				}
			}

			function animLeftMenu( height, listLevel ) {
				$menu.parent().height(height);
				$menu.css('transform', 'translate3d(' + - listLevel * 100 + '%,0,0)');
			}

			function appendTitle( title, list ){
				if( list.find('.eut-goback .eut-item').length ) return;
				$(title).appendTo( list.find('> .eut-goback a') );
			}
		}

	};

	// # Set Feature Section Size
	// ============================================================================= //
	EUTHEM.featureSize = {
		init: function( section ){
			this.$section = $(section);
			this.topBar = $('#eut-top-bar');
			this.header = $('#eut-header');
			this.responsiveHeader = $('#eut-responsive-header');
			this.updateParams();
			var featureHeight;

			if( this.$section.hasClass('eut-fullscreen') ) {
				featureHeight = this.fullscreenSize();
			} else {
				featureHeight = this.customSize();
			}
		},
		updateParams : function(){
			this.windowH = $(window).height();
			this.topBarH = this.getTopBarHeight();
			this.headerH = this.getHeaderHeight();
		},
		getTopBarHeight : function(){
			var height = 0;
				if( this.topBar.length && !this.topBar.hasClass('eut-sticky-topbar') ) {
					height = this.topBar.outerHeight();
				}
			return height;
		},
		getHeaderHeight : function(){
			var height = 0;

			if( this.header.length && this.header.is(':visible') && !this.header.hasClass('eut-overlapping') && !this.header.hasClass('eut-header-below') ) {
				height = this.header.outerHeight();
			}

			if( this.responsiveHeader.length && this.responsiveHeader.is(':visible') && !this.header.hasClass('eut-responsive-overlapping') && !this.header.hasClass('eut-header-below') ) {
				height = this.responsiveHeader.outerHeight();
			}

			return height;
		},
		fullscreenSize : function(){
			var sectionH = this.windowH - this.headerH - this.topBarH;
			this.$section.find('.eut-wrapper').css( 'height', sectionH);
			return sectionH;
		},
		customSize : function(){
			var initHeight = this.$section.data('height'),
				newHeight  = ((this.windowH * initHeight) / 100);
			if( newHeight > this.windowH ) {
				newHeight = this.windowH;
			}
			this.$section.find('.eut-wrapper').css( 'height', newHeight);
			return newHeight;
		}
	};

	// # Feature Section
	// ============================================================================= //
	EUTHEM.featureSection = {

		animate: false,

		init: function( settings ){

			EUTHEM.featureSection.config = {
				section : '#eut-feature-section',
			},
			// allow overriding the default config
			$.extend(EUTHEM.featureSection.config, settings);

			var section = EUTHEM.featureSection.config.section;

			if( $(section).find('.eut-bg-image').length > 0 ) {
				loadFeatureImage();

				// Add Spinner
				if( addFeatureSpinner ) {
					EUTHEM.featureSection.addSpinner( section );
				}

			} else if( !$(section).find('.eut-bg-image').length > 0 && $(section).find('.eut-bg-video').length > 0 ){
				// Add Spinner
				if( addFeatureSpinner ) {
					EUTHEM.featureSection.addSpinner( section );
				}
			}else {
				EUTHEM.featureAnim.startAnim( $(section) );
			}

			function loadFeatureImage(){
				var $bgImage     = $(section).find('.eut-bg-image'),
					totalBgImage = $bgImage.length;

				var waitImgDone = function() {
					totalBgImage--;
					if (!totalBgImage) {

						if( $(section).hasClass('eut-with-slider') ) {

							// Feature Slider Init
							EUTHEM.featureSection.featureSlider();

						} else {
							// Remove Spinner
							if( addFeatureSpinner ) {
								setTimeout(function () {
									EUTHEM.featureSection.removeSpinner( section );
								}, 600);
							} else {
								EUTHEM.featureSection.showFeature( section );
							}
						}

					}
				};

				$bgImage.each(function () {
					function imageUrl(input) {
						return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
					}
					var image = new Image(),
						$that = $(this);
					image.src = imageUrl($that.css('background-image'));
					$(image).load(waitImgDone).error(waitImgDone);
				});
			}
		},
		addSpinner: function( section ){
			$(spinner).appendTo( $(section) );
			$(section).addClass('eut-with-spinner');
		},
		removeSpinner: function( section ){
			var $spinner  = $(section).find('.eut-spinner');
			$spinner.fadeOut(900,function(){
				$spinner.remove();
				EUTHEM.featureSection.showFeature( section );
			});
		},
		showFeature: function( section ){
			var $section   = $(section),
				$overlay   = $section.find('.eut-bg-overlay'),
				$content   = $section.find('.eut-content'),
				$bgImage   = $section.find('.eut-bg-image'),
				$bgVideo   = $section.find('.eut-bg-video');

				$bgImage.addClass('show');
				$bgVideo.addClass('show');
				$overlay.addClass('show');

				if( $section.hasClass('eut-with-slider') ) {
					EUTHEM.featureSection.animate = true;
					EUTHEM.featureAnim.startAnim( $section.find('.eut-slider-item').first() );
				} else {
					EUTHEM.featureAnim.startAnim( $section );
				}

		},
		featureSlider: function(){

			var $slider         = $('#eut-feature-slider'),
				pauseHover      = $slider.attr('data-slider-pause') == 'yes' ? true : '',
				sliderSpeed     = parseInt( $slider.attr('data-slider-speed') ) ? parseInt( $slider.attr('data-slider-speed') ) : 6000,
				transition      = $slider.attr('data-slider-transition') != 'slide' ? $slider.attr('data-slider-transition') : false,
				slidersLength   = $slider.find('.eut-slider-item').length,
				autoHeight      = false;

			if( $(window).width() + scrollBarWidth <= mobileScreen ) {
				autoHeight = true;
			}

			customNav( $slider );

			// Init Slider
			$slider.owlCarousel({
				navigation      : false,
				pagination      : false,
				autoHeight      : autoHeight,
				slideSpeed      : 800,
				paginationSpeed : 800,
				afterAction     : sliderAction,
				singleItem      : true,
				autoPlay        : true,
				stopOnHover     : pauseHover,
				baseClass       : 'eut-slider',
				theme           : 'eut-theme',
				transitionStyle : transition
			});

			$slider.addClass('eut-is-loaded');

			// Remove Spinner
			if( addFeatureSpinner ) {
				setTimeout(function () {
					EUTHEM.featureSection.removeSpinner( '#eut-feature-section' );
					$slider.trigger('owl.play',sliderSpeed);//Play Carousel
				}, 600);
			} else {
				EUTHEM.featureSection.showFeature( '#eut-feature-section' );
			}

			// Slider Navigation
			function customNav( element ){
				var $navWrapper = element.parent(),
					$navNext    = $navWrapper.find('.eut-carousel-next'),
					$navPrev    = $navWrapper.find('.eut-carousel-prev');

				$navNext.click(function(){
					element.trigger('owl.next');
				});
				$navPrev.click(function(){
					element.trigger('owl.prev');
				});

			}

			function sliderAction(){

				var curItem            = this.currentItem,
					preItem            = this.prevItem,
					$currentSlide      = this.$owlItems.eq( curItem ),
					$prevSlide         = this.$owlItems.eq( preItem ),
					$currentSliderItem = $currentSlide.find('.eut-slider-item'),
					sliderColor        = $currentSliderItem.attr('data-header-color'),
					color              = 'eut-' + sliderColor;

				if( !EUTHEM.featureSection.animate ) return;

				// Slider Animation
				EUTHEM.featureAnim.startAnim( $currentSliderItem );

				// Set Header Color
				if( !$('#eut-main-header').hasClass('eut-header-side') ) {
					$('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
				}

				// Set Navigation Color
				$('#eut-feature-section .eut-carousel-navigation').removeClass('eut-light eut-dark eut-default').addClass(color);
			}

		},
		stopSlider: function(){

			if( !EUTHEM.featureSection.animate ) return;

			var $scroll     = $(window).scrollTop(),
				$slider     = $('#eut-feature-slider'),
				sliderSpeed = parseInt( $slider.attr('data-slider-speed') ) ? parseInt( $slider.attr('data-slider-speed') ) : 6000;

			if( $scroll > 10 ){
				$slider.trigger('owl.stop');//Stop Carousel
			} else {
				$slider.trigger('owl.play',sliderSpeed);//Play Carousel
			}

		}
	};

	// # Resize Video
	// ============================================================================= //
	EUTHEM.resizeVideo = {
		init: function( $selector ){
			EUTHEM.resizeVideo.videoSettings( $selector );
			$(window).smartresize(function(){
				EUTHEM.resizeVideo.videoSettings( $selector );
			});
		},
		videoSettings: function( $selector ){
			var $video          = $selector.find('video'),
				containerWidth  = $selector.parent().outerWidth(),
				containerHeight = $selector.parent().outerHeight(),
				ratio           = 16 / 9,
				videoHeight     = containerHeight,
				videoWidth      = containerHeight * ratio;

				if( videoWidth < containerWidth ) {
					videoWidth   = containerWidth,
					videoHeight  = containerWidth * ratio;
				}

			$video.width( videoWidth ).height( videoHeight );

			if( $selector.parent().is( $('#eut-feature-section') ) ){
				// Remove Spinner
				if( addFeatureSpinner ) {
					setTimeout(function () {
						EUTHEM.featureSection.removeSpinner( '#eut-feature-section' );
					}, 600);
				} else {
					EUTHEM.featureSection.showFeature( '#eut-feature-section' );
				}
			}
		}
	};

	// # Feature Content Animations
	// ============================================================================= //
	EUTHEM.featureAnim = {
		settings: function( $section ){
			var animEffect   = $section.find('.eut-content').data('animation'),
				animDelay    = 200,
				contentItems = {
					wrapper     : $section.find(' .eut-title-content-wrapper '),
					graphic     : $section.find(' .eut-graphic '),
					subheading  : $section.find(' .eut-subheading '),
					title       : $section.find(' .eut-title '),
					description : $section.find(' .eut-description '),
					titleMeta   : $section.find(' .eut-title-meta '),
					button1     : $section.find(' .eut-btn-1 '),
					button2     : $section.find(' .eut-btn-2 '),
					line     : $section.find(' .eut-line-divider '),
					gotoArrow : $section.find(' #eut-goto-section-wrapper')
				};

			return { items: contentItems, effect: animEffect, delay: animDelay };
		},
		startAnim: function( section ){

			var $section = section,
				$wrapper = $section.find('.eut-title-content-wrapper'),
				settings = EUTHEM.featureAnim.settings( $section ),
				items    = settings.items,
				effect   = settings.effect,
				delay    = settings.delay,
				cnt      = 3;

			$section.find('.eut-content').addClass('show');

			$.each( items, function( key, item ) {
				$(item).removeClass('eut-animate-fade-in eut-animate-fade-in-up eut-animate-fade-in-down eut-animate-fade-in-left eut-animate-fade-in-right eut-animate-zoom-in eut-animate-zoom-out eut-animation');
				if( $(item).length ){
					cnt++;
					addAnimClass( effect );
				}
				function addAnimClass( effect ){
					setTimeout(function(){
						var itemClass = 'eut-animate-' + effect + ' eut-animation';
						$(item).addClass( itemClass );
					},cnt * delay);
				}
			});
		}
	};

	// # Page Settings
	// ============================================================================= //
	EUTHEM.pageSettings = {

		init: function(){

			this.customBgSize();
			this.eutModal();
			this.gotoFirstSection();
			this.bgLoader();
			this.imageLoader();
			this.fitVid();
			this.hiddenArea();
			this.backtoTop();
			this.animatedBg();
			this.hovers();
			this.onePageSettings();
			this.shoppingCart();
			this.socialShareLinks();
			this.lightBox();
			this.postSocials();

		},
		customBgSize: function(){
			var $bgWrapper = $('.eut-bg-wrapper.eut-custom-size');
			$bgWrapper.each(function() {
				var $that = $(this),
					$media = $that.parent(),
					$img = $media.find('img'),
					imgW = $img.attr('width') != undefined ? parseInt($img.attr('width')) : 0,
					imgH = $img.attr('height') != undefined ? parseInt($img.attr('height')) : 0;
				if (imgW > 0 && imgH > 0) {
					var ratio = (imgH / imgW) * 100;
					$that.css({
						'padding-bottom': ratio + '%'
					});
				}
			});
		},
		stickySidebarWidget : function(){
			var $element = $('#eut-content .eut-sticky-widget');

			if( !$element.length ) { return false; }
			if( isMobile.any() && !stickyDeviceSidebar ) { return false; }

			$element.each(function(){
				var $sidebar = $(this),
					$parent = $sidebar.parent().parent(),
					sidebarWidget = false;

				if( $sidebar.parent().parent().is('#eut-sidebar.eut-fixed-sidebar') ) { return false; }

				if( $sidebar.parent().parent().is('#eut-sidebar') ) {
					sidebarWidget = true;
				}
				var $content = sidebarWidget ? $('#eut-main-content .eut-main-content-wrapper') : $sidebar.parents('.eut-section');

				var resize = false,
					sticky = false;

				var parentT, sidebarT, sidebarL, sidebarW, sidebarH, paddingT, contentT, contentH, contentPadding, headerHeight, anchorHeight, offset, positionT;

				resizer();
				if( !isMobile.any() ) {
					$(window).on('resize', resizer);
				} else {
					$(window).on('orientationchange', resizer);
				}

				function resizer(){
					var delay,
						windowW = $(window).width();

					if(!resize){
						resize = true;
						window.clearTimeout(delay);
						delay = window.setTimeout(function() {
							resetSticky();
							if( windowW + scrollBarWidth > tabletPortrait ) {
								updateParams();
								$(window).on('scroll',update);
							} else {
								$(window).off('scroll',update);
							}
							resize = false;
						}, 500);
					}
				}
				function resetSticky(){
					$parent.css({
						'position' : '',
						'top' : '',
						'left' : '',
						'width' : ''
					});
				}
				function updateParams(){
					var contentPaddingT = !sidebarWidget ? parseInt($content.css('padding-top')) : 0,
						contentPaddingB = !sidebarWidget ? parseInt($content.css('padding-bottom')) : 0;

					parentT = $parent.offset().top;
					sidebarT = $sidebar.offset().top;
					sidebarL = $parent.offset().left;
					sidebarW = $parent.outerWidth();
					sidebarH = $parent.outerHeight();
					contentT = $content.offset().top;
					contentH = $content.outerHeight();
					contentPadding = contentPaddingT + contentPaddingB;
					headerHeight = $('#eut-header').length && $('#eut-header').data('sticky') != 'none' ? $('#eut-header').data('sticky-height') : 0;
					anchorHeight = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0;
					offset = headerHeight + anchorHeight + 30;
					positionT = offset - (sidebarT - parentT);

					update();
				}
				function update(){
					var scroll = $(window).scrollTop(),
						space = parentT - scroll;

					// Desctope Sticky
					if( scroll < sidebarT - offset ) {
						sticky = false;
						resetSticky();
					} else if( scroll >= sidebarT - offset && scroll < sidebarT + contentH - sidebarH - offset - contentPadding ) {
						sticky = true;
						$parent.css({
							'top' : positionT,
							'left' : sidebarL,
							'width' : sidebarW,
							'position' : 'fixed'
						});
					} else {
						if(sticky) {
							$parent.css({
								'top' : contentH - sidebarH - contentPadding,
								'left' : '',
								'width' : '',
								'position' : 'relative'
							});
						}
					}

				}
				function updateSidebarPosition() {
					var contentHeight = $content.height(),
						scrollTop     = $(window).scrollTop(),
						topPosition   = sidebarTop - contentTop - topOffset - contentPadding;

					if( scrollTop < sidebarTop - topOffset ) {
						$sidebar.removeClass('fixed').attr('style', '');
					} else if( scrollTop >= sidebarTop - topOffset && scrollTop < sidebarTop + contentHeight - sidebarHeight - topOffset ) {
						$sidebar.addClass('fixed').css({ 'top' : - topPosition, 'position' : 'fixed', 'width' : sidebarWidth });
					} else {
						if( $sidebar.hasClass('fixed') ) {
							$sidebar.removeClass('fixed').css({ 'top' : contentHeight - sidebarHeight + 'px', 'position' : 'relative' });
						}
					}
				}

			});
		},
		stickySidebar : function(){
			var $sidebar = $('#eut-sidebar.eut-fixed-sidebar'),
				$content = $('#eut-main-content .eut-main-content-wrapper');
			if( !$sidebar.length ) { return false; }
			if( isMobile.any() && !stickyDeviceSidebar ) { return false; }

			var resize = false,
				sticky = false;

			var sidebarT, sidebarL, sidebarW, sidebarH, paddingT, contentT, contentH, headerHeight, anchorHeight, offset;

			resizer();
			if( !isMobile.any() ) {
				$(window).on('resize', resizer);
			} else {
				$(window).on('orientationchange', resizer);
			}

			function resizer(){
				var delay,
					windowW = $(window).width();

				if(!resize){
					resize = true;
					window.clearTimeout(delay);
					delay = window.setTimeout(function() {
						resetSticky();
						if( windowW + scrollBarWidth > tabletPortrait ) {
							updateParams();
							$(window).on('scroll',update);
						} else {
							$(window).off('scroll',update);
						}
						resize = false;
					}, 500);
				}
			}
			function resetSticky(){
				$sidebar.css({
					'position' : '',
					'top' : '',
					'left' : '',
					'width' : ''
				});
			}
			function updateParams(){
				sidebarT = $sidebar.offset().top;
				sidebarL = $sidebar.offset().left;
				sidebarW = $sidebar.outerWidth();
				sidebarH = $sidebar.outerHeight();
				paddingT = parseInt($sidebar.css('padding-top'));
				contentT = $content.offset().top;
				contentH = $content.outerHeight();
				headerHeight = $('#eut-header').length && $('#eut-header').data('sticky') != 'none' ? $('#eut-header').data('sticky-height') : 0;
				anchorHeight = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0;
				offset = headerHeight + anchorHeight + 30;

				update();
			}
			function update(){
				var scroll = $(window).scrollTop(),
					space = sidebarT - scroll;

				if( scroll < sidebarT - offset + paddingT ) {
					sticky = false;
					resetSticky();
				} else if( scroll >= sidebarT - offset + paddingT && scroll < sidebarT + contentH - sidebarH - offset + paddingT ) {
					sticky = true;
					$sidebar.css({
						'top' : offset - paddingT,
						'left' : sidebarL,
						'width' : sidebarW,
						'position' : 'fixed'
					});
				} else {
					if(sticky){
						$sidebar.css({
							'top' : contentH - sidebarH,
							'left' : '',
							'width' : '',
							'position' : 'relative'
						});
					}
				}

			}
		},
		socialAnimation : function(){
			var $el = $('#eut-bottom-bar .eut-social');
			if(!$el.length){return false;}

			$el.each(function(){
				var $element = $(this),
					$item = $element.find('li'),
					offset = $element.offset().top + 100,
					itemLenght = $item.length - 1,
					startTimer = false,
					count = -1,
					counter;
				update();
				$(window).on('scroll',update);

				function update(){
					var scroll = $(window).scrollTop(),
						windowH = $(window).height();
					if( (windowH > offset - scroll) && !startTimer ) {
						startTimer = true;
						counter = setInterval(timer, 250);
					}

					if( (windowH < offset - scroll) && startTimer ) {
						startTimer = false;
						count = -1;
						$item.removeClass('active');
						clearInterval(counter);
					}
				}
				function timer(){
					count += 1;
					if( count >= itemLenght ){
						clearInterval(counter);
					}
					$item.eq(count).addClass('active');
				}
			});
		},
		bodyLoader: function(){
			var $overflow = $('#eut-loader-overflow'),
				$loader   = $('.eut-spinner');

			if( $overflow.length > 0 ){
				bodyLoader = true;
			} else {
				return;
			}

			var images = $('img, .eut-bg-image');
			$.each(images, function(){
				var el = $(this),
				image = el.css('background-image').replace(/"/g, '').replace(/url\(|\)$/ig, '');
				if(image && image !== '' && image !== 'none')
					images = images.add($('<img>').attr('src', image));
				if(el.is('img'))
					images = images.add(el);
			});

			images.imagesLoaded(function(){
				setTimeout(function () {
					$loader.fadeOut(500);
					$overflow.delay(500).fadeOut(700,function(){
						bodyLoader = false;
						EUTHEM.basicElements.animAppear();
						EUTHEM.basicElements.counter();
					});
				}, 600);
			});

		},
		removeVideoBg: function(){
			var videoBg = $('.eut-bg-video');
			var videoVcBg = $('.eut-bg-video-wrapper');
			if( isMobile.any() ) {
				videoBg.remove();
				videoVcBg.remove();
			} else {
				$('.eut-background-wrapper').each(function () {
					var bgImage = $(this).find('.eut-bg-image');
					var bgVideo = $(this).find('.eut-bg-video');
					var bgVcVideo = $(this).find('.eut-bg-video-wrapper');
					var bgVcVideoButton = $(this).find('.eut-bg-video-button-device');
					if ( bgVideo.length ) {
						var videoElement = $(this).find('.eut-bg-video video');
						var canPlayVideo = false;
						$(this).find('.eut-bg-video source').each(function(){
							if ( videoElement.get(0).canPlayType( $(this).attr('type') ) ) {
								canPlayVideo = true;
							}
						});
						if(canPlayVideo) {
							bgImage.remove();
							// Resize Video
							EUTHEM.resizeVideo.init( $(this) );
						} else {
							bgVideo.remove();
						}
					}
					if ( bgVcVideo.length ) {
						bgImage.remove();
					}
					if ( bgVcVideoButton.length ) {
						bgVcVideoButton.remove();
					}
				});
			}
		},
		eutModal: function(){

			var $button       = $('.eut-toggle-modal'),
				$overlay      = $('<div id="eut-modal-overlay" class="eut-body-overlay"></div>'),
				$closeBtn     = $('<div class="eut-close-modal"><i class="eut-icon-close"></i></div>'),
				$themeWrapper = $('#eut-theme-wrapper'),
				content;

			$button.on('click',function(e){
				content = $(this).attr('href');
				if( content && content.indexOf("#") === 0 && $(content).length > 0 ) {
					e.preventDefault();

					// Append Overlay on body
					$overlay.appendTo( $themeWrapper );
					$closeBtn.appendTo( $(content) );

					$(content).addClass('prepare-anim');

					openModal();

					$closeBtn.on('click',function(e){
						e.preventDefault();
						closeModal();
					});

					$(content).on('click',function(e){
						if ( !$('.eut-modal-item').is(e.target) && $('.eut-modal-item').has(e.target).length === 0 ) {
							e.preventDefault();
							closeModal();
						}
					});
				}
			});

			// Open Modal
			function openModal() {
				$overlay.fadeIn(function(){
					$(content).addClass('animate');
				});
			}

			// Close Modal
			function closeModal() {
				$(content).removeClass('animate mobile');
				setTimeout(function(){
					$overlay.fadeOut(function(){
						$(content).removeClass('prepare-anim');
						$overlay.remove();
						$closeBtn.remove();
					})
				},600);
			}

			$(document).on('keyup',function(evt) {
				if (evt.keyCode == 27 && $(content).hasClass('animate') ) {
					closeModal();
				}
			});

		},
		gotoFirstSection: function(){
			var $selector    = $('#eut-feature-section #eut-goto-section'),
				$nextSection = $('#eut-content');

			$selector.on('click',function(){
				$('html,body').animate({
					scrollTop: $nextSection.offset().top +1
				}, 1000);
				return false;
			});
		},
		bgLoader: function() {

			var $selector = $('#eut-header .eut-bg-image, #eut-content .eut-bg-image, #eut-footer .eut-bg-image, #eut-related-post .eut-bg-image');
			$selector.each(function () {
				var $selector = $(this);
				if( $selector.data('loader') == 'yes' ){
					EUTHEM.pageSettings.addSpinner( $selector );
				}
				function imageUrl(input) {
					return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
				}
				var image = new Image(),
					$that = $(this);
				image.src = imageUrl($that.css('background-image'));
				image.onload = function () {
					if( $selector.data('loader') == 'yes' ){
						EUTHEM.pageSettings.removeSpinner( $selector );
					} else {
						$that.addClass('show');
					}
				};
			});
		},
		imageLoader: function(){
			var selectors  = {
				singleImage  : '.eut-image',
				media        : '.eut-media'
			};
			$.each(selectors, function(key, value){
				if( $(this).length ){
					var item     = $(this),
						imgLoad  = imagesLoaded( item );
					imgLoad.on( 'always', function() {
						$(value).find('img').animate({ 'opacity': 1 },1000);
					});
				}
			});
		},
		addSpinner: function( $selector ){
			var $section = $selector;
			$(spinner).appendTo( $section.parent() );
		},
		removeSpinner: function( $selector ){

			var $section   = $selector.parent(),
				$spinner   = $section.find('.eut-spinner');

			$spinner.fadeOut(600,function(){
				$selector.addClass('show');
				$spinner.remove();
			});
		},
		fitVid: function(){
			
		},
		hiddenArea: function( section, btn ){
			var $btn          = $('.eut-toggle-hiddenarea'),
				$themeWrapper = $('#eut-theme-wrapper'),
				$closeBtn     = $('.eut-hidden-area').find('.eut-close-btn'),
				areaWidth     = 0,
				content,
				$overlay;

			// if( !$(content).length > 0 ) return;

			$btn.on('click',function(e){
				content = $(this).attr('href');
				if(!content) {
					content = "k";
				}
				if( content.indexOf("#") === 0 && $(content).length > 0 ) {
					e.preventDefault();
					var overlayId = content.replace('#','');

					$(content).addClass('prepare-anim');
					$overlay = $('<div id="' + overlayId + '-overlay" class="eut-body-overlay"></div>');

					// Append Overlay on body
					$overlay.appendTo( $themeWrapper );

					// Calculate Width
					areaWidth = hiddenAreaWidth( content );
					$(window).smartresize(function(){
						areaWidth = hiddenAreaWidth( content );
					});

					if( $(content).hasClass('open') ) {
						closeHiddenArea();
					} else {
						openHiddenArea();
					}

					// For One Page
					var $link = $(content).find('a[href*="#"]:not( [href="#"] )');
					$link.on('click',function(){
						var target = $(this.hash);
						if ( target.length && ( target.hasClass('eut-section') || target.hasClass('eut-bookmark') ) ) {
							closeHiddenArea();
						}
					});

				}
			});

			$closeBtn.on('click',function(){
				closeHiddenArea();
			});

			// Open Hidden Area
			function openHiddenArea() {
				$overlay.fadeIn(function(){
					$('body').scrollTop( 0 );
					$(content).addClass('open');
					$(this).on('click',function(){
						closeHiddenArea();
					});
				});
			}
			// Close Hidden Area
			function closeHiddenArea() {
				$themeWrapper.css({ 'height' : 'auto' });
				$(content).removeClass('open');
				$overlay.fadeOut(function(){
					$overlay.remove();
					$(content).removeClass('prepare-anim');
				});
			}

			// Calculate Area Width
			function hiddenAreaWidth( area ){
				var windowWidth  = $(window).width(),
					areaWidth    = windowWidth / 4,
					minWidth     = 500;
				if( $(window).width() + scrollBarWidth <= mobileScreen ) {
					areaWidth = windowWidth + 30;
				} else if( areaWidth < minWidth ) {
					areaWidth = minWidth;
				}

				$(area).css({ 'width' : areaWidth });
				return areaWidth;
			}

		},
		hiddenAreaHeight: function( area ){
			if( !$(area).length > 0 ) return;

			var windowWidth      = $(window).width(),
				windowHeight     = $(window).height(),
				hiddenAreaHeight = $(area).find('.eut-hiddenarea-content').outerHeight() + 200,
				$themeWrapper    = $('#eut-theme-wrapper'),
				$scroller        = $(area).find('.eut-scroller'),
				$buttonWrapper   = $(area).find('.eut-buttons-wrapper'),
				btnWrapperHeight = $buttonWrapper.length ? $buttonWrapper.height() : 0,
				sideHeight       = 0;

			if( hiddenAreaHeight > windowHeight ){
				sideHeight = hiddenAreaHeight;
			} else {
				sideHeight = windowHeight;
			}

			if( $(window).width() + scrollBarWidth <= mobileScreen ) {
				$scroller.css({ 'height' : 'auto' });
				$(area).css({ 'position' : 'absolute','height' : sideHeight });
				$themeWrapper.css({ 'height' : sideHeight, 'overflow' : 'hidden' });
			} else {
				$scroller.css({ 'height' : windowHeight - btnWrapperHeight - 150 });
				$themeWrapper.css({ 'height' : '', 'overflow' : '' });
			}
		},
		backtoTop: function() {


			var selectors  = {
				topBtn     : '.eut-back-top',
				dividerBtn : '.eut-divider-backtotop',
				topLink    : 'a[href="#eut-goto-header"]',
				headerTop  : '.eut-header-back-top a'
				},
				footerBarHeight = $('.eut-footer-bar').length ? $('.eut-footer-bar').outerHeight() : 0;

				if( $( selectors.topBtn ).length ) {

					$(window).on('scroll', function() {
						var scroll = $(this).scrollTop(),
							$topBtn = $( selectors.topBtn );

						if (scroll > 600) {
							$topBtn.addClass('show');
						} else {
							$topBtn.removeClass('show');
						}
						if( scroll + $(window).height() > $(document).height() - footerBarHeight ) {
							$topBtn.css({ 'transform': 'translate(0, ' + -( footerBarHeight + 70 ) + 'px)' });
						} else {
							$topBtn.css({ 'transform': '' });
						}

					});
				}
				if( $( selectors.headerTop ).length ) {

					$(window).on('scroll', function() {
						var scroll = $(this).scrollTop(),
							$headerTopBtn = $( selectors.headerTop ),
							pageTitleHeight = $('.eut-page-title').length ? $('.eut-page-title').outerHeight() : 0,
							featureSectionHeight = $('#eut-feature-section').length ? $('#eut-feature-section').outerHeight() : 0,
							offset = pageTitleHeight + featureSectionHeight + 600;

						if( scroll > offset ) {
							$headerTopBtn.addClass('show');
						} else {
							$headerTopBtn.removeClass('show');
						}

					});
				}

			$.each(selectors, function(key, value){
				$(value).on('click', function(e){
					e.preventDefault();
					var scrollTop = Math.abs($(window).scrollTop()) / 2,
						speed = scrollTop < 1000 ? 1000 : scrollTop;
					$('html, body').animate({scrollTop: 0}, speed, 'easeInOutCubic');
				});
			});

		},
		animatedBg: function(){
			var $section = $('.eut-section');

			$section.each(function(){
				var $this = $(this);

				if( $this.hasClass('eut-bg-animated') ) {
					zoomBg( $this );
				} else if( $this.hasClass('eut-bg-horizontal') ) {
					horizontalBg( $this );
				}
			});

			function zoomBg( $this ){
				$this.mouseenter(function() {
					$this.addClass('zoom');
				});
				$this.mouseleave(function() {
					$this.removeClass('zoom');
				});
			}

			function horizontalBg( $this ){
				var bgPosition = 0;
				setInterval(function(){
					bgPosition++;
					$this.find('.eut-bg-image').css({ 'background-position' : bgPosition+'px center', 'background-repeat' : 'repeat' });
				},75);
			}
		},
		hovers: function(){
			var $hoverItem = $('.eut-image-hover');
			if ( !isMobile.any() ) {
				$hoverItem.unbind('click');
				$hoverItem.unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
					$(this).toggleClass('hover');
				});
			} else {
				var touchevent = 'touchend';
				if( $hoverItem.parent().parent().hasClass('eut-carousel-item') ) {
					touchevent = 'touchstart';
				}
				$hoverItem.on(touchevent, function(e) {
					var $item = $(this);
					if ( $item.hasClass('hover') ) {
						return true;
					} else {
						$item.addClass('hover');
						$hoverItem.not(this).removeClass('hover');
						e.preventDefault();
						return false;
					}
				});
				$(document).on('touchstart touchend', function(e) {
					if ( !$hoverItem.is(e.target) && $hoverItem.has(e.target).length === 0 ) {
						$hoverItem.removeClass('hover');
					}
				});
			}
		},
		onePageSettings: function(){
			$('a[href*="#"]:not( [href="#"] )').click(function(e) {
				var headerHeight    = $('#eut-header').data('sticky') != 'none' ? $('#eut-header').data('sticky-height') : 0,
					anchorBarHeight = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0,
					target          = $(this.hash);

				if ( target.length && ( target.hasClass('eut-section') || target.hasClass('eut-bookmark') ) ) {
					$('html,body').animate({
						scrollTop: target.offset().top - headerHeight - anchorBarHeight + 1
					}, 1000);
					return false;
				}
			});
		},
		onePageMenu: function(){
			var $section       = $('#eut-main-content .eut-section[id]');
			if (!$section.length > 0 ) return;

			var headerHeight   = $('#eut-header').attr('data-sticky-header') != 'none' ? $('#eut-main-header').outerHeight() : 0,
				anchorBarHeight = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0,
				offsetTop      = headerHeight + anchorBarHeight + wpBarHeight,
				scroll         = $(window).scrollTop();

			$section.each(function(){
				var $that         = $(this),
					currentId     = $that.attr('id'),
					sectionOffset = $that.offset().top - offsetTop;

				if (sectionOffset <= scroll && sectionOffset + $that.outerHeight() > scroll ) {
					$('a[href*="#' + currentId + '"]').parent().addClass('active');
				}
				else{
					$('a[href*="#' + currentId + '"]').parent().removeClass("active");
				}

			});
		},
		fixedFooter: function(){
			var $footer      = $('#eut-footer'),
				sticky       = $footer.data('sticky-footer'),
				prevSection  = $footer.prev(),
				prevMargin   = parseInt( prevSection.css('margin-bottom') );

			if( !$footer.length || sticky != 'yes' || isMobile.any() ) return;

			update()
			$(window).smartresize(function(){
				update();
			});

			function update(){
				var windowHeight = $(window).height(),
					footerHeight = $footer.outerHeight(),
					margin       = footerHeight + prevMargin;

				if( footerHeight > windowHeight ) {
					$footer.removeClass('eut-fixed-footer').prev().css( 'margin-bottom',0 );
				} else {
					$footer.addClass('eut-fixed-footer').prev().css( 'margin-bottom',margin );
				}

			}

		},
		shoppingCart: function(){
			var $button = $('.eut-toggle-cart'),
				$cart = $('.eut-shoppin-cart-content'),
				$cartList = $cart.find('.cart_list'),
				timer;

			$button.on('mouseover',function(){
				clearTimeout(timer);
				openCart();
			});

			$button.on('mouseout',function(){
				closeCart();
			});

			$cart.on('mouseover',function(){
				clearTimeout(timer);
			});

			$cart.on('mouseout',function(){
				closeCart();
			});

			function openCart(){
				$cart.addClass('open');
			}

			function closeCart(){
				timer = setTimeout(function(){
					$cart.removeClass('open');
				}, 300);
			}
		},
		lightBox: function(){
			//IMAGE
			$('.eut-image-popup').each(function() {
				$(this).magnificPopup({
					type: 'image',
					preloader: false,
					fixedBgPos: true,
					fixedContentPos: true,
					removalDelay: 200,
					closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
					closeOnBgClick: true,
					callbacks: {
						beforeOpen: function() {
							var mfpWrap = this.wrap;
							this.bgOverlay.fadeIn(200);
							addSpinner( mfpWrap );
						},
						imageLoadComplete: function() {
							var $spinner = this.wrap.find('.eut-spinner'),
								$content = this.container;
							removeSpinner( $spinner, $content );

						},
						beforeClose: function() {
							this.wrap.fadeOut(100);
							this.bgOverlay.fadeOut(100);
						},
					},
					image: {
						verticalFit: true,
						titleSrc: function(item) {
							var title   = item.el.data( 'title' ) ? item.el.data( 'title' ) : '',
								caption = item.el.data('desc') ? '<br><small>' + item.el.data('desc') + '</small>' : '';
							if ( '' === title ) {
								title   = item.el.find('.eut-title').html() ? item.el.find('.eut-title').html() : '';
							}
							if ( '' === caption ) {
								caption = item.el.find('.eut-caption').html() ? '<br><small>' + item.el.find('.eut-caption').html() + '</small>' : '';
							}
							return title + caption;
						}
					}
				});
			});
			$('.eut-gallery-popup, .eut-post-gallery-popup').each(function() {
				$(this).magnificPopup({
					delegate: 'a',
					type: 'image',
					preloader: false,
					fixedBgPos: true,
					fixedContentPos: true,
					removalDelay: 200,
					closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
					closeOnBgClick: true,
					callbacks: {
						beforeOpen: function() {
							var mfpWrap = this.wrap;
							this.bgOverlay.fadeIn(200);
							addSpinner( mfpWrap );
						},
						imageLoadComplete: function() {
							var $spinner = this.wrap.find('.eut-spinner'),
								$content = this.container;
							removeSpinner( $spinner, $content );

						},
						beforeClose: function() {
							this.wrap.fadeOut(100);
							this.bgOverlay.fadeOut(100);
						},
					},
					gallery: {
						enabled:true
					},
					image: {
						tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
						titleSrc: function(item) {
							var title   = item.el.data( 'title' ) ? item.el.data( 'title' ) : '',
								caption = item.el.data('desc') ? '<br><small>' + item.el.data('desc') + '</small>' : '';
							if ( '' === title ) {
								title   = item.el.find('.eut-title').html() ? item.el.find('.eut-title').html() : '';
							}
							if ( '' === caption ) {
								caption = item.el.find('.eut-caption').html() ? '<br><small>' + item.el.find('.eut-caption').html() + '</small>' : '';
							}
							return title + caption;
						}
					}
				});
			});

			if( 1 == anemos_eutf_main_data.wp_gallery_popup ) {
				$('.gallery').each(function() {
					$(this).magnificPopup({
						delegate: 'a',
						type: 'image',
						preloader: false,
						fixedBgPos: true,
						fixedContentPos: true,
						removalDelay: 200,
						closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
						closeOnBgClick: true,
						callbacks: {
							beforeOpen: function() {
								var mfpWrap = this.wrap;
								this.bgOverlay.fadeIn(200);
								addSpinner( mfpWrap );
							},
							imageLoadComplete: function() {
								var $spinner = this.wrap.find('.eut-spinner'),
									$content = this.container;
								removeSpinner( $spinner, $content );

							},
							beforeClose: function() {
								this.wrap.fadeOut(100);
								this.bgOverlay.fadeOut(100);
							},
						},
						gallery: {
							enabled:true
						},
						image: {
							tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
							titleSrc: function(item) {
								var title   = item.el.closest('.gallery-item').find('.gallery-caption').html() ? item.el.closest('.gallery-item').find('.gallery-caption').html() : '';
								return title;
							}
						}
					});
				});
			}
			//VIDEOS
			$('.eut-youtube-popup, .eut-vimeo-popup, .eut-video-popup, .eut-page-popup').each(function() {
				$(this).magnificPopup({
					disableOn: 0,
					type: 'iframe',
					preloader: false,
					fixedBgPos: true,
					fixedContentPos: true,
					removalDelay: 200,
					closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
					closeOnBgClick: true,
					callbacks: {
						beforeOpen: function() {
							var mfpWrap = this.wrap;
							this.bgOverlay.fadeIn(200);
							addSpinner( mfpWrap );
						},
						open: function() {
							var $spinner = this.wrap.find('.eut-spinner'),
								$content = this.container;
							removeSpinner( $spinner, $content );
						},
						beforeClose: function() {
							this.wrap.fadeOut(100);
							this.bgOverlay.fadeOut(100);
						},
					}
				});
			});

			$('.eut-html5-video-popup').each(function() {
				$(this).magnificPopup({
					disableOn: 0,
					type: 'inline',
					preloader: false,
					prependTo: '#eut-theme-wrapper',
					fixedBgPos: true,
					fixedContentPos: true,
					removalDelay: 200,
					closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
					closeOnBgClick: true,
					callbacks: {
						beforeOpen: function() {
							var mfpWrap = this.wrap;
							this.bgOverlay.fadeIn(200);
							addSpinner( mfpWrap );
						},
						open: function() {
							var $spinner = this.wrap.find('.eut-spinner'),
								$content = this.container;
							removeSpinner( $spinner, $content );
							if ( $content.find('video').length ) {
								setTimeout(function(){
									$content.find('video')[0].play();
								},500);
							}
						},
						beforeClose: function() {
							if ( this.wrap.find('video').length ) {
								this.wrap.find('video')[0].load();
							}
							this.wrap.fadeOut(100);
							this.bgOverlay.fadeOut(100);
						},
					}
				});
			});

			function addSpinner( mfpWrap ){
				$(spinner).appendTo( mfpWrap );
			}

			function removeSpinner( spinner, content ){
				setTimeout(function(){
					spinner.fadeOut(1000, function(){
						content.animate({'opacity':1},600);
					});
				}, 700);
			}
		},
		socialShareLinks: function(){
			$('.eut-social-share-facebook').click(function (e) {
				e.preventDefault();
				window.open( 'https://www.facebook.com/sharer/sharer.php?u=' + $(this).attr('href'), "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$('.eut-social-share-twitter').click(function (e) {
				e.preventDefault();
				window.open( 'http://twitter.com/intent/tweet?text=' + encodeURIComponent( $(this).attr('title') ) + ' ' + $(this).attr('href'), "twitterWindow", "height=450,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$('.eut-social-share-linkedin').click(function (e) {
				e.preventDefault();
				window.open( 'http://www.linkedin.com/shareArticle?mini=true&url=' + $(this).attr('href') + '&title=' + encodeURIComponent( $(this).attr('title') ), "linkedinWindow", "height=500,width=820,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$('.eut-social-share-googleplus').click(function (e) {
				e.preventDefault();
				window.open( 'https://plus.google.com/share?url=' + $(this).attr('href'), "googleplusWindow", "height=600,width=600,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$('.eut-social-share-pinterest').click(function (e) {
				e.preventDefault();
				window.open( 'http://pinterest.com/pin/create/button/?url=' + $(this).attr('href') + '&media=' + $(this).data('pin-img') + '&description=' + encodeURIComponent( $(this).attr('title') ), "pinterestWindow", "height=600,width=600,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$('.eut-social-share-reddit').click(function (e) {
				e.preventDefault();
				window.open( '//www.reddit.com/submit?url=' + $(this).attr('href'), "redditWindow", "height=600,width=820,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=1" );
				return false;
			});
			$('.eut-like-counter-link').click(function (e) {
				e.preventDefault();
				var link = $(this);
				var id = link.data('post-id'),
					counter = link.parent().find('.eut-like-counter');

				var ajaxurl = anemos_eutf_main_data.ajaxurl;

				$.ajax({type: 'POST', url: ajaxurl, data: 'action=anemos_eutf_likes_callback&eut_likes_id=' + id, success: function(response) {
					if ( '-1' != response ) {
						if( 'active' == response.status ){
							link.addClass('active');
						} else {
							link.removeClass('active');
						}
						counter.html(response.likes);
					}
				}});
				return false;
			});
		},
		postSocials: function(){
			var $social = $('#eut-single-post-meta-sticky .eut-post-socials li a'),
				initSize = 36;

			if( $(window).width() + scrollBarWidth <= tabletLandscape ) {
				return;
			}

			$social.unbind('mouseenter').bind('mouseenter', function() {
				var $this = $(this),
					newSize = $this.find('span').outerWidth();
				$this.css('width', newSize + initSize)
			});

			$social.unbind('mouseleave').bind('mouseleave', function() {
				var $this = $(this);
				$this.css('width', initSize)
			});
		},
		anchorMenu: function(){
			var $anchor  = $('.eut-anchor-menu'),
				$section = $('#eut-main-content .eut-section[id]');

			if( !$anchor.length ){ return false; }

			var $wrapper      = $anchor.find('.eut-anchor-wrapper'),
				$header       = $('#eut-header'),
				stickyType    = $header.data('sticky'),
				stickyDevice  = $header.data('devices-sticky') == 'yes' ? true : false,
				stickyHeaderH = $header.data('sticky-height'),
				windowW, headerH, anchorH, anchorT, offsetT;

			var	resize = false,
				sticky = false;

			resizer();
			if( !isMobile.any() ) {
				$(window).on('resize',resizer);
			} else {
				$(window).on('orientationchange',resizer);
			}

			function resizer(){
				var delay;
				windowW = $(window).width();

				if(!resize){
					resize = true;
					window.clearTimeout(delay);
					delay = window.setTimeout(function() {
						resetSticky();
						if( windowW + scrollBarWidth > mobileScreen ) {
							updateParams();
							$(window).on('scroll',update);
						} else {
							$(window).off('scroll',update);
						}
						resize = false;
					}, 500);
				}
			}
			function resetSticky(){
				sticky = false;
				$wrapper.removeClass('eut-sticky eut-sticky-animate eut-anchor-push').css({ 'top' : '' });
			}
			function updateParams(){
				anchorH = $anchor.outerHeight();
				anchorT = $anchor.offset().top;
				headerH = getHeaderHeight();
				offsetT = anchorT - headerH;

				update();
			}
			function getHeaderHeight(){
				var height = 0;
				if($header.length){
					if( windowW + scrollBarWidth < tabletPortrait ) {
						if(stickyDevice){
							height = $('#eut-responsive-header').outerHeight();
						}
					} else {
						if(stickyType == 'simple'){
							if( $('#eut-main-header').hasClass('eut-header-logo-top') ){
								height = $('#eut-bottom-header').outerHeight();
							} else {
								height = $header.outerHeight();
							}
						} else if(stickyType == 'shrink'){
							height = stickyHeaderH;
						}
					}
				}
				return height;
			}
			function update(){
				var scroll = $(window).scrollTop(),
					showHeader = EUTHEM.headerSettings.stickyHeader.showHeader,
					delay;

				if( scroll > offsetT && !sticky){
					sticky = true;
					$wrapper.addClass('eut-sticky').css({ 'top' : headerH });
				} else if( scroll < offsetT && sticky){
					sticky = false;
					$wrapper.removeClass('eut-sticky').css({ 'top' : '' });
				}

				if(showHeader){
					$wrapper.addClass('eut-sticky-animate eut-anchor-push');
				} else if(!showHeader){
					$wrapper.removeClass('eut-sticky-animate eut-anchor-push');
				}
			}
		}
	};

	// # Basic Elements
	// ============================================================================= //
	EUTHEM.basicElements = {
		init: function(){
			this.leaderPostSize();
			this.pieChart();
			this.progressBars();
			this.counter();
			this.slider();
			this.testimonial();
			this.flexibleCarousel();
			this.carousel();
			this.advancedPromo();
			this.imageText();
			this.messageBox();
			this.wooProduct();
			this.wooProductZoom();
			this.animAppear();
			this.vcAccordion();
			this.vcTab();
			this.productSocials();
			this.countdown();
		},
		leaderPostSize : function(){
			var $leaderElement = $('.eut-blog-leader.eut-layout-1.eut-anemos-style');

			if( !$leaderElement.length ) return;

			var windowWidth,
				maxHeight,
				leaderHeight;

			$leaderElement.each(function(){
				var $this = $(this),
					$leaderPost = $this.find('.eut-post-leader'),
					resizing  = false;


				resetHeight();
				if( !isMobile.any() ) {
					$(window).on('resize',resetHeight);
				} else {
					$(window).on('orientationchange',resetHeight);
				}

				function resetHeight(){
					if(!resizing){
						resizing  = true;

						$leaderPost.css({
							'height' : ''
						});

						updateParams();
					}
				}

				function updateParams() {
					windowWidth = $(window).width();

					$this.imagesLoaded('always',function(){
						maxHeight = $this.outerHeight();
						leaderHeight = $leaderPost.outerHeight();

						setLeaderHeight();
					});
				}

				function setLeaderHeight(){
					if( maxHeight > leaderHeight && windowWidth + scrollBarWidth > tabletPortrait ){
						$leaderPost.css({
							'height' : maxHeight,
							'visibility' : 'visible'
						});
					} else {
						$leaderPost.css({
							'visibility' : 'visible'
						});
					}

					resizing = false;
				}
			});
		},
		pieChart: function(){

			$('.eut-chart-number').each(function() {
				var $element  = $(this),
					delay     = $element.parent().data('delay') !== '' ? parseInt( $element.parent().data('delay') ) : 0,
					size      = $element.data('pie-size'),
					chartSize = '130';
				if( size == 'small' ){
					chartSize = '100';
				}
				if( size == 'large' ){
					chartSize = '160';
				}

				$element.css({ 'width' : chartSize, 'height' : chartSize, 'line-height' : chartSize + 'px' });

				$element.appear(function() {
					setTimeout(function () {
						EUTHEM.basicElements.pieChartInit( $element, chartSize );
					}, delay);
				});
			});

		},
		pieChartInit: function( $element, size ){

			var activeColor = $element.data('pie-active-color') !== '' ? $element.data('pie-active-color') : 'rgba(0,0,0,1)',
				pieColor    = $element.data('pie-color') !== '' ? $element.data('pie-color') : 'rgba(0,0,0,0.1)',
				pieLineCap  = $element.data('pie-line-cap') !== '' ? $element.data('pie-line-cap') : 'round',
				lineSize    = $element.data('pie-line-size') !== '' ? $element.data('pie-line-size') : '6',
				chartSize   = size;


			$element.easyPieChart({
				barColor: activeColor,
				trackColor: pieColor,
				scaleColor: false,
				lineCap: pieLineCap,
				lineWidth: lineSize,
				animate: 1500,
				size: chartSize
			});
		},
		progressBars: function(){
			var selector = '.eut-progress-bar';
			$(selector).each(function() {
				$(this).appear(function() {

					var val         = $(this).attr('data-value'),
						percentage  = $('<span class="eut-percentage">'+ val + '%'+'</span>');

					$(this).find('.eut-bar-line').animate({ width: val + '%' }, 1600);
					if( $(this).parent().hasClass('eut-style-1') ) {
						percentage.appendTo($(this).find('.eut-bar')).animate({ left: val + '%' }, 1600);
					} else {
						percentage.appendTo($(this).find('.eut-bar-title'));
					}

				});
			});
		},
		counter: function(){
			if( bodyLoader === true ){
				return;
			}
			var selector = '.eut-counter-item span';
			$(selector).each(function(i){
				var elements = $(selector)[i],
					thousandsSeparator = $(this).attr('data-thousands-separator') !== '' ? $(this).attr('data-thousands-separator') : ',';
				$(elements).attr('id','eut-counter-' + i );
				var delay = $(this).parents('.eut-counter').attr('data-delay') !== '' ? parseInt( $(this).parents('.eut-counter').attr('data-delay') ) : 200,
					options = {
						useEasing    : true,
						useGrouping  : true,
						separator    : $(this).attr('data-thousands-separator-vis') !== 'yes' ? thousandsSeparator : '',
						decimal      : $(this).attr('data-decimal-separator') !== '' ? $(this).attr('data-decimal-separator') : '.',
						prefix       : $(this).attr('data-prefix') !== '' ? $(this).attr('data-prefix') : '',
						suffix       : $(this).attr('data-suffix') !== '' ? $(this).attr('data-suffix') : ''
					},
					counter = new CountUp( $(this).attr('id') , $(this).attr('data-start-val'), $(this).attr('data-end-val'), $(this).attr('data-decimal-points'), 2.5, options);
				$(this).appear(function() {
					setTimeout(function () {
						counter.start();
					}, delay);
				});
			});
		},
		slider: function( settings ){

			var $element = $('#eut-main-content .eut-slider');

				$element.each(function(){
					var $that = $(this),
						carouselSettings = {
						sliderSpeed     : ( parseInt( $that.attr('data-slider-speed') ) ) ? parseInt( $that.attr('data-slider-speed') ) : 3000,
						paginationSpeed : ( parseInt( $that.attr('data-pagination-speed') ) ) ? parseInt( $that.attr('data-pagination-speed') ) : 400,
						autoHeight      : $that.attr('data-slider-autoheight') == 'yes' ? true : false,
						sliderPause     : $that.attr('data-slider-pause') == 'yes' ? true : false,
						autoPlay        : $that.attr('data-slider-autoplay') != 'no' ? true : false,
						baseClass       : 'eut-carousel',
						pagination      : $that.attr('data-slider-pagination') == 'yes' ? true : false,
					};

					carouselInit( $that, carouselSettings );
					customNav( $that );

				});

			// Init Slider
			function carouselInit( element, settings ){
				element.owlCarousel({
					navigation      : false,
					pagination      : settings.pagination,
					autoHeight      : settings.autoHeight,
					slideSpeed      : settings.paginationSpeed,
					paginationSpeed : settings.paginationSpeed,
					singleItem      : true,
					autoPlay        : settings.autoPlay,
					stopOnHover     : settings.sliderPause,
					baseClass       : 'owl-carousel',
					theme           : 'eut-theme'
				});
				// Carousel Element Speed
				if( settings.autoPlay == true ){
					element.trigger( 'owl.play', settings.sliderSpeed );
				}

				$element.css('visibility','visible');

				// Slider Navigation
				function customNav( element ){
					element.parent().find('.eut-carousel-next').click(function(){
						element.trigger('owl.next');
					});
					element.parent().find('.eut-carousel-prev').click(function(){
						element.trigger('owl.prev');
					});
				}
			}

			function customNav( element ){
				// Carousel Navigation
				element.parent().find('.eut-carousel-next').click(function(){
					element.trigger('owl.next');
				});
				element.parent().find('.eut-carousel-prev').click(function(){
					element.trigger('owl.prev');
				});
			}
		},
		testimonial: function(){

			var $testimonial = $('.eut-testimonial');

			$testimonial.each(function(){
				var $that = $(this),
					carouselSettings = {
						sliderSpeed : ( parseInt( $that.attr('data-slider-speed') ) ) ? parseInt( $that.attr('data-slider-speed') ) : 3000,
						paginationSpeed : ( parseInt( $that.attr('data-pagination-speed') ) ) ? parseInt( $that.attr('data-pagination-speed') ) : 400,
						pagination      : $that.attr('data-pagination') != 'no' ? true : false,
						autoHeight  : $that.attr('data-slider-autoheight') == 'yes' ? true : '',
						sliderPause : $that.attr('data-slider-pause') == 'yes' ? true : false,
						autoPlay    : $that.attr('data-slider-autoplay') != 'no' ? true : false,
						itemNum     : parseInt( $that.attr('data-items')),
						baseClass   : 'eut-testimonial'
					};

				carouselInit( $that, carouselSettings );

			});
			// Init Carousel
			function carouselInit( $element, settings ){
				$element.owlCarousel({
					navigation        : false,
					pagination        : settings.pagination,
					autoHeight        : settings.autoHeight,
					slideSpeed        : 400,
					paginationSpeed   : settings.paginationSpeed,
					singleItem        : true,
					autoPlay          : settings.autoPlay,
					stopOnHover       : settings.sliderPause,
					baseClass         : 'eut-testimonial-element',
					theme             : '',
				});

				// Carousel Element Speed
				if( settings.autoPlay === true ){
					$element.trigger('owl.play',settings.sliderSpeed);
				}
				$element.css('visibility','visible');
			}
		},
		flexibleCarousel: function(){

			var $flexibleCarousel = $('.eut-flexible-carousel');

			$flexibleCarousel.each(function(){
				var $that = $(this),
					carouselSettings = {
						sliderSpeed      : ( parseInt( $that.attr('data-slider-speed') ) ) ? parseInt( $that.attr('data-slider-speed') ) : 3000,
						paginationSpeed  : ( parseInt( $that.attr('data-pagination-speed') ) ) ? parseInt( $that.attr('data-pagination-speed') ) : 400,
						pagination       : $that.attr('data-pagination') != 'no' ? true : false,
						autoHeight       : $that.attr('data-slider-autoheight') == 'yes' ? true : '',
						sliderPause      : $that.attr('data-slider-pause') == 'yes' ? true : false,
						autoPlay         : $that.attr('data-slider-autoplay') != 'no' ? true : false,
						itemNum          : parseInt( $that.attr('data-items')),
						itemTabletL      : parseInt( $that.attr('data-tablet-landscape-items')),
						itemTabletP      : parseInt( $that.attr('data-tablet-portrait-items')),
						itemMobile       : parseInt( $that.attr('data-mobile-items')),
						baseClass        : 'eut-flexible-carousel'
					};

				carouselInit( $that, carouselSettings );
				customNav( $that );

			});
			// Init Carousel
			function carouselInit( $element, settings ){
				$element.owlCarousel({
					navigation        : false,
					pagination        : settings.pagination,
					autoHeight        : settings.autoHeight,
					slideSpeed        : 400,
					paginationSpeed   : settings.paginationSpeed,
					autoPlay          : settings.autoPlay,
					stopOnHover       : settings.sliderPause,
					baseClass         : 'eut-carousel-element',
					theme             : '',
					itemsCustom       : [[0, settings.itemMobile], [700, settings.itemTabletP], [1024, settings.itemTabletL], [1200, settings.itemNum]]
				});

				// Carousel Element Speed
				if( settings.autoPlay === true ){
					$element.trigger('owl.play',settings.sliderSpeed);
				}
				$element.css('visibility','visible');
			}

			// Carousel Navigation
			function customNav( $element ){
				$element.parent().find('.eut-carousel-next').click(function(){
					$element.trigger('owl.next');
				});
				$element.parent().find('.eut-carousel-prev').click(function(){
					$element.trigger('owl.prev');
				});
			}
		},
		carousel: function(){

			var $carousel = $('.eut-carousel');

			$carousel.each(function(){
				var $that = $(this),
					carouselSettings = {
						sliderSpeed : ( parseInt( $that.attr('data-slider-speed') ) ) ? parseInt( $that.attr('data-slider-speed') ) : 3000,
						paginationSpeed : ( parseInt( $that.attr('data-pagination-speed') ) ) ? parseInt( $that.attr('data-pagination-speed') ) : 400,
						pagination      : $that.attr('data-pagination') == 'yes' ? true : false,
						autoHeight  : $that.attr('data-slider-autoheight') == 'yes' ? true : '',
						sliderPause : $that.attr('data-slider-pause') == 'yes' ? true : false,
						autoPlay    : $that.attr('data-slider-autoplay') != 'no' ? true : false,
						itemNum     : parseInt( $that.attr('data-items')),
						itemsTablet : [768,2],
						baseClass   : 'eut-carousel',
						gap         : $that.parent().hasClass('eut-with-gap') && !isNaN( $that.data('gutter-size') ) ? Math.abs( $that.data('gutter-size') )/2 : 0,
					};

				carouselInit( $that, carouselSettings );
				customNav( $that );

			});
			// Init Carousel
			function carouselInit( $element, settings ){

				$element.css({ 'margin-left' : - settings.gap, 'margin-right' : - settings.gap });

				$element.owlCarousel({
					navigation        : false,
					pagination        : settings.pagination,
					autoHeight        : settings.autoHeight,
					slideSpeed        : 400,
					paginationSpeed   : settings.paginationSpeed,
					singleItem        : false,
					items             : settings.itemNum,
					autoPlay          : settings.autoPlay,
					stopOnHover       : settings.sliderPause,
					baseClass         : 'eut-carousel-element',
					theme             : '',
					itemsDesktop      : false,
					itemsDesktopSmall : false,
					itemsTablet       : settings.itemsTablet
				});

				// Carousel Element Speed
				if( settings.autoPlay === true ){
					$element.trigger('owl.play',settings.sliderSpeed);
				}
				$element.css('visibility','visible');
				$element.find('.owl-item').css({ 'padding-left' : settings.gap, 'padding-right' : settings.gap });
			}

			// Carousel Navigation
			function customNav( $element ){
				$element.parent().find('.eut-carousel-next').click(function(){
					$element.trigger('owl.next');
				});
				$element.parent().find('.eut-carousel-prev').click(function(){
					$element.trigger('owl.prev');
				});
			}
		},
		advancedPromo: function(){
			var $item = $('.eut-expandable-info');
			$item.each(function(){
				var $that         = $(this),
					$wrapper      = $that.parents('.eut-section'),
					$content      = $that.find('.eut-expandable-info-content'),
					paddingTop    = parseInt( $wrapper.css('padding-top') ),
					paddingBottom = parseInt( $wrapper.css('padding-bottom') );

				$wrapper.addClass('eut-pointer-cursor');
				$wrapper.on('click',function(){

					var headerHeight   = $('#eut-header').data('sticky') != 'none' ? $('#eut-main-header').outerHeight() : 0,
						fieldBarHeight = $('.eut-fields-bar').length ? $('.eut-fields-bar').outerHeight() : 0,
						offset         = $(this).offset().top,
						distance       = offset - ( headerHeight + fieldBarHeight );

					if( $content.is(":visible") ){
						$content.slideUp( 600, function(){
							$content.removeClass('show');
						});
					} else {

						$('html,body').animate({
							scrollTop: distance
						}, 600,function(){
							$content.slideDown( function(){
								$content.addClass('show');
								return;
							});
						});
					}
				});
				$wrapper.mouseenter(function() {
					$(this).css({ 'padding-top' : paddingTop + 40, 'padding-bottom' : paddingBottom + 40 });
				});
				$wrapper.mouseleave(function() {
					$(this).css({ 'padding-top' : paddingTop, 'padding-bottom' : paddingBottom });
				});
			});
		},
		imageText: function(){
			var $el = $('.eut-image-text');
			if( !$el.length > 0 ) return;
			$el.each(function(){
				var $that = $(this),
					$img = $that.find('img'),
					$cont = $that.find('.eut-content');
				$img.css({ 'padding-top' : '', 'padding-bottom' : '' });
				$cont.css({ 'padding-top' : '', 'padding-bottom' : '' });
				$that.css('visibility','hidden');
				$img.imagesLoaded( function() {
					var imgHeight = $img.height(),
						contHeight = $cont.height(),
						space = parseInt( (imgHeight - contHeight)/2 );
					if( $(window).width() + scrollBarWidth >= mobileScreen ) {
						if( imgHeight < contHeight ){
							space = parseInt( (contHeight - imgHeight)/2 );
							$img.css({ 'padding-top' : space, 'padding-bottom' : space });
						} else {
							$cont.css({ 'padding-top' : space, 'padding-bottom' : space });
						}
					}
					$that.css('visibility','visible');
				});

			});
		},
		iconBox: function(){
			var $parent   = $('.eut-row'),
				arrHeight = [];

			$parent.each(function(){
				var $iconBox  = $(this).find('.eut-box-icon.eut-advanced-hover');
				if( !$iconBox.length ) return;

				if( isMobile.any() ) {
					$iconBox.removeClass('eut-advanced-hover');
					return;
				}

				$iconBox.css({ 'height' : '', 'padding-top' : '' });
				$iconBox.each(function(){
					var $that          = $(this),
						$iconBoxHeigth = $that.height();

					arrHeight.push( $iconBoxHeigth );
				});

				var maxHeight   = Math.max.apply(Math,arrHeight) + 20,
					iconHeight  = $iconBox.find('.eut-wrapper-icon').height(),
					paddingTop  = ( maxHeight - iconHeight )/2;

				$iconBox.css({ 'height' : maxHeight, 'padding-top' : paddingTop });
				setTimeout(function() {
					$iconBox.addClass('active');
					// Fix Columns Height
					EUTHEM.setColumnHeight.init();
				}, 300);

				$iconBox.unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
					$(this).toggleClass('hover');
				});

			});
		},
		messageBox: function(){
			var infoMessage = $('.eut-message'),
			closeBtn = infoMessage.find($('.eut-close'));
			closeBtn.click(function () {
				$(this).parent().slideUp(150);
			});
		},
		wooProduct: function(){
			var $item   = $('.eut-product-item'),
				$addBtn = $item.find('.add_to_cart_button');
			$addBtn.on('click',function(){
				$(this).parents('.eut-product-switcher').addClass('product-added');
			});
		},
		wooProductZoom: function(){
			if( !isMobile.any() ){
				var $easyzoom = $('.easyzoom').easyZoom();
			}
		},
		animAppear: function(){
			if( bodyLoader === true ){
				return;
			}
			if(isMobile.any()) {
				$('.eut-animated-item').css('opacity',1);
			} else {
				$('.eut-animated-item').each(function() {
					var timeDelay = $(this).attr('data-delay');
					$(this).appear(function() {
					var $that = $(this);
						setTimeout(function () {
							$that.addClass('eut-animated');
						}, timeDelay);
					},{accX: 0, accY: -150});
				});
			}
		},
		vcAccordion: function(){
			var $target = $('.vc_tta-accordion').find('a[data-vc-accordion]'),
				$panel = $('.vc_tta-panel');
			if( $panel.find('.eut-isotope').length ) {
				setTimeout(function(){
					EUTHEM.isotope.init();
				},100);
			}
			$target.on('click',function(){
				if( $panel.find('.eut-isotope').length ) {
					setTimeout(function(){
						EUTHEM.isotope.init();
					},100);
				}
			});
		},
		vcTab: function(){
			var $target = $('.vc_tta-tabs').find('a[data-vc-tabs]'),
				$panel = $('.vc_tta-panel');
			if( $panel.find('.eut-isotope').length ) {
				setTimeout(function(){
					EUTHEM.isotope.init();
				},100);
			}
			$target.on('click',function(){
				if( $panel.find('.eut-isotope').length ) {
					setTimeout(function(){
						EUTHEM.isotope.init();
					},100);
				}
			});
		},
		productSocials: function(){
			var $socials = $('.eut-product-social'),
				$item    = $socials.find('li');
			if( !$socials.length ) return;

			$socials.appear(function() {
				$item.each(function(i,n){
					var $this = $(this);
					setTimeout(function(){
						$this.addClass('animated');
					},150 * i);
				});
			},{accX: 0, accY: -50});
		},
		countdown: function(){
			$('.eut-countdown').each(function() {
				var $this        = $(this),
					finalDate    = $this.data('countdown'),
					numbersSize  = $this.data('numbers-size'),
					textSize     = $this.data('text-size'),
					numbersColor = $this.data('numbers-color'),
					textColor    = $this.data('text-color'),
					countdownItems = '',
					text = '',
					countdownFormat = $this.data('countdown-format').split('|');

				$.each( countdownFormat, function( index, value ) {
					switch (value) {
						case 'w':
							text = anemos_eutf_main_data.string_weeks;
							break;
						case 'D':
						case 'd':
						case 'n':
							text = anemos_eutf_main_data.string_days;
							break;
						case 'H':
							text = anemos_eutf_main_data.string_hours;
							break;
						case 'M':
							text = anemos_eutf_main_data.string_minutes;
							break;
						case 'S':
							text = anemos_eutf_main_data.string_seconds;
							break;
						default:
							text = '';
					}
					countdownItems += '<div class="eut-countdown-item">'
					countdownItems += '<div class="eut-number eut-' + numbersSize + ' eut-text-' + numbersColor + '">%' + value + '</div>';
					countdownItems += '<span class="eut-' + textSize + ' eut-text-' + textColor + '">' + text + '</span>';
					countdownItems += '</div>';

				});

				$this.countdown(finalDate, function(event) {
					$this = $(this).html(event.strftime( countdownItems ));
				});
			});
		}
	}

	// # Parallax Section
	// ============================================================================= //
	EUTHEM.parallaxSection = {
		init : function( section ){
			var $section = $(section);
			$section.each(function(){
				var $element = $(this),
					$parallaxEl = $element.find('.eut-bg-image');
				if(!$parallaxEl.length){
					return false;
				}
				EUTHEM.parallaxSection.setup($element,$parallaxEl);
			});
		},
		setup : function($element,$parallaxEl){
			var threshold    = $element.data('parallax-sensor') !== undefined ? $element.data('parallax-sensor') : 350,
				parallaxType = paralType();

			var sectionH     = $element.outerHeight(),
				sectionW     = $element.outerWidth(),
				windowH      = $(window).height(),
				windowW      = $(window).width(),
				sectionT     = $element.offset().top,
				paralSpeed   = speed(),
				windowScroll,
				transform,
				translate;

			var	scrolling = false,
				parallaxAnim = false,
				resizing = false;

			elementSize();
			checkParallax();
			$(window).on('scroll', checkParallax);

			if( !isMobile.any() ) {
				$(window).smartresize(resetScroll);
			} else {
				setTimeout(function(){
					$(window).on("orientationchange",resetScroll);
				},100);
			}
			function paralType(){
				var type = 'vertical';
				if( $element.hasClass('eut-horizontal-parallax-lr') ) {
					type = 'horizontalLr';
				}
				if( $element.hasClass('eut-horizontal-parallax-rl') ) {
					type = 'horizontalRl';
				}
				return type;
			}
			function elementSize(){
				if( parallaxType === 'horizontalLr' || parallaxType === 'horizontalRl' ){
					$parallaxEl.css({ 'width' : sectionW + threshold });
				} else {
					$parallaxEl.css({ 'height' : sectionH + threshold });
				}
			}
			function speed(){
				return ( windowH + sectionH ) / threshold;
			}
			function checkParallax(){
				if( !parallaxAnim ) {
					parallaxAnim = true;
					(!window.requestAnimationFrame) ? setTimeout(update, 300) : window.requestAnimationFrame(update);
				}
			}
			function resetScroll(){
				if( !resizing ) {
					resizing = true;
					(!window.requestAnimationFrame) ? setTimeout(updateParams, 300) : window.requestAnimationFrame(updateParams);
				}
			}

			function updateParams(){
				resetParams();

				setTimeout(function(){
					sectionH     = $element.outerHeight();
					sectionW     = $element.outerWidth();
					windowH      = $(window).height();
					windowW      = $(window).width();
					sectionT     = $element.offset().top;
					paralSpeed   = speed();

					elementSize();
					checkParallax();

					resizing = false;
				},100);
			}

			function resetParams(){
				$parallaxEl.css({
					'width' : '',
					'height' : '',
					'-webkit-transform' : 'translate3d(0px, 0px, 0px) translateZ(0)',
					'-moz-transform'    : 'translate3d(0px, 0px, 0px) translateZ(0)',
					'-ms-transform'     : 'translate3d(0px, 0px, 0px) translateZ(0)',
					'-o-transform'      : 'translate3d(0px, 0px, 0px) translateZ(0)',
					'transform'         : 'translate3d(0px, 0px, 0px) translateZ(0)'
				});
			}

			function update(){
				windowScroll = $(window).scrollTop();
				if(  sectionT - windowScroll <= windowH && sectionT - windowScroll + windowH >= windowH - sectionH  ) {
					translate = ( windowScroll + windowH - sectionT )/paralSpeed;
				} else {
					translate = 0;
				}
				if( parallaxType === 'horizontalLr' ){
					horizontalLr();
				} else if( parallaxType === 'horizontalRl' ){
					horizontalRl();
				} else {
					vertical();
				}

				parallaxAnim = false;
			}
			function vertical(){
				transform = 'translate3d(0px,' + (- translate) + 'px, 0px) translateZ(0)';
				$parallaxEl.css(doTranslate(transform));
			}
			function horizontalLr(){
				transform = 'translate3d(' +  -(threshold - translate) + 'px, 0px, 0px) translateZ(0)';
				$parallaxEl.css(doTranslate(transform));
			}
			function horizontalRl(){
				transform = 'translate3d(' +  (- translate) + 'px, 0px, 0px) translateZ(0)';
				$parallaxEl.css(doTranslate(transform));
			}
			function doTranslate(value){
				return {
					'-webkit-transform' : transform,
					'-moz-transform'    : transform,
					'-ms-transform'     : transform,
					'-o-transform'      : transform,
					'transform'         : transform
				};
			}
		}
	};

	// # Set Equal Columns Height
	// ============================================================================= //
	EUTHEM.setColumnHeight = {
		init: function(){
			// cache jQuery objects
			var $section = $('.eut-section');

			$section.each(function(){
				var $this = $(this),
					equalCol = $this.hasClass('eut-equal-column') ? true : false,
					middleCon = $this.hasClass('eut-middle-content') ? true : false,
					fullHeight = $this.hasClass('eut-fullheight') ? true : false,
					$column = $this.find('.eut-column'),
					$columnWrapper = $column.find('.eut-column-wrapper'),
					$container = $this.find('.eut-container'),
					columnL = $column.length;

				// initialize variables
				var resizing = false,
					setHeight = false,
					showColumn = false,
					windowHeight,
					sectionHeight,
					containerHeight,
					space,
					columnMaxH;

				if (equalCol || middleCon) {
					resetHeight();
					if( !isMobile.any() ) {
						$(window).smartresize(resetHeight);
					} else {
						$(window).on('orientationchange', resetHeight);
					}

				} else if( fullHeight ){
					resetSectionHeight();
					if( !isMobile.any() ) {
						$(window).smartresize(resetSectionHeight);
					} else {
						$(window).on('orientationchange', resetSectionHeight);
					}
				} else {
					return;
				}

				function resetHeight() {
					if (!resizing) {
						resizing = true;
						columnMaxH = 0;
						$columnWrapper.css({
							'height': ''
						});
						updateParams();
					}
				}

				function updateParams() {
					$column.each(function(i, n) {
						var $this = $(this);

						$this.imagesLoaded('always',function(){
							var columnH = $this.height();
							columnMaxH = columnH > columnMaxH ? columnH : columnMaxH;
							if (i == 0) {
								showColumn = true;
							}
							setEqualHeight();
						});
					});
				}

				function setEqualHeight() {
					var visibility = showColumn ? 'visible' : 'hidden';
					$columnWrapper.css({
						'height': columnMaxH,
						'visibility' : visibility
					});
					if (middleCon) {
						$column.addClass('eut-middle');

					}
					resizing = false;

					if( fullHeight ) {
						resetSectionHeight();
					}
				}

				function resetSectionHeight() {
					if (!resizing) {
						resizing = true;
						$container.css({
							'padding-top' : '',
							'padding-bottom' : ''
						});

						updateSectionParams();
					}
				}

				function updateSectionParams() {
					windowHeight = $(window).height();

					$this.imagesLoaded('always',function(){
						sectionHeight = $this.height();
						containerHeight = $container.outerHeight();
						space = (sectionHeight - containerHeight)/2;
						setSectionHeight();
					});

				}

				function setSectionHeight() {
					if(containerHeight < windowHeight){
						$container.css({
							'visibility': 'visible',
							'padding-top' : space,
							'padding-bottom' : space
						});
					} else {
						$container.css({
							'visibility': 'visible'
						});
					}

					// Resize Video
					if( $section.find('.eut-bg-video').length ) {
						EUTHEM.resizeVideo.init( $section.find('.eut-background-wrapper') );
					}
					resizing = false;
				}
			});
		}
	};

	// # Section Settings
	// ============================================================================= //
	EUTHEM.sectionSettings = {
		init: function(){

			if( !$('#eut-sidebar').length > 0 ) return;

			var section      = '#eut-content .eut-section',
				windowWidth  = $(window).width(),
				themeWidth   = $('#eut-theme-wrapper').width(),
				wrapperWidth = $('.eut-content-wrapper').width(),
				contentWidth = $('#eut-main-content').width(),
				sidebarWidth = $('#eut-sidebar').outerWidth(),
				space        = (themeWidth - wrapperWidth)/2,
				sidebarSpace = space + wrapperWidth - contentWidth;


			$(section).each(function(){
				var $section = $(this);
				if( $section.hasClass('eut-fullwidth-background') ){
					fullBg($section);
				}
				if( $section.hasClass('eut-fullwidth') ){
					fullElement($section);
				}

			});

			function fullBg( section ) {
				if( windowWidth + scrollBarWidth >= tabletPortrait ) {
					if( $('.eut-right-sidebar').length ) {
						section.css({ 'visibility': 'visible', 'padding-left':space, 'padding-right': sidebarSpace, 'margin-left': -space, 'margin-right': -sidebarSpace});
					}
					else {
						section.css({ 'visibility': 'visible', 'padding-left':sidebarSpace, 'padding-right': space, 'margin-left': -sidebarSpace, 'margin-right': -space});
					}
				} else {
					section.css({ 'visibility': 'visible', 'padding-left':'', 'padding-right': '', 'margin-left': '', 'margin-right': ''});
				}

			}

			function fullElement( section ) {
				if( windowWidth + scrollBarWidth >= tabletPortrait ) {
					if( $('.eut-right-sidebar').length ) {
						section.css({ 'visibility': 'visible', 'padding-left':0, 'padding-right': sidebarSpace, 'margin-left': -space, 'margin-right': -sidebarSpace});
					}
					else {
						section.css({ 'visibility': 'visible', 'padding-left':sidebarSpace, 'padding-right': 0, 'margin-left': -sidebarSpace, 'margin-right': -space});
					}
				} else {
					section.css({ 'visibility': 'visible', 'padding-left':'', 'padding-right': '', 'margin-left': '', 'margin-right': ''});
				}
			}
		}
	};

	// # Isotope
	// ============================================================================= //
	EUTHEM.isotope = {

		init: function(){
			var $selector = $('.eut-isotope');
			$selector.each(function(){
				var $this = $(this),
					$container   = $this.find('.eut-isotope-container'),
					$curCategory = $this.find('.eut-current-category'),
					dataSpinner  = $this.data('spinner');

				// Set Item Size
				itemSize( $this, $container, initIsotope );
				// Filters
				filter( $this, $container );
				// Add Spinner
				if( dataSpinner == 'yes' ) {
					addSpinner( $this );
				}

			});

			function filter( $this, $container ){
				$this.find('.eut-filter li').click(function(){
					var $filter      = $(this),
						selector     = $filter.attr('data-filter'),
						title        = $filter.html(),
						$curCategory = $this.find('.eut-current-category');

					if( $curCategory.length > 0 ){
						$curCategory.find('span').html( title );
					}

					$container.isotope({
						filter: selector
					});

					// Go tot top
					filterGoToTop( $filter )

					$(this).addClass('selected').siblings().removeClass('selected');
				});
			}

			function filterGoToTop( filter ){
				var $this = filter,
					filterTop    = $this.offset().top,
					headerHeight = $('#eut-header').data('sticky') != 'none' ? $('#eut-main-header').outerHeight() : 0,
					topBarHeight = $('#eut-top-bar').length ? $('#eut-top-bar').height() : 0,
					offset       = topBarHeight + wpBarHeight + headerHeight + 50;
				if( filterTop > 0 ){
					$('html, body').delay(300).animate({
						scrollTop: filterTop - offset
					}, 900, 'easeInOutCubic');
					return false;
				}
			}

			function column( el ){
				var windowWidth = $(window).width() + scrollBarWidth,
					$element    = el,
					columns     = {
						largeS   : $element.data('columns-large-screen'),
						desktop  : $element.data('columns'),
						tabletL  : $element.data('columns-tablet-landscape'),
						tabletP  : $element.data('columns-tablet-portrait'),
						mobille  : $element.data('columns-mobile')
					};

				if ( windowWidth > largeScreen ) {
					columns = columns.largeS;
				} else if ( windowWidth > tabletLandscape && windowWidth < largeScreen ) {
					columns = columns.desktop;
				} else if ( windowWidth > tabletPortrait && windowWidth < tabletLandscape ) {
					columns = columns.tabletL;
				} else if ( windowWidth > mobileScreen && windowWidth < tabletPortrait ) {
					columns = columns.tabletP;
				} else {
					columns = columns.mobille;
				}
				return columns;
			}

			function itemSize( el, $container, callback ){
				var wrapperW     = el.innerWidth(),
					gap          = el.hasClass('eut-with-gap') && !isNaN( el.data('gutter-size') ) ? Math.abs( el.data('gutter-size') )/2 : 0,
					$isotopItem  = $container.find('.eut-isotope-item'),
					$slider      = $isotopItem.find('.eut-slider');

				var columns      = column( el ),
					offset       = el.parents('.eut-section').hasClass('eut-fullwidth') ? -(gap * 2) : gap * 2,
					columnW      = ( wrapperW + offset ) / columns,
					columnW      = (columnW % 1 !== 0) ? Math.ceil(columnW) : columnW,
					containerW   = columnW * columns;

				$container.css({'margin-left' : - gap, 'margin-right' : - gap, 'width' : containerW });
				$isotopItem.css({ 'padding-left' : gap, 'padding-right' : gap, 'margin-bottom' : gap*2, 'width' : columnW });

				if( el.hasClass('eut-with-gap') && $container.parents('.eut-section').hasClass('eut-fullwidth') ) {
					el.css({'padding-left' : gap*2, 'padding-right' : gap*2 });
				}

				// Item Width * 2
				if( columns != 1 ) {
					$container.find('.eut-image-large-square').css({ 'width': columnW * 2 });
					$container.find('.eut-image-square').css({ 'width': columnW }).find('.eut-media').css({ 'height': columnW - ( gap * 2 ) });
					$container.find('.eut-image-landscape').css({ 'width': columnW * 2 }).find('.eut-media').css({ 'height': columnW - ( gap * 2 ) });
					$container.find('.eut-image-portrait').css({ 'width': columnW }).find('.eut-media').css({ 'height': ( columnW * 2 ) - ( gap * 2 ) });
				}

				// Item Column 2
				if( columns == 2 ) {
					$container.find('.eut-image-large-square').css({ 'width': columnW * 2 });
					$container.find('.eut-image-landscape').css({ 'width': columnW  }).find('.eut-media').css({ 'height': ( columnW / 2 ) - ( gap * 2 ) });
					$container.find('.eut-image-portrait').css({ 'width': columnW }).find('.eut-media').css({ 'height': ( columnW * 2 ) - ( gap * 2 ) });
				}

				// Item Column 1
				if( columns == 1 ) {
					$container.find('.eut-image-large-square').css({ 'width': columnW });
					$container.find('.eut-image-landscape').css({ 'width': columnW  }).find('.eut-media').css({ 'height': columnW });
					$container.find('.eut-image-portrait').css({ 'width': columnW }).find('.eut-media').css({ 'height': columnW });
				}

				if(callback) callback( el, $container );

			}

			function initIsotope( el, $container ){
				var layout = el.data('layout') !== '' ? el.data('layout') : 'fitRows',
					$slider = el.find('.eut-slider');

				$container.imagesLoaded( function() {
					$container.isotope({
						resizable: true,
						itemSelector: '.eut-isotope-item',
						layoutMode: layout,
						animationEngine : 'jquery'
					});
					relayout($container);

					// Spinner
					var dataSpinner = $container.parent().data('spinner');
					if( dataSpinner == 'yes' ) {
						setTimeout(function() {
							removeSpinner( $container );
						},2000);
					} else {
						$container.css({'opacity': 1});
						// Isotope Animation
						if( !isMobile.any() ){
							animation($container);
						} else {
							$container.find('.eut-isotope-item-inner').addClass('eut-animated');
						}
					}

					// Init Slider Again
					$slider.each(function(){
						var $that     = $(this),
							owlSlider = $that.data('owlCarousel');
						owlSlider.reinit();
					});

					// Equal Columns
					if( layout === 'fitRows' ) {
						gridEqualColumns($container);
					}

					setTimeout( function(){
						relayout($container);
						// Fix Columns Height
						EUTHEM.setColumnHeight.init();
						EUTHEM.pageSettings.socialAnimation();
					}, 300 );

					$(window).smartresize(function(){
						itemSize( el, $container );

						// Equal Columns
						if( layout === 'fitRows' ) {
							gridEqualColumns($container);
						}

						relayout($container);
					});

					// Auto Headings Resize
					if( layout == 'masonry' && el.hasClass('eut-auto-headings') ){
						EUTHEM.autoHeadingSize.init( '.eut-auto-headings' , '.eut-isotope-item', '.eut-title', '.eut-caption' );
					}

				});
			}

			function gridEqualColumns($container){
				var $elContent = $container.find('.eut-isotope-item:not(.format-link):not(.format-quote)'),
					columnMaxH = 0;

				// Reset Height
				$container.find('.eut-isotope-item .eut-post-content').css('height','auto');
				$container.find('.eut-isotope-item .eut-blog-item-inner').css('height','auto');
				$container.find('.eut-isotope-item .eut-post-meta-wrapper').removeClass('eut-bottom');

				$elContent.filter('.has-post-thumbnail').each(function(){
					($(this).find('.eut-blog-item-inner').outerHeight(true) > columnMaxH) ? columnMaxH = $(this).find('.eut-blog-item-inner').outerHeight(true) : columnMaxH = columnMaxH;
				});

				if( !$container.find('.has-post-thumbnail').length ) {
					($container.find('.eut-blog-item-inner').outerHeight(true) > columnMaxH) ? columnMaxH = $container.find('.eut-blog-item-inner').outerHeight(true) : columnMaxH = columnMaxH;
				}

				$container.find('.eut-isotope-item .eut-blog-item-inner').css('height',columnMaxH);
				$container.find('.eut-isotope-item .eut-post-meta-wrapper').addClass('eut-bottom');
				$container.find('.eut-isotope-item.eut-style-2').addClass('eut-middle');


			}

			function relayout($container){
				$container.isotope('layout');
			}

			function animation($container){
				var cnt = 1,
					itemAppeared = 1;
				$container.find('.eut-isotope-item').appear(function() {
					var $this = $(this),
						delay = 200 * cnt++;

					setTimeout(function () {
						itemAppeared++;
						if( itemAppeared == cnt ){
							cnt = 1;
						}
						$this.find('.eut-isotope-item-inner').addClass('eut-animated');
					}, delay);
				});
			}

			function addSpinner(el){
				var $spinner = $('<div class="eut-loader"></div>');
				$spinner.appendTo( el );
			}

			function removeSpinner($container){
				$container.parent().find('.eut-loader').fadeOut(600,function(){
					$container.css({'opacity': 1});
					animation($container);
				});
			}

		},
		noIsoFilters: function() {
			var $selector = $('.eut-non-isotope');
			$selector.each(function(){
				var $that = $(this);
				$that.find('.eut-filter li').click(function(){
					var selector = $(this).attr('data-filter');
					if ( '*' == selector ) {
						$that.find('.eut-non-isotope-item').fadeIn('1000');
					} else {
						$that.find('.eut-non-isotope-item').hide();
						$that.find(selector).fadeIn('1000');
					}
					$(this).addClass('selected').siblings().removeClass('selected');
				});
			});
		}
	};

	// # Portfolio Auto Resize Headings
	// ============================================================================= //
	EUTHEM.autoHeadingSize = {
		init : function( container, item, title, caption ){
			var $item = $(container).find( item ),
				$heading = $(container).find( title ),
				headingSize = parseInt( $heading.css('font-size') ),
				compressor = 20,
				itemLength = $item.length;

			updateParam();
			$(window).smartresize(function(){
				resetSize( updateParam );
			});

			function updateParam(){
				for( var i=0; i < itemLength; i++){
					var el = $item[i],
						elSize = $(el).width();
					$(el).find(title).css({ 'font-size': elSize / compressor  + 'px', 'line-height' : '1.2' });
					$(el).find(caption).css({ 'font-size': Math.max(Math.min( (elSize / compressor)*0.4, elSize), 13 ) + 'px', 'line-height' : '1.2' });
				}
			}

			function resetSize(callback){
				$heading.attr('style', '');
				callback();
			}

		}
	};

	// # Social Bar For Post
	// ============================================================================= //
	EUTHEM.socialBar = {
		init : function(){
			var $bar = $('#eut-socials-bar');
			if( !$bar.length > 0 ) {
				return;
			}
			if( isMobile.any() ) {
				$bar.addClass('eut-no-animation');
				return;
			}
			var posTop       = $bar.offset().top,
				scroll       = $(window).scrollTop(),
				windowHeight = $(window).height(),
				offset       = ( $bar.offset().top - windowHeight ) + 50;

			if( scroll > offset ) {
				this.showSocials();
			} else {
				this.hideSocials();
			}
		},
		showSocials : function(){
			var $item = $('#eut-socials-bar').find('ul.eut-socials li a'),
				i = 0;
			$item.each(function(){
				var $that = $(this);
				i++;
				setTimeout(function () {
					$that.addClass('show');
				}, i * 200 );
			});
		},
		hideSocials : function(){
			var $item = $('#eut-socials-bar').find('ul.eut-socials li a');
			$item.removeClass('show');
		}
	};

	// # Related Post
	// ============================================================================= //
	EUTHEM.relatedPost = {

		item  : '.eut-related-item',
		quota : 0.5,

		init: function(){

			var item        = EUTHEM.relatedPost.item,
				quota       = EUTHEM.relatedPost.quota,
				$itemParent  = $(item).parent(),
				itemsLength = $(item).length;

			if( itemsLength == 1 ){
				$itemParent.addClass('eut-related-column-1');
				return;
			}
			if( itemsLength == 2 ){
				$itemParent.addClass('eut-related-column-2');
				quota = 0.7;
			}

			EUTHEM.relatedPost.itemWidth();
		},
		itemWidth: function(){
			var item = EUTHEM.relatedPost.item;
			$(item).each(function() {
				$(this).css( 'width', '' ).data('standardWidth', $(this).width());
			});
		}
	};

	// # Scroll Direction
	// ============================================================================= //
	EUTHEM.scrollDir = {
		init: function(){
			var scroll = $(window).scrollTop();
			if (scroll > lastScrollTop){
				lastScrollTop = scroll;
				return { direction : 'scrollDown'  }
			} else {
				lastScrollTop = scroll;
				return { direction : 'scrollUp'  }
			}

			lastScrollTop = scroll;
		}
	};

	// # Full Page
	// ============================================================================= //
	EUTHEM.fullPage = {
		init: function(){
			var $fPage = $('#eut-fullpage');
			if( !$fPage.length > 0 ) return;
				var $section = $fPage.find('.eut-section');
				var deviceNavigation = true;
				var deviceAutoScrolling = true;
				var deviceFullPageEnable = $fPage.data('device-scrolling') == 'yes' ? true : false;

				if( isMobile.any() && !deviceFullPageEnable ) {
					deviceNavigation = false;
					deviceAutoScrolling = false;
				}

				var navigationAnchorTooltips = $('[data-anchor-tooltip]').map(function(){
					return $(this).data('anchor-tooltip').toString();
				}).get();

			$fPage.fullpage({
				navigation: deviceNavigation,
				navigationPosition: 'right',
				navigationTooltips: navigationAnchorTooltips,
				sectionSelector: $section,
				css3: true,
				scrollingSpeed: 1000,
				autoScrolling : deviceAutoScrolling,
				lockAnchors : true,
				afterLoad: function(anchorLink, index){

					var sectionHeaderColor = $('[data-anchor="'+ anchorLink + '"]').attr('data-header-color');
					var color = 'eut-' + sectionHeaderColor;

					$section.find('.fp-tableCell').css('visibility','visible');

					// Set Header Color
					if( !$('#eut-main-header').hasClass('eut-header-side') ) {
						$('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
					}
					$('#fp-nav').removeClass('eut-light eut-dark').addClass(color);
				}
			});
		}
	};



	// # Global Variables
	// ============================================================================= //
	var bodyLoader = false;
	var largeScreen = 2048;
	var tabletLandscape = 1200;
	var tabletPortrait = 1023;
	var mobileScreen = 767;
	var lastScrollTop = 0;
	var wpBarHeight = $('#eut-body').hasClass('admin-bar') ? 32 : 0;
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	// # Scrollbar Width
	// ============================================================================= //
	var parent, child, scrollBarWidth;

	if( scrollBarWidth === undefined ) {
		parent          = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
		child           = parent.children();
		scrollBarWidth  = child.innerWidth()-child.height(99).innerWidth();
		parent.remove();
	};



	$(document).ready(function(){ EUTHEM.documentReady.init(); });
	$(window).smartresize(function(){ EUTHEM.documentResize.init(); });
	$(window).load(function(){ EUTHEM.documentLoad.init(); });
	$(window).on('scroll', function() { EUTHEM.documentScroll.init(); });
	

})(jQuery);