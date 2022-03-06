
import "./01_Specs_login"

describe('Transfer Use Case Test Page-1', () => {

  const fromAccount = '00001'
  const invalidToAccount = '11111'
  const validToAccount = '00003'

  // transfer page
  it('check for transfer page loaded', ()=>{

    // go to transfer page
    cy.get('button[id=transfer]').click()

    //verify transfer page loaded
    cy.url().should('include', 'transferamount')

  })

  // Test for false submit button click
  it ('Not Selecting From Account ', ()=>{

    //const stub = cy.stub()
    cy.on('window:alert', (str) => {
      expect(str).to.equal("Please select the from account id")
    })

    cy.get('button[id=transferSubmittButotn]').click()

  })


  // Account selection
  it('Select From Account From Drop Down', () => {

    //seect from account
    cy.get('select[id=fromAccountNumber]').select(fromAccount);

  })


  it ('Test For Entering Invalid Account', ()=>{

    //enter to account
    cy.get('input[name=toAccountNumber]').type(invalidToAccount);

    // initiate click
    cy.get('button[id=transferSubmittButotn]').click();

    //check for error
    cy.contains('To Account Is Invalid');
  })

  it ('Enter Valid To Account and Go to Nect Page', () => {

    //erase old data
    cy.get('input[name=toAccountNumber]').clear()

    //enter to account
    cy.get('input[name=toAccountNumber]').type(validToAccount);

    // initiate click
    cy.get('button[id=transferSubmittButotn]').click();

    //verify correct page is visited or not
    cy.url().should('include', 'transactipon-page2')

  })
})
