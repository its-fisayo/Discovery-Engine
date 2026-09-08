interface ProgressBarProps {
  percent: number; // 0–100
}

function ProgressBar({ percent }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}

export default ProgressBar;