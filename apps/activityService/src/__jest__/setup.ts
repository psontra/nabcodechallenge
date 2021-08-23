import Mock = jest.Mock;

afterEach(() => {
  expect.hasAssertions();
});

export const mockResponse = (): {
  json: Mock;
  status: Mock;
} => {
  return {
    json: jest.fn(),
    status: jest.fn(),
  };
};
