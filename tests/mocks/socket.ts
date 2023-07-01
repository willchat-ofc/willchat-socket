export const socketMock = {
  emit: jest.fn(),
  join: jest.fn(),
  broadcast: {
    emit: jest.fn(),
  },
} as any;
