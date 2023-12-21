const { json } = require('body-parser')
const Students = require('../models/Students')

class StudentsController{
    //Truy xuất tất cả học viên
    async getStudents(req,res){
        try {
            const query_res = await Students.getStudents()
            if(query_res){
                res.json
            }
        } catch (error) {
            res.status(500).json({error: 'Đã có lỗi xảy ra. Vui lòng thử lại'})
        }
    }

    //Truy xuất tên học viên
    async getStudent(req,res){
        try {
            const {name} = req.query
            const query_res = await Students.getStudent(name)
            if(query_res){
                res.json({data: query_res})
            } else {
                res.status(400).json({error: 'Không có tên học viên cần tìm!'})
            }
        } catch (error) {
            res.status(500).json({error: 'Đã có lỗi xảy ra. Vui lòng thử lại'})
        }
    }

    //Thêm học viên
    async addStudent(req,res){
        try {
            const {
                name,
                sex,
                dateofbirth,
                phone,
                address
            } =req.body
            if(!name || name == '' || !sex || sex == '' || !dateofbirth || dateofbirth == '' || !phone || phone == '' || !address || address == ''){
                res.status(400).json({error: 'Nhập thiếu thông tin!'})
            }

            const query_res = await Students.addStudent(
                name,
                sex,
                dateofbirth,
                phone,
                address
            )
            
            if(query_res){
                res.json('Thêm thành công!')
            } else{
                res.status(400).json({error: 'Tên đã có trong danh sách!'})
            }
        } catch (error) {
            res.status(500).json({error: 'Đã có lỗi xảy ra. Vui lòng thử lại'})
        }
    }
    //Sửa thông tin học viên
    async updateStudent(req,res,next){
        try {
            const{
                saved_name,
                name,
                sex,
                dateofbirth,
                phone,
                address
            } = req.body
            if(!saved_name || saved_name == ''){
                res.status(400).json({error: 'Vui lòng chọn học viên cần chỉnh sửa'})
            }
            if(!name || name == '' || !sex || sex == '' || !dateofbirth || dateofbirth == '' || !phone || phone == '' || !address || address == ''){
                res.status(400).json({error: 'Nhập thiếu thông tin!'})
            }
            const query_res = await Students.updateStudent(
                name,
                sex,
                dateofbirth,
                phone,
                address
            )   
            if(query_res){
                res.json('Chỉnh sửa thông tin học viên thành công')
            } else{
                res.status(400).json({error: 'Chỉnh sửa không thành công'})
            }
        }
        catch (error) {
            res.status(500).json({error: 'Đã có lỗi xảy ra. Vui lòng thử lại'})
        }
    }
    async removeStudent(req,res){
        try {
            const {name} = req.query
            const query_res = await Students.removeStudent(name)
            if(query_res){
                console.log('Đã xóa ' + query_res.affectedRows + 'lớp')
            } else{
                res.status(400).json({error:'Xóa lớp không thành công'})
            }
        } catch (error) {
            res.status(500).json({error: 'Đã có lỗi xảy ra. Vui lòng thử lại'})
        }
    }
    
}

module.exports = new StudentsController()