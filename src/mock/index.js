import { createServer } from 'miragejs';
import data from './data.json';

export default function () {
  createServer({
    routes() {
      this.namespace = 'api';
      this.get('/posts', () => {
        return data;
      });
    },
  });
}
