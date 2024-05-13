import dbConnect from "@/lib/mongodb/mongodb.connect";
import confessionSchema from "@/models/confession.schema";

export default async function handler(req, res) {
    try {
        const { method } = req;

        if (method !== "POST") {
            throw {
                msg: "Invalid HTTP method",
                status: 401
            };
        }

        // Call this line in every API
        await dbConnect();

        const { gender, confession } = req.body;

        console.log({ gender, confession });

        if (!gender || !confession) {
            throw {
                msg: "Validation failed",
                desc: "Either gender in missing or confession",
                status: 422
            };
        }

        const addConfession = await confessionSchema.create({ gender, confession });

        if (!addConfession) {
            throw {
                msg: "Database error",
                desc: "Failed to add confessio to database",
                status: 422
            };
        }

        res.status(200).send({ confessionAdded: true, confession: addConfession, status: 200 });
    } catch (error) {
        const { msg, status, desc = null } = error;
        res.status(status).send({ msg, desc });
    }
}
