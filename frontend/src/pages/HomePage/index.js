import { useState, useCallback, useRef } from 'react';
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';

import Header from '../../componets/Header';

import ShortenerService from '../../services/shortenerService';

import { HomeContainer, Form, AdsBlock } from './styles';

const service = new ShortenerService();

const HomePage = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const inputURL = useRef(null);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();    
    setIsLoading(true);
    
    if(!url) {
      setIsLoading(false);
      setErrorMessage('Informe uma url para encurtar.');
      return;
    }

    try {
      const { code } = await service.generate({ url });
      setCode(code);
    } catch (err) {
      setErrorMessage('Ops, ocorreu um erro ao tentar encurtar a url.');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const handleUrlInput = useCallback(({ target }) => setUrl(target.value), []);

  const copyToClipboard = useCallback(() => {
    inputURL.current.select();
    document.execCommand('copy');
  }, []);

  return (
    <Container>
      <Header>Seu novo encurtador de URL. :</Header>
      <HomeContainer>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Digite a url para encurtar"
              defaultValue={url}
              onChange={handleUrlInput}
            />
            <InputGroup.Append>
              <Button variant="primary" type="submit">Encurtar</Button>
            </InputGroup.Append>
          </InputGroup>

          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            code && (
              <>
                <InputGroup  className="mb-3">
                  <FormControl
                    autoFocus={true}
                    defaultValue={`https://pitu.tk/${code}`}
                    ref={inputURL}
                  />
                  <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={copyToClipboard}>
                      Copiar
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                <p>
                  Para a companhar as estatísticas, acesse https://pitu.tk/{code}
                </p>
              </>
            )
          )}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </Form>
      </HomeContainer>
      <HomeContainer>
        <AdsBlock>Adense</AdsBlock>
      </HomeContainer>
    </Container>
  );
};

export default HomePage;
