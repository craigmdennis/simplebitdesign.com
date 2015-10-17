# config valid only for Capistrano 3.1
lock '3.2.1'

# set :application, 'dev.simplebitdesign.com'
set :repo_url, 'git@bitbucket.org:simplebitdesign/clients.simplebitdesign.com.git'

# Default branch is :master
ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

server 'simplebitdesign.com', user: 'simplebitdesign.com', roles: %w{web app}

set :scm, :git
set :deploy_via, :remote_cache
set :copy_exclude, [".git", ".DS_Store", ".gitignore", ".gitmodules"]

require 'capistrano/cloudflare'

set :cloudflare_options, {
    :domain  => 'clients.simplebitdesign.com',
    :email   => 'craig@simplebitdesign.com',
    :api_key => '34608a81ac7e9ca5ebd797f5e0121fec4aa49'
}

namespace :content do

  desc 'Point content directory to Dropbox folder'
  task :symlink do
    on roles(:app), in: :groups do
      # execute "cd && ln -nfs 'current' 'html'"
      execute "cd #{release_path} && ln -nfs ../../shared/content content"
      execute "cd #{release_path}/site && ln -nfs #{shared_path}/accounts accounts"
      execute "cd #{release_path}/assets && ln -nfs #{shared_path}/avatars avatars"
    end
  end

end

namespace :deploy do

  after 'deploy:symlink:release', 'content:symlink'

  after 'deploy:publishing', 'gridserver:create_relative_symlinks'
  # after 'deploy:publishing', 'cloudflare:cache:purge'

end
