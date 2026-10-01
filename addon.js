const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 7000;

// 1. إعداد الـ Manifest (تعريف الموارد لدعم الحلقات والمواسم)
const manifest = {
    id: 'org.mycustom.fullserver',
    version: '1.0.0',
    name: 'My Cinema Server',
    description: 'سيرفر متكامل لدعم الأفلام والمسلسلات والحلقات كاملة',
    resources: ['catalog', 'meta', 'stream'],
    types: ['movie', 'series'],
    catalogs: [
        { type: 'movie', id: 'top_movies', name: 'أحدث الأفلام' },
        { type: 'series', id: 'top_series', name: 'أحدث المسلسلات' }
    ]
};

app.get('/manifest.json', (req, res) => {
    res.json(manifest);
});

// 2. مسار الكتالوج (الصفحة الرئيسية)
app.get('/catalog/:type/:id.json', async (req, res) => {
    const { type } = req.params;
    try {
        const response = await axios.get(`https://v3-cinemeta.strem.fun/catalog/${type}/top.json`);
        res.json(response.data);
    } catch (error) {
        res.json({ metas: [] });
    }
});

// 3. مسار تفاصيل مسلسل/فيلم وقائمة الحلقات (Meta Handler) - هذا الجزء هو المسؤول عن إظهار الحلقات!
app.get('/meta/:type/:id.json', async (req, res) => {
    const { type, id } = req.params;
    try {
        const response = await axios.get(`https://v3-cinemeta.strem.fun/meta/${type}/${id}.json`);
        res.json(response.data);
    } catch (error) {
        res.json({ meta: null });
    }
});

// 4. مسار جلب روابط التشغيل للحلقة أو الفيلم (Stream Handler)
app.get('/stream/:type/:id.json', async (req, res) => {
    const { type, id } = req.params; // يتضمن رقم الحلقة مثل: tt0944947:1:1
    try {
        const response = await axios.get(`https://torrentio.strem.fun/stream/${type}/${id}.json`);
        res.json(response.data);
    } catch (error) {
        res.json({ streams: [] });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
