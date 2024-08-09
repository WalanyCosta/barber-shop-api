export type DbLoadTimeSchedulesResponse = Array<{
  times: string
  disabled: boolean
}>

export interface LoadTimeSchedule {
  loadByBarberIDAndDate: (
    barberId: string,
    date: string,
  ) => Promise<DbLoadTimeSchedulesResponse>
}
