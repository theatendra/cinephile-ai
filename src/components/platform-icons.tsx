import React from 'react';

const iconStyle = {
  width: '80px',
  height: 'auto',
  filter: 'grayscale(100%)',
  opacity: 0.7,
};

const iconHoverStyle = {
  filter: 'grayscale(0%)',
  opacity: 1,
};


export const NetflixIcon = () => (
    <svg viewBox="0 0 113.4 30" style={iconStyle}
        onMouseOver={e => {
            e.currentTarget.style.filter = iconHoverStyle.filter;
            e.currentTarget.style.opacity = iconHoverStyle.opacity.toString();
        }}
        onMouseOut={e => {
            e.currentTarget.style.filter = iconStyle.filter;
            e.currentTarget.style.opacity = iconStyle.opacity.toString();
        }}
    >
      <path fill="#E50914" d="M113.4,29.3V0H86.3v13.3L56.7,0H27.1v13.3L0,0V29.3h27.1V16.1L56.7,29.3h29.6V16.1L113.4,29.3z M86.3,0H56.7L27.1,29.3H0v0.7h27.1V16.7L0,0h27.1v13.3L56.7,0h29.6v13.3L113.4,0v29.3h-27.1V16.1L56.7,29.3h29.6V16.1L113.4,29.3h0V0z"/>
    </svg>
);

export const HuluIcon = () => (
  <svg viewBox="0 0 100 28" style={iconStyle}
        onMouseOver={e => {
            e.currentTarget.style.filter = iconHoverStyle.filter;
            e.currentTarget.style.opacity = iconHoverStyle.opacity.toString();
        }}
        onMouseOut={e => {
            e.currentTarget.style.filter = iconStyle.filter;
            e.currentTarget.style.opacity = iconStyle.opacity.toString();
        }}
    >
    <path fill="#1CE783" d="M84.7,28H73.3L72,20.4H59.5L58.2,28H46.8L58.7,0h14.1L84.7,28z M61.7,15.1h8.1L65.7,3L61.7,15.1z M34.6,28H23.2V0h11.4V28z M11.6,28H0.2V0h11.4V28z M100,28H88.6V0H100V28z"/>
  </svg>
);

