import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
//<Blog key={blog.id} blog={blog} username={user.name} likeBlog={() => likeBlog(blog.id)} removeBlog={() => removeBlog(blog)}/>

describe('Element Blog', () => {
    const blog = {
        title: 'Sääennuste',
        author: 'Pekka Pouta',
        likes: 69,
        url: 'pekkanet.com'
      }
    let component
    const mockLike = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog blog={blog} likeBlog={mockLike} />
        )
    })
      
    test('renders title and author, not url and likes', () => {
        
      
        expect(component.container).toHaveTextContent(blog.title + ' ' + blog.author)
        expect(component.queryByText(blog.url)).toBeNull()
        expect(component.queryByText(blog.likes.toString())).toBeNull()
    })
      
    test('renders url and likes when opened', () => {
        const viewButton = component.getByText('view')

        fireEvent.click(viewButton)
        expect(component.container).toHaveTextContent(blog.title)
        expect(component.container).toHaveTextContent(blog.url)
        expect(component.container).toHaveTextContent(blog.likes)
        expect(component.container).toHaveTextContent(blog.author)
    })

    test('when like is pressed twice, like-function is called twice', () => {
        const viewButton = component.getByText('view')

        fireEvent.click(viewButton)
        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockLike.mock.calls).toHaveLength(2)
    })
})
