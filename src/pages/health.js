import React from 'react';

// 健康检查端点
export default function Health() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'monospace',
      fontSize: '18px',
      color: '#28a745'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>✅ DryVocal Health Check</h1>
        <p>Status: <strong>Healthy</strong></p>
        <p>Timestamp: {new Date().toISOString()}</p>
        <p>Version: 1.0.0</p>
      </div>
    </div>
  );
}





