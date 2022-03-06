
import "./helping_hand/01_Specs_login"

describe("Logout Functionality Tst", () => {

  it ('Check Logout Button Functionality', () => {

    // Check in main page
    cy.url().should('include', 'main')

    // get logout ref
    cy.get('#logoutBtn').click()

  })

  it ('Check Redirected to auth page', () => {

    // it is in login screen
    cy.url().should('include', 'auth')

    // Check for prompt
    cy.contains('Username or email')
  })
})
