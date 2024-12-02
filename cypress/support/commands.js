Cypress.Commands.add('login', (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit('/');
      cy.get("[data-cy='login-btn']").click();
      cy.get("[data-cy='email']").type(email);
      cy.get("[data-cy='password']").type(password);
      // submit
      cy.get("[data-cy='login-submit-btn']").click();
    },
    {
      validate() {
        // validate the session to make sure login has finished
        // this command will also run to restore a session
        cy.visit('/')
        cy.get("[data-cy='logout-btn']").should('be.visible').and('contain', 'Logout')
      }
    }
  )
});