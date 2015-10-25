# Set Capistrano version
lock '3.4'

# require 'capistrano/cloudflare'

# set :cloudflare_options, {
#     :domain  => 'clients.simplebitdesign.com',
#     :email   => 'craig@simplebitdesign.com',
#     :api_key => '34608a81ac7e9ca5ebd797f5e0121fec4aa49'
# }

# set :application, 'dev.simplebitdesign.com'
set :repo_url, 'git@bitbucket.org:simplebitdesign/simplebitdesign.com.git'

# set :user, 'dhuser'  # Your dreamhost account's username
# set :domain, 'servername.dreamhost.com'  # Dreamhost servername where your account is located 
# set :project, 'myapp_name_from_repository'  # Your application as its called in the repository
# set :applicationdir, "/home/#{user}/#{application}"  # The standard Dreamhost setup

# Default branch is :master
ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

namespace :deploy do
  # after 'deploy:symlink:release', 'content:symlink'
  after 'deploy:publishing', 'gridserver:create_relative_symlinks'
  # after 'deploy:publishing', 'cloudflare:cache:purge'
end

server 'simplebitdesign.com', user: 'simplebitdesign.com', roles: %w{web app}

set :scm, :git
set :deploy_via, :remote_cache
set :copy_exclude, [
  ".git",
  ".DS_Store",
  ".gitignore",
  ".gitmodules",
  ".sass-cache",
  "imageoptim.manifest.yml"
]