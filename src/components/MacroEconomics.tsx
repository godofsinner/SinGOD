import React from 'react';

const MacroEconomics = () => {
    const economicIndicators = {
        Inflation: '2.5% (Forecasted)',
        GDPGrowth: '3.0% (Forecasted)',
        Unemployment: '4.0% (Current)',
        FederalRate: '2.75% (Current)',
        DebtToGDP: '120% (Current)',
        TradeBalance: '$-500B (Current)',
    };

    const economicCalendar = [
        { event: 'FOMC Meeting', date: '2026-03-15' },
        { event: 'Employment Report', date: '2026-03-10' },
        { event: 'FOMC Meeting', date: '2026-05-01' },
        { event: 'Employment Report', date: '2026-05-05' },
    ];

    const policyImpact = {
        InterestRateImpact: 'Higher rates may slow down growth',
        InflationRisk: 'Moderate risk due to supply chain issues',
        MarketVolatility: 'Increased volatility expected in the short term',
    };

    return (
        <div>
            <h1>Macro Economics Dashboard</h1>
            <h2>Economic Indicators</h2>
            <ul>
                {Object.entries(economicIndicators).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                ))}
            </ul>
            <h2>Economic Calendar</h2>
            <ul>
                {economicCalendar.map((event, index) => (
                    <li key={index}>{event.event} - {event.date}</li>
                ))}
            </ul>
            <h2>Policy Impact Analysis</h2>
            <ul>
                {Object.entries(policyImpact).map(([key, value]) => (
                    <li key={key}>{key.replace(/([A-Z])/g, ' $1')}: {value}</li>
                ))}
            </ul>
        </div>
    );
};

export default MacroEconomics;