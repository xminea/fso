import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('green')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject, user.token)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setMessage(`a new blog ${blogObject.title} added`)
    setMessageColor('green')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const likeBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        setMessage('Blog was already removed from the server')
        setMessageColor('red')
        setTimeout(() => {
          setMessage(null)
        }, 5000)  
      })
  }

  const removeBlog = async (blog) => {
    const message = `Remove blog ${blog.title} by ${blog.author}`
    if (window.confirm(message)) {
      try {
        await blogService.remove(blog.id)
        const blogList = blogs.filter((b) => b.id !== blog.id)
        setBlogs(blogList)
      } catch (error) {
        setMessage('error')
        setMessageColor('red')
        setTimeout(() => {
          setMessage(null)
        }, 5000) 
      }
    }
  };
  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('logged in succesfully')
      setMessageColor('green')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('wrong username or password')
      setMessageColor('red')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  const logOut = () => {

    const handleLogout = async (event) => {
      event.preventDefault()
      setUser(null)
      window.localStorage.clear()
      setMessage('logged out succesfully')
      setMessageColor('green')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

    return (
    <div>
      <button onClick={handleLogout}>log out</button>
    </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} color={messageColor}/>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {logOut()}         
          {blogForm()}
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
            <Blog key={blog.id} blog={blog} username={user.name} likeBlog={() => likeBlog(blog.id)} removeBlog={() => removeBlog(blog)}/>
          )}
        </div>
      }

      
    </div>
  )
}

export default App
