import "./helping_hand/06_specs_ministatements_page_1"

describe('Ministatement Functionality Test Page-2', () => {

  const fromAccount = '00001'
  const validToAccount = '00003'
  const vlaidBalace = 1
  const currenncy = 'USD'

  it ('Check Page Visited page is proper or not', () => {

    cy.url().should('include', 'ministatementdetails');
    //cy.get('h3').should('have.text', 'Transaction Details')

  })

  it ('Check the account loaded is correct', () => {
    cy.get('#accountNumber').should('have.text', fromAccount)
  })

  it ('Ok Button Functionality Test', () => {
    cy.get('#transferReturnButton').click()

    cy.url().should('include', 'ministatementmain')
  })

  it ('Go to Home page', () => {

    cy.get('#homeBtn').click();
    cy.url().should('include', 'main')
  })
})
