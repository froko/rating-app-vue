import { MountOptions, MountReturn } from 'cypress/vue';

declare global {
  namespace Cypress {
    interface Chainable {
      mount(component: React.ReactNode, options?: MountOptions): Chainable<MountReturn>;
      getStar(id: string, position: number): Chainable<Subject>;
    }
  }
}
