$(document).ready ->
  close_list = (event) ->
    event.data.list.slideUp open_speed
    $("body").unbind "click.funkyClose"
  open_speed = 80
  keypress_wait = 225

  # When you click the name or the handle of the drop down, listen out for keypresses
  $("body").on "click", ".funky-select .selected:not([data-is-editing='1']), .funky-select .handle", (e) ->
    list = $(this).parent().find("ul")

    # Make sure any other lists are closed
    lists = $("body").find(".funky-select ul")
    $.each lists, (i) ->
      $(lists[i]).hide()  unless lists[i] is list[0]

    list.slideToggle open_speed
    $("body").unbind "keypress"
    $("body").unbind "keydown"
    combined = ""
    found_index = 0
    options = list.find("li:not('.unclickable')")
    ti = undefined
    kpti = undefined
    list.find("li").each (i) ->
      $(this).removeClass "chosen"

    # Hack to make :contains case insensitive
    jQuery.expr[":"].StartsWithCaseInsensitive = (a, i, m) ->
      jQuery(a).text().trim().toUpperCase().substring(0, m[3].length) is m[3].toUpperCase() and not jQuery(a).hasClass("destination-header")

    # Listen for keypresses to scroll to the relevant option
    $("body").bind "keypress", (e) ->
      c = String.fromCharCode(e.which)
      combined += c
      clearTimeout ti  unless typeof ti is "undefined"
      ti = setTimeout((e) ->
        found = list.find("li:StartsWithCaseInsensitive(" + combined + ")").first()
        if found.length > 0
          unless found.offset().top is 0
            found.siblings().each (i) ->
              $(this).removeClass "chosen"

            found.addClass "chosen"
            $("ul.funky-options").animate
              scrollTop: found[0].offsetTop
            , keypress_wait
            found_index = options.index(found)
        combined = ""
      , keypress_wait)

    # Capture backspace events and remove characters from the combined string
    $("body").bind "keydown", (e) ->
      switch e.which
        when 8
          combined = combined.substring(0, combined.length - 1)  if combined.length > 0
        when 13
          $(options[found_index]).trigger "click"
        when 32
          combined += " "
        when 40
          e.preventDefault()
          found_index += 1
          found_index = options.length - 1  if found_index >= options.length
          if typeof kpti isnt "undefined" or not kpti?
            kpti = setTimeout((e) ->
              options.each (i) ->
                $(this).removeClass "chosen"

              prev_item = options[found_index - 5]
              if prev_item
                offset = options[found_index].offsetTop
                opts = {}
                opts = scrollTop: prev_item.offsetTop  if (offset - list[0].scrollTop) >= list.height()
              $("ul.funky-options").animate opts, 50, (e) ->
                $(options[found_index]).addClass "chosen"

              clearTimeout kpti
              kpti = null
            , 50)
        when 38
          e.preventDefault()
          found_index -= 1
          found_index = 0  if found_index < 0
          if typeof kpti isnt "undefined" or not kpti?
            kpti = setTimeout((e) ->
              options.each (i) ->
                $(this).removeClass "chosen"

              offset = options[found_index].offsetTop
              opts = {}
              opts = scrollTop: offset  if (offset - list[0].scrollTop) <= 0
              $("ul.funky-options").animate opts, 50, (e) ->
                $(options[found_index]).addClass "chosen"

              clearTimeout kpti
              kpti = null
            , 50)

    # Bind a click anywhere to close the list
    $("body").unbind("click.funkyClose").bind "click.funkyClose",
      list: list
    , close_list

  # Default action for clicking an option on a funky select drop-down
  $("body").on "click", ".funky-select:not(.add-country-button) li:not('.unclickable')", (e) ->
    o = $(this)
    s = $(this).closest(".funky-select")
    option_text = o.find(".name").html()
    selected = s.find(".selected")

    selected.html option_text # Set the selected text

    # If the option has a background image set the selected section to it
    bg_css = o.css("background-image")
    selected.css "background-image", bg_css  if bg_css and bg_css.indexOf(".png") > 0


    # Populate input fields under the selected box where the data attribute
    # matches the textbox name, so that data-your-attribute matches your_attribute
    inputs = s.find("input")
    inputs.each (i) ->
      parts = inputs[i].name.split("[")
      name = parts[parts.length - 1]
      parts = name.substring(0, name.length - 1).split("_")
      option = ""
      $.each parts, (i) ->
        option += parts[i]
        option += "-"  if i < parts.length - 1

      $(inputs[i]).val(o.data(option)).change()
