/*
Theme Name: PORTR
Author: CREATEBRILLIANCE - Media & Consulting
Author URI: http://www.createbrilliance.com
Version: 1.0
*/

var PORTR;

( function($) {"use strict";

PORTR = window.PORTR || {};

/****************************************************************************************************
 * NAVIGATION
 *
 *
 *
****************************************************************************************************/
PORTR.nav = function (option){
		//SIDE MENU


		/*add delay to li elemnts from menu
		 -NOT for mobile
		 * */
		if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
			var delay = 0;
			var factor = 0;
			var count = $("#sidebar-wrapper .sidebar-nav > li").size();
			var maxDelay = 1 /* last element appears after 1s */
			factor = maxDelay / count;
			delay = factor;
			$("#sidebar-wrapper .sidebar-nav > li > a").each(function() {
				$(this).css({
					"transition-delay" : delay + "s",
					"-webkit-transition-delay" : delay + "s",
					"-o-transition-delay" : delay + "s",
					"-moz-transition-delay" : delay + "s"
				});
				delay = delay + factor;
			});
		}
		//trigger function for menu
		$("#menu-toggle").bind("click touchstart", function(e) {
			e.preventDefault(); //stop instant closing
			if ($("#menu-toggle").hasClass("bt-menu-open")) {				
				closeMenu();				
			} else {				
				showMenu();
			}
		});
		
		//click the filter button and the menu opens and portfolio expands
		$(".trigger-menu-portfolio-filter").click(function(e) {
			e.stopPropagation();
			showMenu();
			//scroll to
			$.scrollTo($(this), 800, {easing:'easeOutExpo',axis:'y', offset:-50, onAfter: function(){//slide down
			$('.dropdown-toggle').dropdown('toggle');}} );
			
		});
			
		if(option == "touch"){
			//swipe		
			$("body").swipe({
				//Generic swipe handler for all directions
				swipe : function(event, direction, distance, duration, fingerCount) {
					//use direction right on your own risk. buggy when scrolling
					/*if(direction == "right"){ //open menu
						showMenu();
					}*/
					if(direction == "left"){ //close
						if ($("#menu-toggle").hasClass("bt-menu-open")) {
							closeMenu();
						}
					}
				},
				threshold : 75,
				allowPageScroll:"vertical"
			});
		}	
		
		
		function closeMenu(){
				$("#menu-toggle").removeClass("bt-menu-open").addClass("bt-menu-close");
				$("#sidebar-wrapper").removeClass("active");
				$("#portfolio").removeClass("bt-menu-open");				
				$(".slide-menu section").unbind("click");			
				$("body").removeClass("slide-menu");	
		}
		function showMenu(){
				$("#menu-toggle").removeClass("bt-menu-close").addClass("bt-menu-open");
				$("#sidebar-wrapper").addClass("active");
				$("#portfolio").addClass("bt-menu-open");
				$("body").addClass("slide-menu");
				
				//click handler for click outside = close menu
				//To prevent this for special elements handle them with e.stopPropagation()
				$(".slide-menu section").click(function(e){
						closeMenu();
				});
				//if search is clicked close the menu
				$("#sidebar-wrapper .search-trigger").click(function(){					
    				closeMenu();
				});
		}
		
		

		
		
		
}
/****************************************************************************************************
 * DROPDOWN
 *
 *
 *
****************************************************************************************************/
PORTR.dropdown = function(selector) {
				
	 // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
	  $(selector).on('show.bs.dropdown', function(e){
	    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
	  });
	
	  // ADD SLIDEUP ANIMATION TO DROPDOWN //
	  $(selector).on('hide.bs.dropdown', function(e){
	    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
	  });

}
/****************************************************************************************************
 * SCROLL TOP
 *
 *
 *
****************************************************************************************************/
PORTR.scrollTop = function() {

		var windowWidth = $(window).width(), didScroll = false;
		var $arrow = $('#back-to-top');
		$arrow.bind("click touchstart", function(e) {
			$('body,html').animate({
				scrollTop : "0"
			}, 750, 'easeOutExpo');
			e.preventDefault();
		})
		$(window).scroll(function() {
			didScroll = true;
		});
		setInterval(function() {
			if (didScroll) {
				didScroll = false;
				if ($(window).scrollTop() > 1000) {
					$arrow.css('display', 'block');
				} else {
					$arrow.css('display', 'none');
				}
			}
		}, 250);
}
/****************************************************************************************************
 * PRELOADER
 *
 *
 *
****************************************************************************************************/
PORTR.preloader = function() {

		$(window).load(function() {
			$('#preloader').fadeOut(800, function() {
				$('body').css('overflow', 'visible');
			});
		});
			
};
/****************************************************************************************************
 * ACCORDION
 * 
 *
 *
 *
****************************************************************************************************/
PORTR.accordion = function (selector){

	$(selector).on('hide.bs.collapse', toggleChevron);
	$(selector).on('show.bs.collapse', toggleChevron); 
	
	
	function toggleChevron(e) {
		$(e.target).prev('.panel-heading').find('i.indicator').toggleClass('active-icon');
		$(e.target).prev('.panel-heading').find('.accordion-toggle').toggleClass('active-topic');
	}

};
/****************************************************************************************************
 * SEARCH BAR
 * 
 *
 *
 *
****************************************************************************************************/
PORTR.searchBar = function (selector,target){
	$(target).hide();
	$(selector).click(function(e) {
		e.preventDefault();
		if (!$(target).hasClass("active")) {
			//if menu is open. wait till its closed then open search
			
			if ($("#menu-toggle").hasClass("bt-menu-open")) {							
				setTimeout(function(){$(target).slideDown("slow");},500);	
			}else{
				$(target).slideDown("slow");	
			}
				//scroll to top
			setTimeout(function(){$.scrollTo( '0', 800, {easing:'easeOutExpo',axis:'y'} );},500);		
			$(target).addClass("active");
		}else{
			$(target).removeClass("active");
			$(target).slideUp("slow");
		}

	});



};
/****************************************************************************************************
 * PORTFOLIO FILTER
 * 
 *
 *
 *
****************************************************************************************************/

PORTR.portfolio = function (selector, item, section){

	//filter
	$(selector).click(function(e){
		e.preventDefault();
		$(selector).removeClass("current");
		$(this).addClass("current");
		var filter = $(this).attr("data-group");
			
		if(filter != "all"){			
			$(item).each(function(){
				var theItem = $(this);
				$(theItem).addClass("inactive");
				var categories = $(this).attr("data-group");			
				if (typeof categories !== 'undefined' && categories !== false){
					categories = categories.split(",");
					$.each(categories, function(i,currentCat){
						if (filter == currentCat){
							$(theItem).removeClass("inactive");
							return;
						}
					});
				}			
			});			
		}else{
			$(item).each(function(){
				$(this).removeClass("inactive");
			});
		}
		
		//scroll to section
		$.scrollTo($(section), 800, {easing:'easeOutExpo',axis:'y', offset:-50});
		
	});

	/*hover effects + vertical alignment of overlay*/
	$(document).ready(function(){
		$(item).each(function(){
			$(this).hover( 
				  function() {					  									  	
				  	if(!$(this).hasClass("inactive")){
				  		$(this).addClass("hover");
				  		
				  		/*vertical alignment of overlay*/
				  		var itemHeight = $(this).height();
						var overlayHeight = $(".overlay",this).height();
						var topHeight = (itemHeight - overlayHeight)/2;	
				  						  		
				  		$(".overlay",this).css("top", topHeight);
				  	}			    
				  },
				  function() {
				    $(this).removeClass("hover");
				    $(".overlay",this).removeClass("hover");
				    $(".overlay",this).css("top", "0px");
				  }
				);
		});
	});
	

};

/****************************************************************************************************
 * BLOG FILTER
 * 
 *
 *
 *
****************************************************************************************************/

PORTR.blog = function (selector, item, section){

	//filter
	$(selector).click(function(e){
		e.preventDefault();
		$(selector).removeClass("current");
		$(this).addClass("current");
		var filter = $(this).attr("data-group");
			
		if(filter != "all"){			
			$(item).each(function(){
				var theItem = $(this);
				$(theItem).addClass("inactive");
				var categories = $(this).attr("data-group");	
				console.log(categories);		
				if (typeof categories !== 'undefined' && categories !== false){
					categories = categories.split(",");
					$.each(categories, function(i,currentCat){
						if (filter == currentCat){
							$(theItem).removeClass("inactive");
							return;
						}
					});
				}			
			});			
		}else{
			$(item).each(function(){
				$(this).removeClass("inactive");
			});
		}		
	});
	
	/*hover effects + vertical alignment of overlay*/
	$(document).ready(function(){
		$(item).each(function(){
			$(this).hover( 
				  function() {					  									  	
				  	if(!$(this).hasClass("inactive")){

				  		$(this).addClass("hover");
				  		
				  		/*vertical alignment of overlay*/
				  		var itemHeight = $(this).height();
						var overlayHeight = $(".overlay",this).height();
						var topHeight = (itemHeight - overlayHeight)/2;	
						console.log($(this));
				  						  		
				  		$(".overlay",this).css("top", topHeight);
				  	}			    
				  },
				  function() {
				    $(this).removeClass("hover");
				    $(".overlay",this).removeClass("hover");
				    $(".overlay",this).css("top", "0px");
				  }
				);
		});
	});
	

};
/****************************************************************************************************
 * OWL CAROUSEL
 *
 *
 *
****************************************************************************************************/
PORTR.owlCarousel = function (options){
	
	$.each(options, function(index,value) {
          
          if(value != null){
          	//if carousel has parameters 
         	$(index).owlCarousel(value);
          }else{
          	//if there are no parameters
          	$(index).owlCarousel();
          }
              
       });


		
};
/****************************************************************************************************
 * header carousel
 *
 *
 *
****************************************************************************************************/
PORTR.bootstrapCarousel = function (options){
	
		$.each(options, function(index,value) {
          
          if(value != null){
          	//if carousel has parameters 
         	$(index).carousel(value);
          }else{
          	//if there are no parameters
          	$(index).carousel();
          }
              
       });


}
/****************************************************************************************************
 * PARALLAX
 *
 *
 *
****************************************************************************************************/
PORTR.parallax = function(option){
		if(option){
			if (!Modernizr.touch){
				var s = skrollr.init({
					mobileDeceleration: 1,
					constants: {
				
					},
					edgeStrategy: 'set',
					forceHeight: false,
					smoothScrolling: true,
					easing: {
						WTF: Math.random,
							inverted: function(p) {
							return 1-p;
							}
					}
				});
			} 	
		};	
};

/****************************************************************************************************
 * FITVIDS
 *
 *
 *
****************************************************************************************************/	
PORTR.fitVids = function (selector){	
	$(selector).fitVids();	      
};
/****************************************************************************************************
 * CONTACT FORM
 *
 *
 *
****************************************************************************************************/
PORTR.contactForm = function (){


		$("#contact-submit").on('click touchstart', function(e) {
			e.preventDefault();
			$("#contact-submit").html("<i class='fa fa-cog fa-spin'></i> SENDING").prop('disabled', true);
			var $contact_form = $('#contact-form');
			var fields = $contact_form.serialize();
			$.ajax({
				type : "POST",
				url : "inc/contact.php",
				data : fields,
				dataType : 'json',
				success : function(response) {
					if (response.status) {
						$('#contact-form input').val('');
						$('#contact-form textarea').val('');
					}
					$('#contact-form-response').empty().html(response.html);
					$("#contact-submit").html("<i class='fa fa-check'></i> SUBMIT").prop('disabled', false);
				}
			});
											
			/*close alert messages*/
			window.setTimeout(function() {
			    $(".alert").fadeTo(1500, 0).slideUp(500, function(){
			        $(this).remove(); 
			    });
			}, 3000);
			
			return false;

		});
		
};
/****************************************************************************************************
 * TOOLTIP
 *
 *
 *
****************************************************************************************************/
PORTR.tooltip = function(selector){
	$(selector).tooltip({container:'body'}); 
};
/****************************************************************************************************
 * MAGNIFIC
 *
 *
 *
****************************************************************************************************/
PORTR.magnific = function (options){
	
	$.each(options, function(index,value) {
          if(value != null){
          	//if carousel has parameters 
         	$(index).magnificPopup(value);
          }else{
          	//if there are no parameters
          	$(index).magnificPopup();
          }
              
       });


		
};
/****************************************************************************************************
 * GOOGLE MAPS INTEGRATION
 *
 *
 *
****************************************************************************************************/
PORTR.map = function (options){


		var settings = $.extend({
            type		: 	"color",
            selector	: 	"map-container"
        }, options);
        

		var mapSelector = settings.selector;
		
		if (document.getElementById(mapSelector)) {
				var mapOptions = {
				location : $("#" + mapSelector).attr("data-location"),
				infoBoxText : $("#" + mapSelector).attr("data-text"),
				zoomLevel : $("#" + mapSelector).attr("data-zoom"),
				mapType : $("#" + mapSelector).attr("data-mapType"),
				
				}	
				initmap(mapSelector, mapOptions);
				
		}
		




		function initmap(selector, mapOptions) {

			var address = mapOptions.location;
			
			if(settings.type != "color"){
				//black and white
			var mapStyleOptions = [ { "stylers": [ { "featureType": "all" }, { "saturation": -100 }, { "weight": 0.2 }, { "gamma": 1.2 }, {"lightness": 30 } ] } ];

			}else{
				//color
				var mapStyleOptions = [{
				featureType : "all",
				elementType : "all"
				}]
			}

			var map = new google.maps.Map(document.getElementById(selector), {
				mapTypeId : google.maps.MapTypeId.mapType,
				scrollwheel : false,
				draggable : false,
				disableDefaultUI : true,
				zoom : parseInt(mapOptions.zoomLevel),
				styles :mapStyleOptions
			});

			//responsive center
			google.maps.event.addDomListener(window, "resize", function() {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center);
			});

			var map_pin = "img/assets/map-marker.png";
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'address' : address
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var marker = new google.maps.Marker({
						position : results[0].geometry.location,
						map : map,
						icon : map_pin
					});

					map.setCenter(results[0].geometry.location);

					/*CREATE INFOBOX*/
					
					var boxText = document.createElement("div");
					boxText.innerHTML = "<div class='infoBox'>" + "<div class='content'>" + mapOptions.infoBoxText + "</div>" + "</div>";
					var myOptions1 = {
						content : boxText,
						disableAutoPan : false,
						pixelOffset : new google.maps.Size(30, 0),
						boxClass : 'map-box',
						alignBottom : true,
						pane : "floatPane"
					};
					var ib = new InfoBox(myOptions1);
					ib.open(map, marker);
					google.maps.event.addListener(marker, "click", function() {
						ib.open(map, marker);
					});

				}
			});
		}
		
		
};		
/****************************************************************************************************
 * SUPERSLIDES
 *
 *
 *
****************************************************************************************************/
PORTR.slider = function(selector, options){
	
	$(window).load(function() {
		/*if only full width is needed no sliding*/
		var slide = $(selector).attr("data-slide");
		
		if(slide != 'false'){	
			$(selector).superslides(options);
		}else{
			$(selector).superslides("#slides", {'play':false});
		}
	});
	
};
	
