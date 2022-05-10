import { Component, Host, h, State, Listen } from '@stencil/core';
import { KeywordPhraseParserService } from '../../services/keyword-phrase-parser.service';
import { TextParser } from '../../services/text-parser.interface';

@Component({
  tag: 'cia-document-censorer',
  styleUrl: 'cia-document-censorer.css',
  shadow: true,
})
export class CiaDocumentCensorer {

  private keywordPhraseParser: TextParser = new KeywordPhraseParserService();

  @State() originalDocText: string = '';
  @State() search: {inputText: string, parsedTerms: string[]} = {inputText: '', parsedTerms: []};
  @State() processedDocText: string = '';

  @Listen('searchTextChanged')
  searchTextChangedHandler(event: CustomEvent<string>) {
    const newSearchText = event.detail;
    this.search = {inputText: newSearchText, parsedTerms: this.keywordPhraseParser.getParsedTerms(newSearchText)};
  }

  @Listen('process')
  processHandler() {
    this.processedDocText = this.getCensoredDocumentText(this.originalDocText, this.search.parsedTerms);
  }

  @Listen('documentActionClicked')
  documentActionClickedHandler(event: CustomEvent<string>) {
    const actionName = event.detail;
    switch (actionName) {
      case 'clear':
        this.originalDocText = '';
        break;
      case 'copy':
        navigator.clipboard.writeText(this.processedDocText);
        break;
    }
  }


  private getCensoredDocumentText = (originalText: string, termsToCensor: string[]): string => {
    const replaceTermsWith = 'XXXX';
    let censoredText = originalText;

    for (let i = 0; i < termsToCensor.length; i++) {
      const term = termsToCensor[i];
      censoredText = censoredText.replace(new RegExp(`${term}`, 'g'), replaceTermsWith);
    }

    return censoredText;
  }

  private onOriginalDocumentInputChange = (event: Event) => this.originalDocText = (event.target as HTMLInputElement).value;

  private renderOriginalDocument = () => {
    return (
      <cia-document headerText="Original Document" actions={[{name: 'clear', isVisible: this.originalDocText !== ''}]}>
        <textarea
          slot="document-text" 
          placeholder="Paste or enter some text to censor"
          maxLength={10000}
          value={this.originalDocText}
          onInput={this.onOriginalDocumentInputChange}
          aria-required />
      </cia-document>
    );
  }

  private renderSearchProcessor = () => {
    const hasValidSearchInput = this.search.parsedTerms.length > 0;
    return (
      <cia-search-processor 
        searchText={this.search.inputText}
        isProcessable={this.originalDocText !== '' && hasValidSearchInput} />
    );
  }

  private renderProcessedDocument = () => {
    return (
      <cia-document headerText="Censored Document" actions={[{name: 'copy', isVisible: this.processedDocText.length > 0}]}>
        <p slot="document-text">
          <pre>{this.processedDocText === '' ? 'No document has been processed yet...' : this.processedDocText}</pre>
        </p>
      </cia-document>
    );
  }

  render() {
    return (
      <Host>
        {[
          this.renderOriginalDocument(),
          this.renderSearchProcessor(),
          this.processedDocText === '' ? null : this.renderProcessedDocument()
        ]}
      </Host>
    );
  }
}
