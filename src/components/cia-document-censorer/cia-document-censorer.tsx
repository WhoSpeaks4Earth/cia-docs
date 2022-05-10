import { Component, Host, h, State, Listen } from '@stencil/core';

@Component({
  tag: 'cia-document-censorer',
  styleUrl: 'cia-document-censorer.css',
  shadow: true,
})
export class CiaDocumentCensorer {

  @State() inputText: string = '';
  @State() search: {text: string, parsedTerms: string[]} = {text: '', parsedTerms: []};
  @State() processedText: string = '';


  @Listen('searchTextChanged')
  searchTextChangedHandler(event: CustomEvent<string>) {
    const newSearchText = event.detail;
    this.search = {text: newSearchText, parsedTerms: this.getParsedTerms(newSearchText)};
  }

  @Listen('process')
  processHandler() {
    this.processedText = this.getCensoredDocumentText(this.inputText, this.search.parsedTerms);
  }

  @Listen('documentActionClicked')
  documentActionClickedHandler(event: CustomEvent<string>) {
    const actionName = event.detail;
    switch (actionName) {
      case 'clear':
        this.inputText = '';
        break;
      case 'copy':
        navigator.clipboard.writeText(this.processedText);
        break;
      case 'export':
        console.log('export');
        break;
    }
  }

  private getParsedTerms = (text: string): string[] => {
    const parsedTerms: string[] = [];

    if (!text || text === '')
      return parsedTerms;

    const myRegexp = /[^\s"',]+|"([^"]*)"|'([^']*)'/gi;
    do {
        var match = myRegexp.exec(text);
        if (match != null)
        {
            const singleQuotePhrase = match[2];
            const doubleQuotePhrase = match[1];
            const unquotedKeyword = match[0];
            const term = singleQuotePhrase ?? (doubleQuotePhrase ?? unquotedKeyword)
            parsedTerms.push(term);
        }
    } while (match != null);

    return parsedTerms;
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

  private onOriginalDocumentInputChange = (event: Event) => this.inputText = (event.target as HTMLInputElement).value;

  private renderOriginalDocument = () => {
    return (
      <cia-document headerText="Original Document" actions={[{name: 'clear', isVisible: this.inputText !== ''}]}>
        <textarea
          slot="document-text" 
          placeholder="Paste or enter some text to censor"
          maxLength={10000}
          value={this.inputText}
          onInput={this.onOriginalDocumentInputChange}
          aria-required />
      </cia-document>
    );
  }

  private renderSearchProcessor = () => {
    const hasValidSearchInput = this.search.parsedTerms.length > 0;
    return (
      <cia-search-processor 
        searchText={this.search.text}
        isProcessable={this.inputText !== '' && hasValidSearchInput} />
    );
  }

  private renderProcessedDocument = () => {
    return (
      <cia-document headerText="Censored Document" actions={[{name: 'copy', isVisible: true}, {name: 'export', isVisible: true}]}>
        <p slot="document-text">
          <pre>{this.processedText === '' ? 'No document has been processed yet...' : this.processedText}</pre>
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
          this.processedText === '' ? null : this.renderProcessedDocument()
        ]}
      </Host>
    );
  }
}
