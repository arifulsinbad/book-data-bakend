import { Response } from 'express'
type IResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page: number
    limit: number
    total: number
  }
  data?: T | null
}
const sendResponse = <T>(res: Response, data: IResponse<T>): void => {
  const reponseData: IResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta || null || undefined,
    data: data.data || null,
  }
  res.status(data.statusCode).json(reponseData)
}

export default sendResponse
