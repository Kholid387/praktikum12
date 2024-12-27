// import Model Student
const Student = require("../models/Student");

class StudentController {
  // menambahkan keyword async
  async index(req, res) {
    // memanggil method static all dengan async await.
    try {
      const students = await Student.all();

      const data = {
        message: "Menampilkkan semua students",
        data: students,
      };

      res.json(data);
    } catch (error) {
      const data = {
        message: "Gagal menampilkan data students",
        error: error.message,
      };
      res.status(500).json(data);
    }
  }

  async store(req, res) {
    try {
      // Mengambil data dari request body
      const { name, age, grade } = req.body;

      // Memanggil method create dari model Student
      const newStudent = await Student.create({ name, age, grade });

      // Membuat response jika berhasil
      const data = {
        message: "Menambahkan data student",
        data: newStudent,
      };

      res.status(201).json(data); // Mengirimkan response dengan status 201 (Created)
    } catch (error) {
      // Menangani error jika terjadi
      const data = {
        message: "Gagal menambahkan data student",
        error: error.message,
      };

      res.status(500).json(data); // Mengirimkan response dengan status 500 (Internal Server Error)
    }
  }

  update(req, res) {
    const { id } = req.params;
    const { nama } = req.body;

    const data = {
      message: `Mengedit student id ${id}, nama ${nama}`,
      data: [],
    };

    res.json(data);
  }

  destroy(req, res) {
    const { id } = req.params;

    const data = {
      message: `Menghapus student id ${id}`,
      data: [],
    };

    res.json(data);
  }
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;
