import "./01_Specs_login"

describe('Ministatemnt Use case Testing Page-1', () => {

  const validAccID = '00001'

  it ('Ministatement Button functionality', () => {

    cy.get('#ministatement').click()

    cy.url().should('include', 'ministatementmain')
  })

  it ('Dorpdown Invalid Selection Test', () => {

    //const stub = cy.stub()
    cy.on('window:alert', (str) => {
      expect(str).to.equal("Please select account number")
    })

    cy.get('button[id=miniStatementButton]').click()

  })

  it ('Select from drop down', () => {

    cy.get('select[name=mini_accountNumber]').select(validAccID);

  })

  it ('Click next Button Functionality test', () => {

    cy.get('button[id=miniStatementButton]').click()

  })

  it ('Check if page is redirected or not', () => {
    cy.url().should('include', 'ministatementdetails')
  })

})
