import { useCurrentUser, useUpdateCurrentUser } from "hooks/useUser"
import styles from "/src/components/pages/user-info/user-info.module.scss"
import UserInfoReadOnly from "./UserInfoReadOnly";
import { useEffect, useState } from "react";
import EditUserInfo from "./EditUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { produce } from "immer";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import { setUser } from "/src/store/userSlice";
import Modal from "components/common/modal/Modal";
import Loading from "components/common/Loading";

const UserInfo = () => {

    const [editMode, setEditMode] = useState(false);

    const { data: userData, isPending, error } = useCurrentUser(); // This gets the whole info about current user

    const [currentUser, setCurrentUser] = useState(() => userData || {}) // This state is used to control input values and pass the data in user update function

    const { user: persistedUser } = useAuth(); // This gets the user info stored in redux persist

    useEffect(() => setCurrentUser(userData || {}), [userData])

    const queryClient = useQueryClient()

    let dispatch = useDispatch();

    const { mutate, isPending: isUpdating } = useUpdateCurrentUser(); // User updater hook

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setCurrentUser(prev =>
            produce(prev, draft => {
                const keys = name.split(".");
                let temp = draft;

                keys.forEach((key, index) => {
                    if (index === keys.length - 1) {
                        temp[key] = value; // set the final property
                    } else {
                        if (!temp[key]) temp[key] = {}; //create nested object is missing
                        temp = temp[key]; // go deeper
                    }
                })
            })
        );
    }

    const handleUpdate = () => {
        mutate(currentUser, {
            onSuccess: (data) => {
                queryClient.setQueryData(["currentUser"], data)
                dispatch(setUser({
                    ...persistedUser,
                    username: data.username,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                }))

                setEditMode(false)
            }
        })
    }

    if (isPending) return <main className={styles.main}><Loading size="32px" /></main>

    if (error) return <main className={styles.main}>An error occurred while getting user info</main>

    return (
        <>
            {/* <Modal>
                Updating a user will not update it into the server.
                It will simulate a PUT/PATCH request and will return updated user with modified data.
                If you refresh the page or log out and log back in, all changes will be lost.
            </Modal> */}

            {
                editMode
                    ? <main className={styles.main}>
                        <div className={styles.buttonsCnr}>
                            <button onClick={() => setEditMode(false)} className={styles.crossBtn}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <button onClick={handleUpdate} disabled={isUpdating} className={styles.updateBtn}>Update</button>
                        </div>
                        <EditUserInfo user={currentUser} editMode={editMode} isEditMode={setEditMode} handleInputChange={handleInputChange} />
                    </main>

                    : <main className={styles.main}>
                        <div className={styles.buttonsCnr}>
                            <button onClick={() => setEditMode(true)} className={styles.editBtn}>Edit</button>
                        </div>
                        <UserInfoReadOnly user={userData} editMode={editMode} isEditMode={setEditMode} />
                    </main>
            }
        </>
    )
}

export default UserInfo