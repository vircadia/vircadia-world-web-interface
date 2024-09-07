import type { Component } from 'solid-js';
import logo from './logo.svg';

const Logo: Component = () => (
  <img
    src={logo}
    alt="logo"
    style={{
      'animation': 'logo-spin infinite 20s linear',
      'height': '40vmin',
      'pointer-events': 'none',
    }}
  />
);

const Header: Component = () => (
  <header
    style={{
      'background-color': '#282c34',
      'min-height': '100vh',
      'display': 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'center',
      'font-size': 'calc(10px + 2vmin)',
      'color': 'white',
    }}
  >
    <Logo />
    <p>
      Hi.
    </p>
    <a
      href="https://github.com/solidjs/solid"
      target="_blank"
      rel="noopener noreferrer"
      style={{ 'color': '#b318f0' }}
    >
      Learn Solid
    </a>
  </header>
);

const App: Component = () => {
  return (
    <div style={{ 'text-align': 'center' }}>
      <Header />
    </div>
  );
};

export default App;

// Add the keyframes animation
const style = document.createElement('style');
style.textContent = `
  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(style);