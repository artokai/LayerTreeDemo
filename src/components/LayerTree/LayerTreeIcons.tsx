import { FC } from 'react';
import styled from 'styled-components';

type SvgIconProps = {
  className?: string;
  iconGroup?: number;
  color?: string;
};

const CircleIcon: FC<SvgIconProps> = (props) => {
  /* eslint-disable */
  return (
    <StyledSvgIcon color={props.color} fill="currentColor" className={props.className} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="25" />
      {props.iconGroup != undefined && (
        <text x="50%" y="49%" className="groupid" dy="0.33em">
          {props.iconGroup}
        </text>
      )}
    </StyledSvgIcon>
  );
  /* eslint-enable */
};

const SquareIcon: FC<SvgIconProps> = (props) => {
  /* eslint-disable */
  return (
    <StyledSvgIcon color={props.color} fill="currentColor" className={props.className} viewBox="0 0 100 100">
      <rect x="25" y="25" width="50" height="50" />
      {props.iconGroup != undefined && (
        <text x="50%" y="49%" className="groupid" dy="0.33em">
          {props.iconGroup}
        </text>
      )}
    </StyledSvgIcon>
  );
  /* eslint-enable */
};

const DiamondIcon: FC<SvgIconProps> = (props) => {
  /* eslint-disable */
  return (
    <StyledSvgIcon color={props.color} fill="currentColor" className={props.className} viewBox="0 0 101 101">
      <path d="M 49 20 L 75 49 L 49 80 L 25 49 Z" />
      {props.iconGroup != undefined && (
        <text x="50%" y="50%" className="groupid" dy="0.25em">
          {props.iconGroup}
        </text>
      )}
    </StyledSvgIcon>
  );
  /* eslint-enable */
};

const StyledSvgIcon = styled.svg<{ color?: string }>`
  width: 24px;
  height: 24px;
  color: ${(props) => props.color || '#000'};
  float: left;

  .groupid {
    fill: white;
    font-weight: bold;
    font-size: 33px;
    text-anchor: middle;
    font-family: courier new, sans-serif;
  }
`;
export { DiamondIcon, CircleIcon, SquareIcon };
