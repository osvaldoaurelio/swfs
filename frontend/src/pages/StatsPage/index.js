import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { parseISO, formatRelative } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../componets/Header';

import ShortenerService from '../../services/shortenerService';

import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';

const service = new ShortenerService();

const StatsPage = () => {
  const [shortenerdURL, setShortenerdURL] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { code } = useParams();

  useEffect(() => {
    async function init() {
      setIsLoading(true);

      try {
        const response = await service.getStats(code);
        
        response.relativeDate = formatRelative(parseISO(response.updatedAt), new Date(), { locale });
        
        setShortenerdURL(response);
      } catch (err) {
        setErrorMessage('Ops, a url solicitada não existe.');
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [code]);
  
  return (
    <Container>
      <Header>Estatísticas:</Header>
      {errorMessage ? (
        <StatsContainer>
          <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
          <p className="m-3">{errorMessage}</p>
          <a className="btn btn-primary" href="/">Encurtar nova URL</a>
        </StatsContainer>
      ) : (
        <StatsContainer>
        {isLoading && <Spinner animation="border" />}
          <p><span>https://pitu.tk/{shortenerdURL.code}</span></p>
          <p>Redireciona para:<br />{shortenerdURL.url}</p>
          <StatsRow>
            <StatsBox>
              <span>{shortenerdURL.hits}</span>
              <StatsBoxTitle>Visitas</StatsBoxTitle>
            </StatsBox>
            <StatsBox>
              <span>{shortenerdURL.relativeDate}</span>
              <StatsBoxTitle>Última visita</StatsBoxTitle>
            </StatsBox>
          </StatsRow>
          <a className="btn btn-primary" href="/">Encurtar nova URL</a>
        </StatsContainer>
      )}
    </Container>
  );
};

export default StatsPage;
