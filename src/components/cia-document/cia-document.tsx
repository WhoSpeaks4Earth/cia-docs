import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "cia-document",
  styleUrl: "cia-document.css",
  shadow: true
})
export class CiaDocument {

  @Prop() headerText: string;

  render() {
    return (
      <Host>
        <div class="header">
          <h4>{this.headerText}</h4>
          <div class="options">options</div>
        </div>
        <div>
          <slot name="document-text" />
        </div>
      </Host>
    )
  }
}