import styles from "./user-info.module.scss"

const UserInfoReadOnly = ({ userData }) => {

    const { data: user } = userData;

    return (
        user &&
        <div className={styles.componentContainer}>
            <div className={styles.block}>
                <div className={styles.heading}>General information</div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>First name</label>
                        <p className={styles.info}>{user.firstName}</p>
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Last name</label>
                        <p className={styles.info}>{user.lastName}</p>
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Maiden name</label>
                        <p className={styles.info}>{user.maidenName}</p>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Username</label>
                        <p className={styles.info}>{user.username}</p>
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Email</label>
                        <p className={styles.info}>{user.email}</p>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Phone</label>
                        <p className={styles.info}>{user.phone}</p>
                    </div>
                </div>
            </div>

            <div className={styles.block}>
                <div className={styles.heading}>Address information</div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Address</label>
                        <p className={styles.info}>{user.address?.address}</p>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>City</label>
                        <p className={styles.info}>{user.address?.city}</p>
                    </div>

                    <div className={styles.inputCnr}>
                        <label>State</label>
                        <p className={styles.info}>{user.address?.state}</p>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>State code</label>
                        <p className={styles.info}>{user.address?.stateCode}</p>
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Postal code</label>
                        <p className={styles.info}>{user.address?.postalCode}</p>
                    </div>
                </div>
            </div>

            <div className={styles.block}>
                <div className={styles.heading}>Card information</div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Card number</label>
                        <p className={styles.info}>{user.bank?.cardNumber}</p>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputCnr}>
                        <label>Expiration date</label>
                        <p className={styles.info}>{user.bank?.cardExpire}</p>
                    </div>

                    <div className={styles.inputCnr}>
                        <label>Currency</label>
                        <p className={styles.info}>{user.bank?.currency}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoReadOnly