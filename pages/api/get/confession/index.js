import dbConnect from "@/lib/mongodb/mongodb.connect";
import confessionSchema from "@/models/confession.schema";

export default async function handler(req,res) {
    try {
        const { method } = req;

        if(method !== "GET") {
            throw {
                msg: "Invalid HTTP request",
                status: 400
            };
        }

        await dbConnect();

        const Getconfessions = await confessionSchema.find();
        res.status(200).send({Getconfessions})

    } catch (error) {
        res.status(error.status || 500).json({ error: error.msg || "Internal Server Error" });
    }
}
