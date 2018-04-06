describe('Popover', () => {
    before(() => {
        cy.visit('http://localhost:1234');
    });

    it('opens when clicking an avatar', () => {
        cy.get('[class*=avatar]').get('[class*=chosen]').click();

        cy.get('[class*=selector]').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
    });

    it('closes when selecting an avatar', () => {
        cy.get('[class*=avatar]:nth-child(2)').click();

        cy.get('[class*=selector]').should('have.css', 'transform', 'matrix(0, 0, 0, 0, 0, 0)');
    });
});

describe('URL', () => {
    before(() => {
        cy.visit('http://localhost:1234');
    });

    it('changes address on selecting a new avatar', () => {
        const id = 3;

        cy.get('[class*=avatar]').get('[class*=chosen]').click();
        cy.get(`[class*=avatar]:nth-child(${id})`).click();

        cy.url().should('include', `/${id - 1}`);
    });

    it('does not change on selecting the current avatar', () => {
        const id = 3;

        cy.get('[class*=avatar]').get('[class*=chosen]').click();
        cy.get(`[class*=avatar]`).get('[class*=selected]').click();

        cy.url().should('include', `/${id - 1}`)
    });
});

describe('Keys', () => {
    beforeEach(() => {
        cy.visit('http://localhost:1234');
    });

    it('can open the selector via space', () => {
        cy.get('body').type(' ');

        cy.get('[class*=selector]').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
    });
    
    it('can close the selector via space', () => {
        cy.get('body').type(' ');
        cy.wait(500);

        cy.get('body').type(' ');

        cy.get('[class*=selector]').should('have.css', 'transform', 'matrix(0, 0, 0, 0, 0, 0)');
    });

    it('can choose via the arrow keys and enter', () => {
        const id = 5;

        cy.get('body').type(' ');
        cy.wait(500);

        cy.get('body').type('{rightarrow}'.repeat(id) + '{enter}');

        cy.url().should('include', `/${id - 1}`)
    });
});
