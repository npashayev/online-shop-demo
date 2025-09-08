import styles from "./product-info.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useCategories, useUpdateProduct } from "hooks/useProducts";
import Loading from "components/common/Loading";
import { useQueryClient } from "@tanstack/react-query";

const RHFInput = ({ label, name, register, type = "text" }) => (
    <div className={styles.inputCnr}>
        <label>{label}</label>
        <input
            type={type}
            {...register(name)}
            className={styles.info}
        />
    </div>
)

const EditProductInfo = ({ product, setIsEditMode }) => {

    const [newImageUrl, setNewImageUrl] = useState('')
    const [newTag, setNewTag] = useState('')

    const { register, handleSubmit, reset, control, formState, setValue } = useForm({
        defaultValues: {
            ...product,
            images: product.images?.map(url => ({ url })) || [],
            tags: product.tags?.map(tagName => ({ tagName })) || []
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

    const updateProduct = useUpdateProduct(product.id);
    const { data: categories } = useCategories();

    const queryClient = useQueryClient();

    useEffect(() => {
        if (product) {
            reset({
                ...product,
                images: product.images?.map(url => ({ url })) || [],
                tags: product.tags?.map(tagName => ({ tagName })) || []
            });
        }
    }, [product, reset]);


    const submitHandler = (data) => {
        const { id, images, tags, ...rest } = data;

        const payload = {
            ...rest,
            images: images?.map(img => img.url) || [],
            tags: tags?.map(t => t.tagName) || []
        };

        updateProduct.mutate(payload, {
            onSuccess: (_, sentData) => queryClient.setQueryData(["products", String(id)], { id, ...sentData }),
            onError: (error) => console.log(error)
        });
    }



    return (
        <form onSubmit={handleSubmit(submitHandler)} className={styles.componentContainer}>
            <div className={styles.buttonsCnr}>
                <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className={styles.crossBtn}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <button
                    type="submit"
                    className={styles.updateBtn}
                    disabled={!formState.isDirty}
                >
                    {updateProduct.isPending ? <Loading /> : "Update"}
                </button>
            </div>

            {/* General Information */}
            <div className={styles.block}>
                <div className={styles.heading}>General information</div>
                <div className={styles.inputGroup}>
                    <RHFInput label="Title" name="title" register={register} />
                    <RHFInput label="Brand" name="brand" register={register} />
                    <select {...register("category")}>
                        {
                            categories?.map(category =>
                                <option
                                    key={category.name}
                                    value={category.name}
                                >
                                    {category.name}
                                </option>)
                        }
                    </select>
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
                    <label>Tags</label>
                    <div className={styles.tagsCnr}>
                        {
                            tagFields.map((field, index) => <div key={field.id}>
                                {field.tagName}
                                <div className={styles.iconCnr}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        onClick={() => removeTag(index)}
                                        className={styles.xIcon} />
                                </div>
                            </div>)
                        }
                    </div>

                    <div className={`${styles.inputCnr} ${styles.addFieldCnr}`}>
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className={styles.info}
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
                    <div className={`${styles.inputCnr} ${styles.addFieldCnr}`}>
                        <input
                            type="text"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className={styles.info}
                            placeholder="Paste url to add a new image" />
                        <button
                            type="button"
                            onClick={() => {
                                if (newImageUrl.trim()) {
                                    appendImage({ url: newImageUrl.trim() });
                                    setNewImageUrl('');
                                }
                            }}
                            disabled={newImageUrl.trim() === ""}
                            className={styles.addFieldBtn}
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className={styles.imageList}>
                    {
                        imageFields.map((field, index) =>
                            <div key={field.id} className={styles.imageCnr}>
                                <div className={styles.iconCnr}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        onClick={() => removeImage(index)}
                                        className={styles.xIcon} />
                                </div>
                                <img src={field.url} alt="image" className={styles.image} />
                            </div>
                        )
                    }
                </div>
            </div>
        </form>
    )
}

export default EditProductInfo;
