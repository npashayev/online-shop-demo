import styles from './home-page.module.scss'
import SlideShow from './SlideShow'
import LightRays from '../../common/react-bits/light-rays/LightRays';
import GradientText from '../../common/react-bits/gradient-text/GradientText'
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <main className={styles.main}>
            <div className={styles.text}>
                <GradientText
                    colors={["#004d33", "#00194d", "#004d33", "#00194d", "#004d33"]}
                    animationSpeed={3}
                    showBorder={false}
                    className={styles.heading}
                >
                    Discover Products You’ll Love
                </GradientText>

                <p className={styles.body}>
                    Explore our curated collection of top-quality products designed to make your life easier, stylish, and more enjoyable. From the latest tech to timeless classics, find exactly what you need with just a click.
                </p>

                <Link to='/products' className={styles.exploreBtn}>Explore</Link>
            </div>

            <SlideShow />

            <div className={styles.lightRaysCnr}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#00ffff"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className="custom-rays"
                />
            </div>
        </main>

    )
}

export default HomePage