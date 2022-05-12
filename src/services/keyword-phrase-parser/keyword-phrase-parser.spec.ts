import { KeywordPhraseParserService } from './keyword-phrase-parser.service';


describe('keyword/phrase parsing', () => {

  let parser;

  beforeEach(() => {
    parser = new KeywordPhraseParserService();
  })

  it('can parse single keyword', async () => {
    const text = 'term';
    expect(parser.getParsedTerms(text)).toEqual(['term']);
  });

  it('ignores redundant parsing characters', async () => {
    const variant1 = 'term1, term2';
    const variant2 = 'term1 ,,  term2';
    const expected = ['term1', 'term2'];
    expect(parser.getParsedTerms(variant1)).toEqual(expected);
    expect(parser.getParsedTerms(variant2)).toEqual(expected);
  });

  it('ignores leading and trailing parsing characters', async () => {
    const variant1 = '  term1, term2  ';
    const variant2 = ',,term1 term2,,';
    const variant3 = ', , term1 term2 , ,';
    const expected = ['term1', 'term2'];
    expect(parser.getParsedTerms(variant1)).toEqual(expected);
    expect(parser.getParsedTerms(variant2)).toEqual(expected);
    expect(parser.getParsedTerms(variant3)).toEqual(expected);
  });

  it('can parse multiple keywords separated by spaces', async () => {
    const text = 'term1 term2';
    expect(parser.getParsedTerms(text)).toEqual(['term1', 'term2']);
  });

  it('can parse multiple keywords separated by commas', async () => {
    const text = 'term1,term2';
    expect(parser.getParsedTerms(text)).toEqual(['term1', 'term2']);
  });

  it('can parse quoted phrases', async () => {
    const variant1 = `"term1" 'phrase1a phrase1b' term3`;
    const variant2 = `term1 "phrase1a phrase1b" "term3"`;
    const expected = ['term1', 'phrase1a phrase1b', 'term3'];
    expect(parser.getParsedTerms(variant1)).toEqual(expected);
    expect(parser.getParsedTerms(variant2)).toEqual(expected);
  });

  it('gives an empty array for bad input', async () => {
    const variant1 = `"term1" 'phrase1a phrase1b term3`;
    const variant2 = `term1 "phrase1a phrase1b' "term3"`;
    expect(parser.getParsedTerms(variant1)).toEqual([]);
    expect(parser.getParsedTerms(variant2)).toEqual([]);
  })
});