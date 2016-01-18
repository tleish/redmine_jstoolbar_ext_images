# Redmine jsToolbar Images Extension

## Summary

The Redmine jsToolbar Images Extension enhances the images button for the [Redmine](http://www.redmine.org/) wiki and text editor toolbar.  If images are attached to a wiki page or issue, then an image menu will display when the image button is clicked with the list of images.  It works with files existing attached images and also images that have just been uploaded, but not saved.

![Buttons](https://raw.githubusercontent.com/tleish/redmine_jstoolbar_ext_images/master/assets/images/screenshot.png)

## Requirements

This plugin requires the [Redmine jsToolbar Ext plugin](https://github.com/tleish/redmine_jstoolbar_ext) to also be installed.

## Features
* Easily insert images (or thumbnails) that are uploaded or about to be upload 
* Supports [Redmine Clipboard Image Paste](https://github.com/peclik/clipboard_image_paste) plugin.
* Fixes images with Spaces in File Name: In Redmine, if you upload an image with spaces in the name then it can be difficult to insert into the wiki text for viewing. (see: [Redmine Issue #10189](http://www.redmine.org/issues/10189))
* Supports both Textile and Markdown

## Installation

```
$ cd redmine/plugins
$ git clone https://github.com/tleish/redmine_jstoolbar_ext
$ git clone https://github.com/tleish/redmine_jstoolbar_ext_images
```

restart Redmine

## See Also:
                                 
* [Redmine jsToolbar Buttons Extension](https://github.com/tleish/redmine_jstoolbar_ext_buttons)
* [Redmine jsToolbar CodeRay Extension](https://github.com/tleish/redmine_jstoolbar_ext_coderay)
* [Redmine Clipboard Image Paste](https://github.com/peclik/clipboard_image_paste)
