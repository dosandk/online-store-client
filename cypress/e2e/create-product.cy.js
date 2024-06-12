describe('Create Product Flow', () => {
  beforeEach(() => {
    // login user before every test
    cy.login('foo@bar.com', 'Qwerty123');
    // navigate to create product page
    cy.visit(Cypress.env('create_product_url'));
  })

  it('should successfully create a product', () => {
    const product_title = 'Test product 123';
    const product_price = 1000;

    // fill the form
    // should("not.be.disabled") is a HACK for a slow network
    // cypress will wait for the form to be fully operatonal
    // otherwise cypress won't be able to type anything
    // also, you can use type(product_title, {force: true}) but then other inputs will fail
    cy.get("[data-cy='title']").should("not.be.disabled").type(product_title);
    cy.get("[data-cy='price']").clear().type(product_price);
    cy.get("[data-cy='brand']").select(2).should('have.value', 'apple');
    cy.get("[data-cy='rating']").invoke("val", 4)
    cy.get("[data-cy='category']").select(1).should('have.value', 'laptops');
    // upload dummy image to pass input validation
    // the real request to imgur is intercepted below
    cy.get("[data-cy='image']").selectFile({
      contents: Cypress.Buffer.from('file contents'),
      fileName: 'example.png',
      mimeType: 'image/png',
      lastModified: Date.now(),
    });

    // intercept requests to imgur in order to not upload a real image
    cy.intercept('POST', 'https://api.imgur.com/**', {
      data: {
        link: 'https://i.imgur.com/huOsvQS.png'
      },
    });

    // intercept form submit request
    cy.intercept('POST', '/api/shop/products').as('createProduct');

    // submit form
    cy.get("[data-cy='create-product-submit-btn']").click();

    // wait a form submit to finish
    cy.wait('@createProduct');

    // check everything is correct
    // observe successfull notification
    cy.get("[data-cy='alert']").should('be.visible').and('contain', 'Product was successfully created.');
    // check the product appeared on the list on the home page
    cy.visit('/')
    cy.get("[data-cy='products-list']").should('contain', product_title);
    cy.get("[data-cy='products-list']").should('contain', product_price);
  })

  it('should display errors if the data is invalid', () => {
    // don't provide any data, just press 'submit' right away and observe errors
    cy.get("[data-cy='create-product-submit-btn']").click();
    // check errors
    cy.get("[data-cy='create-product-form']").should('contain', 'Please fill title');
    cy.get("[data-cy='create-product-form']").should('contain', 'Please choose product image');
  })
})