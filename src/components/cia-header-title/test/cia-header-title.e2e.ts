import { newE2EPage } from '@stencil/core/testing';

describe('cia-header-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cia-header-title />');

    const element = await page.find('cia-header-title');
    expect(element).toHaveClass('hydrated');
  });
});
