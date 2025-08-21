import { useCurrentUser } from "hooks/useUser"
import styles from "/src/components/pages/user-info/user-info.module.scss"
import UserInfoReadOnly from "./UserInfoReadOnly";
import { useState } from "react";
import EditUserInfo from "./EditUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const UserInfo = () => {
    const [editMode, setEditMode] = useState(false);

    const userData = useCurrentUser();

    return (
        editMode
            ? <main className={styles.main}>
                <div className={styles.buttonsCnr}>
                    <button onClick={() => setEditMode(false)} className={styles.crossBtn}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <button className={styles.updateBtn}>Update</button>
                </div>
                <EditUserInfo userData={userData} editMode={editMode} isEditMode={setEditMode} />
            </main>

            : <main className={styles.main}>
                <div className={styles.buttonsCnr}>
                    <button onClick={() => setEditMode(true)} className={styles.editBtn}>Edit</button>
                </div>
                <UserInfoReadOnly userData={userData} editMode={editMode} isEditMode={setEditMode} />
            </main>
    )
}

export default UserInfo