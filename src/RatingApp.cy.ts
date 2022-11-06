import { allProducts } from './ProductModel';
import RatingApp from './RatingApp.vue';

describe('RatingApp', () => {
  beforeEach(() => cy.mount(RatingApp, { props: { products: allProducts } }));

  describe('Elements', () => {
    it('should render title', () => {
      cy.get('h1').should('have.text', 'Vite - Vue.js');
    });

    it('should render Vite product card', () => {
      cy.get('#vite').should('exist');
      cy.get('#vite a').should('have.text', 'Vite');
      cy.get('#vite a').should('have.attr', 'href', 'https://vitejs.dev/');
    });

    it('should render Vue.js product card', () => {
      cy.get('#vue').should('exist');
      cy.get('#vue a').should('have.text', 'Vue.js');
      cy.get('#vue a').should('have.attr', 'href', 'https://vuejs.org/');
    });

    it('should render Overall Satisfaction card', () => {
      cy.get('#overall-satisfaction').should('exist');
      cy.get('#overall-satisfaction h2').should('have.text', 'Overall Satisfaction');
    });
  });

  describe('Star Rating', () => {
    it('Overall Satisfaction has average satisfaction of products', () => {
      cy.getStar('vite', 1).click();
      cy.getStar('vue', 1).click();
      cy.getStar('overall-satisfaction', 1).should('have.class', 'checked');
      cy.getStar('overall-satisfaction', 2).should('not.have.class', 'checked');

      cy.getStar('vue', 2).click();
      cy.getStar('overall-satisfaction', 1).should('have.class', 'checked');
      cy.getStar('overall-satisfaction', 2).should('not.have.class', 'checked');

      cy.getStar('vue', 3).click();
      cy.getStar('overall-satisfaction', 2).should('have.class', 'checked');
      cy.getStar('overall-satisfaction', 3).should('not.have.class', 'checked');

      cy.getStar('vue', 4).click();
      cy.getStar('overall-satisfaction', 2).should('have.class', 'checked');
      cy.getStar('overall-satisfaction', 3).should('not.have.class', 'checked');

      cy.getStar('vue', 5).click();
      cy.getStar('overall-satisfaction', 3).should('have.class', 'checked');
      cy.getStar('overall-satisfaction', 4).should('not.have.class', 'checked');
    });
  });
});
