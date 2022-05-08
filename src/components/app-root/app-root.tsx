import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <header>
          <h1>CIA Docs</h1>
        </header>

        <main>
          <p>content coming soon</p>
        </main>
      </div>
    );
  }
}