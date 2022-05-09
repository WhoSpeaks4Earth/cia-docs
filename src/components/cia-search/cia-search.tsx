import { Component, Host, h, Prop, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'cia-search',
  styleUrl: 'cia-search.css',
  shadow: true
})
export class CiaSearch {

  @Prop() searchText: string = '';
  @Prop() isProcessable: boolean = false;
  @Prop() isActive: boolean = false;

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
        <cia-search-input text={this.searchText} isDisabled={!this.isActive}></cia-search-input>
        <button onClick={this.onProcess} disabled={!this.isProcessable}>Censor</button>
      </Host>
    )
  }
}