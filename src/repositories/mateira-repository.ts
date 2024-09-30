import pool from "../conexaoBd";

export default class MateriaRepository {
  async findAll() {
    const query = "SELECT * FROM materias";
    const { rows: result } = await pool.query(query);
    return result;
  }

  async findById(materiaId: number) {
    const query = "SELECT * FROM materias WHERE id = $1";
    const { rows: result } = await pool.query(query, [materiaId]);
    return result[0];
  }
}
