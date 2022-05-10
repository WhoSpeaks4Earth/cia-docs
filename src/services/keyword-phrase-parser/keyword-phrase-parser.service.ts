import { TextParser } from "../text-parser.interface";


export class KeywordPhraseParserService implements TextParser {


  public getParsedTerms = (text: string): string[] => {
    let parsedTerms: string[] = [];

    if (!this.isValidSearchInput(text))
      return parsedTerms;

    parsedTerms = this.getRegExpParsedTerms(text);

    return parsedTerms;
  }

  private isValidSearchInput(text: string): boolean {
    if (!text || text === '' || !this.hasValidPhrasing(text))
      return false;

    return true;
  }

  private hasValidPhrasing(text: string): boolean {
    const invalidPhraseTermination = ((text.match(/"/g) || []).length % 2 !== 0) || (text.match(/'/g) || []).length % 2 !== 0;
    if (invalidPhraseTermination)
      return false;

    return true;
  }

  private getRegExpParsedTerms(text: string): string[] {
    const regExTerms: string[] = [];

    const myRegexp = /[^\s"',]+|"([^"]*)"|'([^']*)'/gi;
    do {
        var match = myRegexp.exec(text);
        if (match != null)
        {
            const singleQuotePhrase = match[2];
            const doubleQuotePhrase = match[1];
            const unquotedKeyword = match[0];
            const term = singleQuotePhrase ?? (doubleQuotePhrase ?? unquotedKeyword)
            regExTerms.push(term);
        }
    } while (match != null);

    return regExTerms;
  }
}