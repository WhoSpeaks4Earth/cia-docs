import { newE2EPage } from '@stencil/core/testing';

describe('cia-search-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cia-search-input></cia-search-input>');

    const element = await page.find('cia-search-input');
    expect(element).toHaveClass('hydrated');
  });
});
