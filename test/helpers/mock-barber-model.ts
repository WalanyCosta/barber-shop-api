import { type BarberModel } from '@/domain/model/barber-model'

export const mockBarberModel: BarberModel = {
  id: 'any_id',
  name: 'any_name',
  birthday: new Date().toISOString(),
  email: 'any_email',
  phone: 'any_phone',
  experience: 'any_experience',
  experience_year: 3,
  start: 5,
  status: 'any_status',
  image_url: 'any_image_url',
}