export const AmazonPrimeVideoIcon = () => (
  <svg viewBox="0 0 200 24" style={iconStyle}
        onMouseOver={e => {
            e.currentTarget.style.filter = iconHoverStyle.filter;
            e.currentTarget.style.opacity = iconHoverStyle.opacity.toString();
        }}
        onMouseOut={e => {
            e.currentTarget.style.filter = iconStyle.filter;
            e.currentTarget.style.opacity = iconStyle.opacity.toString();
        }}
    >
    <path fill="#00A8E1" d="M109.1,19.2h-3.3c-2,0-3.3-1.1-3.3-3.3v-2c0-2,1.2-2.9,2.7-3.4c2.1-0.6,4.4-1.2,4.4-3.7c0-2.2-1.9-3.4-4.6-3.4 c-3.5,0-4.9,1.7-4.9,4.3h3.2c0-1.2,0.8-1.9,1.8-1.9c0.9,0,1.4,0.5,1.4,1.3c0,1-0.7,1.4-2.1,1.8c-2.4,0.7-5,1.5-5,4.3 c0,2.6,2.1,3.9,5,3.9c3.1,0,5.2-1.6,5.2-4.6h-3.3C107.5,18,108,18.8,109.1,19.2z M119.5,8.8h-3.2v10.1h3.2V8.8z M125.6,18.9h3.2 V3.1h-3.2V18.9z M137.9,13.8L136,8.8h-3.5l-1.9,4.9l-1.9-4.9h-3.5l-1.9,5.1V3.1h-3.2v15.8h3.2l2.3-5.7l2.2,5.7h3.3l2.2-5.7 l2.3,5.7h3.2V3.1h-3.2V13.8z M149.6,16.2h3.6l1.3-3.6h-4.9L149.6,16.2z M150.1,3.1L144,18.9h3.4l0.8-2.4h5.2l2,5.7h3.3 l-6-15.8H150.1z M167.6,11.2c0-1.6-1-2.5-2.8-2.5h-2.3v5.1h2.3C166.5,13.8,167.6,12.8,167.6,11.2z M162.5,3.1h-3.2v15.8h3.2 c4.1,0,6.3-2.3,6.3-5.7v-3.2C168.8,5.4,166.6,3.1,162.5,3.1z M176,12.7c-0.2,3-2.2,4.4-4.8,4.4c-2.5,0-4.7-1.4-4.7-4.1 c0-3.3,2.4-4.3,5-4.4h4.5v-1c0-1.3-0.8-1.9-2.2-1.9c-1.3,0-2.1,0.5-2.1,1.8h-3.2c0-2.6,2.2-4.1,5.3-4.1c3.2,0,5.4,1.6,5.4,4.6v6.3 C180.2,18.8,176,21.6,176,12.7z M175.7,11.2h-4.2c-1.5,0.1-2.4,0.7-2.4,1.8c0,1.2,0.9,1.9,2.4,1.9 C174.4,14.9,175.6,13.6,175.7,11.2z M186.2,8.8h-3.2v10.1h3.2V8.8z M192.3,18.9h3.2V3.1h-3.2V18.9z M93,8.8h-3.2v10.1h3.2 V8.8z M93,5.6c0-1.2-0.9-2-2-2s-2,0.9-2,2s0.9,2,2,2S93,6.7,93,5.6z M76,12.7c-0.2,3-2.2,4.4-4.8,4.4c-2.5,0-4.7-1.4-4.7-4.1 c0-3.3,2.4-4.3,5-4.4h4.5v-1c0-1.3-0.8-1.9-2.2-1.9c-1.3,0-2.1,0.5-2.1,1.8h-3.2c0-2.6,2.2-4.1,5.3-4.1c3.2,0,5.4,1.6,5.4,4.6v6.3 C81.2,18.8,76,21.6,76,12.7z M76.7,11.2h-4.2c-1.5,0.1-2.4,0.7-2.4,1.8c0,1.2,0.9,1.9,2.4,1.9C75.4,14.9,76.6,13.6,76.7,11.2z M65,18.9h3.2V7.1l-4.4,11.8h-1.6l-4.4-11.8v11.8h3.2V6.1h-3.2V3.1h5.8l3,8.2l3-8.2h5.8v3.1h-3.2V18.9z M48.2,12.7 c-0.2,3-2.2,4.4-4.8,4.4c-2.5,0-4.7-1.4-4.7-4.1c0-3.3,2.4-4.3,5-4.4h4.5v-1c0-1.3-0.8-1.9-2.2-1.9c-1.3,0-2.1,0.5-2.1,1.8h-3.2 c0-2.6,2.2-4.1,5.3-4.1c3.2,0,5.4,1.6,5.4,4.6v6.3C53.2,18.8,48,21.6,48.2,12.7z M48.9,11.2h-4.2c-1.5,0.1-2.4,0.7-2.4,1.8 c0,1.2,0.9,1.9,2.4,1.9C47.6,14.9,48.8,13.6,48.9,11.2z M23.9,20.9c0,0,10.6-2,10.6-9.1c0-5.7-4.3-8-8.1-8s-8,2.2-8,7.9 c0,7.1,10.6,9.2,10.6,9.2C21.7,21.5,23.9,20.9,23.9,20.9z M32.3,9.5C32.3,1.1,23.4,0,23.4,0S14.5,1.1,14.5,9.5 c0,6.5,5.1,8.3,5.1,8.3l-5.3,6.2h3.5l3.7-4.4l3.7,4.4h3.5l-5.3-6.2C27.2,17.8,32.3,16,32.3,9.5z"/>
    <path fill="#FF9900" d="M0,13.7c0,0,10.6-2,10.6-9.1c0-5.7-4.3-8-8.1-8S-5.7,4.6-5.7,10.2C-5.7,17.4,4.9,19.5,4.9,19.5 C2.7,20.2,0,19.6,0,13.7z"/>
  </svg>
);


