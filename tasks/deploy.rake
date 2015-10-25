namespace :deploy do
  def deploy(env)
    puts "Deploying to #{env}"
    system "TARGET=#{env} bundle exec middleman deploy"
  end

  task :push_to_staging do
    deploy :staging
  end

  task :staging => [:push_to_staging] do
    sh "cap staging deploy"
  end

  task :push_to_production do
    deploy :production
  end
end