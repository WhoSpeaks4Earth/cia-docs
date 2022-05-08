import { Component, h } from '@stencil/core';

@Component({
  tag: 'cia-search',
  styleUrl: 'cia-search.css',
  shadow: true
})
export class CiaSearch {

  render() {

    return (
      <div>
        <input />
        <button>Process</button>
      </div>
    )
  }
}