# encoding: utf-8
require_dependency 'redmine_jstoolbar_ext_images'

Redmine::Plugin.register :redmine_jstoolbar_ext_images do
  name 'Redmine jsToolbar Images Extension'
  author 'Thomas Leishman'
  description 'The Redmine JS Toolbar Images Extension add additional buttons to the jsToolbar.'
  version '0.3.1'
  url 'https://github.com/tleish/redmine_jstoolbar_ext_images'
  author_url 'https://github.com/tleish'
  requires_redmine_plugin :redmine_jstoolbar_ext, :version_or_higher => '0.1.0'
end
