import React, {PureComponent} from 'react';
import PageTitle from '../components/PageTitle';
import ContentWrapper from '../components/ContentWrapper';

export default class ModelEditorPage extends PureComponent {
  render() {
    return (
      <ContentWrapper>
        <PageTitle>Modell-Editor</PageTitle>
        <div>
          <a href="https://github.com/neurals-ro/keras-model-editor">Editor</a>
        </div>
      </ContentWrapper>
    );
  }
}
