import { InfoField } from "components/common/form-fields/FormFields";
import styles from "styles/resource-form.module.scss";

const UserInfoReadOnly = ({ user, onOpen }) => {
    return (
        <div className={styles.componentContainer}>
            <div className={styles.buttonsCnr}>
                <button onClick={onOpen} className={styles.editBtn}>Edit</button>
            </div>

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
                    <InfoField label="City" value={user.address?.city} />
                </div>

                <div className={styles.inputGroup}>
                    <InfoField label="State" value={user.address?.state} />
                    <InfoField label="State code" value={user.address?.stateCode} />
                </div>

                <div className={styles.inputGroup}>
                    <InfoField label="Postal code" value={user.address?.postalCode} />
                </div>
            </div>
        </div>
    );
};

export default UserInfoReadOnly;
