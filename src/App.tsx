import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Container,
    Chip,
    Avatar,
    LinearProgress,
    IconButton,
    Divider,
    Stack,
    useTheme
} from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    Refresh,
    CheckCircle,
    Error,
    AttachMoney,
    People,
    Store,
    Analytics
} from '@mui/icons-material';

interface DashboardData {
    total_vends: number;
    successful_vends: number;
    failed_vends: number;
    success_percentage: number;
    failure_percentage: number;
}

interface VendsByHour {
    hour: number;
    vends_count: number;
    successful_vends: number;
    failed_vends: number;
}

interface ProductPerformance {
    product_sku: string;
    total_clicks: number;
    conversions: number;
    conversion_rate: number;
}

const App: React.FC = () => {
    const theme = useTheme();
    
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        total_vends: 150,
        successful_vends: 120,
        failed_vends: 30,
        success_percentage: 80.0,
        failure_percentage: 20.0
    });
    
    const [vendsByHour, setVendsByHour] = useState<VendsByHour[]>([]);
    const [vendsByDay, setVendsByDay] = useState<any[]>([]);
    const [productPerformance, setProductPerformance] = useState<ProductPerformance[]>([]);
    const [machineStatus, setMachineStatus] = useState<any[]>([]);
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

    // Color palette for charts
    const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

    // Generate sample data
    useEffect(() => {
        // Generate hourly data
        const hourlyData = [];
        for (let i = 0; i < 24; i++) {
            hourlyData.push({
                hour: i,
                vends_count: Math.floor(Math.random() * 20) + 5,
                successful_vends: Math.floor(Math.random() * 15) + 3,
                failed_vends: Math.floor(Math.random() * 5) + 1
            });
        }
        setVendsByHour(hourlyData);

        // Generate daily data
        const dailyData = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            dailyData.push({
                date: date.toISOString().split('T')[0],
                vends_count: Math.floor(Math.random() * 50) + 20,
                successful_vends: Math.floor(Math.random() * 40) + 15,
                failed_vends: Math.floor(Math.random() * 10) + 5
            });
        }
        setVendsByDay(dailyData);

        // Generate product performance data
        const products = [
            { product_sku: 'MULLER_YOGURT_001', total_clicks: 45, conversions: 36, conversion_rate: 80.0 },
            { product_sku: 'MULLER_YOGURT_002', total_clicks: 38, conversions: 28, conversion_rate: 73.7 },
            { product_sku: 'MULLER_YOGURT_003', total_clicks: 42, conversions: 31, conversion_rate: 73.8 },
            { product_sku: 'MULLER_YOGURT_004', total_clicks: 35, conversions: 25, conversion_rate: 71.4 }
        ];
        setProductPerformance(products);

        // Generate machine status data
        const machines = [
            { id: 1, machine_name: 'ASDA-001', status: 'online', uptime_percentage: 95, refill_count: 3 },
            { id: 2, machine_name: 'ASDA-002', status: 'online', uptime_percentage: 88, refill_count: 2 },
            { id: 3, machine_name: 'ASDA-003', status: 'offline', uptime_percentage: 45, refill_count: 1 },
            { id: 4, machine_name: 'ASDA-004', status: 'online', uptime_percentage: 92, refill_count: 4 }
        ];
        setMachineStatus(machines);
    }, []);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setDashboardData(prev => ({
                ...prev,
                total_vends: prev.total_vends + Math.floor(Math.random() * 3),
                successful_vends: prev.successful_vends + Math.floor(Math.random() * 2),
                failed_vends: prev.failed_vends + Math.floor(Math.random() * 1),
                success_percentage: ((prev.successful_vends + Math.floor(Math.random() * 2)) / (prev.total_vends + Math.floor(Math.random() * 3)) * 100),
                failure_percentage: ((prev.failed_vends + Math.floor(Math.random() * 1)) / (prev.total_vends + Math.floor(Math.random() * 3)) * 100)
            }));
            setLastUpdate(new Date());
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box sx={{ 
            flexGrow: 1, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh'
        }}>
            {/* Custom Header */}
            <Box sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ py: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ 
                                bgcolor: 'primary.main', 
                                mr: 2,
                                width: 48,
                                height: 48,
                                background: 'linear-gradient(45deg, #6366f1, #8b5cf6)'
                            }}>
                                <Analytics />
                            </Avatar>
                            <Box>
                                <Typography variant="h4" sx={{ 
                                    fontWeight: 700,
                                    background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 0.5
                                }}>
                                    ASDA Sampling Campaign
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Real-time Performance Analytics Dashboard
                                </Typography>
                            </Box>
                        </Box>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Chip 
                                icon={<CheckCircle />} 
                                label="Live Data" 
                                color="success" 
                                variant="filled"
                                sx={{ fontWeight: 600 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                Last updated: {lastUpdate.toLocaleTimeString()}
                            </Typography>
                            <IconButton color="primary">
                                <Refresh />
                            </IconButton>
                        </Stack>
                    </Box>
                </Container>
            </Box>
            
            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* KPI Cards */}
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: 3, 
                    mb: 4 
                }}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 3,
                        boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '100px',
                            height: '100px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            transform: 'translate(30px, -30px)'
                        }
                    }}>
                        <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                                    <AttachMoney />
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 600, opacity: 0.9 }}>
                                    Total Vends
                                </Typography>
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                {dashboardData.total_vends}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TrendingUp sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    +12% from yesterday
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    
                    <Card sx={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 3,
                        boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '100px',
                            height: '100px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            transform: 'translate(30px, -30px)'
                        }
                    }}>
                        <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                                    <CheckCircle />
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 600, opacity: 0.9 }}>
                                    Success Rate
                                </Typography>
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                {dashboardData.success_percentage.toFixed(1)}%
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TrendingUp sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    +2.3% this week
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    
                    <Card sx={{
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 3,
                        boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '100px',
                            height: '100px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            transform: 'translate(30px, -30px)'
                        }
                    }}>
                        <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                                    <Error />
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 600, opacity: 0.9 }}>
                                    Failure Rate
                                </Typography>
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                {dashboardData.failure_percentage.toFixed(1)}%
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TrendingDown sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    -1.2% this week
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    
                    <Card sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 3,
                        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '100px',
                            height: '100px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            transform: 'translate(30px, -30px)'
                        }
                    }}>
                        <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                                    <Store />
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 600, opacity: 0.9 }}>
                                    Machines Online
                                </Typography>
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                {machineStatus.filter(m => m.status === 'online').length}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    All systems operational
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Charts Row */}
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
                    gap: 3, 
                    mb: 4 
                }}>
                    <Paper sx={{ 
                        p: 3, 
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                <TrendingUp />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Vends Performance (Last 24 Hours)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Real-time vend tracking and analytics
                                </Typography>
                            </Box>
                        </Box>
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={vendsByHour}>
                                <defs>
                                    <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="failedGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
                                <XAxis 
                                    dataKey="hour" 
                                    tick={{ fontSize: 12 }}
                                    axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
                                />
                                <YAxis 
                                    tick={{ fontSize: 12 }}
                                    axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
                                />
                                <Tooltip 
                                    contentStyle={{
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Legend />
                                <Area 
                                    type="monotone" 
                                    dataKey="vends_count" 
                                    stroke="#6366f1" 
                                    fill="url(#totalGradient)" 
                                    name="Total Vends"
                                    strokeWidth={3}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="successful_vends" 
                                    stroke="#10b981" 
                                    fill="url(#successGradient)" 
                                    name="Successful"
                                    strokeWidth={3}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="failed_vends" 
                                    stroke="#ef4444" 
                                    fill="url(#failedGradient)" 
                                    name="Failed"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Paper>
                    
                    <Paper sx={{ 
                        p: 3, 
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                                <People />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Daily Performance
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Last 7 days trend
                                </Typography>
                            </Box>
                        </Box>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={vendsByDay}>
                                <defs>
                                    <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.3}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
                                <XAxis 
                                    dataKey="date" 
                                    tick={{ fontSize: 10 }}
                                    axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
                                />
                                <YAxis 
                                    tick={{ fontSize: 10 }}
                                    axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
                                />
                                <Tooltip 
                                    contentStyle={{
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Bar 
                                    dataKey="vends_count" 
                                    fill="url(#primaryGradient)" 
                                    name="Total Vends"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Box>

                {/* Executive Summary Cards */}
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    gap: 3 
                }}>
                    <Paper sx={{ 
                        p: 3, 
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '80px',
                            height: '80px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            transform: 'translate(25px, -25px)'
                        }
                    }}>
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                                    <Analytics />
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Campaign Summary
                                </Typography>
                            </Box>
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Impressions</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>2,847</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Engagement Rate</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>11.1%</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Sample Conversion</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>34.2%</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Loyalty Integration</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>79.8%</Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Paper>
                    
                    <Paper sx={{ 
                        p: 3, 
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '80px',
                            height: '80px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            transform: 'translate(25px, -25px)'
                        }
                    }}>
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                                    <AttachMoney />
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Performance Metrics
                                </Typography>
                            </Box>
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Daily Sales Lift</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#fbbf24' }}>+27.8%</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Weekly Sales</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>£475.23</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Monthly ROI</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#fbbf24' }}>252.6%</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Payback Period</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>4.3 months</Typography>
                                </Box>
                            </Stack>
                        </Box>
                    </Paper>
                    
                    <Paper sx={{ 
                        p: 3, 
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '80px',
                            height: '80px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            transform: 'translate(25px, -25px)'
                        }
                    }}>
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mr: 2 }}>
                                    <CheckCircle />
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    System Status
                                </Typography>
                            </Box>
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircle sx={{ mr: 1, fontSize: 16, color: '#fbbf24' }} />
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>System Online</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircle sx={{ mr: 1, fontSize: 16, color: '#fbbf24' }} />
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Data Streaming</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircle sx={{ mr: 1, fontSize: 16, color: '#fbbf24' }} />
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>All Systems Operational</Typography>
                                </Box>
                                <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                                <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.75rem' }}>
                                    Last sync: {lastUpdate.toLocaleTimeString()}
                                </Typography>
                            </Stack>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};

export default App;