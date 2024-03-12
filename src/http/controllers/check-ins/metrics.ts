import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
  const fetchUserCheckInsHistoryUseCase = makeGetUserMetricsUseCase()

  const { checkInCount } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: req.user.sub,
  })

  return reply.status(200).send({
    checkInCount,
  })
}
