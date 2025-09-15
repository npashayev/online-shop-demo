import { useCurrentUser } from "hooks/useUser"
import styles from "/src/styles/resource-form.module.scss";
import UserInfoReadOnly from "./UserInfoReadOnly";
import { useState } from "react";
import EditUserInfo from "./EditUserInfo";
import InformationModal from "components/common/modal/InformationModal";
import Loading from "components/common/Loading";

const UserInfo = () => {

    const [editMode, setEditMode] = useState(false);
    const { data: userData, isPending, error } = useCurrentUser();


    if (isPending) return <main className={styles.main}><Loading style={{ fontSize: '32px' }} /></main>

    if (error) return <main className={styles.main}>An error occurred while getting user info</main>

    return (
        <>
            <InformationModal>
                Updating a user will not update it into the server.
                It will simulate a PUT/PATCH request and will return updated user with modified data.
                If you refresh the page or log out and log back in, all changes will be lost.
            </InformationModal>

            {
                editMode
                    ? <main className={styles.main}>
                        <EditUserInfo user={userData} setEditMode={setEditMode} />
                    </main>

                    : <main className={styles.main}>
                        <UserInfoReadOnly user={userData} setEditMode={setEditMode} />
                    </main>
            }
        </>
    )
}

export default UserInfo