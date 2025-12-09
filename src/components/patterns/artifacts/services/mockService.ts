import { Message } from '../types';

const MOCK_ARTIFACT_RESPONSE = `Here is the futuristic data visualization card you requested.

<llmartifact title="Neon Data Card" type="html">
<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; background: transparent; font-family: 'Epilogue', sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; color: white; }
  .card {
    background: rgba(10, 10, 15, 0.8);
    border: 1px solid rgba(0, 255, 204, 0.3);
    border-radius: 16px;
    padding: 24px;
    width: 300px;
    box-shadow: 0 0 30px rgba(0, 255, 204, 0.1);
    position: relative;
    overflow: hidden;
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, #00ffcc, transparent);
    animation: scan 2s linear infinite;
  }
  @keyframes scan {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
  .title { font-size: 14px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; }
  .status { font-size: 12px; color: #00ffcc; border: 1px solid #00ffcc; padding: 2px 8px; border-radius: 12px; }
  .value { font-size: 48px; font-weight: 700; color: white; margin-bottom: 8px; font-family: 'Syne', sans-serif; }
  .label { font-size: 14px; color: #6b7280; }
  .chart {
    margin-top: 24px;
    height: 4px;
    background: rgba(255,255,255,0.1);
    border-radius: 2px;
    overflow: hidden;
  }
  .bar {
    height: 100%;
    width: 75%;
    background: #00ffcc;
    box-shadow: 0 0 10px #00ffcc;
    animation: load 1.5s ease-out;
  }
  @keyframes load { from { width: 0; } to { width: 75%; } }
</style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="title">System Load</span>
      <span class="status">ONLINE</span>
    </div>
    <div class="value">78%</div>
    <div class="label">Processing Units Active</div>
    <div class="chart">
      <div class="bar"></div>
    </div>
  </div>
</body>
</html>
</llmartifact>

I have created a neon-styled card with a scanning animation effect. It displays system load metrics using the primary cyan color palette.`;

export async function* mockChatStream(_messages: Message[]): AsyncGenerator<string> {
  // Simulate "thinking" delay
  await new Promise(resolve => setTimeout(resolve, 400));

  const response = MOCK_ARTIFACT_RESPONSE;
  const chars = response.split('');

  for (const char of chars) {
    // Slightly faster typing speed
    const delay = Math.random() * 8 + 2;
    await new Promise(resolve => setTimeout(resolve, delay));
    yield char;
  }
}
