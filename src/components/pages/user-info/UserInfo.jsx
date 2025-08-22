import { useCurrentUser } from "hooks/useUser"
import styles from "/src/components/pages/user-info/user-info.module.scss"
import UserInfoReadOnly from "./UserInfoReadOnly";
import { useEffect, useState } from "react";
import EditUserInfo from "./EditUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const UserInfo = () => {
    const [editMode, setEditMode] = useState(false);
    const { data: userData } = useCurrentUser();

    const [user, setUser] = useState(() => userData || {})
    useEffect(() => setUser(userData || {}), [userData])

    const handleInputChange = () => { }

    return (
        editMode
            ? <main className={styles.main}>
                <div className={styles.buttonsCnr}>
                    <button onClick={() => setEditMode(false)} className={styles.crossBtn}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <button className={styles.updateBtn}>Update</button>
                </div>
                <EditUserInfo user={user} editMode={editMode} isEditMode={setEditMode} handleInputChange={handleInputChange} />
            </main>

            : <main className={styles.main}>
                <div className={styles.buttonsCnr}>
                    <button onClick={() => setEditMode(true)} className={styles.editBtn}>Edit</button>
                </div>
                <UserInfoReadOnly user={user} editMode={editMode} isEditMode={setEditMode} />
            </main>
    )
}

export default UserInfo