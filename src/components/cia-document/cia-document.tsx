import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "cia-document",
  styleUrl: "cia-document.css",
  shadow: true
})
export class CiaDocument {

  @Prop() headerText: string;
  @Prop() actions: {name: string, isVisible: boolean}[];

  @Event() documentActionClicked: EventEmitter<string>;

  private onActionClick = (actionName: string) => {
    this.documentActionClicked.emit(actionName);
  }

  render() {
    return (
      <Host>
        <div class="header">
          <h4>{this.headerText}</h4>
          <div>
            {
              this.actions.map(action => (
                action.isVisible
                ? <span onClick={() => this.onActionClick(action.name)}>{action.name}</span> 
                : null
              ))
            }
          </div>
        </div>
        <div>
          <slot name="document-text" />
        </div>
      </Host>
    )
  }
}