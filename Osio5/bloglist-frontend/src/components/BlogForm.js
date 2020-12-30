import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')

  const handleBlogChange = async (event) => {
    console.log(newBlog)
    const target = event.target
    const n = target.name
    setNewBlog({...newBlog, [n]: target.value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })

    setNewBlog({ title: "", author: "", url: ""})
  
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: 
          <input
            id="title"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleBlogChange}
          />
        </div>
        <div>
          author: 
          <input
            id="author"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleBlogChange}
            />
        </div>
        <div>
          url: 
          <input
            id="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleBlogChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm