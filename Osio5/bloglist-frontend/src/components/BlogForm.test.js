import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(title, { 
    target: { value: 'testi' } 
  })
  fireEvent.change(author, { 
    target: { value: 'pekka' } 
  })
  fireEvent.change(url, { 
    target: { value: 'pekkanet.fi' } 
  })

  fireEvent.submit(form)
  const res = createBlog.mock.calls[0][0]
  expect(res.title).toBe('testi')
  expect(res.author).toBe('pekka')
  expect(res.url).toBe('pekkanet.fi')

})