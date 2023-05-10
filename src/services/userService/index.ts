import type { IAPIResponse } from "@/base/api/types"
import type { WeightResponse, BodyFatResponse } from "./types"

import { GET } from "@/base/api"

interface IStatsService {
  getWeight: () => Promise<IAPIResponse<WeightResponse>>,
  getBodyFat: () => Promise<IAPIResponse<BodyFatResponse>>
}

export const statsService: IStatsService = {
  getWeight: () =>
    GET<WeightResponse>('/api/weight')
  ,

  getBodyFat: () =>
    GET<BodyFatResponse>('/api/bodyfat')
  ,
}
