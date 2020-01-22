import { SelectionState, EditorState, Modifier } from 'draft-js';
import {
  getCurrentBlock,
  replaceWithEmptyBlock,
  LinkIcon,
  insertLinkInPosition,
  BUTTONS,
} from 'wix-rich-content-editor-common';

const onConvertToLink = (editorState, setEditorState) => {
  // preserve url
  let currentBlock = getCurrentBlock(editorState);
  const blockKey = currentBlock.key;
  const entityKey = currentBlock.getEntityAt(0);
  const entityData = editorState
    .getCurrentContent()
    .getEntity(entityKey)
    ?.getData();
  const url = entityData?.url;

  // replace preview block with text block containing url
  let newState = replaceWithEmptyBlock(editorState, currentBlock.key);
  let contentState = Modifier.insertText(
    newState.getCurrentContent(),
    newState.getSelection(),
    url
  );
  // reread block after insertText
  currentBlock = contentState.getBlockForKey(currentBlock.key);
  const nextBlock = contentState.getBlockAfter(currentBlock.key);
  // delte empty block after preview
  if (nextBlock && nextBlock.text.length === 0) {
    const selectionRange = new SelectionState({
      anchorKey: currentBlock.key,
      anchorOffset: currentBlock.text.length,
      focusKey: nextBlock.key,
      focusOffset: 1,
    });
    contentState = Modifier.removeRange(contentState, selectionRange, 'forward');
  }
  newState = EditorState.push(newState, contentState, 'change-block-type');
  // change the url from plain text to a link
  const editorStateWithLink = insertLinkInPosition(
    EditorState.push(newState, newState.getCurrentContent(), 'change-block-type'),
    blockKey,
    0,
    url.length,
    {
      url,
    }
  );
  EditorState.push(
    editorStateWithLink,
    editorStateWithLink.getCurrentContent(),
    'change-block-type'
  );
  setEditorState(EditorState.createWithContent(editorStateWithLink.getCurrentContent()));
};

export default (settings, setEditorState, getEditorState) => [
  {
    keyName: 'delete',
    type: BUTTONS.DELETE,
    mobile: true,
  },
  {
    keyName: 'convertToLink',
    type: 'custom',
    icon: LinkIcon,
    onClick: () => {
      const editorState = getEditorState();
      onConvertToLink(editorState, setEditorState);
    },
    mobile: true,
    desktop: true,
  },
];
