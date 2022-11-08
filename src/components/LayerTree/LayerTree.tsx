import React, { FC } from 'react';
import styled from 'styled-components';
import { LayerTreeContextProvider } from './LayerTreeContext';

type LayerTreeProps = {
  allowCollapse?: boolean;
  onItemClick?: (value: string, data: unknown) => boolean | void;
  children?: React.ReactNode;
};

const LayerTree: FC<LayerTreeProps> = ({ allowCollapse, onItemClick, children }) => {
  const hasChildren = !!children;
  return (
    <TreeContainer className="layertree">
      <LayerTreeContextProvider allowCollapse={allowCollapse} onItemClick={onItemClick}>
        {hasChildren && <ul className="level root">{children}</ul>}
      </LayerTreeContextProvider>
    </TreeContainer>
  );
};

const TreeContainer = styled.div`
  position: relative;

  & ul {
    margin: 0;
  }

  & > ul.level.root {
    padding-left: 0px;
  }

  & li.node {
    min-height: 24px;
    font-size: 14px;
    line-height: 24px;
    vertical-align: middle;
    padding-left: 0px;
  }

  & ul.level,
  & li.node {
    position: relative;
    user-select: none;
  }

  // Remove normal list styling
  & ul.level {
    list-style: none;
    padding-left: 12px;
  }

  // Placeholders for lines
  & li.node::before,
  & li.node::after,
  & ul.level.child::before {
    content: '';
    position: absolute;
  }

  // Horizontal lines
  & li.node::before {
    border-top: 1px solid #000;
    top: 11px;
    left: -1px;
    width: 5px;
    height: 0;
  }

  // Vertical lines
  & li.node::after {
    border-left: 1px solid #000;
    top: 0px;
    left: -1px;
    height: 100%;
    width: 0px;
  }

  // The very first node should not have an upwards line
  & ul.level.root > li.node:first-child::after {
    top: 11px;
    height: calc(100% - 10px);
  }

  // The very first node should not have a vertical line at all if it does not have siblings
  & ul.level.root > li.node:only-child::after {
    border-style: none;
  }

  // The very first node should not have a horizontal line at all if it does not have siblings
  & ul.level.root > li.node:only-child::before {
    border-style: none;
  }

  // Last node on each level should not have a downwards line
  & ul.level > li.node:last-child::after {
    height: 11px;
  }

  // Extend the lines of first childs upwards towards the icon
  & ul.level.child::before {
    border-left: 1px solid #000;
    top: -4px;
    margin-left: -1px;
    height: 5px;
  }
`;

export { LayerTree };
