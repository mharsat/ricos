import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(soundCloudTypeMapper);
