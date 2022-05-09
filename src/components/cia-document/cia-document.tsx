import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "cia-document",
  styleUrl: "cia-document.css",
  shadow: true
})
export class CiaDocument {

  @Prop() headerText: string;
  @Prop() actions: string[];

  render() {
    return (
      <Host>
        <div class="header">
          <h4>{this.headerText}</h4>
          <div>
            {this.actions.map(action => <span>{action}</span>)}
          </div>
        </div>
        <div>
          <slot name="document-text" />
        </div>
      </Host>
    )
  }
}