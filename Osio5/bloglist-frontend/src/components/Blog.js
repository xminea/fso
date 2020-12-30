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
    if (blog.user && username === blog.user.name ) {
        return <button onClick={removeBlog}>remove</button>
    } else {
        return null
    }
  }

  if (visible) {
    return (
      <div class='blog' style={blogStyle}>
        <p>title: {blog.title} <button id='hide-button' onClick={() => setVisible(!visible)}>hide</button></p>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick = {likeBlog}>like</button></p>
        <p>author: {blog.author}</p>
        <p>{removeButton()}</p>
      </div>
    )}

  return (
    <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button class='view-button' onClick={() => setVisible(!visible)}>view</button></p>
    </div>
  )
}

export default Blog
