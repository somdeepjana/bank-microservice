import "./03_specs_transfer_page_1"

describe('Transfer Amount Entering Page-Test', () => {

  const vlaidBalace = 1
  const invlidBalances = [-100, 0]
  const overDueBalance = 1000000000

  it ('Test Balance Entering Page loaded or not', () => {

    cy.url().should('include', 'transactipon-page2')
    cy.contains('Enter Amount Details')
    cy.get('select[name=transferCurrency]').contains('USD')

  })


  it ('Test for invalid amount entry', () => {

    invlidBalances.forEach((ele) => {

      cy.get('input[name=amount]').clear()
      cy.get('input[name=amount]').type(String(ele))

      cy.get('#transferPage2SubmitBtn').click()

      cy.contains('Plaese enter valid amount');
    })
  })

  it ('Test For Insufficient Balance', () => {

    cy.get('input[name=amount]').clear()
    cy.get('input[name=amount]').type(String(overDueBalance))

    cy.get('#transferPage2SubmitBtn').click()

    cy.contains('Not enoughbalance');
  })

  it ('Test for valid amount entry', () => {

    cy.get('input[name=amount]').clear()
    cy.get('input[name=amount]').type(String(vlaidBalace))

    cy.get('#transferPage2SubmitBtn').click()

  })


})
