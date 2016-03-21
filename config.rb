# Directories
set :css_dir, "assets/css"
set :js_dir, "assets/js"
set :images_dir, "assets/images"

# Language Support
set :haml, { :format => :html5 }
set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true
set :build_dir, "public"

# Pretty URLs
activate :directory_indexes

# Set SASS precision
::Sass::Script::Number.precision = [8, ::Sass::Script::Number.precision].max

# Custom Templates
# page "/projects/*", :layout => "project"

# Blogging
activate :blog do |blog|
  blog.name = 'posts'
  blog.prefix = "posts"
  blog.sources = "{year}/{month}/{title}.html"
  blog.permalink = "{year}/{month}/{title}.html"
  blog.layout = "post"
  blog.paginate = true
  blog.per_page = 10
  blog.default_extension = ".md"
  blog.calendar_template = "calendar.html"
  blog.generate_day_pages = false
  blog.summary_length = 100
end

# Blogging
activate :blog do |blog|
  blog.name = 'projects'
  blog.prefix = "projects"
  blog.sources = "{title}.html"
  blog.permalink = "{title}.html"
  blog.layout = "project"
  blog.paginate = true
  blog.per_page = 10
  blog.default_extension = ".md"
  blog.calendar_template = false
  blog.generate_day_pages = false
  blog.summary_length = 100
end

# Add node modules after asset hashing
after_configuration do
  sprockets.append_path File.join "#{root}", "node_modules"
end

# Development-specific configuration
configure :development do
  set :sass_source_maps, true

  activate :livereload do |live|
    live.livereload_css_target = "assets/css/app.css"
  end
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
end
