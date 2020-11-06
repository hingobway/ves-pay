import React from 'react';

import V from '../svg/v.svg';

export default function Logo({ number }) {
  return (
    <div>
      <div className="content">
        <div className="logo">
          <img src={V} alt="logo" draggable="false" />
          <div>pay</div>
        </div>
        {!number ? null : (
          <div className="invoice">
            <p>
              invoice #<span>{number}</span>
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .content {
          user-select: none;
        }

        .logo,
        .invoice {
          width: 188px;
          height: 188px;
          border-radius: 35px;

          box-shadow: 0px 3px 35px hsla(0, 0%, 0%, 0.059);
        }

        .logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          background: var(--white);
          z-index: 10;
        }
        .logo > div {
          margin-top: 9px;
          font: normal normal bold 33px/41px var(--font);
          color: var(--black);
          opacity: 0.84;
        }

        .invoice {
          background: var(--lt-gray);

          margin-top: -148px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
        }
        .invoice p {
          margin: 35px;
          margin-bottom: 12px;

          font: normal normal bold 12px/15px var(--font);
          color: var(--accent-dark);
          letter-spacing: 0.12px;
        }
        span {
          user-select: all;
        }
      `}</style>
    </div>
  );
}
