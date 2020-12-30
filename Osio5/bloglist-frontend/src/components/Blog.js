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
        <p>{blog.title} <button onClick={() => setVisible(!visible)}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick = {likeBlog}>like</button></p>
        <p>{blog.author}</p>
        {removeButton()}
      </div>
    )}

  return (
    <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>view</button></p>
    </div>
  )
}

export default Blog
