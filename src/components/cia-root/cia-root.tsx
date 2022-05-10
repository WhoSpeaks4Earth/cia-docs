import { Component, h } from '@stencil/core';

@Component({
  tag: 'cia-root',
  styleUrl: 'cia-root.css',
  shadow: true,
})
export class CiaRoot {

  render() {
    return (
      <div>
        <header>
          <h1>CIA Docs</h1>
        </header>

        <main>
          <cia-document-censorer></cia-document-censorer>
        </main>
      </div>
    );
  }
}
