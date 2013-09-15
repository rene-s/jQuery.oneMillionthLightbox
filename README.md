# OneMillionthLightbox for jQuery

Motto: Look elsewhere for features. This is just the simplest lightbox implementation I think is possible.

In other words: There was no need for another lightbox implementation, you are right to say that.
I just did this for learning purposes. There are better or more compatible implementations out there.

# Features:

1. It's small
2. Knows lightboxed image dimension before the image gets loaded (because you must encode it in the file name, haha)
3. That's about it.

# Download

[Source can be found and downloaded from Github](https://github.com/rene-s/jQuery.oneMillionthLightbox)

# Author

Me:

1. https://reneschmidt.de/wiki/index.php/page/view/OneMillionthLightbox,Start
2. https://reneschmidt.de/

# Licence

GPL v3 or commercial licence :) from github@reneschmidt.de. Do not use this in your closed source project
without paying me. I don't like that.

# How to use:

```js
$(document).ready(function () {
  $("body").oneMillionthLightbox(config, overlayStyles, imageStyles); // all params are optional
});
```
## Supported attributes and default values

```js
config: {
  fadeInDuration: 500 // ms
},
overlayStyles: {
   position: "fixed",
   display: "none",
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   zIndex: 999998,
   backgroundColor: "rgba(0,0,0,0.8)"
},
imageStyles: {
  position: "fixed",
  marginRight: "auto",
  maxWidth: "90%",
  maxHeight: "90%",
  visibility: "hidden",
  left: '50%',
  zIndex: 999999,
  top: '50%'
}
```

For every image that you want to have lightboxed

```html
<a class="lightbox" href="target_image_800x600.png" title="title of image">
 <img src="thumbnail_of_target_150x150.png" alt="alt text"/>
</a>
```

# Notes:

1. Every image tag must be enclosed in an a-tag.
2. Img tag should have an alt attribute
3. The a tag must have CSS class "lightbox".
4. The a tag must have a href attribute with encoded width and height in the file name: target_image_widthxheight.png
5. The a tag should have a title attribute

If you do not like that... Well, you don't have to. There are LOADS of other fine lightbox implementations out there.
Use either those, change this implementation for yourself (and regard the licence) or pay me to alter it.
I am available [for hire](mailto:lightbox@reneschmidt.de).