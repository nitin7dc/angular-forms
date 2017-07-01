import { AngularFormsPage } from './app.po';

describe('angular-forms App', () => {
  let page: AngularFormsPage;

  beforeEach(() => {
    page = new AngularFormsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
