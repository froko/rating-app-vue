import SatisfactionStar from './SatisfactionStar.vue';

describe('Satisfaction Star', () => {
  beforeEach(() => {
    const starClickSpy = cy.spy().as('starClickSpy');
    cy.mount(SatisfactionStar, {
      props: {
        productId: 'cypress',
        position: 2,
        checked: false,
        clickable: true,
        onStarClick: starClickSpy
      }
    });
  });

  it('emits on click', () => {
    cy.get('#cypress-2').click();
    cy.get('@starClickSpy').should('have.been.calledWith', { productId: 'cypress', rating: 2 });
  });
});
