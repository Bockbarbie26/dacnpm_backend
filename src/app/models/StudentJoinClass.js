const pool = require('../config/db')
class StudentJoinClass{

    async getStudentJoinClass()
    {
        const query = 'SELECT c.id AS class_id, c.startDate, c.endDate, co.name AS course_name, s.name AS student_name, sjc.speaking, sjc.reading, sjc.listening, sjc.writing, sjc.prize FROM Classes c INNER JOIN Courses co ON c.idCourse = co.id INNER JOIN StudentJoinClass sjc ON c.idCourse = sjc.idClass INNER JOIN Students s ON sjc.idStudent = s.id WHERE c.id = <class_id>'
        const [res] = await pool.query(query)
        return res
    }

    async addStudentJoinClass(idStudent , idClass)
    {
        const query1 = 'SELECT * FROM StudentJoinClass WHERE idClass=?'
        const [res1] = await pool.query(query1, [idClass])
        const query2 = 'SELECT * FROM classes INNER JOIN courses ON classes.idCourse=courses.id WHERE classes.id= ?'
        const [res2] = await pool.query(query2, [idClass])
        if (res1.length > 0) 
        {
          if (res1[0].status === 1 && res1[0].attendDate < res2[0].maxAttendDate) return null
          else if (res1[0].status === 1 || res1[0].status === 0) return null
        }
        const query3 = 'INSERT INTO StudentJoinClass(idStudent, idClass, attendDate, paidStatus, prize) VALUES(?, ?, 0,-1,0)'
        const [res3] = await pool.query(query3, [idStudent, idClass])
        return res3
    }

    async deleteStudentJoinClass()
    {
        const query = 'DELETE FROM StudentJoinClass WHERE id = ?'
        const [res] = await pool.query(query, [id])
        return res
    }

    async updateStudentJoinClass
    (
        id,
        idStudent,
        idClass,
        attendDate,
        paidStatus,
        prize,
        prizeStatus,
    ) {
        const query = 'UPDATE StudentJoinClass SET id = ?, idStudent = ?, idClass = ?, attendDate = ?, paidStatus = ?, prize = ?, prizeStatus = ? WHERE id = ?'
        const [res] = await pool.query(query,
        [
            id,
            idStudent,
            idClass,
            attendDate,
            paidStatus,
            prize,
            prizeStatus,
        ])
        return res
    }

    async getNullClass() 
    {
        const query = 'SELECT c.id, c.name FROM Classes c LEFT JOIN StudentJoinClass sjc ON c.id = sjc.idClass JOIN Courses cr ON c.idCourse = cr.id WHERE (sjc.id IS NULL OR (sjc.status = 1 AND cr.maxAttendDate > sjc.attendDate))'
        const [res] = await pool.query(query)
        return res
    }
    async updateStudentsPoint(
        id,
        idStudent, 
        idClass,
        reading,
        listening,
        writing,
        speaking,
        ) {   
        const query = 'UPDATE StudentJoinClass SET speaking = ?, reading = ?, listening = ?, writing = ? WHERE idClass = ?'
        const res = await pool.query(query , [
            id,
            idStudent, 
            idClass,
            reading,
            listening,
            writing,
            speaking,
        ])
        return res
    }
    async createPrize(prizeStatus, id, idClass) 
    {
        const query = 'UPDATE StudentJoinClass SET prizeStatus=? WHERE id = ? AND idClass = ?'
        const [result] = await pool.query(query, [prizeStatus, id, idClass])
        if (result.changedRows === 0) return false
        return true
    }
    async updatePrize(prizeStatus, id) 
    {
        const query = "UPDATE StudentJoinClass SET prizeStatus=? WHERE id = ?"
        const [result] = await pool.query(query, [prizeStatus, id])
        if (result.changedRows === 0) return false
        return true
    }
    async deletePrize(id) 
    {
        const query = "UPDATE StudentJoinClass SET prizeStatus = NULL WHERE id = ?"
        const [result] = await pool.query(query, [id])
        if (result.affectedRows === 0) return false
        return true
    }
    async getNullPrize() {
        const query = 
        'SELECT studentjoinclass.id, idClass, student.name, attendDate, status, prize, paidStatus, prizeStatus, classes.name AS className FROM studentjoinclass INNER JOIN students ON students.id = studentjoinclass.idStudent INNER JOIN users ON users.id = students.id INNER JOIN classes ON studentjoinclass.idClass = classes.id INNER JOIN courses ON classes.idCourse = courses.id WHERE prizeStatus IS NULL'
        const [res] = await pool.query(query)
        return res
      }
    async updateDate(attendDate, status, id, idClass) 
    {
        const query1 ='SELECT * FROM classes INNER JOIN courses ON classes.idCourse = courses.id WHERE classes.id= ?'
        const [res1] = await pool.query(query1, [idClass])
        console.log(res)
        if (!status) 
        {
          if (attendDate < res1[0].maxAttendDate) status = 0 
          else if (Number(attendDate) === Number(res1[0].maxAttendDate)) status = 1
          else return -1
        }
        const query2 =
          "UPDATE StudentJoinClass SET attendDate = ?, status=? WHERE id = ?"
        const [res2] = await pool.query(query2, [attendDate, status, id])
        console.log(status)
        if (result.changedRows === 0) return false
        return true
    }
}
module.exports = new StudentJoinClass()