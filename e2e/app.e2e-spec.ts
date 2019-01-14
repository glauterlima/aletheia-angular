import { AletheiaUiPage } from './app.po';

describe('aletheia-ui App', () => {
  let page: AletheiaUiPage;

  beforeEach(() => {
    page = new AletheiaUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
