import { navigateTo } from '../support/page_objects/navigationPage';
import { onFormLayoutsPage } from '../support/page_objects/formLayoutsPage';
import { onDatePickerPage } from '../support/page_objects/datePickerPage';

describe('Test with Page Objects', () => {
  beforeEach('open application', () => {
    cy.visit('/');
  });

  it('verify navigation across the pages', () => {
    navigateTo.formLayoutsPage();
    navigateTo.datePickerPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
    navigateTo.toastrPage();
  });

  it.only('should submit Inline and Basic form and select tomorrows date in calendar', () => {
    navigateTo.formLayoutsPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('Steve', 'test@test.com');
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password');
    navigateTo.datePickerPage();
    onDatePickerPage.selectCommonDatepickerDateFromToday(1);
    onDatePickerPage.selectDatePickerWithRangeFromToday(7, 14);
  });
});
