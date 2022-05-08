import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cia-search-input',
  styleUrl: 'cia-search-input.css',
  shadow: true
})
export class CiaSearchInput {

  render() {

    return (
      <Host>
        <label id="searchLabel" htmlFor="searchTerms">Text to Censor</label>
        <input
          type="text" 
          name="searchTerms" 
          placeholder={`Ex: Hello world “Boston Red Sox” ‘Pepperoni Pizza’, ‘Cheese Pizza’, beer"`}
          aria-labelledby="searchTerms" 
          aria-describedby="searchDesc" 
          aria-required="true" />
        <span id="searchDesc">Enter keywords or phrases separated by spaces or commas. Phrases must be enclosed in single or double-quotes.</span>
      </Host>

    )
  }
}