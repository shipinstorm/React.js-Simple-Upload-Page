import * as React from 'react';

interface Props {
  title: string;
  href: string;
}

const getPlatform: any = (title: string) => {
  switch (title) {
    case 'macOS':
      return 'mac';
    case 'Windows':
      return 'win';
    case 'Linux':
      return 'lin';
    default:
      return 'Stand Alone';
  }
};

// https://github.com/MyCryptoHQ/MyCrypto/releases/download/1.0.2/linux-i386_1.0.2-alpha.5_MyCrypto.AppImage

export const Platform = ({ title, href }: Props) => {
  return getPlatform(title) === 'lin' ? (
    <div className="App-platform">
      <i className="nc-icon nc-linux" />
      <div className="App-platform-content">
        <p className="App-platform-title">{title}</p>
        <a href="https://github.com/MyCryptoHQ/MyCrypto/releases/download/1.0.2/linux-i386_1.0.2-alpha.5_MyCrypto.AppImage">
          32-bit
        </a>
        <a href="https://github.com/MyCryptoHQ/MyCrypto/releases/download/1.0.2/linux-x86-64_1.0.2-alpha.5_MyCrypto.AppImage">
          64-bit
        </a>
      </div>
    </div>
  ) : (
    <a href={href} className="App-platform">
      <i
        className={`nc-icon ${
          title === 'macOS'
            ? 'nc-apple'
            : title === 'Windows'
              ? 'nc-windows'
              : title === 'Linux'
                ? 'nc-linux'
                : 'nc-window-dev'
        }`}
      />
      <p className="App-platform-title">{title}</p>
    </a>
  );
};
