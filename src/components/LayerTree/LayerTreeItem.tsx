import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useLayerTreeContext } from './LayerTreeContext';
import { CircleIcon, DiamondIcon, SquareIcon } from './LayerTreeIcons';

type LayerTreeItemProps = {
  value: string;
  data?: unknown;
  icon?: 'circle' | 'square' | 'diamond';
  iconGroup?: number;
  color?: string;
  selected?: boolean;
  collapsed?: boolean;
  disabled?: boolean;
  onClick?: (item: string, data: unknown) => boolean | void;
  children?: React.ReactNode;
};

const LayerTreeItem: FC<LayerTreeItemProps> = ({
  value,
  data,
  icon = 'circle',
  iconGroup = undefined,
  color,
  collapsed,
  selected = false,
  disabled = false,
  onClick,
  children,
}) => {
  const treeContext = useLayerTreeContext();
  const [collapsedState, setCollapsedState] = useState(collapsed || false);
  const hasChildren = !!children;
  const shouldDrawChildren = !!children && !collapsedState;

  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (disabled) return;
    const shouldCallContextHandler = onClick ? !onClick(value, data ?? null) : true;
    shouldCallContextHandler && treeContext.onItemClick && treeContext.onItemClick(value, data ?? null);
  };

  const handleExpansionToggle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!hasChildren) return;
    setCollapsedState((prev) => !prev);
  };

  const renderIcon = () => {
    switch (icon) {
      case 'diamond':
        return <DiamondIcon color={color} iconGroup={iconGroup} />;
      case 'square':
        return <SquareIcon color={color} iconGroup={iconGroup} />;
      default:
        return <CircleIcon color={color} iconGroup={iconGroup} />;
    }
    1;
  };

  const renderCollapseToggle = () => {
    return (
      <CollapseToggle onClick={handleExpansionToggle}>
        {collapsedState ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleDown} />}
      </CollapseToggle>
    );
  };

  return (
    <li className="node">
      <NodeValue onClick={handleOnClick} $selected={selected} $disabled={disabled}>
        {renderIcon()}
        {value}
        {hasChildren && treeContext.allowCollapse && renderCollapseToggle()}
      </NodeValue>
      {shouldDrawChildren && <ul className="level child">{children}</ul>}
    </li>
  );
};

const NodeValue = styled.div<{ $selected: boolean; $disabled: boolean }>`
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  color: ${(props) => (props.$disabled ? '#aaaaaa' : '#000000')};
  background-color: ${(props) => (props.$selected ? '#ddd' : 'none')};
  font-weight: ${(props) => (props.$selected ? 'bold' : 'normal')};

  &:hover {
    background-color: ${(props) => (props.$disabled ? 'none' : '#eee')};
  }
`;

const CollapseToggle = styled.span`
  padding-left: 4px;
  color: #000;
  cursor: pointer;
`;

export { LayerTreeItem };
