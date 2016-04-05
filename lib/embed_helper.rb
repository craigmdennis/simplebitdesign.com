def embed(source)
  content_tag :div, class: "o-embed o-embed--16x9" do
    content_tag :iframe, nil, width: "100%", height:"100%", src: source, frameborder: 0, allowfullscreen: true
  end
end
