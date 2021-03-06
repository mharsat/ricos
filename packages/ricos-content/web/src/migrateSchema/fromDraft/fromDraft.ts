/* eslint-disable no-console, fp/no-loops, no-case-declarations */

import { cloneDeep, isEmpty } from 'lodash';
import { RicosContent as RicosContentDraft, RicosContentBlock } from '../..';
import { BlockType, FROM_DRAFT_LIST_TYPE, HeaderLevel, NodeType } from '../consts';
import { RicosContent, RicosNode, google } from 'ricos-schema';
import { genKey } from '../generateRandomKey';
import { getTextNodes } from './getTextNodes';
import { getEntity, parseBlockData } from './getRicosEntityData';

const createTimestamp = (): google.protobuf.Timestamp => {
  const timeMS = Date.now();
  return {
    seconds: Math.floor(timeMS / 1000),
    nanos: (timeMS % 1000) * 1e6,
  };
};

export const ensureRicosContent = (content: RicosContent | RicosContentDraft) =>
  'blocks' in content ? fromDraft(content) : content;

export const fromDraft = (draftJSON: RicosContentDraft): RicosContent => {
  const { blocks, entityMap, VERSION: version } = cloneDeep(draftJSON);
  const nodes: RicosNode[] = [];

  const parseBlocks = (index = 0) => {
    const block = blocks[index];
    if (block) {
      switch (block.type) {
        case BlockType.Atomic:
          nodes.push(parseAtomicBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockType.Blockquote:
          nodes.push(parseQuoteBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockType.CodeBlock:
          nodes.push(parseCodeBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockType.HeaderOne:
        case BlockType.HeaderTwo:
        case BlockType.HeaderThree:
        case BlockType.HeaderFour:
        case BlockType.HeaderFive:
        case BlockType.HeaderSix:
          nodes.push(parseHeadingBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockType.OrderedListItem:
        case BlockType.UnorderedListItem:
          const { node, nextIndex } = parseListBlocks(index);
          nodes.push(node);
          parseBlocks(nextIndex);
          break;
        case BlockType.Unstyled:
          nodes.push(parseTextBlock(block));
          parseBlocks(index + 1);
          break;
        default:
          console.log(`ERROR! Unknown block type "${block.type}"!`);
          process.exit(1);
      }
    }
  };

  const parseAtomicBlock = (block: RicosContentBlock): RicosNode => {
    return {
      key: block.key,
      nodes: [],
      ...getEntity(block.entityRanges[0].key, entityMap),
    };
  };

  const parseQuoteBlock = (block: RicosContentBlock): RicosNode => ({
    key: block.key,
    type: NodeType.Blockquote,
    nodes: [parseTextBlock(block)],
  });

  const parseCodeBlock = (block: RicosContentBlock): RicosNode => ({
    key: block.key,
    type: NodeType.CodeBlock,
    nodes: getTextNodes(block, entityMap),
    ricosCode: {
      ...parseBlockData(block.data),
    },
  });

  const parseHeadingBlock = (block: RicosContentBlock): RicosNode => {
    const getLevel = (blockType: string) => {
      if (Object.keys(HeaderLevel).includes(blockType)) {
        return HeaderLevel[blockType];
      }
      console.log(`ERROR! Unknown header level "${blockType}"!`);
      process.exit(1);
    };
    return {
      key: block.key,
      type: NodeType.Heading,
      ricosHeading: {
        level: getLevel(block.type),
        depth: block.depth || undefined,
        ...parseBlockData(block.data),
      },
      nodes: getTextNodes(block, entityMap),
    };
  };

  const parseTextBlock = (block: RicosContentBlock): RicosNode => {
    const textWrapperNode: RicosNode = {
      key: genKey(),
      type: NodeType.Paragraph,
      ricosParagraph: {
        ...parseBlockData(block.data),
      },
      nodes: [],
    };

    switch (block.type) {
      case BlockType.Unstyled:
        textWrapperNode.key = block.key;
      // falls through
      case BlockType.Blockquote:
      case BlockType.OrderedListItem:
      case BlockType.UnorderedListItem:
        textWrapperNode.ricosParagraph = {
          ...textWrapperNode.ricosParagraph,
          depth: block.depth,
        };
        break;
      default:
    }

    const nodes = getTextNodes(block, entityMap);

    if (!isEmpty(nodes)) {
      textWrapperNode.nodes = nodes;
    }

    return textWrapperNode;
  };

  const createListItem = (block: RicosContentBlock): RicosNode => ({
    key: block.key,
    type: NodeType.ListItem,
    nodes: [parseTextBlock(block)],
  });

  const isListBlock = (block: RicosContentBlock): boolean => !!FROM_DRAFT_LIST_TYPE[block.type];

  const parseListBlocks = (listStartIndex: number): { node: RicosNode; nextIndex: number } => {
    const { type: listType, depth } = blocks[listStartIndex];
    const listNodes: RicosNode[] = [];
    let searchIndex = listStartIndex;
    let nextBlock = blocks[searchIndex];

    while (isListBlock(nextBlock) && nextBlock.depth >= depth) {
      if (nextBlock.depth > depth || nextBlock.type !== listType) {
        const { node, nextIndex } = parseListBlocks(searchIndex);
        listNodes[listNodes.length - 1].nodes.push(node);
        searchIndex = nextIndex;
      } else {
        listNodes.push(createListItem(nextBlock));
        searchIndex++;
      }
      nextBlock = blocks[searchIndex];
    }

    return {
      node: {
        key: genKey(),
        type: FROM_DRAFT_LIST_TYPE[listType],
        nodes: listNodes,
      },
      nextIndex: searchIndex,
    };
  };

  parseBlocks();

  const ricosContentMessage = RicosContent.fromObject({
    doc: {
      nodes,
      lastEdited: createTimestamp(),
    },
    selection: {
      anchorNode: nodes[0].key,
    },
    version: version || '',
  });

  const err = RicosContent.verify(ricosContentMessage);
  if (err) {
    console.log('ERROR! Invalid content');
    console.log(err);
    process.exit(1);
  }

  const ricosContent = RicosContent.toObject(ricosContentMessage, {
    arrays: true,
    enums: String,
    longs: Number,
  });

  return ricosContent;
};
