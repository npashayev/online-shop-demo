import styles from "./user-info.module.scss";

// Reusable input field component
const InputField = ({ label, name, value, onChange }) => (
    <div className={styles.inputCnr}>
        <label>{label}</label>
        <input
            name={name}
            value={value || ''}
            onChange={onChange}
            className={styles.info}
        />
    </div>
);

const EditUserInfo = ({ user, handleInputChange }) => {
    return (
        <div className={styles.componentContainer}>
            {/* General Information */}
            <div className={styles.block}>
                <div className={styles.heading}>General information</div>
                <div className={styles.inputGroup}>
                    <InputField label="First name" name="firstName" value={user.firstName} onChange={handleInputChange} />
                    <InputField label="Last name" name="lastName" value={user.lastName} onChange={handleInputChange} />
                    <InputField label="Maiden name" name="maidenName" value={user.maidenName} onChange={handleInputChange} />
                </div>
                <div className={styles.inputGroup}>
                    <InputField label="Username" name="username" value={user.username} onChange={handleInputChange} />
                    <InputField label="Email" name="email" value={user.email} onChange={handleInputChange} />
                </div>
                <div className={styles.inputGroup}>
                    <InputField label="Phone" name="phone" value={user.phone} onChange={handleInputChange} />
                </div>
            </div>

            {/* Address Information */}
            <div className={styles.block}>
                <div className={styles.heading}>Address information</div>
                <div className={styles.inputGroup}>
                    <InputField label="Address" name="address.address" value={user.address?.address} onChange={handleInputChange} />
                </div>
                <div className={styles.inputGroup}>
                    <InputField label="City" name="address.city" value={user.address?.city} onChange={handleInputChange} />
                    <InputField label="State" name="address.state" value={user.address?.state} onChange={handleInputChange} />
                </div>
                <div className={styles.inputGroup}>
                    <InputField label="State code" name="address.stateCode" value={user.address?.stateCode} onChange={handleInputChange} />
                    <InputField label="Postal code" name="address.postalCode" value={user.address?.postalCode} onChange={handleInputChange} />
                </div>
            </div>

            {/* Card Information */}
            <div className={styles.block}>
                <div className={styles.heading}>Card information</div>
                <div className={styles.inputGroup}>
                    <InputField label="Card number" name="bank.cardNumber" value={user.bank?.cardNumber} onChange={handleInputChange} />
                </div>
                <div className={styles.inputGroup}>
                    <InputField label="Expiration date" name="bank.cardExpire" value={user.bank?.cardExpire} onChange={handleInputChange} />
                    <InputField label="Currency" name="bank.currency" value={user.bank?.currency} onChange={handleInputChange} />
                </div>
            </div>
        </div>
    )
}

export default EditUserInfo;
