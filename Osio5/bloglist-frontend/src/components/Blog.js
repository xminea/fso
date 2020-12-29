import React, { useState } from 'react'

const Blog = ({ blog, username, likeBlog, removeBlog}) => {
  
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const removeButton = () => {
    if (blog.user && username === blog.user.username) {
        return <button onClick={removeBlog}>remove</button>
    } else {
        return null
    }
}

  if (visible) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setVisible(!visible)}>hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes} <button onClick = {likeBlog}>like</button>
        <br />
        {blog.author}
        <br />
        {removeButton()}
      </div>
    )}

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>view</button>
    </div>
  )
}

export default Blog
