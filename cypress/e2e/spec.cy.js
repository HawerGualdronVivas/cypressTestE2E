describe('Login Test', () => {
  it('Visits Saucedemo and logs in', () => {
    cy.visit('/'); // Navega a la URL base configurada en cypress.json

    //Verificar inicio de sesión con el nombre de usuario incorrecto 
    cy.get('[data-test=username]').type('stand_user'); //escribir stand_user en lugar de of standard_user
    cy.get('[data-test=password]').type('secret_sauce'); //contraseña correcta
    cy.get('[data-test=login-button]').click();
    cy.get('[data-test="error"]').should('exist');
    cy.wait(500);

    //Verificar inicio de sesión con una contraseña no valida
    cy.reload();
    cy.get('[data-test=username]').type('standard_user'); // nombre de usuario valido
    cy.get('[data-test=password]').type('secretsauce'); //contraseña incorrecta
    cy.get('[data-test=login-button]').click();
    cy.get('[data-test="error"]').should('exist');
    cy.wait(500);

    //Verificar el login correctamente
    cy.reload();
    cy.get('[data-test=username]').type('standard_user');
    cy.get('[data-test=password]').type('secret_sauce');
    cy.get('[data-test=login-button]').click();
    cy.url().should('include', '/inventory.html'); // Verifica que la URL incluya /inventory.html


    //Verificar la función de cierre de sesión
    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').click();
    cy.get('[data-test=login-button]').should('exist');
    cy.wait(500);

    //Verificar si puede añadir un producto al carrito
    cy.get('[data-test=username]').type('standard_user');
    cy.get('[data-test=password]').type('secret_sauce');
    cy.get('[data-test=login-button]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('exist');
    cy.wait(500);

    //Verificar si se puede eliminar un producto del carrito
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('not.exist');
    cy.wait(500);

    //Verificar si se puede realizar un pedido y pagar
    cy.get('[data-test="continue-shopping"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();

    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('Hawer');
    cy.wait(500);
    cy.get('[data-test="lastName"]').type('Gualdron');
    cy.wait(500);
    cy.get('[data-test="postalCode"]').type('150003');
    cy.wait(500);
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="complete-header"]').should('exist');
    cy.wait(500);

    //Ordernar productos
    cy.get('[data-test="back-to-products"]').click();
    cy.get('[data-test="product-sort-container"]').should('exist');
    cy.get('[data-test="product-sort-container"]').select('az');
    cy.wait(500);
    // lista de todos los nombres de los productos
    cy.get('.inventory_item_name').then($products => {
      const productNames = $products.map((index, element) => Cypress.$(element).text()).get();

      // Verifica que los nombres de los productos estén ordenados de forma ascendente
      const sortedProductNames = [...productNames].sort((a, b) => a.localeCompare(b));
      expect(productNames).to.deep.equal(sortedProductNames);
    });
    cy.wait(500);

    cy.get('[data-test="product-sort-container"]').select('za');
    cy.wait(500);
    cy.get('.inventory_item_name').then($products => {
      const productNames = $products.map((index, element) => Cypress.$(element).text()).get();

      // Verifica que los nombres de los productos estén ordenados de forma descendente
      const sortedProductNames = [...productNames].sort((a, b) => b.localeCompare(a));
      expect(productNames).to.deep.equal(sortedProductNames);
    });
    cy.wait(500);

    cy.get('[data-test="product-sort-container"]').select('lohi');
    cy.wait(500);
    cy.get('.inventory_item').then($products => {
      const productsInfo = $products.map((index, element) => {
        const productName = Cypress.$(element).find('.inventory_item_name').text();
        const productPriceText = Cypress.$(element).find('.inventory_item_price').text();
        // Elimina el símbolo de "$" y convierte el precio en un número
        const productPrice = parseFloat(productPriceText.replace('$', ''));
        return { name: productName, price: productPrice };
      }).get();

      // Verifica que los productos estén ordenados correctamente por costo de bajo a alto
      const sortedProducts = [...productsInfo].sort((a, b) => a.price - b.price);
      expect(productsInfo).to.deep.equal(sortedProducts);
    });
    cy.wait(500);

    cy.get('[data-test="product-sort-container"]').select('hilo');
    cy.wait(500);
    cy.get('.inventory_item').then($products => {
      const productsInfo = $products.map((index, element) => {
        const productName = Cypress.$(element).find('.inventory_item_name').text();
        const productPriceText = Cypress.$(element).find('.inventory_item_price').text();
        // Elimina el símbolo de "$" y convierte el precio en un número
        const productPrice = parseFloat(productPriceText.replace('$', ''));
        return { name: productName, price: productPrice };
      }).get();

      // Verifica que los productos estén ordenados correctamente por costo de bajo a alto
      const sortedProducts = [...productsInfo].sort((a, b) => b.price - a.price);
      expect(productsInfo).to.deep.equal(sortedProducts);
    });
    cy.wait(500);

    //Veirificar si se puede realizar una Navegacion de Productos
    cy.get('[data-test="item-5-title-link"] > [data-test="inventory-item-name"]').click();
    cy.get('[data-test="back-to-products"]').should('exist');
    cy.get('[data-test="back-to-products"]').click();

    cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click();
    cy.get('[data-test="back-to-products"]').click();

    cy.get('[data-test="item-0-title-link"] > [data-test="inventory-item-name"]').click();
    cy.get('[data-test="back-to-products"]').click();

    cy.get('[data-test="item-1-title-link"] > [data-test="inventory-item-name"]').click();
    cy.get('[data-test="back-to-products"]').click();

    cy.get('[data-test="item-2-title-link"] > [data-test="inventory-item-name"]').click();
    cy.get('[data-test="back-to-products"]').click();

    cy.get('[data-test="item-3-title-link"] > [data-test="inventory-item-name"]').click();
    cy.get('[data-test="back-to-products"]').click();
  });
});
