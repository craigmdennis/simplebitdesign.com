module MenuHelper
  def link_or_span(menu_text, page_url, title_attr=nil)
    page_url = '/' + I18n.locale.to_s + page_url if I18n.locale != I18n.default_locale
    if current_page.url == page_url
      return content_tag :span do menu_text end
    else
      return link_to menu_text, page_url, :title => (title_attr || menu_text)
    end
  end
end
