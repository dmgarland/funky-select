class ActionView::Helpers::FormBuilder

  def funky_select(method, choices = {}, options = {})
    @template.content_tag :div, :class => "funky-select #{method}-picker" do
      [ handle,
        selected(method, options),
        @template.hidden_field(@object_name, method),
        options_list(method, choices, options)
      ].join.html_safe
    end
  end

  protected
  def handle
    @template.content_tag :div, nil, :class => :handle
  end

  def selected(method, options)
    @template.content_tag :div, :class => :selected do
      options[:selected] || @object.send(method)
    end
  end

  def options_list(method, choices, options)
    @template.content_tag :ul, :class => "funky-options #{method}-options" do
      choices.map do |label, value|
        @template.content_tag :li, :data => { method => value } do
          @template.content_tag :div, label, :class => :name
        end
      end.join.html_safe
    end
  end

end