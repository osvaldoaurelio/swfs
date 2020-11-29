import baseAPI from './api';

class ShortenerService {

  constructor() {
    this.api = baseAPI('http://localhost:3000');
  }

  async getLink(code) {
    const { data } = await this.api.get(`links/${code}`);
    
    return data;
  }

  async getStats(code) {
    const { data } = await this.api.get(`links/${code}/stats`);
    
    return data;
  }

  async generate({ url }) {
    const { data } = await this.api.post('links', { url });
    
    return data;
  }

}

export default ShortenerService;
