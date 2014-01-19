class ActionView::Helpers::FormBuilder

  def funky_select(method, options = {})
    @template.content_tag :div, :class => "funky-select #{method}-picker" do

    end
      # @template.radio_button(
      #   @object_name, method, tag_value, objectify_options(options)
      # )

  end

end