import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
//<Blog key={blog.id} blog={blog} username={user.name} likeBlog={() => likeBlog(blog.id)} removeBlog={() => removeBlog(blog)}/>

test('renders title and author, not url and likes', () => {
  const blog = {
    title: 'Sääennuste',
    author: 'Pekka Pouta',
    likes: 69,
    url: 'pekkanet.com'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Sääennuste Pekka Pouta'
  )
  expect(component.queryByText(blog.url)).toBeNull()
  expect(component.queryByText(blog.likes.toString())).toBeNull()
})