import { Component, h, Prop} from '@stencil/core';

@Component({
  tag: 'cia-header-title',
  styleUrl: 'cia-header-title.css',
  shadow: true
})
export class CiaHeaderTitle {

  @Prop() text: string;

  render() {
    return <h4>{this.text}</h4>;
  }
}