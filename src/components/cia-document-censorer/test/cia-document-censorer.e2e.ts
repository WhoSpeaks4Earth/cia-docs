import { newE2EPage } from '@stencil/core/testing';

describe('cia-document-censorer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cia-document-censorer />');

    const element = await page.find('cia-document-censorer');
    expect(element).toHaveClass('hydrated');
  });
});
