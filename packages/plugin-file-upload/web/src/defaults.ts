import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';

/* eslint-disable camelcase */
export const DEFAULTS = {
  config: {},
  configViewer: {
    resolveFileUrl: () =>
      new Promise(resolve =>
        setTimeout(
          () =>
            resolve('http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf'),
          1000
        )
      ),
    downloadTarget: '_blank',
  },
};

export const theme = (colors: PaletteColors, utils: ThemeUtils) => {
  const { textColor, actionColor, bgColor } = colors;
  return {
    file_upload_name: {
      color: textColor,
    },
    file_upload_extension: {
      color: textColor,
    },
    file_upload_type: {
      color: textColor,
    },
    file_upload_icon: {
      color: actionColor,
    },
    file_upload_state: {
      color: textColor,
    },
    file_upload_icon_background: {
      fill: bgColor,
    },
    file_upload_icon_frame: {
      stroke: bgColor,
    },
    editor: {
      '& $file_upload_container': {
        border: [1, 'solid', utils.hexToRgbA(textColor, 0.2)],
      },
      '& $file_upload_container:hover': {
        border: [1, 'solid', utils.hexToRgbA(textColor, 0.6)],
      },
    },
    file_upload_container: {},
  };
};