export const DisneyPlusIcon = () => (
    <svg viewBox="0 0 100 56.2" style={iconStyle}
        onMouseOver={e => {
            e.currentTarget.style.filter = iconHoverStyle.filter;
            e.currentTarget.style.opacity = iconHoverStyle.opacity.toString();
        }}
        onMouseOut={e => {
            e.currentTarget.style.filter = iconStyle.filter;
            e.currentTarget.style.opacity = iconStyle.opacity.toString();
        }}
    >
      <path fill="#ffffff" d="M1.3,16.5c0-1.8,0.3-3.5,0.8-5.2c1.3-4.3,4.4-7.8,8.8-9.8C15.8,0.5,21.1,0,26.7,0h3.2c5.9,0,11.3,0.5,16,1.5c4.7,1,8.5,2.9,11.3,5.6c2.8,2.7,4.5,6.1,4.9,10c0.1,0.8,0.1,1.7,0.1,2.5c0,0,0,0,0,0c-0.1-0.2-0.2-0.5-0.3-0.7c-0.2-0.8-0.5-1.5-0.8-2.2c-1.3-3.1-3.6-5.6-6.6-7.3c-3-1.7-6.7-2.6-10.9-2.6h-2.9c-5.1,0-9.6,0.9-13.3,2.6c-3.7,1.7-6.5,4.3-8.2,7.5c-1.7,3.2-2.5,7-2.5,11.2c0,4.2,0.8,8.1,2.5,11.5c1.7,3.4,4.3,6.1,7.9,8.1c3.6,2,7.9,3,12.7,3h2.1c5.2,0,9.9-0.9,13.8-2.8c3.9-1.9,6.9-4.7,8.7-8.2c0.2-0.4,0.4-0.8,0.5-1.2c0.2-0.5,0.3-1,0.5-1.5c0,0,0,0.1,0,0.1c-0.2,0.9-0.6,1.8-1,2.7c-1.4,3.2-3.8,5.7-7,7.4c-3.2,1.7-7.1,2.6-11.4,2.6h-2.4c-5.6,0-10.7-1-14.8-3.1c-4.1-2.1-7.4-5.1-9.5-8.9C2.1,30,1.3,23.5,1.3,16.5z"/>
      <path fill="#ffffff" d="M69.8,1.4v53.3h10.9V1.4H69.8z M99.1,22.8v10.9H85.9v-10.9H99.1z"/>
    </svg>
);

export const MaxIcon = () => (
    <svg viewBox="0 0 100 100" style={iconStyle}
        onMouseOver={e => {
            e.currentTarget.style.filter = iconHoverStyle.filter;
            e.currentTarget.style.opacity = iconHoverStyle.opacity.toString();
        }}
        onMouseOut={e => {
            e.currentTarget.style.filter = iconStyle.filter;
            e.currentTarget.style.opacity = iconStyle.opacity.toString();
        }}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0ZM50 86.3636C30.0051 86.3636 13.6364 69.9949 13.6364 50C13.6364 30.0051 30.0051 13.6364 50 13.6364C69.9949 13.6364 86.3636 30.0051 86.3636 50C86.3636 69.9949 69.9949 86.3636 50 86.3636ZM50 78.1818C34.5432 78.1818 21.8182 65.4568 21.8182 50C21.8182 34.5432 34.5432 21.8182 50 21.8182C65.4568 21.8182 78.1818 34.5432 78.1818 50C78.1818 65.4568 65.4568 78.1818 50 78.1818Z" fill="#0000FF"/>
      <path d="M50.0002 29.5454C38.7061 29.5454 29.5455 38.706 29.5455 50C29.5455 61.294 38.7061 70.4545 50.0002 70.4545C61.2942 70.4545 70.4547 61.294 70.4547 50C70.4547 38.706 61.2942 29.5454 50.0002 29.5454Z" fill="#0000FF"/>
    </svg>
);


export const AppleTvIcon = () => (
    <svg viewBox="0 0 24 24" style={iconStyle}
        onMouseOver={e => {
            e.currentTarget.style.filter = iconHoverStyle.filter;
            e.currentTarget.style.opacity = iconHoverStyle.opacity.toString();
        }}
        onMouseOut={e => {
            e.currentTarget.style.filter = iconStyle.filter;
            e.currentTarget.style.opacity = iconStyle.opacity.toString();
        }}
    >
        <path fill="#000000" d="M18.12,14.34c-0.1,1.49-0.74,2.93-1.8,3.99c-1,1-2.2,1.55-3.57,1.57c-1.57,0.1,-3.09-0.74-3.99-1.8 C7.76,17.1,7.2,15.53,7.2,13.91c0-1.92,0.88-3.78,2.37-4.99c1.06-0.86,2.38-1.34,3.75-1.31c0.14,0,0.28,0,0.42,0 c1.26,0,2.69,0.56,3.67,1.57C16.33,8.12,15.5,9.2,15.5,9.2c-1.38-1.12-3.13-1.12-4.14-0.1c-1.2,1.2-1.5,3.1-0.3,4.3 c1.2,1.2,3.1,1.5,4.3,0.3c0.1-0.1,0.2-0.2,0.3-0.3C16.88,12.2,18.22,12.86,18.12,14.34z"/>
        <path fill="#000000" d="M14.49,6.36c0.56-0.66,0.92-1.49,1-2.36C14.7,3.9,13.8,4.1,13.2,4.6C12.6,5.1,12.2,5.9,12.1,6.8 C12.8,6.9,13.89,6.96,14.49,6.36z"/>
    </svg>
);
