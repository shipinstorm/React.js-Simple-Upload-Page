import * as React from 'react';
import { hot } from 'react-hot-loader';
import './app.scss';
import * as mac from 'assets/imgs/mac.png';
import * as windows from 'assets/imgs/windows.png';
import * as linux from 'assets/imgs/linux.png';
import * as DesktopCreate from 'assets/imgs/desktop-create.png';
import * as DesktopAddressBook from 'assets/imgs/desktop-address-book.png';
import * as Wallets from 'assets/imgs/illust-wallets.svg';
import * as Send from 'assets/imgs/illust-send.svg';
import * as Manage from 'assets/imgs/illust-manage.svg';
import * as Champagne from 'assets/imgs/illust-champagne.svg';
import { Block } from './block';
import { Platform } from './platform';
import { fetchAsync } from '../functions';

const MYCRYPTO_URL = 'https://mycrypto.com';
const MYCRYPTO_SUPPORT_URL = 'https://support.mycrypto.com';
const MYCRYPTO_TWITTER_URL = 'https://twitter.com/mycrypto';
const MYCRYPTO_GITHUB_URL = 'https://github.com/mycryptohq/mycrypto';
const MYCRYPTO_DISCORD_URL = 'https://discord.gg/VSaTXEA';
const MYCRYPTO_ABOUT_URL = 'https://about.mycrypto.com';
const MYCRYPTO_PRIVACY_URL = 'https://about.mycrypto.com/privacy/';
const GITHUB_RELEASES_URL = 'https://api.github.com/repos/MyCryptoHQ/MyCrypto/releases/latest';
const GITHUB_RELEASE_NOTES_URL = 'https://github.com/MyCryptoHQ/MyCrypto/releases/latest';
const HOW_TO_VERIFY_URL =
  'https://support.mycrypto.com/security/verifying-authenticity-of-desktop-app.html';

// the link to use in case the real ones can't be loaded dynamically
const DEFAULT_LINK = GITHUB_RELEASE_NOTES_URL;

