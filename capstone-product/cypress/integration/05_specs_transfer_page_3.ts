import "./helping_hand/04_specs_transfer_page_2"

describe('Transfer Status Display Page-Test', () => {

  const fromAccount = '00001'
  const validToAccount = '00003'
  const vlaidBalace = 1
  const currenncy = 'USD'

  it ('Check For correct page is loaded', () => {

    cy.url().should('include', 'transferamountdetails')

    cy.contains('Transaction Details')
  })

  it ('Check For Data is Loaded Properly or not', () => {

    //cy.contains(String(fromAccount))
    cy.get('#fromAccountNumber').should('have.text', fromAccount)
    cy.get('#toAccountNumber').should('have.text', validToAccount)


    cy.contains(String(vlaidBalace))
    cy.contains(String(currenncy))

  })

  it ('Ok button functionality check', () => {

    cy.get('#transferReturnButton').click()

    cy.url().should('include', 'transferamount')

  })

  it ('Go to Home Button Functionality Check', () => {
    cy.get('BUTTON[id=homeBtn]').click()

    cy.url().should('include', 'main')
  })

})
