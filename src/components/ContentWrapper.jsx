import React from 'react';
import styled from 'styled-components';
import Page from '@atlaskit/page';
import {akGridSizeUnitless} from '@atlaskit/util-shared-styles';

const Padding = styled.div`
  margin: ${akGridSizeUnitless * 4}px ${akGridSizeUnitless * 4}px;
  padding-bottom: ${akGridSizeUnitless * 3}px;
`;

export default ({children}) => (
  <Page>
    <Padding>{children}</Padding>
  </Page>
)