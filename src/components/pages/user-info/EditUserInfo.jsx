import styles from "./user-info.module.scss"

const EditUserInfo = ({ user, handleInputChange }) => {

    return (
        user &&
        <div className={styles.componentContainer}>
            <div className={styles.block}>
                <div className={styles.heading}>General information</div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>First name</label>
                        <input value={user.firstName} onChange={handleInputChange} className={styles.info} />
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Last name</label>
                        <input value={user.lastName} onChange={handleInputChange} className={styles.info} />
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Maiden name</label>
                        <input value={user.maidenName} onChange={handleInputChange} className={styles.info} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Username</label>
                        <input value={user.username} onChange={handleInputChange} className={styles.info} />
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Email</label>
                        <input value={user.email} onChange={handleInputChange} className={styles.info} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Phone</label>
                        <input value={user.phone} onChange={handleInputChange} className={styles.info} />
                    </div>
                </div>
            </div>

            <div className={styles.block}>
                <div className={styles.heading}>Address information</div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Address</label>
                        <input value={user.address?.address} onChange={handleInputChange} className={styles.info} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>City</label>
                        <input value={user.address?.city} onChange={handleInputChange} className={styles.info} />
                    </div>

                    <div className={styles.inputCnr}>
                        <label>State</label>
                        <input value={user.address?.state} onChange={handleInputChange} className={styles.info} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>State code</label>
                        <input value={user.address?.stateCode} onChange={handleInputChange} className={styles.info} />
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Postal code</label>
                        <input value={user.address?.postalCode} onChange={handleInputChange} className={styles.info} />
                    </div>
                </div>
            </div>

            <div className={styles.block}>
                <div className={styles.heading}>Card information</div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Card number</label>
                        <input value={user.bank?.cardNumber} onChange={handleInputChange} className={styles.info} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Expiration date</label>
                        <input value={user.bank?.cardExpire} onChange={handleInputChange} className={styles.info} />
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Currency</label>
                        <input value={user.bank?.currency} onChange={handleInputChange} className={styles.info} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUserInfo