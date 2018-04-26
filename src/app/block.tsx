import * as React from 'react';

interface Props {
  img: any;
  title: string;
  description: string;
}

export const Block = ({ img, title, description }: Props) => (
  <div className="App-marketing-box">
    <img src={img} alt="" className="App-marketing-box-img" />
    <div className="App-marketing-box-content">
      <p className="App-marketing-box-title">{title}</p>
      <p className="App-marketing-box-description">{description}</p>
    </div>
  </div>
);
