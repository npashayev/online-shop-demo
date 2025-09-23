import { Link } from 'react-router-dom'
import styles from './slide-show.module.scss'
import { useEffect, useState } from 'react'
import headphone from '/src/assets/slideshow/headphone.webp'
import asus from '/src/assets/slideshow/asus.webp'
import chanel from '/src/assets/slideshow/chanel.webp'
import iphone from '/src/assets/slideshow/iphone-13.webp'
import rolex from '/src/assets/slideshow/rolex.webp'

const slideShowImages = [
    { title: "Apple AirPods Max Silver", link: "/products/101", src: headphone },
    { title: "Asus Zenbook Pro Dual Screen Laptop", link: "/products/79", src: asus },
    { title: "Chanel Coco Noir Eau De", link: "/products/7", src: chanel },
    { title: "iPhone 13 Pro", link: "/products/123", src: iphone },
    { title: "Rolex Submariner Watch", link: "/products/98", src: rolex },
]

const SlideShow = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const changeActiveIndex = () => {
            setActiveIndex(prev => (prev + 1) % slideShowImages.length)
        }
        const interval = setInterval(changeActiveIndex, 5000)

        return () => clearInterval(interval)
    }, [])


    return (
        slideShowImages.map((image, index) =>
            <Link
                className={`${styles.link} ${activeIndex === index ? styles.active : ''}`}
                key={index}
                to={image.link}
            >
                <img
                    className={styles.image}
                    src={image.src}
                    alt={image.title}
                    title={image.title}
                />
            </Link>
        )
    )
}

export default SlideShow

