describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://harvesthelper.westeurope.cloudapp.azure.com');
  });

  it('login', () => {
    cy.get('h1').should('have.text', 'HarvestHelper');
    cy.get(':nth-child(1) > :nth-child(2) > div > :nth-child(2)').should('have.text', 'Welcome to the HarvestHelper website.');
    cy.get(':nth-child(2) > .nav-link').click();
    cy.get('#Input_Email').type('admin@harvesthelper.com');
    cy.get('#Input_Password').type('Pass@word1');
    cy.get('#login-submit').click();
  })

  it('Has text', () => {
    cy.get('h1').should('have.text', 'HarvestHelper');
  })
})