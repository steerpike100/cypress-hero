/// <reference types="Cypress" />

describe('Test with backend', () => {
    beforeEach('login to application', ()=>{
        cy.loginToApplication()
    })

    it('should login in', () =>{
        cy.log('Yeey we logged in')
    })
})