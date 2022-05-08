import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cia-search',
  styleUrl: 'cia-search.css',
  shadow: true
})
export class CiaSearch {

  render() {

    return (
      <Host>
        <cia-search-input></cia-search-input>
        <button>Process</button>
      </Host>
    )
  }
}