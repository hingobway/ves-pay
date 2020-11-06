import React from 'react';

export default function Zelle({ number }) {
  return (
    <div>
      <div className="text">Zelle payments can be made out to</div>
      <div className="text email">
        <span>michael@virtualensembleservices.com</span>
      </div>

      <div className="text">
        Make sure to include your invoice number <span>#{number}</span> in the
        payment message when you send a payment.
      </div>

      <style jsx>{`
        .text {
          font: normal normal normal 12px/18px var(--font);
          text-align: center;
          letter-spacing: 0.12px;

          user-select: none;
        }
        .email {
          padding: 7px;
          padding-bottom: 20px;
        }
        .email span {
          padding: 6px;
        }
        span {
          color: var(--white);
          background: var(--gray);
          border-radius: 3px;
          padding: 2px;
          user-select: all;
        }
      `}</style>
    </div>
  );
}
