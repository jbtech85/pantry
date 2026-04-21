describe('Navbar', () => {
  it('contains ', () => {
    cy.visit('/');

    cy.get('nav', {timeout: 5000 }).should('be.visible');

    const expectedNavItems = ['Pantry', 'Grocery List', 'Past Items', 'Recipes'];

    cy.get('body').should('be.visible');

    cy.get("nav > ul > li").each(($navItem, index) => {
      cy.wrap($navItem).should('contain.text', expectedNavItems[index]);
    });
      
  });
});