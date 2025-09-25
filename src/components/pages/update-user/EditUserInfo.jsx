import { useForm } from "react-hook-form";
import styles from "components/common/styles/resource-form.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useUpdateCurrentUser } from "hooks/useUser";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import { setUser } from "store/userSlice";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RHFInput } from "components/common/form-fields/FormFields";
import { useToast } from "contexts/ToastContext";
import InformationModal from "components/common/modal/InformationModal";
import LoadingModal from "components/common/modal/LoadingModal";

const EditUserInfo = ({ user, onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const { register, handleSubmit, reset, formState: { isDirty } } = useForm({
        defaultValues: user
    })

    const { showToast } = useToast();
    const queryClient = useQueryClient()
    let dispatch = useDispatch();
    const { mutate, isPending } = useUpdateCurrentUser();
    const { user: persistedUser } = useAuth();

    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    const handleUpdateUser = (formData) => {
        mutate({
            userId: user.id,
            formData
        },
            {
                onSuccess: (data) => {
                    queryClient.setQueryData(["currentUser"], data)
                    dispatch(setUser({
                        ...persistedUser,
                        username: data.username,
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                    }))
                    showToast("User updated successfully");
                    onClose()
                },
                onError: (error) => showToast(error.message || "Something went wrong", false)
            })
    }

    return (
        <>
            <InformationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                Updating a user won’t affect the server. It only simulates the change and returns the updated user data.
            </InformationModal>

            {
                isPending &&
                <LoadingModal isOpen={isPending}>
                    User is being updated...
                </LoadingModal>
            }

            <form
                onSubmit={handleSubmit(handleUpdateUser)}
                className={styles.componentContainer}
            >
                <div className={styles.buttonsCnr}>
                    <button
                        className={styles.crossBtn}
                        type="button"
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>

                    <button
                        className={styles.updateBtn}
                        type="submit"
                        disabled={!isDirty || isPending}
                    >
                        Update
                    </button>
                </div>

                {/* General Information */}
                <div className={styles.block}>
                    <div className={styles.heading}>General information</div>
                    <div className={styles.inputGroup}>
                        <RHFInput label="First name" name="firstName" register={register} />
                        <RHFInput label="Last name" name="lastName" register={register} />
                        <RHFInput label="Maiden name" name="maidenName" register={register} />
                    </div>
                    <div className={styles.inputGroup}>
                        <RHFInput label="Username" name="username" register={register} />
                        <RHFInput label="Email" name="email" register={register} />
                    </div>
                    <div className={styles.inputGroup}>
                        <RHFInput label="Phone" name="phone" register={register} />
                    </div>
                </div>

                {/* Address Information */}
                <div className={styles.block}>
                    <div className={styles.heading}>Address information</div>
                    <div className={styles.inputGroup}>
                        <RHFInput label="Address" name="address.address" register={register} />
                        <RHFInput label="City" name="address.city" register={register} />
                    </div>
                    <div className={styles.inputGroup}>
                        <RHFInput label="State" name="address.state" register={register} />
                        <RHFInput label="State code" name="address.stateCode" register={register} />
                    </div>
                    <div className={styles.inputGroup}>
                        <RHFInput label="Postal code" name="address.postalCode" register={register} />
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditUserInfo;
