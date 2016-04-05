# Add Custom helpers
require 'lib/blog_helper'
require 'lib/embed_helper'
require 'lib/images_helper'
require 'lib/menu_helper'
require 'lib/sitemap_helper'
require 'lib/ui_helper'

# Per-page layout changes with no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Pretty URLs
activate :directory_indexes

# Language Support
set :haml, { :format => :html5 }
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

  ignore 'stylesheets/app'
end

activate :external_pipeline,
  name: :gulp,
  command: build? ? 'npm run production' : 'npm run gulp',
  source: ".tmp",
  latency: 1
