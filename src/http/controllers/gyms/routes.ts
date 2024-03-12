import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";

export async function gymsRoutes(app: FastifyInstance){
    //todas as que estiverem dentro deste arquivo de rotas, vai chamar o middleware que faz a verificação se o usuário está autenticado
    //somente os usuário autenticados conseguirão chamar
    app.addHook('onRequest', verifyJWT)
    
}