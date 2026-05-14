describe('Auth Flow', () => {
  // using timestamps to achieve unique user names for later review
  const timestamp = Date.now();
  const testUserWithHousehold = {
    email: `cy_house_user_${timestamp}@test.com`,
    password: 'cool_password_bro',
    createHousehold: true 
  }

  const testUserWithoutHousehold = {
    email: `cy_nohouse_user_${timestamp}@test.com`,
    password: 'hey_thanks_bro',
    createHousehold: false
  }


  /*********** failed logins **************/
  // malformed email


  // invalid credentials
  it('fails to sign in via invalid credentials', () => {
    cy.visit('/');
    cy.contains('a','Login').click();

    cy.get('input[type="email"]').type(testUserWithHousehold.email);
    cy.get('input[type="password"').type("1234");
    cy.get('button[type="submit"]').click();

    cy.get('span.formError').should('be.visible').and('contain', 'Email or password is incorrect');
  });

});



// create a user


