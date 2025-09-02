describe('Submit Contact form', () => {
  beforeEach(() => {
    // Stub the backend to avoid external dependencies during e2e
    cy.intercept('POST', '**/functions/v1/submit-contact*', {
      statusCode: 200,
      body: { ok: true },
    }).as('submitContact')
  })

  it('fills and submits successfully', () => {
    cy.visit('/')

    // Ensure the section is rendered (lazy components may need scroll)
    cy.get('section#contact').scrollIntoView()

    // Fill required fields
    cy.get('section#contact input#name').clear().type('Test User')
    cy.get('section#contact input#contact-email').clear().type('test@example.com')
    cy.get('section#contact input#contact-phone').clear().type('555-0000')
    cy.get('section#contact textarea#message').clear().type('Hello from Cypress')

    // Submit
    cy.get('section#contact form').within(() => {
      cy.contains('button', /send message/i).click()
    })

    // Verify call and success UI
    cy.wait('@submitContact')
    cy.get('section#contact').contains(/Message Received!/i)
  })
})
