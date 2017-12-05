# patch for RepositoriesHelper
Redmine::WikiFormatting::Macros::Definitions.send(:alias_method, :macro_original_thumbnail, :macro_thumbnail)

# Allow for thumbnails to be displayed on preview
Redmine::WikiFormatting::Macros.class_eval do
  macro :thumbnail do |obj, args|
    adjusted_args = args.dup
    adjusted_args[0] = URI.decode(args[0])
    obj ||= RedmineEditorPreviewTabThumbnail.new(@attachments) if @attachments
    macro_original_thumbnail(obj, adjusted_args)
  end
end

class RedmineEditorPreviewTabThumbnail
  attr_reader :attachments
  def initialize(attachments)
    @attachments = attachments
  end
end
