import React from 'react';

export default function Invoice({ number }) {
  return (
    <div>
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
