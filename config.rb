require 'readingtime'

# Reload the browser automatically whenever files change
configure :development do
  set :sass_source_maps, true

  activate :livereload do |live|
    live.livereload_css_target = "assets/css/app.css"
    live.livereload_css_pattern = "\.css"
  end
end

# Directories
set :css_dir, "assets/css"
set :js_dir, "assets/js"
set :images_dir, "assets/images"

# Language Support
set :haml, { :format => :html5 }
set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true
set :build_dir, "public"

# Set SASS precision
::Sass::Script::Number.precision = [8, ::Sass::Script::Number.precision].max

# Blogging
activate :blog do |blog|
  blog.prefix = ""
  blog.sources = "posts/{year}/{month}/{title}.html"
  blog.permalink = "blog/{year}/{month}/{title}.html"
  blog.layout = "post"
  blog.paginate = true
  blog.per_page = 10
  blog.default_extension = ".md"
end

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :relative_assets
  activate :asset_hash
  activate :gzip
  activate :minify_html, remove_intertag_spaces: true
  activate :autoprefixer, browsers: ["last 2 versions"]
  activate :directory_indexes
end

# Add node modules after asset hashing
after_configuration do
  sprockets.append_path File.join "#{root}", "node_modules"
end