import { ContentStateTransformation } from 'ricos-content/libs/preview';
import { PreviewConfig } from 'wix-rich-content-preview';
import { RicosContent } from 'wix-rich-content-common';

export default function previewStrategy(
  isViewer: boolean,
  isPreviewExpanded: boolean,
  onPreviewExpand: PreviewConfig['onPreviewExpand'],
  previewConfig?: PreviewConfig,
  content?: RicosContent
) {
  if (!isViewer || !previewConfig || !content) {
    return {};
  }
  const {
    transformation,
    contentInteractionMappers,
    onPreviewExpand: consumerCallback,
  } = previewConfig;
  if (!transformation || !contentInteractionMappers) {
    return {};
  }
  const initialState =
    isPreviewExpanded || !transformation
      ? content
      : (transformation as ContentStateTransformation).apply(content);
  return {
    initialState,
    config: {
      PREVIEW: {
        ...previewConfig,
        onPreviewExpand: () => {
          onPreviewExpand?.();
          consumerCallback?.();
        },
      },
    },
  };
}
