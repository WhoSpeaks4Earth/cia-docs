import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'cia-search-input',
  styleUrl: 'cia-search-input.css',
  shadow: true
})
export class CiaSearchInput {

  @Prop() text: string = '';

  @Event() inputChanged: EventEmitter<string>;

  private onInputChange = (e: Event) => this.inputChanged.emit((e.target as HTMLInputElement).value);

  render() {
    return (
      <Host>
        <label id="searchLabel" htmlFor="searchTerms">Keywords/Phrases to Censor</label>
        <input
          type="text" 
          name="searchTerms" 
          placeholder={`Ex: Hello world “Boston Red Sox” ‘Pepperoni Pizza’, ‘Cheese Pizza’, beer`}
          value={this.text}
          onInput={this.onInputChange}
          aria-labelledby="searchTerms" 
          aria-describedby="searchDesc" 
          aria-required="true" />
        <span id="searchDesc">Enter keywords or phrases separated by spaces or commas. Phrases must be enclosed in single or double-quotes.</span>
      </Host>

    )
  }
}