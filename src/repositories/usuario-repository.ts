import pool from "../conexaoBd";
import TUsuario from "../tipos/TUsuario";

export default class UsuarioRepository {
  async create(props: TUsuario) {
    const query =
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id,nome,email";
    const { rows: result } = await pool.query(query, [
      props.nome,
      props.email,
      props.senha,
    ]);
    return result[0];
  }

  async findByEmail(email: string) {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows: result } = await pool.query(query, [email]);
    return result[0];
  }

  async findById(userId: number) {
    const query = "SELECT * FROM usuarios WHERE id = $1";
    const { rows: result } = await pool.query(query, [userId]);
    return result[0];           
  }
}
