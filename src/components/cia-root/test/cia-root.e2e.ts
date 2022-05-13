import { newE2EPage } from '@stencil/core/testing';

describe('cia-root', () => {
  it('renders', async () => {
    const page = await newE2EPage({ url: '/' });

    const element = await page.find('cia-root');
    expect(element).toHaveClass('hydrated');
  });

  it('renders the title', async () => {
    const page = await newE2EPage({ url: '/' });

    const element = await page.find('cia-root >>> h1');
    expect(element.textContent).toEqual('CIA Docs');
  });
});
