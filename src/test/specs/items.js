var mock = require('protractor-http-mock');
mock(['items']);

describe('items', function() {
  it('should list items', function() {
    browser.get('/');
    var items = element.all(by.repeater('item in itemsVm.items'));
    expect(items.count()).toEqual(2);
  });
});