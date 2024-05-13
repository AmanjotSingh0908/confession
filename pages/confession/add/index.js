import { motion } from "framer-motion";
import styles from "@/styles/Confession.module.css";
import Select from "react-select";
import { use, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { toastMessage } from "@/utils/toasts/toasts";
import { BeatLoader } from "@/components/loader/loader";

const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" }
];

const AddConfession = () => {
    const router = useRouter();
    const [userGender, setUserGender] = useState(options[0]);
    const [userConfession, setUserConfession] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePublish = useCallback(async () => {
        try {
            const isDataValid = validateData();
            if (!isDataValid.isValid) {
                return toastMessage.warning(isDataValid.msg);
            }

            setLoading(true);

            const createNewConfession = await axios.post("/api/post/confession", { gender: userGender.value, confession: userConfession });
            const response = createNewConfession.data;

            setLoading(false);
            if (response.confessionAdded) {
                toastMessage.success("Confession in Online!");
                router.push("/");
                return;
            }

            toastMessage.error("Server error, try again");
        } catch (error) {
            setLoading(false);
            toastMessage.error("Server error, try again");
        }
    }, [userGender, userConfession]);

    const validateData = useCallback(() => {
        console.log({ userConfession });
        if (!userConfession) return { isValid: false, msg: "Write something" };
        if (userConfession.length < 6) return { isValid: false, msg: "Confession is too short!" };
        return { isValid: true, msg: null };
    }, [userConfession]);

    return (
        <div className={styles.main}>
            <motion.div
                initial={{ y: 500 }}
                animate={{ y: 0 }}
                className={styles.box}>
                <Select
                    value={userGender}
                    options={options}
                    onChange={(gender) => setUserGender(gender)}
                />
                <textarea
                    className={styles.textarea}
                    rows={5}
                    value={userConfession}
                    onChange={(e) => setUserConfession(e.target.value)}
                    placeholder="Type your confession here..."></textarea>

                <div className={styles.btnGroup}>
                    <button
                        onClick={() => router.push("/")}
                        className={`${styles.backBtn} ${styles.commonBtn}`}>
                        Back
                    </button>
                    <button
                        onClick={handlePublish}
                        className={`${styles.publishBtn} ${styles.commonBtn}`}>
                        {!loading ? "Publish" : <BeatLoader />}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AddConfession;
