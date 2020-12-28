import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: ""})
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('green')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }
  
    blogService
      .create(blogObject, user.token)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({ title: "", author: "", url: ""})
      })
    setMessage(`a new blog ${blogObject.title} added`)
    setMessageColor('green')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  

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

  const handleBlogChange = async (event) => {
    console.log(newBlog)
    const target = event.target
    const n = target.name
    setNewBlog({...newBlog, [n]: target.value })
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: 
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleBlogChange}
          />
        </div>
        <div>
          author: 
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleBlogChange}
            />
        </div>
        <div>
          url: 
          <input
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
      <button onClick={handleLogout}>Logout</button>
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
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
        </div>
        
      }

      
    </div>
  )
}

export default App
