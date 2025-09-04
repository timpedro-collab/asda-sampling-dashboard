const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sample data
const sampleData = {
    total_vens: 150,
    successful_vens: 120,
    failed_vens: 30,
    success_percentage: 80.0,
    failure_percentage: 20.0
};

app.get('/api/dashboard/summary', (req, res) => {
    res.json(sampleData);
});

app.get('/api/dashboard/vens-by-hour', (req, res) => {
    const hourlyData = [];
    for (let i = 0; i < 24; i++) {
        hourlyData.push({
            hour: i,
            vens_count: Math.floor(Math.random() * 20) + 5,
            successful_vens: Math.floor(Math.random() * 15) + 3,
            failed_vens: Math.floor(Math.random() * 5) + 1
        });
    }
    res.json(hourlyData);
});

app.get('/api/dashboard/vens-by-day', (req, res) => {
    const dailyData = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dailyData.push({
            date: date.toISOString().split('T')[0],
            vens_count: Math.floor(Math.random() * 50) + 20,
            successful_vens: Math.floor(Math.random() * 40) + 15,
            failed_vens: Math.floor(Math.random() * 10) + 5
        });
    }
    res.json(dailyData);
});

app.get('/api/dashboard/product-performance', (req, res) => {
    const products = [
        { product_sku: 'MULLER_YOGURT_001', total_clicks: 45, conversions: 36, conversion_rate: 80.0 },
        { product_sku: 'MULLER_YOGURT_002', total_clicks: 38, conversions: 28, conversion_rate: 73.7 },
        { product_sku: 'MULLER_YOGURT_003', total_clicks: 32, conversions: 24, conversion_rate: 75.0 },
        { product_sku: 'MULLER_YOGURT_004', total_clicks: 28, conversions: 20, conversion_rate: 71.4 }
    ];
    res.json(products);
});

app.get('/api/dashboard/machine-status', (req, res) => {
    const machines = [
        {
            id: 'machine_001',
            machine_name: 'ASDA Leeds - Main Entrance',
            status: 'online',
            uptime_percentage: 98.5,
            refill_count: 5
        },
        {
            id: 'machine_002',
            machine_name: 'ASDA Leeds - Aisle 5',
            status: 'online',
            uptime_percentage: 96.2,
            refill_count: 3
        },
        {
            id: 'machine_003',
            machine_name: 'ASDA Leeds - Checkout Area',
            status: 'offline',
            uptime_percentage: 45.3,
            refill_count: 1
        }
    ];
    res.json(machines);
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`🚀 Simple server running on http://localhost:${PORT}`);
    console.log(`📊 Test API: http://localhost:${PORT}/api/dashboard/summary`);
});
