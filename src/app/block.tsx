import * as React from 'react';

interface Props {
  img: any;
  title: string;
  description: string;
}

export const Block = ({ img, title, description }: Props) => (
  <div className="App-marketing-column">
    <div className="App-marketing-box">
      <img src={img} alt="" className="App-marketing-box-img" />
      <h3 className="App-marketing-box-title">{title}</h3>
      <p className="App-marketing-box-description">{description}</p>
    </div>
  </div>
);
