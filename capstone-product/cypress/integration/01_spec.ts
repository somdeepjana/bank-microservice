describe('AuthenticationCheck', () => {
  const testUserName = 'user1'
  const testUserPassword = 'user1'

  const invalidtestUserName = 'user'
  const invalidtestUserPassword = 'user'

  it ('Vivit site', () => {
    cy.visit('http://localhost/')
  })

  it('Visits the home page', () => {
    cy.contains("Login")
    expect(2).to.equal(2)
  })

  it ('Redirect to auth page', () => {
    cy.url().should('include', 'auth')
    cy.contains('Username or email')

  })

  //Empty submission
  it ('Null sumbmission', () => {

    try{
      cy.get('input[type=submit]').click()

      cy.contains('An error occurred, please login again through your application.')
    }
    catch{
      cy.contains('An error occurred, please login again through your application.')
    }

  })

  //Login wit invalid User name and Password
  it ('Login with invalide user name and password', () => {

    cy.visit('http://localhost/')

    // Fill the form
    cy.get("input[name=username]").type(invalidtestUserName);
    cy.get("input[name=password]").type(invalidtestUserPassword);
    cy.get("input[type=submit]").click();

    cy.contains('Invalid username or password')

  })

  //Login wit invalid Username
  it ('Login with invalide user', () => {

    cy.visit('http://localhost/')

    // Fill the form
    cy.get("input[name=username]").type(invalidtestUserName);
    cy.get("input[name=password]").type(testUserPassword);
    cy.get("input[type=submit]").click();

    cy.contains('Invalid username or password')

  })

  //Login wit invalid User Password
  it ('Login with invalide password', () => {
    cy.visit('http://localhost/')
    // Fill the form
    cy.get("input[name=username]").type(testUserName);
    cy.get("input[name=password]").type(invalidtestUserPassword);
    cy.get("input[type=submit]").click();

    cy.contains('Invalid username or password')

  })

  // it ('Login with valid credential', () => {

  //   cy.login();

  // })

  // // Login valid user Test
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
