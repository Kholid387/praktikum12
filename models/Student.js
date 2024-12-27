// import database
const db = require("../config/database");

// membuat class Model Student
class Student {
  /**
   * Membuat method static all.
   */
  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from students";
      /**
       * Melakukan query menggunakan method query.
       * Menerima 2 params: query dan callback
       */
      db.query(sql, (err, results) => {
        if (err) {
          return reject(err); // Menolak promise jika terjadi error
        }
        resolve(results); // Menyelesaikan promise dengan hasil query
      });
    });
  }

  /**
   * Method untuk insert data ke tabel students.
   * @param {Object} data - Data student yang akan diinsert 
   * @returns {Promise} - mengembalikan data student yang baru diinsert.
   */
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO students SET ?";
      db.query(sql, data, (err, results) => {
        if (err) {
          return reject(err); // Menolak promise jika terjadi error
        }
        // Mengambil data student yang baru saja diinsert
        const insertedId = results.insertId;
        db.query("SELECT * FROM students WHERE id = ?", [insertedId], (err, student) => {
          if (err) {
            return reject(err); // Menolak promise jika terjadi error saat mengambil data
          }
          resolve(student[0]); // Mengembalikan data student
        });
      });
    });
  }
}

// export class Student
module.exports = Student;
