const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../models/File'); // 추가
const auth = require('../middleware/auth');

const router = express.Router();

// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 파일이 저장될 디렉토리
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// 파일 업로드 라우트
router.post('/upload', auth, upload.single('file'), async (req, res) => {
    if (req.file) {
        try {
            const file = new File({
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size,
                userId: req.user._id,  // 사용자 ID 저장
            });

            await file.save();
            res.json({ file: req.file.filename });
        } catch (error) {
            res.status(500).send('파일 정보를 저장하는 중 오류가 발생했습니다.');
        }
    } else {
        res.status(400).send('파일 업로드 실패');
    }
});

router.get('/files', auth, async (req, res) => {
    try {
        const files = await File.find({ userId: req.user._id }); // 현재 사용자와 연결된 파일만 가져옴
        res.json(files);
    } catch (error) {
        res.status(500).send('파일 목록을 가져오는 중 오류가 발생했습니다.');
    }
});

// 파일 목록 반환 라우트
router.get('/', (req, res) => {
  const directoryPath = path.join(__dirname, '../uploads');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send({
        message: "파일 목록을 읽는 중 오류가 발생했습니다.",
      });
    }

    // 각 파일에 대해 다운로드 링크를 생성합니다.
    const fileInfos = files.map(file => ({
      filename: file,
      url: `http://localhost:5000/uploads/${file}`,
    }));

    res.status(200).json(fileInfos);
  });
});

router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const directoryPath = path.join(__dirname, '../uploads');

    res.download(path.join(directoryPath, filename), filename, (err) => {
        if (err) {
            res.status(500).send({
                message: "파일을 다운로드할 수 없습니다: " + err,
            });
        }
    });
});

router.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../uploads', filename); // 'backend/uploads/' 경로로 설정
    
    fs.unlink(filepath, (err) => {
        if (err) {
            console.error('파일 삭제 중 오류 발생:', err);
            return res.status(404).send('파일을 찾을 수 없습니다.');
        }
        res.json({ message: '파일이 성공적으로 삭제되었습니다.' });
    });
});


module.exports = router;
