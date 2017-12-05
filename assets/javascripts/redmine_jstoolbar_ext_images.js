(function () {
  if(typeof RedmineWikiToolbarExt === 'undefined') return false;

  RedmineWikiToolbarExt.ImagesOriginalFn = String(jsToolBar.prototype.elements.img.fn.wiki).match(/([^{]+{)(.+)(})/)[2];

  var buttons = [
    {
      title: 'Image',
      name: 'img',
      fn: {wiki: function (event) {
        var images = RedmineWikiToolbarExt.Attachments.images();
        var image_menu_buttons = RedmineWikiToolbarExt.AttachedImageSubMenuButtons.get(this, images);
        if ( !RedmineWikiToolbarExt.SubMenu.open(this.toolbar, event.target, image_menu_buttons) ) {
          eval(RedmineWikiToolbarExt.ImagesOriginalFn);
        }
      }}
    }
  ];


  /**
   * Draw to page
   */
  RedmineWikiToolbarExt.ToolbarElements.add(buttons);


  /**
   * @class Attachments
   * @desc Return an array of Redmine attachments
   * @methods images()
   * @return array - image urls
   */
  RedmineWikiToolbarExt.Attachments = (function () {
    var base_url = $("head link[rel='stylesheet']:first").attr('href').replace(/stylesheets.+$/, '');
    var attachments_url = base_url + 'attachments/download/';

    var attachments = function() {
      var files = [];
      $.merge(files, old_attachments());
      $.merge(files, new_attachments());
      $.merge(files, cbp_images());
      return files.sort(sort_files_by_name);
    };

    var old_attachments = function(){
      var files = $('div.attachments .icon-attachment').map(function () {
        return $(this).attr('href');
      });
      return files.length ? files : [];
    };

    var new_attachments = function(){
      var files = $('#attachments_fields .filename, .attachments_fields .filename').map(new_attachment_url);
      return files.length ? files : [];
    };

    var new_attachment_url = function(){
      var download_id = $(this).siblings("input[name$='[token]']:first").val().split('.')[0];
      var url_encoded_name = encodeURIComponent($(this).val()).replace(/\+/g, '%20');
      return attachments_url + download_id + '/' + url_encoded_name;
    };

    // cbp = clipboard_image_paste
    // Redmine plugin for pasting cropped image from clipboard as an attachment.
    // https://github.com/peclik/clipboard_image_paste
    var cbp_images = function(){
      var files = $('#cbp_images_form .name').map(function() { return this.value; });
      return files.length ? files : [];
    };

    var images = function() {
      var images = $.map(attachments(), filter_image);
      return images;
    };

    var filter_image = function(file){
      var is_image = new RegExp(/\.(gif|jpg|jpeg|tiff|png)$/i);
      return is_image.test(file) ? file : null;
    };

    var sort_files_by_name = function (path_a, path_b) {
      var filename_regx = /^.*[\\\/]/;
      var a = path_a.replace(filename_regx, '').toLowerCase();
      var b = path_b.replace(filename_regx, '').toLowerCase();
      return a < b ? -1 : a > b ? 1 : 0;
    };

    return {
      images: images
    };
  })();

  /**
   * @class AttachedImageSubMenuButtons
   * @desc Create images menu buttons
   * @methods get()
   */
  RedmineWikiToolbarExt.AttachedImageSubMenuButtons = (function() {
    var toolbar, images;

    var get = function(toolbar_obj, images_array){
      toolbar = toolbar_obj, images = images_array;
      if(images.length === 0) return [];
      var buttons = img_buttons();
      buttons.push(other_button());
      return buttons;
    };

    var img_buttons = function(){
      return $.map(images, function (filename) {
        var img_data = img_button_data(filename);
        var img_thumbnail_data = img_thumbnail_button_data(filename);
        return build_button(img_data).add(build_thumbnail_button(img_thumbnail_data));
      });
    };

    var other_button = function(){
      var fn = RedmineWikiToolbarExt.ImagesOriginalFn.replace(/this/, 'toolbar');
      return $('<button class="full">[' + jsToolBar.strings['Image'] + ']</button>')
        .click(function(){
          eval(fn);
        }).add(build_thumbnail_button({ label: '', beg: '{{thumbnail(', end: ', size=100, title=Thumbnail)}}' }));
    };

    var img_button_beg = {
      textile: '!%s!',
      markdown: '![](%s)'
    };

    var markdown_type = RedmineWikiToolbarExt.Markup.type();

    var img_button_data = function(filename){
      var basename = filename.split('/').pop();
      var path = basename;
      var beg = img_button_beg[markdown_type].replace(/%s/, path);
      return  { label: basename, beg: beg, end: '' };
    };

    var img_thumbnail_button_data = function(filename){
      var basename = filename.split('/').pop();
      var path = decodeURIComponent(basename);
      return  { label: basename, beg: '{{thumbnail(' + path + ', size=100, title=' + path, end: ')}}' };
    };

    var build_button = function (data) {
      var title = data.label.replace(/"/g, '&quot;');
      var text = decodeURIComponent(data.label);
      return $('<button class="full" title="' + title + '">' + text + '</button>')
        .data(data)
        .click( image_button_click);
    };

    var build_thumbnail_button = function (data) {
      return $('<button class="thumbnail">&gt; thumb</button>')
        .data(data)
        .click(image_button_click);
    };

    var image_button_click = function(event){
      var data = $(event.target).data();
      toolbar.encloseSelection(data.beg, data.end, function(str) {
        return str;
      });
    };

    return {
      get: get
    };
  })();

}());
