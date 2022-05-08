import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cia-document-censor',
  styleUrl: 'cia-document-censor.css',
  shadow: true,
})
export class CiaDocumentCensor {

  render() {
    return (
      <Host>
        <cia-document headerText="Original Document">
          <textarea slot="document-text" placeholder="Enter some text to censor"></textarea>
        </cia-document>

        <cia-search></cia-search>

        <cia-document headerText="Censored Document">
          <p slot="document-text">censored text</p>
        </cia-document>
      </Host>
    );
  }
}
