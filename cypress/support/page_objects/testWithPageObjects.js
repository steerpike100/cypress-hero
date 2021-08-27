import { navigateTo } from "./navigationPage.js" 

describe('Test with Page Objects', () => {
  beforeEach('open application', () => {
    cy.visit('/')
  })

  it('verify navigation across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.toastrPage()
  })
})
