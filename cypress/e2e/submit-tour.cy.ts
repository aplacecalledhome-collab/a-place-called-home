describe('Schedule Tour form', () => {
  beforeEach(() => {
    // Stub the backend to avoid external dependencies during e2e
    cy.intercept('POST', '**/functions/v1/submit-tour*', {
      statusCode: 200,
      body: { ok: true },
    }).as('submitTour')
  })

  it('fills and submits successfully', () => {
    cy.visit('/')

    // Scroll to lazily-rendered section
    cy.get('section#schedule-tour').scrollIntoView()

    // Fill required personal info
    cy.get('section#schedule-tour input#firstName').clear().type('Test')
    cy.get('section#schedule-tour input#lastName').clear().type('User')
    cy.get('section#schedule-tour input#tour-email').clear().type('test@example.com')
    cy.get('section#schedule-tour input#tour-phone').clear().type('555-0000')

    // Pick a tour type by clicking card
    cy.get('section#schedule-tour').contains(/Tour Type/i)
    cy.get('section#schedule-tour').contains(/In-Person Tour/i).click()

    // Select a location (Radix Select)
    cy.get('section#schedule-tour [id="location"]').should('not.exist')
    cy.get('section#schedule-tour').contains('label', /Location/i).parent().find('[role="combobox"]').click()
    cy.get('[role="option"]').contains(/DeSoto/i).click({ force: true })

    // Date and time
    cy.get('section#schedule-tour input#preferredDate').type('2025-09-01')
    cy.get('section#schedule-tour').contains('label', /Preferred Time/i).parent().find('[role="combobox"]').click()
    cy.get('[role="option"]').first().click({ force: true })

    // Submit
    cy.get('section#schedule-tour form').within(() => {
      cy.contains('button', /Schedule My Tour/i).click()
    })

    cy.wait('@submitTour')
    cy.get('section#schedule-tour').contains(/Tour Request Received!/i)
  })
})
