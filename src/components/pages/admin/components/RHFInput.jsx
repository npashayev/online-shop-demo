import styles from './product-info.module.scss'

const RHFInput = ({ label, name, register, type = "text" }) => (
    <div className={styles.inputCnr}>
        <label>{label}</label>
        <input
            type={type}
            {...register(name)}
            className={styles.info}
        />
    </div>
)

export default RHFInput;