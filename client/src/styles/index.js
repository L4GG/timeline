// @flow
export const font = Object.freeze({
  family: Object.freeze({
    body: 'Georgia, Times, "Times New Roman", serif',
    heading: 'Georgia, Times, "Times New Roman", serif',
    small:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  }),
  lineHeight: Object.freeze({
    body: 1.5,
    heading: 1.125,
  }),
  size: Object.freeze({
    small: 12,
    medium: 16,
    large: 32,
    quote: 15,
  }),
});

export const breakPoint = Object.freeze({
  small: 480,
  medium: 768,
  large: 1024,
});

export const color = Object.freeze({
  alto: '#d8d8d8',
  calypso: '#326891',
  dustyGrey: '#979797',
  gallery: '#f2f2f2',
  white80: 'rgba(255, 255, 255, 0.8)',
});
