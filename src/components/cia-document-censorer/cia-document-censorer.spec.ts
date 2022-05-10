import { newSpecPage } from '@stencil/core/testing';
import { CiaDocumentCensorer } from './cia-document-censorer';


describe('cia-document-censorer', () => {
  it('censors the document', async () => {
    const { rootInstance } = await newSpecPage({
      components: [CiaDocumentCensorer],
      html: '<cia-document-censorer />',
    });
    const text = 'the abc went to the xyz';
    const termsToCensor = ['abc', 'xyz', 'went to'];
    const censor = 'XXXX';
    expect(rootInstance.getCensoredDocumentText(text, termsToCensor)).toEqual(`the ${censor} ${censor} the ${censor}`);
  });
});
