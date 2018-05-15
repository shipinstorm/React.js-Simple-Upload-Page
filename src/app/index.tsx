import * as React from 'react';
import { hot } from 'react-hot-loader';
import './app.scss';
import * as mac from 'assets/imgs/mac.png';
import * as windows from 'assets/imgs/windows.png';
import * as linux from 'assets/imgs/linux.png';
import * as Secure from 'assets/imgs/icon-shield.svg';
import * as Offline from 'assets/imgs/icon-offline.svg';
import * as Yours from 'assets/imgs/icon-hdd.svg';
import * as OpenSource from 'assets/imgs/icon-github.svg';
import { Block } from './block';
import { Platform } from './platform';

const builds = [
  {
    name: 'macOS',
    link:
      'https://github.com/MyCryptoHQ/MyCrypto/releases/download/1.0.0/mac_1.0.0-alpha.3_MyCrypto.dmg'
  },
  {
    name: 'Windows',
    link:
      'https://github.com/MyCryptoHQ/MyCrypto/releases/download/1.0.0/windows_1.0.0-alpha.3_MyCrypto.exe'
  },
  {
    name: 'Linux',
    link:
      'https://github.com/MyCryptoHQ/MyCrypto/releases/download/1.0.0/linux-x86-64_1.0.0-alpha.3_MyCrypto.AppImage'
  },
  {
    name: 'Stand Alone',
    link:
      'https://github.com/MyCryptoHQ/MyCrypto/releases/download/1.0.0/standalone_1.0.0-alpha.3_MyCrypto.zip'
  }
];

let OS: string = 'macOS';
if (/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)) {
  OS = 'macOS';
} else if (navigator.appVersion.includes('Win')) {
  OS = 'Windows';
} else if (navigator.appVersion.includes('Mac')) {
  OS = 'macOS';
} else {
  OS = 'Linux';
}

const img: any = OS === 'macOS' ? mac : OS === 'Windows' ? windows : linux;

const App = () => (
  <div className="App">
    <main className="App-main">
      <div className="App-main-left">
        <h1 className="App-title">MyCrypto for {OS}</h1>
        <p className="App-description">
          Run MyCrypto securely and offline with the desktop application. Powered by Electron, it's
          the same MyCrypto app, running in a sandboxed environment.
        </p>
        {OS === 'Linux' ? (
          <div className="App-linux-download-wrapper">
            <a
              href="https://github.com/MyCryptoHQ/MyCrypto/releases/download/1.0.0/linux-i386_1.0.0-alpha.3_MyCrypto.AppImage"
              className="App-download App-linux-download"
            >
              <i className="nc-icon nc-hit-down" />
              Download 32-bit
            </a>
            <a
              href="https://github.com/MyCryptoHQ/MyCrypto/releases/download/1.0.0/linux-x86-64_1.0.0-alpha.3_MyCrypto.AppImage"
              className="App-download App-linux-download"
            >
              <i className="nc-icon nc-hit-down" />
              Download 64-bit
            </a>
          </div>
        ) : (
          <a href={builds.filter(_ => _.name === OS)[0].link} className="App-download">
            <i className="nc-icon nc-hit-down" />
            Download Alpha
          </a>
        )}
        <br />
        <div className="App-other-links">
          <a
            href="https://github.com/MyCryptoHQ/MyCrypto/releases/latest"
            className="App-other-links-release-notes"
          >
            release notes
          </a>
          <a
            href="https://github.com/MyCryptoHQ/MyCrypto/releases/download/1.0.0/checksums.txt"
            className="App-other-links-release-notes"
          >
            checksums
          </a>
          <a
            href="https://github.com/MyCryptoHQ/MyCrypto/releases/download/1.0.0/checksums.txt.gpg"
            className="App-other-links-release-notes"
          >
            signed checksums
          </a>
        </div>
      </div>
      <div className="App-main-right">
        <img className="App-screenshot" src={img} alt="App Screenshot" />
      </div>
    </main>
    <div className="App-other-platforms">
      <div className="App-other-platforms-wrapper">
        {builds
          .filter(_ => _.name !== OS)
          .map(_ => <Platform key={_.name} title={_.name} href={_.link} />)}
      </div>
    </div>
    <div className="App-marketing">
      <div className="App-marketing-box-wrapper">
        <Block
          img={Secure}
          title="Secure"
          description="Don’t worry about malicious browser extensions or wifi networks, the desktop MyCrypto app runs in a sandbox with local resources"
        />
        <Block
          img={Offline}
          title="Work Offline"
          description="No internet? No problem. Everything you need to generate a transaction is on your
            computer."
        />
        <Block
          img={Yours}
          title="Always Yours"
          description="It doesn't matter what happens to mycrypto.com, the app will always be yours to use."
        />
        <Block
          img={OpenSource}
          title="Open Source"
          description="Built with the community in mind, the MyCrypto app is completely open source.
            Contributors welcome."
        />
      </div>
    </div>
    <footer className="Footer">
      <a className="Footer-logo" href="https://mycrypto.com/" />
      <div className="Footer-links">
        <a href="https://mycrypto.com">MyCrypto.com</a>
        <a target="_blank" rel="noopener noreferrer" href="https://support.mycrypto.com">
          Help & Support
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://about.mycrypto.com">
          Our Team
        </a>
      </div>
      <p className="Footer-text">
        MyCrypto is an open-source, client-side tool for generating ether wallets, handling ERC-20
        tokens, and interacting with the blockchain more easily. Developed by and for the community
        since 2015, we’re focused on building awesome products that put the power in
        people’s&nbsp;hands.
      </p>

      <p className="Footer-copyright">© {new Date().getFullYear()} MyCrypto, Inc.</p>
    </footer>
  </div>
);

export default hot(module)(App);
