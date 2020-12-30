describe('Blog ', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
          }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('front page can be opened', function() {
        cy.contains('Blogs')
    })
    it('login is shown', function() {
        cy.contains('login')

    })
    describe('Login',function() {
        it('login fails with wrong password', function() {
            cy.contains('login')
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
        
            cy.contains('wrong username or password')
        })
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
    
            cy.contains('Matti Luukkainen logged in')
        })
        
    })

    describe('when logged in', function() {
        beforeEach(function() {
          cy.contains('login')
          cy.get('#username').type('mluukkai')
          cy.get('#password').type('salainen')
          cy.get('#login-button').click()
          
          cy.contains('Matti Luukkainen logged in')
        })
    
        it('a new blog can be created', function() {
          cy.contains('new blog').click()
          cy.contains('Create new')
          cy.get('#title').type('Pekan muistelmat')
          cy.get('#author').type('Pekka Pouta')
          cy.get('#url').type('pekkanet.fi')
          cy.contains('create').click()
          cy.contains('Pekan muistelmat')
        })

        it.only('a blog can be deleted', function() {
            //cy.contains('new blog').click()
            //cy.contains('Create new')
            const blog = {
                title: "Pekan muistelmat 1",
                author: "Pekka Pouta",
                url: "pekkanet.fi"
            }

            const blog1 = { ...blog, likes: 0}
            const blog2 = { ...blog, likes: 1}
            const blog3 = { ...blog, likes: 100}

            cy.createBlog(blog1, blog2, blog3)
            cy.visit('http://localhost:3000')
            cy.contains('Pekan muistelmat 1')

            cy.get('.view-button').then( buttons => {
                var i = 0
                for (i; i < buttons.length; i++) {
                  cy.wrap(buttons[i]).click()
                }
            })

            cy.get('.blog').then( blogs => {
                cy.wrap(blogs[0]).contains('likes: 100')
                cy.wrap(blogs[1]).contains('likes: 1')
                cy.wrap(blogs[2]).contains('likes: 0')
            })
            
          })
      })
    
})