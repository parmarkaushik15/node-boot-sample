import { beforeEach, describe, it } from 'node:test';
import request from 'supertest';
import { App } from '../app';


describe('App (e2e)', () => {
  let app: App;

  beforeEach(async () => {
    app = new App();
  });

  it('/ (GET)', () => {
    return request()
      .get('/')
      .expect(200)
      .expect('Welcome to Node Boot!');
  });
});