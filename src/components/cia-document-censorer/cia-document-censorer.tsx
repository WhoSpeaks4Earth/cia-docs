import { Component, Host, h, State, Listen } from '@stencil/core';

@Component({
  tag: 'cia-document-censorer',
  styleUrl: 'cia-document-censorer.css',
  shadow: true,
})
export class CiaDocumentCensorer {

  @State() inputText: string = '';
  @State() searchText: string = '';
  @State() processedText: string = '';


  @Listen('searchTextChanged')
 searchTextChangedHandler(event: CustomEvent<string>) {
    this.searchText = event.detail;
  }

  @Listen('process')
  processHandler() {
    this.processedText = this.inputText;
  }

  @Listen('documentActionClicked')
  documentActionClickedHandler(event: CustomEvent<string>) {
    const actionName = event.detail;
    switch (actionName) {
      case 'clear':
        this.inputText = '';
        break;
      case 'copy':
        console.log('copy');
        break;
      case 'export':
        console.log('export');
        break;
    }
  }

  private onInputChange = (event: Event) => this.inputText = (event.target as HTMLInputElement).value;

  private renderOriginalDocument = () => {
    return (
      <cia-document headerText="Original Document" actions={[{name: 'clear', isVisible: this.inputText !== ''}]}>
        <textarea
          slot="document-text" 
          placeholder="Paste or enter some text to censor"
          maxLength={10000}
          value={this.inputText}
          onInput={this.onInputChange} />
      </cia-document>
    );
  }

  private renderSearch = () => {
    return (
      <cia-search 
        searchText={this.searchText}
        isProcessable={this.inputText !== '' && this.searchText !== ''} />
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
          this.renderSearch(),
          this.processedText === '' ? null : this.renderProcessedDocument()
        ]}
      </Host>
    );
  }
}
