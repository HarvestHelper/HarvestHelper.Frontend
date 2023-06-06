describe('Admin Tests', () => {
  beforeEach(() => {
    cy.visit('https://harvesthelper.westeurope.cloudapp.azure.com');
  });

  it('Admin Login', function() {
    cy.get(':nth-child(2) > .nav-link').click();
    cy.get('#Input_Email').clear('A');
    cy.get('#Input_Email').type('Admin@harvesthelper.com');
    cy.get('#Input_Password').clear('P');
    cy.get('#Input_Password').type('Pass@word1');
    cy.get('#login-submit').click();

    cy.get('h1').should('have.text', 'HarvestHelper');
    cy.get(':nth-child(1) > :nth-child(2) > div > :nth-child(2)').should('have.text', 'Welcome to the HarvestHelper website.');
    cy.get('.mr-auto > [href="/users"]').should('have.text', 'Users');
  });

  it('Admin View Users', function() {
    cy.get(':nth-child(2) > .nav-link').click();
    cy.get('#Input_Email').clear('A');
    cy.get('#Input_Email').type('Admin@harvesthelper.com');
    cy.get('#Input_Password').clear('P');
    cy.get('#Input_Password').type('Pass@word1');
    cy.get('#login-submit').click();
    cy.get('.mr-auto > [href="/users"]').click();
    cy.get('.thead-dark > tr > :nth-child(1)').should('have.text', 'Id');
  });

  it('Admin View Equipment', function() {
    cy.get(':nth-child(2) > .nav-link').click();
    cy.get('#Input_Email').clear('A');
    cy.get('#Input_Email').type('Admin@harvesthelper.com');
    cy.get('#Input_Password').clear('P');
    cy.get('#Input_Password').type('Pass@word1');
    cy.get('#login-submit').click();
    cy.get('.mr-auto > [href="/equipment"]').click();
    cy.get('.thead-dark > tr > :nth-child(1)').should('have.text', 'Name');
  });

  it('Admin Create Equipment', function() {
    cy.get(':nth-child(2) > .nav-link').click();
    cy.get('#Input_Email').clear('A');
    cy.get('#Input_Email').type('Admin@harvesthelper.com');
    cy.get('#Input_Password').clear('P');
    cy.get('#Input_Password').type('Pass@word1');
    cy.get('#login-submit').click();
    cy.get('.mr-auto > [href="/equipment"]').click();
    cy.get('.thead-dark > tr > :nth-child(1)').should('have.text', 'Name');
    cy.get('.col > .btn').click();
    cy.get('.form-control').type('E2E Test CYPRESS Equipment');
    cy.get('form > .btn').click();
  });
})