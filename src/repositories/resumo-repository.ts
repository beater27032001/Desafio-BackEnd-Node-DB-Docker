import pool from "../conexaoBd";
import TResumo from "../tipos/TResumo";

export default class ResumoRepository {
  async create(props: TResumo) {
    const query =
      "INSERT INTO resumos (usuario_id, materia_id, titulo, topicos, descricao) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const { rows } = await pool.query(query, [
      props.usuarioId,
      props.materiaId,
      props.titulo,
      props.topicos,
      props.descricao,
    ]);
    const resultado = rows[0];

    return {
      id: resultado.id,
      usuarioId: resultado.usuario_id,
      materiaId: resultado.materia_id,
      titulo: resultado.titulo || "Sem título",
      topicos: resultado.topicos.split(", "),
      descricao: resultado.descricao || "Sem descrição",
      criado: resultado.criado,
    };
  }

  async findAll() {
    const query =
      "select resumos.*, materias.nome as materia_nome from resumos join materias on resumos.materia_id = materias.id";
    const result = await pool.query(query);
    return result.rows.map((resumo) => ({
      id: resumo.id,
      usuarioId: resumo.usuario_id,
      materia: resumo.materia_nome,
      titulo: resumo.titulo,
      topicos: resumo.topicos.split(", "),
      descricao: resumo.descricao,
      criado: resumo.criado,
    }));
  }

  async edit(props: TResumo) {
    const query =
      "UPDATE resumos SET titulo = $1, topicos = $2, descricao = $3 WHERE id = $4";
    const { rows } = await pool.query(query, [
      props.titulo,
      props.topicos,
      props.descricao,
      props.id,
    ]);
    const resultado = rows[0];
    return {
      id: resultado.id,
      usuarioId: resultado.usuarioId,
      materiaId: resultado.materiaId,
      titulo: resultado.titulo,
      topicos: resultado.topicos.split(", "),
      descricao: resultado.descricao,
    };
  }

  async delete(id: number) {
    const query = "DELETE FROM resumos WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    const resultado = rows[0];
    return resultado;
  }

  async findById(id: number) {
    const query = "SELECT * FROM resumos WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    const resultado = rows[0];
    return resultado;
  }
}
