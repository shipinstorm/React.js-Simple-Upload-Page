import * as React from 'react';

interface Props {
  title: string;
  href: string;
  linux32Url: string;
  linux64Url: string;
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

export const Platform = ({ title, href, linux32Url, linux64Url }: Props) => {
  return getPlatform(title) === 'lin' ? (
    <div className="Platforms-column">
      <div className="Platforms-button">
        <i className="nc-icon nc-linux" />
        <div className="Platforms-button-content">
          <p className="Platforms-button-title">{title}</p>
          <a href={linux32Url}>32-bit</a>
          <a href={linux64Url}>64-bit</a>
        </div>
      </div>
    </div>
  ) : (
    <div className="Platforms-column">
      <a href={href} className="Platforms-button">
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
        <p className="Platforms-button-title">{title}</p>
      </a>
    </div>
  );
};
