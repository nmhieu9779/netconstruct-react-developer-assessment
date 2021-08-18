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

      this.get('/categories', (schema, request) => {
        const categories = new Set<string>();

        data.posts.forEach(post => {
          post.categories.forEach(e => {
            categories.add(e.name);
          })
        });

        const ret:ICategory[] = [];
        Array.from(categories).forEach((category, index) => {
          ret.push({
            id: String(index),
            name: category
          })
        });

        return ret;
      })
    },
  });
}
