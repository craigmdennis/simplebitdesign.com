# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
  set :bundle_file_css, "css/app.css"
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

# Set SASS precision
::Sass::Script::Number.precision = [7, ::Sass::Script::Number.precision].max

activate :gist # Embed Gists

# Blogging
activate :blog do |blog|
  blog.prefix = ""
  blog.sources = "posts/{year}/{month}/{title}.html"
  blog.permalink = "{title}"
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

activate :deploy do |deploy|
  deploy.method = :git
  deploy.branch = "staging"
  deploy.strategy = :force_push
end