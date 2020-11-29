import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../componets/Header';

import ShortenerService from '../../services/shortenerService';

import { RedirectContainer } from './styles';

const service = new ShortenerService();

const RedirectPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { code } = useParams();

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      
      try {
        const { url } = await service.getLink(code);
        window.location = url;
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
      <Header>seu novo encurtador de urls.</Header>
      {errorMessage ? (
        <RedirectContainer>
          <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
          <p className="m-3">{errorMessage}</p>
          <a className="btn btn-primary" href="/">Encurtar nova URL</a>
        </RedirectContainer>
      ) : (
        <p>Redirecionando...</p>
      )}
    </Container>
  );
};

export default RedirectPage;
