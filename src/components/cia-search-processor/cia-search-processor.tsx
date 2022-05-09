import { Component, Host, h, Prop, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'cia-search-processor',
  styleUrl: 'cia-search-processor.css',
  shadow: true
})
export class CiaSearchProcessor {

  @Prop() searchText: string = '';
  @Prop() isProcessable: boolean = false;

  @Event() process: EventEmitter<null>;
  @Event() searchTextChanged: EventEmitter<string>;

  @Listen('inputChanged')
  inputChangedHanlder(e: CustomEvent<string>) {
    this.searchTextChanged.emit(e.detail);
  }

  private onProcess = () => this.process.emit();

  render() {
    return (
      <Host>
        <cia-search-input text={this.searchText} />
        <button onClick={this.onProcess} disabled={!this.isProcessable}>Process</button>
      </Host>
    )
  }
}