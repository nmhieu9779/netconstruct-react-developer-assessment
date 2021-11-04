import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    this.get('/categories', () => {
      return data.posts.reduce((acc, { categories }) => {
        categories.forEach(({ name }) => {
          if (!acc.includes(name)) {
            acc.push(name);
          }
        });
        return acc;
      }, []);
    });
  },
});
