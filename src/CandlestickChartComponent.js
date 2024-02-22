// CandlestickChartComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const CandlestickChartComponent = () => {
    const [candleData, setCandleData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/candlestick-data'); // Adjust the URL as per your backend setup
                setCandleData(response.data);
            } catch (error) {
                console.error('Error fetching candlestick data:', error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Plot
                data={[
                    {
                        x: [new Date()],
                        open: [candleData.open],
                        high: [candleData.high],
                        low: [candleData.low],
                        close: [candleData.close],
                        type: 'candlestick',
                    },
                ]}
                layout={{ width: 800, height: 600, title: 'Candlestick Chart' }}
            />
        </div>
    );
};

export default CandlestickChartComponent;
