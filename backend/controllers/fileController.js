const File = require('../models/File');
const path = require('path');
const fs = require('fs');

// 파일 업로드 컨트롤러
exports.uploadFile = async (req, res) => {
    try {
        const file = req.file;
        const newFile = new File({
            filename: file.originalname,
            data: file.buffer,
            contentType: file.mimetype,
            user: req.user._id, // 사용자의 아이디로 연결 (로그인 상태에서)
        });
        await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        res.status(500).json({ message: 'File upload failed', error });
    }
};

// 파일 다운로드 컨트롤러
exports.downloadFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        res.set({
            'Content-Type': file.contentType,
            'Content-Disposition': `attachment; filename=${file.filename}`
        });
        res.send(file.data);
    } catch (error) {
        res.status(500).json({ message: 'File download failed', error });
    }
};

// 파일 목록 가져오기 컨트롤러
exports.getFiles = async (req, res) => {
    try {
        const files = await File.find({ user: req.user._id });
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve files', error });
    }
};

// 파일 삭제 컨트롤러
exports.deleteFile = async (req, res) => {
    try {
        await File.findByIdAndDelete(req.params.id);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'File deletion failed', error });
    }
};
