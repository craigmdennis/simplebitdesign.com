module BlogHelper
  def projects
    blog("projects").articles
  end
  def posts
    blog("posts").articles
  end
end
