import React from 'react';

import buttons from './buttons';

const Btn = ({ button, onClick }) => (
  <div className="button" onClick={onClick ? onClick : null}>
    <img src={buttons[button.name]} alt={button.name} draggable="false" />
    <div className="text">{button.text ? button.text : button.name}</div>
  </div>
);

export default function Button({ button, dark, onClick }) {
  return (
    <div>
      {button.link ? (
        <a href={button.link}>
          <Btn button={button} />
        </a>
      ) : (
        <Btn button={button} onClick={onClick} />
      )}

      <style jsx>{`
        a {
          text-decoration: none !important;
        }
      `}</style>

      <style jsx global>{`
        .button {
          display: flex;

          margin-bottom: 30px;
          padding: 14px;
          padding-left: 38px;
          padding-right: 38px;
          border-radius: 9999px;

          background: var(--${dark ? 'black' : 'accent-dark'});
          box-shadow: 0px 3px 19px hsla(0, 0%, 0%, 0.059);
          user-select: none;
          cursor: pointer;
        }
        .button:hover {
          box-shadow: 0px 7px 21px -2px hsla(0, 0%, 0%, 0.3);
          transition: 0.2s;
        }

        .button img {
          opacity: 0.9;
        }

        .button .text {
          font-family: var(--font);
          font-style: normal;
          font-weight: bold;
          font-size: var(--f-size);
          line-height: var(--f-yspace);
          letter-spacing: var(--f-vspace);
          color: var(--white);
          text-transform: capitalize;
          opacity: 0.95;

          margin-left: 27px;
        }
      `}</style>
    </div>
  );
}
