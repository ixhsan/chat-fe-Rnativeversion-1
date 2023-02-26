import index from '../index'

test('registers correct component with AppRegistry', () => {
    const registerComponentMock = jest.spyOn(AppRegistry, 'registerComponent');
    const registerRootComponentMock = jest.spyOn(registerRootComponent);
    require('./index.js');
    expect(registerComponentMock).toHaveBeenCalledWith('chatRNative', expect.any(Function));
    expect(registerRootComponentMock).toHaveBeenCalledWith(expect.any(Function));
  });
  