require 'lib/package'
require 'lib/gulp'

# Per-page layout changes with no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

ignore 'public/npm-debug.log'

# Pretty URLs
activate :directory_indexes

# Language Support
set :haml, { :attr_wrapper => '"', :format => :html5 }
set :markdown, fenced_code_blocks: true, smartypants: true
set :build_dir, "public"

# Markdown options
set :markdown_engine, :redcarpet
set :markdown, :tables => true, :autolink => true, :gh_blockcode => true, :fenced_code_blocks => true, with_toc_data: true

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
  blog.summary_length = 250
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