const ASSET_REG_EXPS = {
  mac: /^mac.*\.dmg$/,
  windows: /^windows.*\.exe$/,
  linux32: /^linux-i386.*\.AppImage$/,
  linux64: /^linux-x86-64.*\.AppImage$/,
  standalone: /^standalone.*\.zip$/,
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

const img2: any = DesktopCreate;

const img3: any = DesktopAddressBook;

const img4: any = Champagne;

type TAssetInfo = { name: string; link: string };

interface State {
  mac: TAssetInfo;
  windows: TAssetInfo;
  linux32: TAssetInfo;
  linux64: TAssetInfo;
  standalone: TAssetInfo;
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
    const { mac, windows, linux32, linux64, standalone, checksumsGpg, version } = this.state;
    const defaultBuilds = [mac, windows, linux64, standalone];

    return (
      <div className="App">
        <section className="App-background">
          <div className="App-container">
            <div className="App-row">
              <div className="App-left">
                <h1 className="App-title">
                  The Same MyCrypto.
                  <br />
                  Now for {OS}.
                </h1>
                <p className="App-description">
                  Keep your keys out of the browser with the MyCrypto Desktop App. You get more
                  access to your funds, and scammers get less access to you.
                </p>
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
                    Download Now
                  </a>
                )}
                <br />
                <div className="App-other-links">
                  <a href={GITHUB_RELEASE_NOTES_URL} className="App-other-links-release-notes">
                    {version && <span className="App-version">Version {version}</span>}
                  </a>
                  <a href={HOW_TO_VERIFY_URL} className="App-other-links-release-notes">
                    verify authenticity
                  </a>
                  <a href={checksumsGpg.link} className="App-other-links-release-notes">
                    signed checksums
                  </a>
                </div>
              </div>
              <div className="App-right">
                <img className="App-screenshot" src={img} alt="App Screenshot" />
              </div>
            </div>
          </div>
        </section>

        <section className="Platforms">
          <div className="Platforms-container">
            <div className="Platforms-row">
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
        </section>

        <section className="Row Row-white">
          <div className="Row-container">
            <div className="Row-row">
              <div className="Row-img-wrapper">
                <img src={img2} alt="" className="Row-img" />
              </div>
              <div className="Row-content">
                <h2 className="Row-title">Peace of Mind</h2>
                <p className="Row-description">
                  The MyCrypto Desktop app puts your safety & security first. Avoid dangerous
                  phishing attacks, malicious browser extensions, and even work offline. You no
                  longer have to triple-check that you are on the correct URL or worry about a
                  malicious chrome extension.
                </p>
                {OS === 'Linux' ? (
                  <div>
                    <a href={linux32.link} className="Row-button Row-button-linux">
                      Install Instantly (32-bit)
                    </a>
                    <a href={linux64.link} className="Row-button Row-button-linux">
                      Install Instantly (64-bit)
                    </a>
                  </div>
                ) : (
                  <a
                    href={defaultBuilds.filter(build => build.name === OS)[0].link}
                    className="Row-button"
                  >
                    Install Instantly
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="Row Row-navy Row-reverse">
          <div className="Row-container">
            <div className="Row-row">
              <div className="Row-img-wrapper">
                <img src={img3} alt="" className="Row-img" />
              </div>
              <div className="Row-content">
                <h2 className="Row-title">Everything is Easier</h2>
                <p className="Row-description">
                  Buy, send, receive, swap, and manage all of your cryptocurrency with our dedicated
                  desktop application. It’s the same experience you are familiar with but now on
                  your computer.
                </p>
                {OS === 'Linux' ? (
                  <div>
                    <a href={linux32.link} className="Row-button Row-button-linux">
                      Download 32-bit
                    </a>
                    <a href={linux64.link} className="Row-button Row-button-linux">
                      Download 64-bit
                    </a>
                  </div>
                ) : (
                  <a
                    href={defaultBuilds.filter(build => build.name === OS)[0].link}
                    className="Row-button"
                  >
                    Download for {OS}
                  </a>
                )}
                <p className="Row-subtext">It only takes a moment to install!</p>
              </div>
            </div>
          </div>
        </section>

        <section className="App-marketing">
          <div className="App-marketing-container">
            <div className="App-marketing-row">
              <Block
                img={Wallets}
                title="Create all the Wallets"
                description="The MyCrypto Desktop App allows you to generate as many addresses as you want, for any reason. Go offline and go wild!"
              />
              <Block
                img={Send}
                title="Send with Confidence"
                description="Everything you need to send a transaction is now on your computer. Even better, the app you open today is the same app you open tomorrow. MyCrypto doesn’t update without your knowledge."
              />
              <Block
                img={Manage}
                title="Manage Better"
                description="Beyond sending, you can also request payments and manage the accounts you access and addresses you send to, easier than ever."
              />
            </div>
          </div>
        </section>

        <section className="Testimonial">
          <div className="Testimonial-container">
            <h2 className="Testimonial-title">Open-Source & Fully Audited</h2>
            <p className="Testimonial-content">
              Our code is{' '}
              <a target="_blank" rel="noopener noreferrer" href={MYCRYPTO_GITHUB_URL}>
                open-source
              </a>, licensed under MIT, and has undergone a{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/MyCryptoHQ/MyCrypto/wiki/Audit"
              >
                security audit
              </a>{' '}
              by leading security firm,{' '}
              <a target="_blank" rel="noopener noreferrer" href="https://cure53.de/">
                Cure53
              </a>.
              <br />
              Here’s what Cure53 had to say:
            </p>
            <blockquote className="Testimonial-quote">
              “The security posture of the MyCrypto project was judged as robust and the general
              security standards exhibited by various components attests to the development that
              happens with security in mind.”
            </blockquote>
          </div>
        </section>

        <section className="Upgrade">
          <div className="Upgrade-container">
            <img
              className="Upgrade-img"
              src={img4}
              alt="Celebration Illustration"
              width="150"
              height="150"
            />
            <h2 className="Upgrade-title">Are you ready to upgrade your experience?</h2>
            {OS === 'Linux' ? (
              <div>
                <a href={linux32.link} className="Upgrade-button App-linux-download">
                  Download for {OS} (32-bit)
                </a>
                <a href={linux64.link} className="Upgrade-button App-linux-download">
                  Download for {OS} (64-bit)
                </a>
              </div>
            ) : (
              <a
                href={defaultBuilds.filter(build => build.name === OS)[0].link}
                className="Upgrade-button"
              >
                Download for {OS}
              </a>
            )}
            <p className="Upgrade-content">
              Have more questions? Ping us on{' '}
              <a target="_blank" rel="noopener noreferrer" href={MYCRYPTO_TWITTER_URL}>
                Twitter
              </a>{' '}
              or join our{' '}
              <a target="_blank" rel="noopener noreferrer" href={MYCRYPTO_DISCORD_URL}>
                Discord
              </a>{' '}
              and tell us what is holding you back.
            </p>
          </div>
        </section>

        <section className="Platforms">
          <div className="Platforms-container">
            <div className="Platforms-row">
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
        </section>

        <footer className="Footer">
          <a className="Footer-logo" href={MYCRYPTO_URL} />
          <div className="Footer-links">
            <a href={MYCRYPTO_URL}>MyCrypto.com</a>
            <a target="_blank" rel="noopener noreferrer" href={MYCRYPTO_SUPPORT_URL}>
              Help & Support
            </a>
            <a target="_blank" rel="noopener noreferrer" href={MYCRYPTO_ABOUT_URL}>
              About
            </a>
            <a target="_blank" rel="noopener noreferrer" href={MYCRYPTO_PRIVACY_URL}>
              Privacy Policy
            </a>
          </div>
          <p className="Footer-text">
            MyCrypto is an open-source, client-side tool for generating ether wallets, handling
            ERC-20 tokens, and interacting with the blockchain more easily. Developed by and for the
            community since 2015, we’re focused on building awesome products that put the power in
            people’s hands.
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
