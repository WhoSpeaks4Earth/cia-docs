import { Component, Host, h, State, Listen } from '@stencil/core';

@Component({
  tag: 'cia-document-censorer',
  styleUrl: 'cia-document-censorer.css',
  shadow: true,
})
export class CiaDocumentCensorer {

  @State() inputText: string = '';
  @State() searchText: string = '';
  @State() censoredText: string = '';


  @Listen('searchTextChanged')
  onSearchTextChangedHandler(event: CustomEvent<string>) {
    this.searchText = event.detail;
  }

  @Listen('process')
  onProcessHandler() {
    this.censoredText = this.inputText;
  }

  private onInputChange = (event: Event) => this.inputText = (event.target as HTMLInputElement).value;

  private renderSearch = () => {
    return (
      <cia-search 
        searchText={this.searchText}
        isActive={this.inputText !== ''}
        isProcessable={this.inputText !== '' && this.searchText !== ''} />
    );
  }

  private renderProcessedDocument = () => {
    return (
      <cia-document headerText="Censored Document" actions={['copy', 'export']}>
        <p slot="document-text">
          <pre>{this.censoredText === '' ? 'No document has been processed yet...' : this.censoredText}</pre>
        </p>
      </cia-document>
    );
  }

  render() {
    return (
      <Host>
        <cia-document headerText="Original Document" actions={['clear']}>
          <textarea
            slot="document-text" 
            placeholder="Enter some text to censor"
            maxLength={10000}
            value={this.inputText}
            onInput={this.onInputChange} />
        </cia-document>

        {[this.renderSearch(), this.censoredText === '' ? null : this.renderProcessedDocument()]}
        
      </Host>
    );
  }
}
