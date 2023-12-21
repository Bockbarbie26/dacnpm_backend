const pool = require('../config/db/index');

class Students{
  async getStudents(){
    var result = []
    const query = 'SELECT S.id, S.name AS student_name, S.sex, S.dateofbirth, S.phone, S.address, C.name AS course_name, C.description, CL.startDate, CL.endDate FROM Students AS S JOIN StudentJoinClass AS SJ ON S.id = SJ.idStudent JOIN Classes AS CL ON SJ.idClass = CL.idCourse JOIN Courses AS C ON CL.idCourse = C.id'
    const [query_res1] = await pool.query(query)
    result.push(query_res1)
    if( query_res1 && query_res1.length > 0){
      await Promise.all(
        res.map(async (element) => {
          const query = 'SELECT COUNT(*) AS course_count FROM studentjoinclass WHERE idStudent=?'
          const [query_res2] = await pool.query(query2 , element.id)
          res.push(query_res2)
        })
      )
    }
    return result
  }

  async getStudent(name) {
    const query = 'SELECT S.name AS student_name, C.name AS course_name FROM Students AS S JOIN StudentJoinClass AS SJ ON S.id = SJ.idStudent JOIN Classes AS CL ON SJ.idClass = CL.idCourse JOIN Courses AS C ON CL.idCourse = C.id ORDER BY S.name'
    const [res] = await pool.query(query , [name])
    return res
  }

  async addStudent(
    name,
    sex,
    dateofbirth,
    phone,
    address
  ) {
    const query1 = 'SELECT * FROM students WHERE name=?'
    const [query_res1] = await pool.query(query1, [name])
    if(query_res1.length == 0) {
      const quer2 = 'INSERT INTO students(name,sex,dateofbirth,phone,address) VALUES (?,?,?,?,?)'
      const [query_res2] = await pool.query(query , [
      name,
      sex,
      dateofbirth,
      phone,
      address,
    ])
    return res
    } else{
      console.log('Tên đã có trong bảng. Vui lòng đổi tên')
    }
  }

  async updateStudent(
    name,
    sex,
    dateofbirth,
    phone,
    address
  ){
    const query1 = 'UPDATE students SET id=? , name=? , sex=? , dateofbirth=?, phone=? , address=? WHERE name=?'
    const [query_res1] = await pool.query(query , [
      name,
      sex,
      dateofbirth,
      phone,
      address
    ])
    return query_res1
  }

  async removeStudent(name){
    const query = 'DELETE FROM students WHERE name=?'
    const [res] = await pool.query(query, [name])
    return res
  }
}


module.exports = new Students()
