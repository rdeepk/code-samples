import StatusCodes from './StatusCodes'

export const Success = (statusText: string, data: {}) => ({
  data,
  status: StatusCodes.OK,
  statusText
})
