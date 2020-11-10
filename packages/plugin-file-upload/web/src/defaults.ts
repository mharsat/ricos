/* eslint-disable camelcase */
export const DEFAULTS = {
  config: {},
  configViewer: {
    downloadTarget: '_blank',
  },
  resolveFileUrl: () =>
    new Promise(resolve =>
      setTimeout(
        () => resolve('http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf'),
        1000
      )
    ),
};
