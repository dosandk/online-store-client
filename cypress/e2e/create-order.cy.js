const getIframeBody = () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return cy.get('#checkout iframe', { timeout: 20000 })
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap)
}

describe('Create Order Flow', () => {
  beforeEach(() => {
    // login user before every test
    cy.login('foo@bar.com', 'Qwerty123');
    cy.visit('/');
    // add 3 products to cart
    cy.get("[data-cy='add-to-cart-btn']").filter(":lt(3)").each($el => {
      cy.wrap($el).click();
    });
    // go to cart
    cy.get("[data-cy='cart-btn']").click();
    // make an order
    cy.get("[data-cy='order-btn']").click();
  })

  it('should successfully submits payment form and creates an order', () => {
    // fill in the form
    getIframeBody().find('#cardNumber', { timeout: 60000 }).type("4242 4242 4242 4242");
    getIframeBody().find('#cardExpiry').type("01 / 25");
    getIframeBody().find('#cardCvc').type(111);
    getIframeBody().find('#billingName').type('Foo Bar');
    // submit the form
    getIframeBody().find(".SubmitButton:submit").click();

    // check results
    cy.url({ timeout: 20000 }).should('include', Cypress.env('payment_status_url'));
    cy.contains('Payment successfully passed');
  })

  it('should not submit a payment form if payment details are invalid', () => {
    // insert incorrect credit card number
    getIframeBody().find('#cardNumber', { timeout: 60000 }).type("4242 4242");
    getIframeBody().find(".SubmitButton:submit").click();
    // check errors
    getIframeBody().contains('Your card number is incomplete.');
    getIframeBody().find('#cardNumber').clear();

    // insert incorrect credit card cvc
    getIframeBody().find('#cardCvc').type(11);
    getIframeBody().find(".SubmitButton:submit").click();
    // check errors
    getIframeBody().contains("Your card's security code is incomplete.");
    getIframeBody().find('#cardCvc').clear();

    // insert incorrect credit card expiration date
    getIframeBody().find('#cardExpiry').type("01 / 21");
    getIframeBody().find(".SubmitButton:submit").click();
    // check errors
    getIframeBody().contains("Your card's expiration year is in the past.");
    getIframeBody().find('#cardExpiry').clear();

    // empty form submit should not redirect
    cy.url().should('not.include', Cypress.env('payment_status_url'));
  })
})