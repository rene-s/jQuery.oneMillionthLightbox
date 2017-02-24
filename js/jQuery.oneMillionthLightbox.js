/**
 * OneMillionthLightbox by Rene Schmidt
 * Motto: Look elsewhere for features. This is just the simplest lightbox implementation I think is possible.
 *
 * In other words: There was no need for another lightbox implementation, you are right to say that.
 * I just did this for learning purposes. There are better or more compatible implementations out there.
 *
 * Features:
 *
 * 1. It's small
 * 2. Knows lightboxed image dimension before the image gets loaded (because you must encode it in the file name, haha)
 * 3. That's about it.
 *
 * How to use:
 *
 * $(document).ready(function () {
     $("body").oneMillionthLightbox(config, overlayStyles, imageStyles); // all params are optional
   });
 *
 * Supported attributes and default values:
 *
 * config: { fadeInDuration: 500 // ms }
 * overlayStyles: {
       position: "fixed",
       display: "none",
       top: 0,
       left: 0,
       right: 0,
       bottom: 0,
       zIndex: 999998,
       backgroundColor: "rgba(0,0,0,0.8)"
   }
 * imageStyles: {
       position: "fixed",
       marginRight: "auto",
       maxWidth: "90%",
       maxHeight: "90%",
       visibility: "hidden",
       left: '50%',
       zIndex: 999999,
       top: '50%'
   }
 *
 * For every image that you want to have lightboxed
 *
 * <a class="lightbox" href="target_image_800x600.png" title="title of image">
 *   <img src="thumbnail_of_target_150x150.png" alt="alt text"/>
 * </a>
 *
 * Notes:
 *
 * 1. Every image tag must be enclosed in an a-tag.
 * 2. Img tag should have an alt attribute
 * 3. The a tag must have CSS class "lightbox".
 * 4. The a tag must have a href attribute with encoded width and height in the file name: target_image_widthxheight.png
 * 5. The a tag should have a title attribute
 *
 * If you do not like that... Well, you don't have to. There are LOADS of other fine lightbox implementations out there.
 * Use either those, change this implementation for yourself (and regard the licence) or pay me to alter it.
 * I am available for hire.
 *
 * @author Rene Schmidt <omlb@sdo.sh>
 * @licence GPL-3 or commercial
 */
(function ($) {
  $.fn.oneMillionthLightbox = function (cfg, overlayStyles, imgStyles) {
    cfg = $.extend({
      fadeInDuration: 500 // ms
    }, cfg || {});

    overlayStyles = $.extend({
      position: "fixed",
      display: "none",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999998,
      backgroundColor: "rgba(0,0,0,0.8)"
    }, overlayStyles || {});

    imgStyles = $.extend({
      boxShadow: "10px 10px 10px #111",
      zoom: 1,
      filter: "progid:DXImageTransform.Microsoft.Shadow(color='#000000', Direction=135, Strength=13)", // ie8
      position: "fixed",
      marginRight: "auto",
      maxWidth: "90%",
      maxHeight: "90%",
      visibility: "hidden",
      left: '50%',
      zIndex: 999999,
      top: '50%'
    }, imgStyles || {});

    var simpleUid = new Date().getTime();

    $('<div id="lightboxOverlay' + simpleUid + '"><img id="lightboxImage' + simpleUid + '" src="" alt="empty image"/></div>').appendTo($('body'));

    var im = $("#lightboxImage" + simpleUid),
      ovl = $("#lightboxOverlay" + simpleUid),
      jqueryWin = $(window);

    ovl.addClass("lightboxOverlay");
    ovl.css(overlayStyles);

    im.addClass("lightboxImage");
    im.css(imgStyles);

    ovl.click(function (/*e*/) {
      ovl.hide() && im.hide();
    });

    $(document).ready(function () {
        $("a.lightbox").click(function (e) {
          e.preventDefault();

          im.attr({"src": e.currentTarget.href, "alt": e.currentTarget.title});
          im.css({visibility: "hidden"});
          im.show();

          // try to read image dimension from filename_123x456.png (width=123, height=456). if that works, use those data.
          var readDims = e.currentTarget.href.match(/_(\d+)x(\d+)\./);

          ovl.fadeIn(cfg.fadeInDuration, function () {
            var width = readDims[1] || im.width(),
              height = readDims[2] || im.height(),
              scaleWdth = jqueryWin.width() * 0.9 / width,
              scaleHght = jqueryWin.height() * 0.9 / height;

            if (scaleWdth < 1.0 || scaleHght < 1.0) { // scale image so it will always fit the screen nicely
              width *= scaleWdth < scaleHght ? scaleWdth : scaleHght;
              height *= scaleWdth < scaleHght ? scaleWdth : scaleHght;
            }

            im.css({
              visibility: "visible",
              marginLeft: -(width / 2),
              marginTop: -(height / 2)
            });
          });
        });
      }
    );
  };
})(jQuery);