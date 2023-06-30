export const socketMock = {
  emit: jest.fn(),
  broadcast: {
    emit: jest.fn(),
  },
} as any;
