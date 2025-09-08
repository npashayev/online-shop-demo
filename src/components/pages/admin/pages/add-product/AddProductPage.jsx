import styles from "../../components/product-info.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useAddNewProduct, useCategories } from "hooks/useProducts";
import Loading from "components/common/Loading";
import { useQueryClient } from "@tanstack/react-query";
import RHFInput from "../../components/RHFInput";


const AddProductPage = () => {

    const [newImageUrl, setNewImageUrl] = useState('')
    const [newTag, setNewTag] = useState('')

    const { register, handleSubmit, control, formState } = useForm({
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

    const addProduct = useAddNewProduct();
    const { data: categories } = useCategories();
    const queryClient = useQueryClient();



    const submitHandler = (data) => {
        const { images, tags, ...rest } = data;

        const payload = {
            ...rest,
            images: images?.map(img => img.url) || [],
            tags: tags?.map(t => t.tagName) || []
        };

        addProduct.mutate(payload, {
            onSuccess: (data, sentData) => {
                console.log(data)
                queryClient.setQueryData(["products", String(data.id)], { id: data.id, ...sentData })
            },
            onError: (error) => console.log(error)
        });
    }



    return (
        <div className={styles.main}>
            <form onSubmit={handleSubmit(submitHandler)} className={styles.componentContainer}>
                <div className={styles.buttonsCnr}>
                    <button
                        type="submit"
                        className={styles.updateBtn}
                        disabled={!formState.isDirty}
                    >
                        {addProduct.isPending ? <Loading /> : "Add new product"}
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
        </div>
    )
}

export default AddProductPage;
