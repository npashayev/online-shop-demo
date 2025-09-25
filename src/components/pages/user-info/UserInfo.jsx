import { useCurrentUser } from "hooks/useUser"
import styles from "styles/resource-form.module.scss";
import UserInfoReadOnly from "./UserInfoReadOnly";
import { useState } from "react";
import EditUserInfo from "./EditUserInfo";
import InformationModal from "components/common/modal/InformationModal";
import Loading from "components/common/loading/Loading";

const UserInfo = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const { data: userData, isPending, error } = useCurrentUser();

    if (isPending) return <main className={styles.page}><Loading style={{ fontSize: '3.2rem' }} /></main>

    if (error) return <main className={styles.pageError}>{error.message || "An error occurred while loading product info."}</main>

    return (
        userData &&
        <main className={styles.page}>
            {
                isEditMode
                    ? <EditUserInfo
                        user={userData}
                        onClose={() => setIsEditMode(false)}
                    />

                    : <UserInfoReadOnly
                        user={userData}
                        onOpen={() => setIsEditMode(true)}
                    />}
        </main>

    )
}

export default UserInfo;