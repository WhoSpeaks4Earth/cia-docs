import { newSpecPage } from '@stencil/core/testing';
import { CiaContainer } from '../cia-container';

describe('cia-container', () => {
  it('renders with no max width specified', async () => {
    const page = await newSpecPage({
      components: [CiaContainer],
      html: `<cia-container></cia-container>`,
    });
    expect(page.root).toBeTruthy();
  });
});
