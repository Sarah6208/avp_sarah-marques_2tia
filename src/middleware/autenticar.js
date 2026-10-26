export default function autenticar(req, res, next) {
  const tokenConfigurado = process.env.API_TOKEN || process.env.TOKEN_SECRETO;
  const tokenRecebido = req.headers.authorization;

  if (!tokenConfigurado || tokenRecebido !== `Bearer ${tokenConfigurado}`) {
    return res.status(401).json({
      mensagem: "Token ausente ou inválido"
    });
  }

  next();
}
