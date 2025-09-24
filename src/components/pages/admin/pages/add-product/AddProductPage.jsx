import styles from "/src/styles/resource-form.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useAddNewProduct, useCategories } from "hooks/useProducts";
import Loading from "components/common/Loading";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { RHFInput } from "components/common/form-fields/FormFields";
import Select from 'react-select';
import InformationModal from "components/common/modal/InformationModal";
import { useToast } from "contexts/ToastContext";
import LoadingModal from "components/common/modal/LoadingModal";

const AddProductPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [newTag, setNewTag] = useState('')

    const { register, handleSubmit, control, formState: { isDirty } } = useForm({
        defaultValues: {
            title: "",
            brand: "",
            category: "",
            description: "",
            price: "",
            discountPercentage: "",
            weight: "",
            dimensions: { width: "", height: "", depth: "" },
            warrantyInformation: "",
            shippingInformation: "",
            returnPolicy: "",
            minimumOrderQuantity: "",
            images: [],
            tags: []
        }
    });

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control,
        name: 'images'
    });

    const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
        control,
        name: 'tags'
    });

    const { showToast } = useToast();
    const navigate = useNavigate();

    const { mutate, isPending } = useAddNewProduct();

    const { data: categories } = useCategories();
    const categoryOptions = categories?.map(cat => ({ value: cat.slug, label: cat.name }))

    const queryClient = useQueryClient();

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            url: URL.createObjectURL(file) // temporary URL for preview
        }));

        appendImage(newImages); // add to your useFieldArray
        e.target.value = null;   // reset input
    };

    const submitHandler = (data) => {
        const { images, tags, ...rest } = data;

        const payload = {
            ...rest,
            images: images?.map(img => img.url) || [],
            tags: tags?.map(t => t.tagName) || []
        };

        mutate(payload, {
            onSuccess: (data, sentData) => {
                queryClient.setQueryData(["products", String(data.id)], { id: data.id, ...sentData });
                showToast("Product added successfully");
                navigate(`/products/${data.id}`);
            },
            onError: (error) => showToast(error.message || "Something went wrong", false)
        });
    }

    return (
        <div className={styles.page}>
            {
                isModalOpen &&
                <InformationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    Adding this product will only simulate the action and will not affect the server. After a successful addition, you will be redirected to the product’s details page.
                </InformationModal>
            }

            {
                isPending &&
                <LoadingModal isOpen={isPending}>
                    Product is being added...
                </LoadingModal>
            }

            <form
                onSubmit={handleSubmit(submitHandler)}
                className={styles.componentContainer}
            >
                <div className={styles.buttonsCnr}>
                    <button
                        className={styles.updateBtn}
                        type="submit"
                        disabled={!isDirty || isPending}
                    >
                        Add new product
                    </button>
                </div>

                {/* General Information */}
                <div className={styles.block}>
                    <div className={styles.heading}>General information</div>
                    <div className={styles.inputGroup}>
                        <RHFInput label="Title" name="title" register={register} />
                        <RHFInput label="Brand" name="brand" register={register} />
                        <Controller
                            name="category"
                            control={control} // RHF control object
                            render={({ field }) => (
                                <Select
                                    className={styles.selector}
                                    {...field}
                                    isSearchable={false}
                                    options={categoryOptions}
                                />
                            )}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputCnr}>
                            <label>Description</label>
                            <textarea rows='6'
                                name="description"
                                {...register("description")}
                                className={`${styles.info} ${styles.textarea}`}
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <RHFInput label="Price" name="price" register={register} />
                        <RHFInput label="Discount percentage" name="discountPercentage" register={register} />
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.tagCnr}>
                            <label>Tags</label>
                            <div className={styles.tagsCnr}>
                                {
                                    tagFields.map((field, index) =>
                                        <div key={field.id} className={styles.tag}>
                                            <p className={styles.tagName}>
                                                {field.tagName}
                                            </p>
                                            <button className={styles.xBtn}>
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    onClick={() => removeTag(index)}
                                                    className={styles.xIcon}
                                                />
                                            </button>
                                        </div>)
                                }
                            </div>

                            <div className={`${styles.inputCnr} ${styles.addFieldCnr}`}>
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    className={`${styles.info} ${styles.tagInput}`}
                                    placeholder="New tag name" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (newTag.trim()) {
                                            appendTag({ tagName: newTag.trim() });
                                            setNewTag('');
                                        }
                                    }}
                                    className={styles.addFieldBtn}
                                    disabled={newTag.trim() === ""}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Physical Specifications */}
                <div className={styles.block}>
                    <div className={styles.heading}>Physical Specifications</div>
                    <div className={styles.inputGroup}>
                        <RHFInput label="Weight" name="weight" register={register} />
                        <RHFInput label="Width" name="dimensions.width" register={register} />
                    </div>

                    <div className={styles.inputGroup}>
                        <RHFInput label="Height" name="dimensions.height" register={register} />
                        <RHFInput label="Depth" name="dimensions.depth" register={register} />
                    </div>
                </div>

                {/* Additional Information */}
                <div className={styles.block}>
                    <div className={styles.heading}>Additional Information</div>
                    <div className={styles.inputGroup}>
                        <RHFInput label="Warranty information" name="warrantyInformation" register={register} />
                        <RHFInput label="Shipping information" name="shippingInformation" register={register} />
                    </div>

                    <div className={styles.inputGroup}>
                        <RHFInput label="Return policy" name="returnPolicy" register={register} />
                        <RHFInput label="Minimum order quantity" name="minimumOrderQuantity" register={register} />
                    </div>
                </div>

                <div className={styles.block}>
                    <div className={styles.heading}>Images</div>
                    <div className={styles.inputGroup}>
                        <div className={styles.inputCnr}>
                            <label htmlFor="imagePicker" className={styles.imagePickerLabel}>Add images</label>
                            <input
                                id="imagePicker"
                                className={styles.imagePicker}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageSelect}
                            />
                        </div>
                    </div>

                    <div className={styles.imageList}>
                        {
                            imageFields.map((field, index) =>
                                <div key={field.id} className={styles.imageCnr}>
                                    <div className={styles.iconCnr}>
                                        <FontAwesomeIcon
                                            className={styles.xIcon}
                                            icon={faXmark}
                                            onClick={() => removeImage(index)}
                                        />
                                    </div>
                                    <img src={field.url} alt="image" className={styles.image} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddProductPage;
