import styles from "./user-info.module.scss";

const InfoField = ({ label, value }) => (
    <div className={styles.inputCnr}>
        <label>{label}</label>
        <p className={styles.info}>{value || ''}</p>
    </div>
);

const UserInfoReadOnly = ({ user }) => {
    return (
        <div className={styles.componentContainer}>

            {/* General Information */}
            <div className={styles.block}>
                <div className={styles.heading}>General information</div>
                <div className={styles.inputGroup}>
                    <InfoField label="First name" value={user.firstName} />
                    <InfoField label="Last name" value={user.lastName} />
                    <InfoField label="Maiden name" value={user.maidenName} />
                </div>

                <div className={styles.inputGroup}>
                    <InfoField label="Username" value={user.username} />
                    <InfoField label="Email" value={user.email} />
                </div>

                <div className={styles.inputGroup}>
                    <InfoField label="Phone" value={user.phone} />
                </div>
            </div>

            {/* Address Information */}
            <div className={styles.block}>
                <div className={styles.heading}>Address information</div>
                <div className={styles.inputGroup}>
                    <InfoField label="Address" value={user.address?.address} />
                </div>

                <div className={styles.inputGroup}>
                    <InfoField label="City" value={user.address?.city} />
                    <InfoField label="State" value={user.address?.state} />
                </div>

                <div className={styles.inputGroup}>
                    <InfoField label="State code" value={user.address?.stateCode} />
                    <InfoField label="Postal code" value={user.address?.postalCode} />
                </div>
            </div>

            {/* Card Information */}
            <div className={styles.block}>
                <div className={styles.heading}>Card information</div>
                <div className={styles.inputGroup}>
                    <InfoField label="Card number" value={user.bank?.cardNumber} />
                </div>

                <div className={styles.inputGroup}>
                    <InfoField label="Expiration date" value={user.bank?.cardExpire} />
                    <InfoField label="Currency" value={user.bank?.currency} />
                </div>
            </div>

        </div>
    );
};

export default UserInfoReadOnly;
