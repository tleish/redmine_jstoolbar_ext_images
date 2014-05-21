class RedmineJstoolbarExtImagesHookListener < Redmine::Hook::ViewListener
  render_on :view_layouts_base_html_head, :partial => "redmine_jstoolbar_ext_images/redmine_jstoolbar_ext_images_partial"
end