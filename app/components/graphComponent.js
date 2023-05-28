// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
    const onLoadScriptRef = useRef();

    useEffect(
        () => {
            onLoadScriptRef.current = createWidget;

            if (!tvScriptLoadingPromise) {
                tvScriptLoadingPromise = new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.id = 'tradingview-widget-loading-script';
                    script.src = 'https://s3.tradingview.com/tv.js';
                    script.type = 'text/javascript';
                    script.onload = resolve;

                    document.head.appendChild(script);
                });
            }

            tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

            return () => onLoadScriptRef.current = null;

            function createWidget() {
                if (document.getElementById('tradingview_2c00a') && 'TradingView' in window) {
                    new window.TradingView.widget({
                        autosize: true,
                        symbol: "USDT",
                        interval: "D",
                        timezone: "America/Caracas",
                        theme: "dark",
                        style: "2",
                        locale: "es",
                        toolbar_bg: "#f1f3f6",
                        enable_publishing: false,
                        withdateranges: true,
                        allow_symbol_change: true,
                        container_id: "tradingview_2c00a",
                        width: "100%",
                        height: "100%",
                    });
                }
            }
        },
        []
    );

    return (
        <div className='tradingview-widget-container'>
            <div id='tradingview_2c00a' />
            <div className="tradingview-widget-copyright">
                <a href="https://es.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Siga los mercados en TradingView</span></a>
            </div>
        </div>
    );
}
