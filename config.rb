require 'lib/gulp'

# Per-page layout changes with no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Pretty URLs
activate :directory_indexes

# Language Support
set :haml, { :attr_wrapper => '"', :format => :html5 }
set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true
set :build_dir, "public"

# Blogging
activate :blog do |blog|
  blog.name = 'posts'
  blog.prefix = "posts"
  blog.sources = "{year}/{month}-{day}-{title}.html"
  blog.permalink = "{year}/{month}/{title}.html"
  blog.layout = "post"
  blog.paginate = true
  blog.per_page = 10
  blog.default_extension = ".md"
  blog.calendar_template = "calendar.html"
  blog.generate_day_pages = false
  blog.summary_length = 100
end

# Projects
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

# Build-specific configuration
configure :build do
  # Minify HTML
  activate :minify_html do |html|
    html.remove_quotes = false
    html.remove_intertag_spaces = true
  end

  # Ignore the CSS file Middleman normally generates
  # Middleman expects `site.css.scss` → `site.css`
  # We strip the `.css` to prevent Gulp generating `site.css.css`
  # Add your site's main `.scss` filename (without the extension)
  # To understand more, comment this out and run `middleman build`
  ignore 'stylesheets/app'
  ignore 'javascripts/app'

  # Check to see if Gulp file revving is enabled
  rev_manifest = REV_MANIFEST if defined?(REV_MANIFEST)

  # If file revving is enabled we need to ignore the original files
  # as they will still get copied by Middleman
  if rev_manifest
    rev_manifest.each do |key, value|
      ignore key
    end

    # Ignore the actual manifest file itself
    ignore 'rev-manifest.json'
    ignore 'static/*'
  end
end

activate :external_pipeline,
  name: :gulp,
  command: build? ? 'npm run production' : 'npm run gulp',
  source: ".tmp",
  latency: 1
