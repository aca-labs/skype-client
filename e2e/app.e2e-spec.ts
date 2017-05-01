import { A2PortalPage } from './app.po';

describe('a2-portal App', () => {
  let page: A2PortalPage;

  beforeEach(() => {
    page = new A2PortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
