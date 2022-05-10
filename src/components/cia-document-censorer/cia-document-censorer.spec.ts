import { newSpecPage } from '@stencil/core/testing';
import { CiaDocumentCensorer } from './cia-document-censorer';


describe('cia-document-censorer', () => {

  describe('keyword/phrase parsing', () => {
    it('can parse single keyword', async () => {
      const { rootInstance } = await newSpecPage({
        components: [CiaDocumentCensorer],
        html: '<cia-document-censorer />',
      });
      const text = 'term';
      expect(rootInstance.getParsedTerms(text)).toEqual(['term']);
    });

    it('ignores redundant parsing characters', async () => {
      const { rootInstance } = await newSpecPage({
        components: [CiaDocumentCensorer],
        html: '<cia-document-censorer />',
      });
      const variant1 = 'term1, term2';
      const variant2 = 'term1 ,,  term2';
      const expected = ['term1', 'term2'];
      expect(rootInstance.getParsedTerms(variant1)).toEqual(expected);
      expect(rootInstance.getParsedTerms(variant2)).toEqual(expected);
    });

    it('ignores leading and trailing parsing characters', async () => {
      const { rootInstance } = await newSpecPage({
        components: [CiaDocumentCensorer],
        html: '<cia-document-censorer />',
      });
      const variant1 = '  term1, term2  ';
      const variant2 = ',,term1 term2,,';
      const variant3 = ', , term1 term2 , ,';
      const expected = ['term1', 'term2'];
      expect(rootInstance.getParsedTerms(variant1)).toEqual(expected);
      expect(rootInstance.getParsedTerms(variant2)).toEqual(expected);
      expect(rootInstance.getParsedTerms(variant3)).toEqual(expected);
    });

    it('can parse multiple keywords separated by spaces', async () => {
      const { rootInstance } = await newSpecPage({
        components: [CiaDocumentCensorer],
        html: '<cia-document-censorer />',
      });
      const text = 'term1 term2';
      expect(rootInstance.getParsedTerms(text)).toEqual(['term1', 'term2']);
    });

    it('can parse multiple keywords separated by commas', async () => {
      const { rootInstance } = await newSpecPage({
        components: [CiaDocumentCensorer],
        html: '<cia-document-censorer />',
      });
      const text = 'term1,term2';
      expect(rootInstance.getParsedTerms(text)).toEqual(['term1', 'term2']);
    });

    it('can parse quoted phrases', async () => {
      const { rootInstance } = await newSpecPage({
        components: [CiaDocumentCensorer],
        html: '<cia-document-censorer />',
      });
      const variant1 = `"term1" 'phrase1a phrase1b' term3`;
      const variant2 = `term1 "phrase1a phrase1b" "term3"`;
      const expected = ['term1', 'phrase1a phrase1b', 'term3'];
      expect(rootInstance.getParsedTerms(variant1)).toEqual(expected);
      expect(rootInstance.getParsedTerms(variant2)).toEqual(expected);
    });

    it('gives an empty array for bad input', async () => {
      const { rootInstance } = await newSpecPage({
        components: [CiaDocumentCensorer],
        html: '<cia-document-censorer />',
      });
      const variant1 = `"term1" 'phrase1a phrase1b term3`;
      const variant2 = `term1 "phrase1a phrase1b' "term3"`;
      // const variant3 = `term1 "phrase"oops "term3"`;
      // const variant4 = `term1 oops"phrase" "term3"`;
      expect(rootInstance.getParsedTerms(variant1)).toEqual([]);
      expect(rootInstance.getParsedTerms(variant2)).toEqual([]);
    })
  });

  describe('document censorship', () => {
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
});
