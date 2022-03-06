
import "./helping_hand/01_Specs_login"


describe('Chaeck Balance Use Case Test', () => {

  // Test for either component loaded or not
  it('Test check Balance component loaded', () => {

    // Initiate check balance
    cy.get('button[id=checkBalance]').click()

    cy.url().should('include', 'checkbalancedetails');

    cy.contains("Account Balances")

  })

  //check for table displayed or not

  it('Test for proper table loaded', () => {

    cy.contains("Account Number")
    cy.contains("Available Balance")
    cy.contains("Limit Balance")
    cy.contains("Lien Amount")
    cy.contains("Total Effective Balance")
  })

  it ("Validate the Balance Data", () => {

    let data = JSON.parse(atob(sessionStorage.getItem('ac_data') || '{}'))

    if (data.length <= 0){
      cy.log("[NoDATA FOUND] Session storage is empty")
    }

    else{

      //console.log(JSON.stringify(data))

      for (var i = 0; i < data.length; i+=1){

        // cy.get('table').contains('td', data[i]['account_id']).then((ele) => {
        //   console.log("")
        //   expect(ele[0].innerText).to.equal(data[i]['account_id'])
        // })

        cy.get('table').contains('td', data[i]['account_id'])
        cy.get('table').contains('td', data[i]['balance_amount'])
        cy.get('table').contains('td', data[i]['limit_amount'])
        cy.get('table').contains('td', data[i]['lien_amount'])
        cy.get('table').contains('td', data[i]['currency'])
        cy.get('table').contains('td', data[i]['effective_balance'])
      }

    }



  })

  // return page test
  it('Ok Button working', ()=>{

    // click button
    cy.get('#homeBtn').click()

    cy.url().should('include', 'main')
  })

})
