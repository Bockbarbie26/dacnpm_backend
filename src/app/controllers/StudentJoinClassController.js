const StudentJoinClass = require('../models/StudentJoinClass')

class StudentJoinClassController {
    async getStudentJoinClass(req, res) 
    {
        try {
        const result = await StudentJoinClass.getStudentJoinClasses()
        if (result) {
            return res.json({
            check: true,
            data: result,
            })
        } 
        else {
            return res.status(400).json({ check: false, msg: 'Không có học viên cần tìm' })
        }
        } 
        catch (error) {
        console.log('Error:', error)
        return res.status(500).json({ check: false, msg: 'Lỗi máy chủ' })
        }
    }
    async addStudentJoinClass(req, res) 
  {
    try {
        const { idStudent, idClass } = req.body
        if (!idStudent || idStudent == '') {
            return { success: false, check: false, msg: 'idStudent is required' }
        }
        if (!idClass || idClass == '') {
            return { success: false, check: false, msg: 'idClass is required' }
        } 
        else {
            const query_res = await StudentJoinClass.addStudentJoinClass(idStudent, idClass)
            if (query_res) {
            return res.json({
                check: true,
            })
            } else {
            return res.status(400).json({ check: false, msg: 'Học viên đã được thêm vào lớp' })
            }
        }
        } catch (error) {
        console.error('Error:', error)
        return res.status(500).json({ check: false, msg: 'Lỗi máy chủ' })
        }
  }

  async updateStudentPoint(req, res){
    try{
        const{
            idStudent,
            reading,
            listening,
            writing,
            speaking,
        } = req.body
        if(!idStudent || idStudent == ''){
            res.status(400).json({error: 'Chọn học viên cần chỉnh sửa'})
        }
        else{
            const query_res = await StudentJoinClass.updateStudentsPoint(
            idStudent,
            reading,
            listening,
            writing,
            speaking,
            )
            if(query_res){
                return res.json({
                    check:true,
                })
            }
            else{
                return res.status(400).json({check: false, msg: 'Dữ liệu không thay đổi'})
            }
        }
        
    } catch (error){
        res.status(500).json({error: 'Lỗi máy chủ'})
    }
  }

    async getNullClass(req, res, next) {
        try {
        const result = await StudentJoinClass.getNullClass()
        if (result) {
            return res.json({
            check: true,
            data: result,
            })
        } else {
            return res.status(400).json({ check: false, msg: 'Không có lớp học' })
        }
        } catch (error) {
        console.log('Error:', error)
        return res.status(500).json({ check: false, msg: 'Lỗi máy chủ' })
        }
    }
    async updateDate(req, res) {
        try {
        const { id, idClass, attendDate, status } = req.body
        if (!id || id == '') {
            return res.status(400).json({ check: false, msg: 'Hãy chọn học viên cần chỉnh sửa' })
        }
        if (!attendDate || attendDate == '') {
            return res.status(400).json({ check: false, msg: 'Hãy nhập ngày' })
        }
        if (!idClass || idClass == '') {
            return res.status(400).json({ check: false, msg: 'Hãy nhập lớp' })
        } else {
            const queryResult = await StudentJoinClass.updateDate(
            attendDate,
            status,
            id,
            idClass
            )
            if (queryResult === -1) {
            return res.status(400).json({ check: false, msg: 'Số buổi không hợp lệ' })
            }
            if (queryResult) {
            return res.json({
                check: true,
            })
            } else {
            return res.status(400).json({ check: false, msg: 'Dữ liệu không thay đổi' })
            }
        }
        } catch (error) {
        console.error('Error:', error)
        return res.status(500).json({ check: false, msg: 'Lỗi máy chủ' })
        }
    }

    async getNullPrize(req, res, next) {
        try {
        const result = await StudentJoinClass.getNullPrize()
        if (result) {
            return res.json({
            check: true,
            data: result,
            })
        } else {
            return res.status(400).json({ check: false, msg: 'Không có lớp học' })
        }
        } catch (error) {
        console.log('Error:', error)
        return res.status(500).json({ check: false, msg: 'Lỗi máy chủ' })
        }
    }

    async updatePrize(req, res) {
        try {
        const { id, prizeStatus } = req.body
        if (!id || id == '') {
            return res.status(400).json({ check: false, msg: 'Hãy chọn học viên cần chỉnh sửa' })
        }
        if (!prizeStatus || prizeStatus == '') {
            return res.status(400).json({ check: false, msg: 'Hãy chọn trạng thái' })
        } else {
            const queryResult = await StudentJoinClass.updatePrize(prizeStatus, id)
            if (queryResult) {
            return res.json({
                check: true,
            })
            } else {
            return res.status(400).json({ check: false, msg: 'Dữ liệu không thay đổi' })
            }
        }
        } catch (error) {
        console.error('Error:', error)
        return res.status(500).json({ check: false, msg: 'Lỗi máy chủ' })
        }
    }
    async deletePrize(req, res) {
        try {
        const { id } = req.body
        if (!id || id == '') {
            return res.status(400).json({ check: false, msg: 'Hãy chọn học viên cần chỉnh sửa' })
        } else {
            const queryResult = await StudentJoinClass.deletePrize(id)
            if (queryResult) {
            return res.json({
                check: true,
            })
            } else {
            return res.status(400).json({ check: false, msg: 'Dữ liệu không thay đổi' })
            }
        }
        } catch (error) {
        console.error('Error:', error)
        return res.status(500).json({ check: false, msg: 'Lỗi máy chủ' })
        }
    }
    async deleteStudentJoinClass(req, res) {
        try {
        const { id } = req.body
        if (!id || id == '') {
            return res.status(400).json({ check: false, msg: 'Hãy chọn học viên cần xóa' })
        }

        const queryResult = await StudentJoinClass.deleteStudentJoinClass(id)
        if (queryResult) {
            return res.json({
            check: true,
            })
        } else {
            return res.status(400).json({ check: false, msg: 'Học viên không học lớp này' })
        }
        } catch (error) {
        console.error('Error:', error)
        return res.status(500).json({ check: false, msg: 'Lỗi máy chủ' })
        }
    }
}

module.exports = new StudentJoinClassController()