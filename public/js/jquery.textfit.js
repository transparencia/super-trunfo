/*
TextFit, a simple plugin that decreases the font-size to fit an element.
@author: Everton Fraga <everton.fraga@corp.globo.com>
*/
(function($){
$.fn.textFit = function(options) {
	var defaults = { minFontSize: 28 };
	options = $.extend(defaults, options);

	$(this).each(function(i, el){
		var $el = $(el);
		var oldFontSize = $el.data('oldfontsize');
		if (oldFontSize) {
			$el.css('font-size', oldFontSize + 'px');
		}
		
		var lineHeight = parseInt($el.css('line-height'), 10),
		fontSize = parseInt($el.css('font-size'), 10),
		height = parseInt($el.height(), 10);
		$el.data('oldfontsize', fontSize);
		
		while ((height > lineHeight) && (fontSize > options.minFontSize)) {
			$el.css('font-size', --fontSize);
			height = parseInt($el.height(), 10);
		}
	});
};
})(jQuery);
