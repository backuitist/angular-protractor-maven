var mock = require('protractor-http-mock');
mock(['items']);

describe('items', function() {
  it('should list items', function() {
    browser.get('/');
    var items = element.all(by.repeater('item in itemsVm.items'));
    expect(items.count()).toEqual(2);
    expect(items.get(0).getText()).toEqual('main');
    expect(items.get(1).getText()).toEqual('toto');
  });
});