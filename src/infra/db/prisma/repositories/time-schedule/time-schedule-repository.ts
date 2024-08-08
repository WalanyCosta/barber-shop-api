import { TimeScheduleModel } from "@/domain/model/time-schedule-model";
import { LoadTimeSchedulesByDateAndIdsRepository } from "@/domain/protocols/infra/db"
import prisma from "../../helpers/client";


export class TimeScheduleRepository implements LoadTimeSchedulesByDateAndIdsRepository{
    async loadByDateAndIds(date: string, ids: string[]): Promise<TimeScheduleModel[]>{
        const timeSchedules = await prisma.time_schedule.findMany({
            where: {
                AND:[
                    {date_schedule: new Date(date).toISOString()},
                    {schedule_id: {in: ids}}
                ]
            }
        })

        return timeSchedules.map((timeSchedule)=> {
            return new TimeScheduleModel(
                timeSchedule.id, 
                timeSchedule.date_schedule.toISOString(), 
                timeSchedule.time_schedule, 
                timeSchedule.schedule_id
            )
        })
    }
}