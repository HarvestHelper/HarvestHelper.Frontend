describe('User Tests', () => {
  beforeEach(() => {
    cy.visit('https://harvesthelper.westeurope.cloudapp.azure.com');
  });

  it('User Login', function() {
    cy.get(':nth-child(2) > .nav-link').click();
    cy.get('#Input_Email').clear('A');
    cy.get('#Input_Email').type('Cypresstest@harvesthelper.com');
    cy.get('#Input_Password').clear('P');
    cy.get('#Input_Password').type('Pass@word1');
    cy.get('#login-submit').click();

    cy.get('h1').should('have.text', 'HarvestHelper');
    cy.get(':nth-child(1) > :nth-child(2) > div > :nth-child(2)').should('have.text', 'Welcome to the HarvestHelper website.');
    cy.get('.mr-auto > [href="/users"]').should('not.exist');
    cy.get('.mr-auto > [href="/equipmentinventory"]').should('have.text', 'My EquipmentInventory');
  });

  it('User View Equipment', function() {
    cy.get(':nth-child(2) > .nav-link').click();
    cy.get('#Input_Email').clear('A');
    cy.get('#Input_Email').type('Cypresstest@harvesthelper.com');
    cy.get('#Input_Password').clear('P');
    cy.get('#Input_Password').type('Pass@word1');
    cy.get('#login-submit').click();
    cy.get('.mr-auto > [href="/equipmentinventory"]').click();
    cy.get('th').should('have.text', 'Name');
  });
})