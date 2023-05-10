import { IAPIResponse } from "@/base/api/types"
import { POST } from "@/base/api"

import { LoginResponse } from "./types"

interface ISessionService {
  login: (username: string, password: string) => Promise<IAPIResponse<LoginResponse>>
}

export const sessionService: ISessionService = {
  login: (username, password) =>
    POST<LoginResponse>('/api/login', {
      username,
      password
    })
  ,
}
