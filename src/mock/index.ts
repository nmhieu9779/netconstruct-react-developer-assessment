import { createServer } from 'miragejs';
import data from './data.json';



export function mockServer():void {
  createServer({
    routes() {
      this.namespace = 'api';

      this.get('/posts', (schema, request) => {
        const { category, limit, offset } = request.queryParams;

        const limitNum = limit ? Number(limit) : 10;
        const offsetNum = offset ? Number(offset) : 0;
        
        let results = data.posts;

        // Fake filter
        if (category) {
          results = results.filter(element => {
            const matching_category = element.categories.filter(e => e.name === category);
            return (matching_category.length > 0);
          });
        }

        // Fake pagination
        const pagniated = results.slice(offsetNum, offsetNum+limitNum);
        // console.log(offsetNum, limitNum);
        // console.log(results);
        // console.log(pagniated);

        return {
          "count": results.length,
          "results": pagniated
        }
      });

      this.get('/categories', () => {
        const results = new Set();

        data.posts.forEach(post => {
          post.categories.forEach(cat => {
            results.add(cat.name);
          })
        });

        return results;
      })
    },
  });
}
