describe('Homepage', () => {
  it('Document title should be Garage', () => {
    cy.visit('/');
    cy.contains('Cars at Service');
    cy.title().should('equal', 'Garage');
  });

  it('Page title should be Garage', () => {
    cy.visit('/');
    cy.contains('Cars at Service');
  });

  it('Click AddNew button should open new form', () => {
    cy.visit('/');
    cy.get('[data-testid="addNewCarAtService"]').click();
    cy.contains('Add a car to service');
  });
});