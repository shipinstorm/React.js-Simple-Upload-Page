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
import { fetchAsync } from '../functions';

const MYCRYPTO_URL = 'https://mycrypto.com';
const MYCRYPTO_SUPPORT_URL = 'https://support.mycrypto.com';
const MYCRYPTO_ABOUT_URL = 'https://about.mycrypto.com';
const GITHUB_RELEASES_URL = 'https://api.github.com/repos/MyCryptoHQ/MyCrypto/releases/latest';
const GITHUB_RELEASE_NOTES_URL = 'https://github.com/MyCryptoHQ/MyCrypto/releases/latest';

// the link to use in case the real ones can't be loaded dynamically
const DEFAULT_LINK = GITHUB_RELEASE_NOTES_URL;

const ASSET_REG_EXPS = {
  mac: /^mac.*\.dmg$/,
  windows: /^windows.*\.exe$/,
  linux32: /^linux-i386.*\.AppImage$/,
  linux64: /^linux-x86-64.*\.AppImage$/,
  standalone: /^standalone.*\.zip$/,
  checksums: /^checksums\.txt$/,
  checksumsGpg: /^checksums\.txt\.gpg$/
};

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

type TAssetInfo = { name: string; link: string };

interface State {
  mac: TAssetInfo;
  windows: TAssetInfo;
  linux32: TAssetInfo;
  linux64: TAssetInfo;
  standalone: TAssetInfo;
  checksums: TAssetInfo;
  checksumsGpg: TAssetInfo;
  version: string | null;
  [key: string]: TAssetInfo | string | null;
}

class App extends React.Component<{}, State> {
  public state: State = {
    mac: {
      name: 'macOS',
      link: DEFAULT_LINK
    },
    windows: {
      name: 'Windows',
      link: DEFAULT_LINK
    },
    linux32: {
      name: 'Linux',
      link: DEFAULT_LINK
    },
    linux64: {
      name: 'Linux',
      link: DEFAULT_LINK
    },
    standalone: {
      name: 'Stand Alone',
      link: DEFAULT_LINK
    },
    checksums: {
      name: '',
      link: DEFAULT_LINK
    },
    checksumsGpg: {
      name: '',
      link: DEFAULT_LINK
    },
    version: null
  };

  public async componentWillMount() {
    try {
      const releaseInfo = await fetchAsync(GITHUB_RELEASES_URL);
      const newState = releaseInfoReducer(releaseInfo, this.state);
      this.setState(newState);
    } catch (e) {
      console.error(e);
    }
  }

  public render() {
    const {
      mac,
      windows,
      linux32,
      linux64,
      standalone,
      checksums,
      checksumsGpg,
      version
    } = this.state;
    const defaultBuilds = [mac, windows, linux64, standalone];

    return (
      <div className="App">
        <main className="App-main">
          <div className="App-main-left">
            <h1 className="App-title">MyCrypto for {OS}</h1>
            <p className="App-description">
              Run MyCrypto securely and offline with the desktop application. Powered by Electron,
              it's the same MyCrypto app, running in a sandboxed environment.
            </p>
            {version && <p className="App-version">Version {version}</p>}
            {OS === 'Linux' ? (
              <div className="App-linux-download-wrapper">
                <a href={linux32.link} className="App-download App-linux-download">
                  <i className="nc-icon nc-hit-down" />
                  Download 32-bit
                </a>
                <a href={linux64.link} className="App-download App-linux-download">
                  <i className="nc-icon nc-hit-down" />
                  Download 64-bit
                </a>
              </div>
            ) : (
              <a
                href={defaultBuilds.filter(build => build.name === OS)[0].link}
                className="App-download"
              >
                <i className="nc-icon nc-hit-down" />
                Download Alpha
              </a>
            )}
            <br />
            <div className="App-other-links">
              <a href={GITHUB_RELEASE_NOTES_URL} className="App-other-links-release-notes">
                release notes
              </a>
              <a href={checksums.link} className="App-other-links-release-notes">
                checksums
              </a>
              <a href={checksumsGpg.link} className="App-other-links-release-notes">
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
            {defaultBuilds.map(_ => (
              <Platform
                key={_.name}
                title={_.name}
                href={_.link}
                linux32Url={linux32.link}
                linux64Url={linux64.link}
              />
            ))}
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
          <a className="Footer-logo" href={MYCRYPTO_URL} />
          <div className="Footer-links">
            <a href={MYCRYPTO_URL}>MyCrypto.com</a>
            <a target="_blank" rel="noopener noreferrer" href={MYCRYPTO_SUPPORT_URL}>
              Help & Support
            </a>
            <a target="_blank" rel="noopener noreferrer" href={MYCRYPTO_ABOUT_URL}>
              Our Team
            </a>
          </div>
          <p className="Footer-text">
            MyCrypto is an open-source, client-side tool for generating ether wallets, handling
            ERC-20 tokens, and interacting with the blockchain more easily. Developed by and for the
            community since 2015, we’re focused on building awesome products that put the power in
            people’s&nbsp;hands.
          </p>

          <p className="Footer-copyright">© {new Date().getFullYear()} MyCrypto, Inc.</p>
        </footer>
      </div>
    );
  }
}

const releaseInfoReducer = (info: any, _state: State): State => {
  const state: State = JSON.parse(JSON.stringify(_state));
  const { assets } = info;

  Object.entries(ASSET_REG_EXPS).forEach(([key, regex]) => {
    const asset = assets.find((a: any) => regex.test(a.name));
    (state[key] as TAssetInfo).link = asset.browser_download_url;
  });
  state.version = info.name;

  return state;
};

export default hot(module)(App);
