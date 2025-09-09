import './GradientText.css';

export default function GradientText({
    children,
    className = '',
    colors = ['#00000', '#00000', '#00000', '#00000', '#00000'],
    animationSpeed = 8,
    showBorder = false
}) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
        animationDuration: `${animationSpeed}s`,
        fontSize: "60px"
    };

    return (
        <div className={`animated-gradient-text ${className}`}>
            {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}
            <h1 className="text-content" style={gradientStyle}>
                {children}
            </h1>
        </div>
    );
}
