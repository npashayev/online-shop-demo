import styles from './home-page.module.scss'
import SlideShow from './SlideShow'
import LightRays from '../../common/react-bits/light-rays/LightRays';
import GradientText from '../../common/react-bits/gradient-text/GradientText'
import { Link } from 'react-router-dom';
import TextType from 'components/common/react-bits/text-type/TextType';

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

                <TextType
                    text={[
                        "Explore our carefully curated collection of top-quality products, each thoughtfully selected to make your life easier, more convenient, and enjoyable every day.",
                        "From the latest cutting-edge technology to timeless classics, find exactly what you need with just a few clicks to enhance your home, work, or personal life with style and efficiency."
                    ]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    className={styles.body}
                />

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