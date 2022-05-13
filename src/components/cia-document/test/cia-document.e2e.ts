import { newE2EPage } from '@stencil/core/testing';

describe('cia-document', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cia-document />');

    const element = await page.find('cia-document');
    expect(element).toHaveClass('hydrated');
  });
});
