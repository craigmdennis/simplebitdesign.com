desc "Export compiled build"
task :build do
  sh "bundle exec middleman build --clean"
end