const Class = require("../models/Classes");

class ClassController {
  async getClasses(req, res, next) {
    try {
      const queryResult = await Class.getClasses();
      if (queryResult) {
        const result = await Log.addLog(
          res.user.id,
          "Xem danh sách lớp học",
          Date.now(),
          true
        );
        return res.json({
          check: true,
          data: queryResult,
        });
      } else {
        const result = await Log.addLog(
          res.user.id,
          "Xem danh sách lớp học",
          Date.now(),
          false
        );
        return res.status(400).json({ check: false, msg: "Không có lớp học" });
      }
    } catch (error) {
      const result = await Log.addLog(
        res.user.id,
        "Xem danh sách lớp học",
        Date.now(),
        false
      );
      console.error("Error:", error);
      return res.status(500).json({ check: false, msg: "Lỗi máy chủ" });
    }
  }
  async getClass(req, res, next) {
    try {
      const { name } = req.query;
      const queryResult = await Class.getClass(name);
      if (queryResult) {
        const result = await Log.addLog(
          res.user.id,
          "Xem lớp học",
          Date.now(),
          true
        );
        return res.json({
          check: true,
          data: queryResult,
        });
      } else {
        const result = await Log.addLog(
          res.user.id,
          "Xem lớp học",
          Date.now(),
          false
        );
        return res.status(400).json({ check: false, msg: "Không có lớp học" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ check: false, msg: "Lỗi máy chủ" });
    }
  }
  async addClass(req, res, next) {
    try {
      const {
        name,
        idCourse,
        startDate,
        endDate,
        maxStudent,
        address,
        schedule,
      } = req.body;
      if (!name || name == "") {
        return res.status(400).json({ check: false, msg: "Chưa nhập tên lớp" });
      }
      if (!idCourse || idCourse === "") {
        return res
          .status(400)
          .json({ check: false, msg: "Chưa chọn khóa học" });
      }
      if (!startDate || startDate === "") {
        return res
          .status(400)
          .json({ check: false, msg: "Chưa nhập ngày bắt đầu" });
      }
      if (!endDate || endDate === "") {
        return res
          .status(400)
          .json({ check: false, msg: "Chưa nhập ngày kết thúc" });
      }
      if (!maxStudent || maxStudent === "") {
        return res
          .status(400)
          .json({ check: false, msg: "Chưa nhập sĩ số tối đa" });
      }
      if (!address || address === "") {
        return res.status(400).json({ check: false, msg: "Chưa nhập cơ sở" });
      }
      if (!schedule || schedule === "") {
        return res
          .status(400)
          .json({ check: false, msg: "Chưa nhập lịch học" });
      }
      const queryResult = await Class.addClass(
        name,
        idCourse,
        startDate,
        endDate,
        maxStudent,
        address,
        schedule
      );
      if (queryResult) {
        const result = await Log.addLog(
          res.user.id,
          "Thêm lớp học",
          Date.now(),
          true
        );
        return res.json({
          check: true,
          msg: "Thêm thành công",
        });
      } else {
        const result = await Log.addLog(
          res.user.id,
          "Thêm lớp học",
          Date.now(),
          false
        );
        return res
          .status(400)
          .json({ check: false, msg: "Lớp học đã tồn tại" });
      }
    } catch (error) {
      const result = await Log.addLog(
        res.user.id,
        "Thêm lớp học",
        Date.now(),
        false
      );
      console.error("Error:", error);
      return res.status(500).json({ check: false, msg: "Lỗi máy chủ" });
    }
  }
  async editClass(req, res, next) {
    try {
      //const string = req.headers.authorization;
      const {
        oldname,
        idCourse,
        name,
        startDate,
        endDate,
        maxStudent,
        address,
        schedule,
      } = req.body;
      if (!oldname || oldname == "") {
        return res
          .status(400)
          .json({ check: false, msg: "Chưa chọn lớp cần chỉnh" });
      }
      if (!name || name == "") {
        return res.status(400).json({ check: false, msg: "Chưa nhập tên lớp" });
      }
      if (!startDate || startDate === "") {
        return res
          .status(400)
          .json({ check: false, msg: "Chưa nhập ngày bắt đầu" });
      }
      if (!endDate || endDate === "") {
        return res
          .status(400)
          .json({ check: false, msg: "Chưa nhập ngày kết thúc" });
      }
      if (!maxStudent || maxStudent === "") {
        return res
          .status(400)
          .json({ check: false, msg: "Chưa nhập sĩ số tối đa" });
      }
      if (!address || address === "") {
        return res.status(400).json({ check: false, msg: "Chưa nhập cơ sở" });
      }
      if (!schedule || schedule === "") {
        return res
          .status(400)
          .json({ check: false, msg: "Chưa nhập lịch học" });
      }
      const queryResult = await Class.updateClass(
        name,
        idCourse,
        startDate,
        endDate,
        maxStudent,
        address,
        schedule,
        oldname
      );
      if (queryResult == true) {
        const result = await Log.addLog(
          res.user.id,
          "Chỉnh sửa lớp học",
          Date.now(),
          true
        );
        return res.json({
          check: true,
          msg: "Chỉnh sửa lớp học thành công",
        });
      } else {
        const result = await Log.addLog(
          res.user.id,
          "Chỉnh sửa lớp học",
          Date.now(),
          false
        );
        return res.status(400).json({ check: false, msg: "Dữ liệu không đổi" });
      }
    } catch (error) {
      const result = await Log.addLog(
        res.user.id,
        "Chỉnh sửa lớp học",
        Date.now(),
        false
      );
      console.error("Error:", error);
      return res.status(500).json({ check: false, msg: "Lỗi máy chủ" });
    }
  }
  async removeClass(req, res, next) {
    try {
      const { name } = req.query;
      const queryResult = await Class.removeClass(name);
      if (queryResult) {
        const result = await Log.addLog(
          res.user.id,
          "Xóa lớp học",
          Date.now(),
          true
        );
        return res.json({
          check: true,
        });
      } else {
        const result = await Log.addLog(
          res.user.id,
          "Xóa lớp học",
          Date.now(),
          false
        );
        return res.status(400).json({ check: false, msg: "Không có lớp học" });
      }
    } catch (error) {
      const result = await Log.addLog(
        res.user.id,
        "Xóa lớp học",
        Date.now(),
        false
      );
      console.error("Error:", error);
      return res.status(500).json({ check: false, msg: "Lỗi máy chủ" });
    }
  }
}
module.exports = new ClassController();