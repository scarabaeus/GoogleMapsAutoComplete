import { GoogleMapsAutoCompletePage } from './app.po';

describe('google-maps-auto-complete App', () => {
  let page: GoogleMapsAutoCompletePage;

  beforeEach(() => {
    page = new GoogleMapsAutoCompletePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
