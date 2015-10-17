# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Directories
set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'images'

# Language Support
set :haml, { :format => :html5 }
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true
set :build_dir, 'public'

# Turn on syntax highlighting
# activate :rouge_syntax

# Build-specific configuration
configure :build do

  activate :minify_css
  activate :minify_javascript
  activate :imageoptim
  activate :relative_assets
  activate :minify_html
  activate :asset_hash
  activate :gzip

  # Autoprefixer
  activate :autoprefixer do |config|
    config.browsers = ['last 2 versions', 'Explorer >= 9']
  end

end

# Add bower components after asset hashing
after_configuration do
  @bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
  sprockets.append_path File.join "#{root}", @bower_config["directory"]
end

# Deploy to github
case ENV['TARGET'].to_s.downcase
when 'production'
  activate :deploy do |deploy|
    deploy.method = :git
    deploy.branch = 'master'
    deploy.build_before = true
    deploy.commit_message = 'Production version deployed on `date +"%d %B, %Y at %T"`'
  end
else
  activate :deploy do |deploy|
    deploy.method = :git
    deploy.branch = 'staging'
    deploy.build_before = true
    deploy.strategy = :force_push
    deploy.commit_message = 'New version deployed on `date +"%d %B, %Y at %T"`'
  end
end