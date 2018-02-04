import React, {PureComponent} from 'react';
import PageTitle from '../components/PageTitle';
import ContentWrapper from '../components/ContentWrapper';

export default class MachineVisionPage extends PureComponent {
  render() {
    /*
    const links = {
      'video': 'https://eu-west-1.console.aws.amazon.com/rekognition/home?region=eu-west-1#/video-analysis',
      'quick': 'https://github.com/boto/boto3#quick-start',
      'tensorflow': 'https://github.com/gliese581gg/YOLO_tensorflow',
      'yolo': 'https://github.com/longcw/yolo2-pytorch'
  };
  */

    return (
      <ContentWrapper>
        <PageTitle>Maschinelles Sehen</PageTitle>
        <div>
          <ul>
          </ul>
        </div>
      </ContentWrapper>
    );
  }
}
