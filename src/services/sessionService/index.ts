import type { IAPIResponse } from "@/base/api/types"
import type { LoginResponse } from "./types"

import { POST } from "@/base/api"

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
