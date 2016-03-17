def sub_pages(dir)
  sitemap.resources.select do |resource|
    return resource.path.start_with?(dir)
  end
end
