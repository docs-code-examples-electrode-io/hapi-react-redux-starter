import expect from 'expect';
import App from './app';

describe('App', () => {
  it('shall exist', () => {
    let app = new App();

    expect(app).toNotBe(undefined);
  });

  it('shall have a start method', () => {
    let app = new App();

    expect(app.start()).toEqual(true);
  });
});