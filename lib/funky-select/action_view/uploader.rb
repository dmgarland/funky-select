module FunkySelect
  module ActionView
    module Uploader

      def funky_upload(method, options = {})
        [
          @template.content_tag(:div, :id => "funky-upload-container",
          :data => build_data_from_options(options) ) {},
          @template.javascript_tag("initialiseUploader();")
        ].join.html_safe
      end

      protected
      def upload_url
        @template.url_for(:controller => "#{@object_name}_images", :action => :create)
      end

      def build_data_from_options(options)
        data = {
          :upload_url => options[:upload_url] || upload_url,
          :images => options[:images] || "[]",
          :object_id => @object.id
        }
        data.merge!(:limit => options[:limit]) if options[:limit]
        data
      end
    end
  end
end