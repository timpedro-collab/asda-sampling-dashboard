const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Sample data for testing
const generateSampleData = () => {
    const now = new Date();
    const sampleEvents = [];
    
    for (let i = 0; i < 100; i++) {
        const eventTime = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
        const eventType = Math.random() > 0.2 ? 'successful_vend' : 'failed_vend';
        const products = ['MULLER_YOGURT_001', 'MULLER_YOGURT_002', 'MULLER_YOGURT_003', 'MULLER_YOGURT_004'];
        
        sampleEvents.push({
            id: `event_${i}`,
            campaign_id: 'campaign_001',
            machine_id: 'machine_001',
            event_timestamp: eventTime,
            event_type: eventType,
            product_sku: products[Math.floor(Math.random() * products.length)],
            session_id: `session_${Math.floor(Math.random() * 50)}`,
            user_demographics: {
                age_group: ['18-25', '26-35', '36-45', '46-55', '55+'][Math.floor(Math.random() * 5)],
                gender: ['male', 'female', 'other'][Math.floor(Math.random() * 3)]
            },
            footfall_count: Math.floor(Math.random() * 20) + 1,
            success_percentage: eventType === 'successful_vend' ? 85 + Math.random() * 10 : 15 + Math.random() * 10,
            failure_reason: eventType === 'failed_vend' ? ['out_of_stock', 'payment_failed', 'machine_error'][Math.floor(Math.random() * 3)] : null
        });
    }
    
    return sampleEvents;
};

let sampleEvents = generateSampleData();

// API Routes
app.get('/api/dashboard/summary', async (req, res) => {
    try {
        const totalVens = sampleEvents.length;
        const successfulVens = sampleEvents.filter(e => e.event_type === 'successful_vend').length;
        const failedVens = sampleEvents.filter(e => e.event_type === 'failed_vend').length;
        
        const summary = {
            total_vens: totalVens,
            successful_vens: successfulVens,
            failed_vens: failedVens,
            success_percentage: totalVens > 0 ? (successfulVens / totalVens * 100).toFixed(2) : 0,
            failure_percentage: totalVens > 0 ? (failedVens / totalVens * 100).toFixed(2) : 0
        };
        
        res.json(summary);
    } catch (error) {
        console.error('Error fetching dashboard summary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/dashboard/vens-by-hour', async (req, res) => {
    try {
        const hourlyData = {};
        
        sampleEvents.forEach(event => {
            const hour = new Date(event.event_timestamp).getHours();
            if (!hourlyData[hour]) {
                hourlyData[hour] = {
                    hour: hour,
                    vens_count: 0,
                    successful_vens: 0,
                    failed_vens: 0
                };
            }
            
            hourlyData[hour].vens_count++;
            if (event.event_type === 'successful_vend') {
                hourlyData[hour].successful_vens++;
            } else {
                hourlyData[hour].failed_vens++;
            }
        });
        
        const result = Object.values(hourlyData).sort((a, b) => a.hour - b.hour);
        res.json(result);
    } catch (error) {
        console.error('Error fetching VENs by hour:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/dashboard/vens-by-day', async (req, res) => {
    try {
        const dailyData = {};
        
        sampleEvents.forEach(event => {
            const date = new Date(event.event_timestamp).toISOString().split('T')[0];
            if (!dailyData[date]) {
                dailyData[date] = {
                    date: date,
                    vens_count: 0,
                    successful_vens: 0,
                    failed_vens: 0
                };
            }
            
            dailyData[date].vens_count++;
            if (event.event_type === 'successful_vend') {
                dailyData[date].successful_vens++;
            } else {
                dailyData[date].failed_vens++;
            }
        });
        
        const result = Object.values(dailyData).sort((a, b) => new Date(a.date) - new Date(b.date));
        res.json(result);
    } catch (error) {
        console.error('Error fetching VENs by day:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/dashboard/product-performance', async (req, res) => {
    try {
        const productData = {};
        
        sampleEvents.forEach(event => {
            if (event.product_sku) {
                if (!productData[event.product_sku]) {
                    productData[event.product_sku] = {
                        product_sku: event.product_sku,
                        total_clicks: 0,
                        conversions: 0,
                        conversion_rate: 0
                    };
                }
                
                productData[event.product_sku].total_clicks++;
                if (event.event_type === 'successful_vend') {
                    productData[event.product_sku].conversions++;
                }
            }
        });
        
        Object.values(productData).forEach(product => {
            product.conversion_rate = product.total_clicks > 0 
                ? (product.conversions / product.total_clicks * 100).toFixed(2)
                : 0;
        });
        
        const result = Object.values(productData).sort((a, b) => b.total_clicks - a.total_clicks);
        res.json(result);
    } catch (error) {
        console.error('Error fetching product performance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/dashboard/machine-status', async (req, res) => {
    try {
        const machines = [
            {
                id: 'machine_001',
                machine_name: 'ASDA Leeds - Main Entrance',
                status: 'online',
                uptime_percentage: 98.5,
                last_refill_timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
                refill_count: Math.floor(Math.random() * 10) + 1
            },
            {
                id: 'machine_002',
                machine_name: 'ASDA Leeds - Aisle 5',
                status: 'online',
                uptime_percentage: 96.2,
                last_refill_timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
                refill_count: Math.floor(Math.random() * 8) + 1
            },
            {
                id: 'machine_003',
                machine_name: 'ASDA Leeds - Checkout Area',
                status: 'offline',
                uptime_percentage: 45.3,
                last_refill_timestamp: new Date(Date.now() - Math.random() * 48 * 60 * 60 * 1000),
                refill_count: Math.floor(Math.random() * 5) + 1
            }
        ];
        
        res.json(machines);
    } catch (error) {
        console.error('Error fetching machine status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// WebSocket connection for real-time updates
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Simulate real-time data updates
setInterval(() => {
    const newEvent = {
        id: `event_${Date.now()}`,
        campaign_id: 'campaign_001',
        machine_id: 'machine_001',
        event_timestamp: new Date(),
        event_type: Math.random() > 0.2 ? 'successful_vend' : 'failed_vend',
        product_sku: ['MULLER_YOGURT_001', 'MULLER_YOGURT_002', 'MULLER_YOGURT_003', 'MULLER_YOGURT_004'][Math.floor(Math.random() * 4)],
        session_id: `session_${Math.floor(Math.random() * 50)}`,
        user_demographics: {
            age_group: ['18-25', '26-35', '36-45', '46-55', '55+'][Math.floor(Math.random() * 5)],
            gender: ['male', 'female', 'other'][Math.floor(Math.random() * 3)]
        },
        footfall_count: Math.floor(Math.random() * 20) + 1,
        success_percentage: Math.random() > 0.2 ? 85 + Math.random() * 10 : 15 + Math.random() * 10
    };
    
    sampleEvents.push(newEvent);
    
    if (sampleEvents.length > 1000) {
        sampleEvents = sampleEvents.slice(-1000);
    }
    
    const summary = {
        total_vens: sampleEvents.length,
        successful_vens: sampleEvents.filter(e => e.event_type === 'successful_vend').length,
        failed_vens: sampleEvents.filter(e => e.event_type === 'failed_vend').length
    };
    
    io.emit('real-time-update', summary);
}, 5000);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard API available at http://localhost:${PORT}/api/dashboard/summary`);
});
