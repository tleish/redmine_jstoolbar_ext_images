# Redmine jsToolbar Images Extension

## Summary

The Redmine jsToolbar Images Extension enhances the images button for the [Redmine](http://www.redmine.org/) wiki and text editor toolbar.  If images are attached to a wiki page or issue, then an image menu will display when the image button is clicked with the list of images.  It works with files existing attached images and also images that have just been uploaded, but not saved.

![Buttons](https://raw.githubusercontent.com/tleish/redmine_jstoolbar_ext_images/master/assets/images/screenshot.png)

## Requirements

This plugin requires the [Redmine jsToolbar Ext plugin](https://github.com/tleish/redmine_jstoolbar_ext) to also be installed.

### Images with Spaces in File Name
In Redmine, if you upload an image with spaces in the name then it can be difficult to insert into the wiki text for viewing.

See: http://www.redmine.org/issues/10189

The image menu button detects if there are spaces and inserts a modified path to support spaces file name.

## Installation

```
$ cd redmine/plugins
$ git clone https://github.com/tleish/redmine_jstoolbar_ext_images
```

restart Redmine

## See Also:
                                 
* [Redmine jsToolbar Buttons Extension](https://github.com/tleish/redmine_jstoolbar_ext_buttons)
* [Redmine jsToolbar CodeRay Extension](https://github.com/tleish/redmine_jstoolbar_ext_coderay)
