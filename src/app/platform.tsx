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

export const Platform = ({ title, href }: Props) => {
  return getPlatform(title) === 'lin' ? (
    <div className="App-platform">
      <i className="nc-icon nc-linux" />
      <div className="App-platform-content">
        <p className="App-platform-title">{title}</p>
        <a href="https://s3-us-west-2.amazonaws.com/mycrypto-electron-alpha/2/MyCrypto-1-0-0-RC2-linux-i386.AppImage">
          32-bit
        </a>
        <a href="https://s3-us-west-2.amazonaws.com/mycrypto-electron-alpha/2/MyCrypto-1-0-0-RC2-linux-x86_64.AppImage">
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
