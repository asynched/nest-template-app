import { BadRequestException, PipeTransform } from '@nestjs/common'
import type { ZodObject, ZodRawShape } from 'zod'

export class ZodPipe<TSchema extends ZodRawShape>
  implements PipeTransform<unknown, TSchema>
{
  constructor(private readonly schema: ZodObject<TSchema>) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value)

    if (result.success) {
      return result.data as any
    }

    throw new BadRequestException(result.error.issues)
  }
}
