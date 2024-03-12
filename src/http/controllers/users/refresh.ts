import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(req: FastifyRequest, reply: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
      },
    }
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
        expiresIn: '7d',
      },
    }
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/', // aqui diz que toda aplicação vai ser acesso ao refresh
      secure: true, // aqui faz com que nosso seja encripitado atraves do https
      sameSite: true, //vai ser acessivel apenas dentro do mesmo dominio
      httpOnly: true, // vai ter acesso apenas aqui no back não vai ter no front
    })
    .status(200)
    .send({
      token,
    })
}
