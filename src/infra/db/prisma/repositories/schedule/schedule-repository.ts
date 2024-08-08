import { StatusSchedule, ScheduleModel } from "@/domain/model/schedule-model";
import { LoadSchedulesByBarberIdRepository } from "@/domain/protocols/infra/db";
import prisma from "../../helpers/client";

export class ScheduleRepository implements LoadSchedulesByBarberIdRepository{
    async loadByBarberId(barberId: string, statusSchedule: StatusSchedule): Promise<ScheduleModel[]>{
        const schedules = await prisma.schedule.findMany({
            where: {
                AND:[
                    {barberId: barberId},
                    {status: statusSchedule}
                ]
            }
        })

        return schedules.map((schedule)=>{
            return {
                id: schedule.id,
                total_time: schedule.total_time,
                status: schedule.status,
                barberId: schedule.barberId
            }
        })
    }
}