/****************************************************************************************************
 *  SCROLLING ANIMATIONS
 *	
 *	takes data-animation, data-animation-delay as data attributes. Element needs to have class animation
 *
****************************************************************************************************/			
PORTR.scrollAnim = function(option){	
		$(window).load(function() {
			if(option == "yes"){		
					//trigger css3 animations
					// Handle appear event for animated elements
					var wpOffset = 80;
					if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
						wpOffset = 100;

						$.fn.waypoint.defaults = {
							context : window,
							continuous : true,
							enabled : true,
							horizontal : false,
							offset : 0,
							triggerOnce : false
						};

						$('.animated').waypoint(function() {
							var elem = $(this);
							var animation = elem.data('animation');
							if (!elem.hasClass('visible') && elem.attr('data-animation') !== undefined) {
								if (elem.attr('data-animation-delay') !== undefined) {
									var timeout = elem.data('animation-delay');
									setTimeout(function() {
										elem.addClass(animation + " visible");
									}, timeout);
								} else {
									elem.addClass(elem.data('animation') + " visible");
								}
							}
						}, {
							offset : wpOffset + '%'
						});
					} else {
						//if mobile, don't do it just display elements
						$('.animated').each(function() {
							$(this).css("visibility", "visible");
						});
					}



				}else{
				//don't trigger css3 animation, but display elements
						$('.animated').each(function() {
							$(this).css("visibility", "visible");
						});
				}
		}); //window load
};


}(jQuery)); 

