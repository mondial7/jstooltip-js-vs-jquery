
// One of the many things that could be improve ...
// do display:none after fadeout and display:block if already there when append,
// avoiding to continuosly write on the dom

var jsToolTip = (function ($) {
	
	"use_strict";

	var

		default_attr = "data-tooltip",

		tooltip_id_attribute = "tooltip-id",

		tooltip_for_attribute = "tooltip-for",

	    animation_time = 200,

		counter = 0,

		jstt = {
				 target: "[" + default_attr + "]"
			   },

		tooltip_box = {
					node: $(document.createElement('div')),
					css: {
						   "position": "fixed",
						   "max-width": "200px",
						   "height": "auto",
						   "overflow": "hidden",
						   "padding": "3px",
						   "background-color": "#fff",
						   "border": "1px solid #525252",
						   "font-size": "12px",
						   "color": "#525252",
						   "box-shadow": "1px 1px 3px #333",
						   "opacity": 0,
						   "z-index": 9999999
						 }
			      },

	    fadeIn = { 
	    	       css: { "opacity" : 1 },
	    	       time: animation_time
	    	     },

	    fadeOut = {
	    		    css: { "opacity" : 0 },
	    		    time: animation_time
	    		  };


	// Create and append the tootip to the dom
	jstt.append = function ( jQobj_elem ) {

		var tooltip_id = "tt" + ( ++counter );

		// Assign css to tooltipbox
		tooltip_box.node.css( tooltip_box.css );

		// Add fixed position to the target element
		tooltip_box.node.css( evalToolTipPosition( jQobj_elem ) );

		// Add text to the tooltip
		tooltip_box.node.text( jQobj_elem.attr( default_attr ) );

		// Add attributes to backtrack the element
		tooltip_box.node.attr( tooltip_for_attribute, tooltip_id );		
		jQobj_elem.attr( tooltip_id_attribute, tooltip_id );

		// Append to parent
		jQobj_elem.parent().append( tooltip_box.node );

	};

	// Remove tooltip
	jstt.remove = function ( jQobj_elem ) {

		getToolTipElement( jQobj_elem ).remove();

	}

	// Fade in the tootip box
	jstt.customFadeIn = function ( jQobj_elem ) {

		getToolTipElement( jQobj_elem ).animate( fadeIn.css, fadeIn.time );

	}

	// Fade out the tootip box
	jstt.customFadeOut = function ( jQobj_elem, callback = null ) {

		getToolTipElement( jQobj_elem ).animate( fadeOut.css, fadeOut.time, callback );
	
	}

	// Startup/Init function to set up
	jstt.startup = function ( name = null, custom_tag = false ) {

			// Set the target
			if ( name !== null ) {
				if ( custom_tag ) {
					this.target = name; // tag selector
				} else {
					this.target = "." + name; // class selector
				}
			} else {
				// default is attribute selector
			}
			
			// Add event listeners 
			$( this.target )
							.mouseenter(function(){
								
								var elem = $(this);

								// Append tooltip
								jstt.append( elem );

								// Fade in
								jstt.customFadeIn( elem );


							})
							.mouseleave(function(){

								var elem = $(this);

								// Fade out
								jstt.customFadeOut( elem, function(){
								
									// Define the remove as callback after animation
									jstt.remove( elem );
								
								});
							
							
							});

	};

	function attrSel ( attribute, value ) {
		return "[" + attribute + "=" + value + "]";
	}

	function getToolTipElement ( jQobj_elem ) {

		var tooltip_id = jQobj_elem.attr( tooltip_id_attribute );

		return $( attrSel( tooltip_for_attribute, tooltip_id ) );

	}

	function evalToolTipPosition ( jQobj_elem ) {

		var elem = {
					pos: jQobj_elem.offset(),
					height: jQobj_elem.height(),
					width: jQobj_elem.width()
				   },
			position = {};

		// Set fixed position
		position.top = elem.pos.top + elem.height + 2; 
		position.left = elem.pos.left + ( elem.width / 2 );

		return position;

	}

	// Testing
	jstt.hello = function () {
		alert( this.target );
	}

	return jstt;

}(jQuery));



// Run library
$(document).ready(function(){
	
	jsToolTip.startup();

});

/* USAGE 

	js: jsToolTip.startup(); // Initialize the library

	html: <tag ... data-tooltip="Demo text" ...></tag>

*/
