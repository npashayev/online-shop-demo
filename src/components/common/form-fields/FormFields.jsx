import styles from "components/common/styles/resource-form.module.scss";

export const InfoField = ({ label, value }) => (
    <div className={styles.inputCnr}>
        <label>{label}</label>
        <p className={styles.info}>{value || ''}</p>
    </div>
);

export const RHFInput = ({ label, name, register, type = "text" }) => (
    <div className={styles.inputCnr}>
        <label>{label}</label>
        <input
            type={type}
            {...register(name)}
            className={styles.info}
        />
    </div>
)