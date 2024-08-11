const IPFS = require('ipfs-http-client');
const ipfs = IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// 파일 업로드 API 예시
app.post('/upload', async (req, res) => {
  const file = req.files.file; // 파일 데이터
  const fileAdded = await ipfs.add(file.data);
  res.json({ hash: fileAdded.path }); // IPFS 해시 반환
});