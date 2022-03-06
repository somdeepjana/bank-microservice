describe('Loginvalidate', () => {

  const testUserName = 'user1'
  const testUserPassword = 'user1'

  it('Visit Auth page', () => {

    cy.visit('http://localhost/')

  })

  it ('Verify Login Page', () => {

    cy.url().should('include', 'auth')
    cy.contains('Username or email')

  })

  it('Login to the site', () => {

    cy.visit('http://localhost/')

    // Fill the form
    cy.get("input[name=username]").type(testUserName);
    cy.get("input[name=password]").type(testUserPassword);
    cy.get("input[type=submit]").click();

    cy.wait(10000)
    // cy.url().should('include', 'main')
    // cy.contains('Home')
    // cy.contains('Logout')

  })

  it ('Verify in main page', () => {

    cy.url().should('include', 'main')
    cy.contains('Home')
    cy.contains('Logout')

  })

})
