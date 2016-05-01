module SitemapHelper
  def sub_pages(dir)
    sitemap.resources.select do |resource|
      resource.path.start_with?(dir)
    end
  end
end
