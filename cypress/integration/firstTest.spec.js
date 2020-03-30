/// <reference types="cypress"/>

describe("Our second suite", () => {
  it('first test', () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //by Tag name
    cy.get("input");

    //by ID
    cy.get("#inputEmail1");

    //by Class name
    cy.get(".input-full-width");

    //by Attribute name
    cy.get("[placeholder]");

    //by Attribute name and value
    cy.get('[placeholder="Email"]');

    //by Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by Tag name and Attribute with value
    cy.get('input[placeholder="Email"]');

    //by mulitple different attributes
    cy.get('[placeholder="Email"][fullwidth][type="email"]');

    //by tag name, Attribute with value, ID and Class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //The most recommended way by Cypress
    cy.get('[data-cy="imputEmail1"]');
  });
  it('second test', () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="signInButton"]');

    cy.contains("Sign in");

    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it('then and wrap methods', () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    //Selenium style
    // const firstForm = cy.contains('nb-card', 'Using the Grid')
    // const secondForm = cy.contains('nb-card', 'Basic form')

    // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
    // firstForm.find('[for="inputPassword2"]').should('contain', 'Password')
    // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //Cypress Style
    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();

      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then(secondForm => {
        const passwordSecondText = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabelFirst).to.equal(passwordSecondText);

        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  it("invoke command", () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    //1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    //2 Get result of function and store in input variable lable as a JQuery element, use JQuery method text to get text from lable then make an assertion
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal("Email address");
    });

    //3 Use Cypress Invoke method to get text from page, saved as a parameter of the function then make assertion
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then(text => {
        expect(text).to.equal("Email address");
      });

    //4 Cypress with Invoke & native assertion
    cy.contains('nb-card', 'Basic form')
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      .should("contain", "checked");

    //5. Cypress & Chai with invoke
    cy.contains('nb-card', 'Basic form')
      .find("nb-checkbox")
      .find(".custom-checkbox")
      .invoke("attr", "class")
      .then(classValue => {
        expect(classValue).to.contain("checked");
      });
  });

  it('assert property', () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Datepicker").click();
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then(input => {
        cy.wrap(input).click();
        cy.get("nb-calendar-day-picker")
          .contains("30")
          .click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "Mar 30, 2020");
      });
    })

    it('radio buttons', () => {
        cy.visit("/");

        cy.contains('Forms').click();
        cy.contains('Form Layout').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons)
            .first()
            .check({force:true})
            .should('be.checked')

            cy.wrap(radioButtons )
            .eq(1)
            .check({force:true})

            cy.wrap(radioButtons)
            .first()
            .should('not.be.checked')

            cy.wrap(radioButtons)
            .eq(2)
            .should('be.disabled')
        })

    })

    it.only('check boxes', () =>{
        cy.visit("/");

        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click()
        //click method to work with check buttons
        cy.get('[type="checkbox"]').eq(1).click({force:true})
        //check to work with only checkbox and radio buttons
        cy.get('[type="checkbox"]').check({force:true})
    })
})



