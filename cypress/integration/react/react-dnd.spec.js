import "@4tw/cypress-drag-drop";

describe('Dragtest', () => {
  it('should dragndrop', () => {
    cy.visit('http://localhost:3000');
  });

  it("should dragndrop ingredients to constructor", () => {
    cy.get('[class*=constructor_constructor__ingredients]').as('dropContainer');
    cy.get('[class*=ingredient_cart__ingredient]').as('cards');

    cy.get('@cards')
      .contains('Краторная булка N-200i')
      .trigger('dragstart');
    cy.get('@dropContainer').trigger('drop');

    cy.get("@cards")
      .contains("Соус фирменный Space Sauce")
      .drag("@dropContainer");

    cy.get("@cards")
      .contains("Сыр с астероидной плесенью")
      .drag("@dropContainer");

    cy.get("@cards")
      .contains("Мясо бессмертных моллюсков Protostomia")
      .drag("@dropContainer");

    cy.get("@cards")
      .contains("Соус с шипами Антарианского плоскоходца")
      .drag("@dropContainer");

  });

});
