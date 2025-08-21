import styles from "./user-info.module.scss"

const EditUserInfo = ({ userData }) => {

    const { data: user } = userData;

    return (
        user &&
        <div className={styles.componentContainer}>
            <div className={styles.block}>
                <div className={styles.heading}>General information</div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>First name</label>
                        <input value={user.firstName} className={styles.info} />
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Last name</label>
                        <input value={user.lastName} className={styles.info} />
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Maiden name</label>
                        <input value={user.maidenName} className={styles.info} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Username</label>
                        <input value={user.username} className={styles.info} />
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Email</label>
                        <input value={user.email} className={styles.info} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Phone</label>
                        <input value={user.phone} className={styles.info} />
                    </div>
                </div>
            </div>

            <div className={styles.block}>
                <div className={styles.heading}>Address information</div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Address</label>
                        <input value={user.address?.address} className={styles.info} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>City</label>
                        <input value={user.address?.city} className={styles.info} />
                    </div>

                    <div className={styles.inputCnr}>
                        <label>State</label>
                        <input value={user.address?.state} className={styles.info} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>State code</label>
                        <input value={user.address?.stateCode} className={styles.info} />
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Postal code</label>
                        <input value={user.address?.postalCode} className={styles.info} />
                    </div>
                </div>
            </div>

            <div className={styles.block}>
                <div className={styles.heading}>Card information</div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Card number</label>
                        <input value={user.bank?.cardNumber} className={styles.info} />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Expiration date</label>
                        <input value={user.bank?.cardExpire} className={styles.info} />
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Currency</label>
                        <input value={user.bank?.currency} className={styles.info} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUserInfo