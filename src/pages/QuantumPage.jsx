import React, {PureComponent} from 'react';
import PageTitle from '../components/PageTitle';
import PageSubtitle from '../components/PageSubtitle';
import ContentWrapper from '../components/ContentWrapper';

export default class QuantumPage extends PureComponent {
  render() {
    return (
      <ContentWrapper>
        <PageTitle>Quantentechnologie</PageTitle>
        <PageSubtitle>Algorithmen</PageSubtitle>
        <ul>
          <li><a href="https://de.wikipedia.org/wiki/Deutsch-Jozsa-Algorithmus">Deutsch-Jozsa-Algorithmus</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Simon%27s_problem">Simon's problem</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Quantum_phase_estimation_algorithm">Quantum phase estimation algorithm</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Shor%27s_algorithm">Shor's algorithm</a></li>
        </ul>
      </ContentWrapper>
    );
  }
}
