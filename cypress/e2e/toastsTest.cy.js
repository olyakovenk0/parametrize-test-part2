describe("Parametrize Test", function () {

  beforeEach(() => {
    cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com/')
    cy.get('[src="assets/images/material-dark-theme.jpg"]').click();
    cy.get('[title="Modal & Overlays"]').click();
    cy.get('[title="Toastr"]').click();
  })

    const testData = [
    {
      position: 'top-right',
      title: 'top-right success',
      content: 'hey1',
      time: '10000',
      type: 'success'
    },

    {
      position: 'top-left',
      title: 'top-left warning',
      content: 'hey2',
      time: '3000',
      type: 'warning'
    },

    {
      position: 'bottom-right',
      title: 'bottom-right info',
      content: 'hey3',
      time: '3000',
      type: 'info'
    },

    {
      position: 'bottom-left',
      title: 'bottom-left danger',
      content: 'hey4',
      time: '3000',
      type: 'danger'
    }

  ]

  const expectedResult = [
    {
      icon: 'checkmark',
      title: 'top-right success',
      content: 'hey1',
      color: 'rgb(96, 175, 32)',
      position: 'justify-content: flex-end; align-items: flex-start;'
    },
    {
      icon: 'alert-triangle',
      title: 'top-left warning',
      content: 'hey2',
      color: 'rgb(255, 159, 5)',
      position: 'justify-content: flex-start; align-items: flex-start;'
    },
    {
      icon: 'question-mark',
      title: 'bottom-right info',
      content: 'hey3',
      color: 'rgb(4, 149, 238)',
      position: 'justify-content: flex-end; align-items: flex-end;'
    },
    {
      icon: 'flash',
      title: 'bottom-left danger',
      content: 'hey4',
      color: 'rgb(176, 0, 32)',
      position: 'justify-content: flex-start; align-items: flex-end;'
    }

  ]

 const testToasts = (testData, expectedResult) => 
 
 function () {
  cy.get('.mat-ripple.position-select.appearance-outline.size-medium.status-basic.shape-rectangle.nb-transition').click();
  cy.get('ul.option-list').children().contains(testData.position).click();
  cy.get('[ng-reflect-name="title"]').clear().type(testData.title) 
  cy.get('[ng-reflect-name="content"]').clear().type(testData.content);
  cy.get('[ng-reflect-name="timeout"]').clear().type(testData.time);
  cy.get('.mat-ripple.appearance-outline.size-medium.status-basic.shape-rectangle.nb-transition').contains('primary').click();
  cy.get('ul.option-list').children().contains(testData.type).click();
  cy.get('.mat-ripple.appearance-filled.size-medium.shape-rectangle.status-basic.nb-transition').click();

  cy.log('check expected result');
       
    cy.get('.ng-tns-c209-54.ng-star-inserted').children().should('have.css', 'background-color').and('eq', `${expectedResult.color}`);
    cy.get('.ng-tns-c209-54.ng-star-inserted').find('g').children().should('have.attr', 'data-name', `${expectedResult.icon}`);
    cy.get('.title.subtitle').should('contain.text', `${expectedResult.title}`);
    cy.get('.title.subtitle').next().should('contain.text', `${expectedResult.content}`)
    cy.get('.cdk-overlay-pane').parent().should('have.attr', 'style', `${expectedResult.position}`);
         
 }

 for(let i = 0; i < testData.length; i++) {
 it(`${testData[i].position}`, testToasts(testData[i], expectedResult[i]));
 }

})



