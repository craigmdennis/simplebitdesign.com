def ui_separator(separator_classes = "")
  content_tag(:span, "·", class: separator_classes + " ui-separator", "aria-hidden" => true, role: "presentation")
end

def ui_icon(icon_classes)
  content_tag(:i, nil, class: icon_classes, "aria-hidden" => true, role: "presentation")
end

def ui_svg(icon_classes, size = false, options = {})
 
  defaults = {
    class: icon_classes,
    "aria-hidden" => true,
    role: "presentation",
    width: (size ? size : nil),
    height: (size ? size : nil)
  }

  content_tag(:svg, defaults.merge( options ) ) do
    content_tag(:use, nil, "xlink:href" => "#" + icon_classes)
  end

end