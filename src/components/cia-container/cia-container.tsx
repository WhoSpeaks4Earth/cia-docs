import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'cia-container',
  styleUrl: 'cia-container.css',
  shadow: true,
})
export class CiaContainer {

  @Prop() maxWidthPx?: number;

  render() {
    return (
      <Host style={{maxWidth: (this.maxWidthPx ? `${this.maxWidthPx}px` : 'none')}}>
        <slot></slot>
      </Host>
    );
  }

}
