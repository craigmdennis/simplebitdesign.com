# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Directories
set :css_dir, "css"
set :js_dir, "js"
set :images_dir, "images"

# Language Support
set :haml, { :format => :html5 }
set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true
set :build_dir, "public"
set :sass, precision: 7

activate :gist # Embed Gists
activate :meta_tags # Easily add meta tags
activate :middleman_simple_thumbnailer # Resize images

# Blogging
activate :blog do |blog|
  blog.prefix = "blog"
  blog.sources = "posts/{category}/{title}.html"
  blog.permalink = "{category}/{title}"
  blog.layout = "post"
  blog.paginate = true
  blog.per_page = 10
  blog.default_extension = ".md"
end

# Build-specific configuration
configure :build do

  activate :minify_css
  activate :minify_javascript
  activate :imageoptim
  activate :relative_assets
  activate :asset_hash
  activate :gzip
  activate :minify_html, remove_intertag_spaces: true
  activate :autoprefixer, browsers: ["last 2 versions", "Explorer >= 9"]

end

# Add bower components after asset hashing
after_configuration do
  @bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
  sprockets.append_path File.join "#{root}", @bower_config["directory"]
end