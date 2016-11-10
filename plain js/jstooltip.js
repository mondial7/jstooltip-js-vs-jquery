

		// TODO: to improve ...
		// do display:none after fadeout and display:block if already there when append 



var jsToolTip = (function () {
	
	"use_strict";

	var

	    animation_time = 200,

		counter = 0,

		jstt = {
				 attribute: "data-tooltip"
			   },

		tooltip_box = {
						node: document.createElement('div'),

						css: "position: fixed;" + 
							 "max-width: 200px;" +
							 "height: auto;" +
							 "overflow: hidden;" +
							 "padding: 3px;" +
							 "background-color: #fff;" +
							 "border: 1px solid #525252;" +
							 "font-size: 12px;" +
							 "color: #525252;" +
							 "box-shadow: 1px 1px 3px #333;" +
							 "opacity: 0;" +
							 "z-index: 9999999;" +
							 "transition: opacity " + animation_time + "ms;" +
							 "-webkit-transition: opacity " + animation_time + "ms;",

						class_name: "jstooltip",

						attribute: {
						 	id: "tooltip-id",
						 	for: "tooltip-for"
						}
				      
				      },

	    animation = {
						fadeIn: { 
									css: "opacity: 1 !important",
									class_name: "jstooltip--visible"
					    	     },

					    fadeOut: {
					    			css: "opacity: 0 !important",
									class_name: "jstooltip--hidden"
					    		 }						
					};

	// Create and append the tootip to the dom
	jstt.append = function ( elem, callback = null ) {

		var tooltip_id = "tt" + ( ++counter );

		// Assign css to tooltipbox
		tooltip_box.node.className = tooltip_box.class_name;

		// Add fixed position to the target element
		tooltip_box.node.setAttribute( "style", evalToolTipPosition( elem ) );

		// Add text to the tooltip
		tooltip_box.node.innerHTML = elem.getAttribute( jstt.attribute );

		// Add attributes to backtrack the element
		tooltip_box.node.setAttribute( tooltip_box.attribute.for, tooltip_id );		
		elem.setAttribute( tooltip_box.attribute.id, tooltip_id );

		// Append to parent
		elem.parentNode.appendChild( tooltip_box.node );

		// Delay a bit the fade -> "fake callback"
		if ( callback ) setTimeout( callback );

	};

	// Remove tooltip
	jstt.remove = function ( elem ) {

		elem.parentNode.removeChild( getToolTipElement( elem ) );

	}

	// Fade in the tootip box
	jstt.customFadeIn = function ( elem ) {

		var class_name_ =  tooltip_box.class_name + " " + animation.fadeIn.class_name;

		getToolTipElement( elem ).className = class_name_;

	}

	// Fade out the tootip box
	jstt.customFadeOut = function ( elem, callback = null ) {

		var class_name_ =  tooltip_box.class_name + " " + animation.fadeOut.class_name;

		getToolTipElement( elem ).className = class_name_;

		if ( callback ) setTimeout( callback, animation_time );

	}

	// Startup/Init function to set up
	jstt.startup = function () {

		// Append css to document
		var styles = document.createElement("style");
		styles.innerHTML = "." + tooltip_box.class_name + "{" + tooltip_box.css + "}";
		styles.innerHTML += "." + animation.fadeIn.class_name + "{" + animation.fadeIn.css + "}";
		styles.innerHTML += "." + animation.fadeOut.class_name + "{" + animation.fadeOut.css + "}";
		document.head.appendChild(styles);

		// Add event listeners to all the tooltips
		var nodes = document.querySelectorAll( "*[" + jstt.attribute + "]" ),
			nodes_length = nodes.length;

		for (var i = 0; i < nodes_length; i++) {

			nodes[i].addEventListener("mouseenter", function(e){
							
				console.log("mouseenter");

				var elem = e.target || e.srcElement;

				// Append tooltip
				jstt.append( elem, function(){

					// Fade in
					jstt.customFadeIn( elem );

				});

			});

			nodes[i].addEventListener("mouseleave", function(e){

				console.log("mouseleave");	

				var elem = e.target || e.srcElement;

				// Fade out
				jstt.customFadeOut( elem, function(){
				
					// Define the remove as callback after animation
					jstt.remove( elem );
				
				});
			
					
			});

		}
				
	};

	function attrSel ( attribute, value ) {
		return "*[" + attribute + "=" + value + "]";
	}

	function getToolTipElement ( elem ) {

		var tooltip_id = elem.getAttribute( tooltip_box.attribute.id );

		return document.querySelectorAll( attrSel( tooltip_box.attribute.for, tooltip_id ) )[0];

	}

	// Reference: http://stackoverflow.com/a/1480137
	function evalToolTipPosition ( elem ) {

		var position = { top: 0, left: 0 },
			curleft = curtop = 0,
			node = elem;

	    do {
	        position.top += node.offsetTop  || 0;
	        position.left += node.offsetLeft || 0;
	    } while ( node = node.offsetParent );

		// Set fixed position
		position.top += elem.offsetHeight + 2; 
		position.left += ( elem.offsetWidth / 2 );

		return "top:" + position.top + "px; left: " + position.left + "px";

	}

	// Extra
	// We could define setAnimationTime() that rewrite the jstooltip style


	// Automatically run the library on load
	window.addEventListener("load", function(){
		jsToolTip.startup();
	});


	return jstt;

}());

/* USAGE 



	js: jsToolTip.startup(); // Initialize the library

	html: <tag ... data-tooltip="Demo text" ...></tag>


*/
