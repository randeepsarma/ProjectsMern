import Gig from "../models/gig.model.js"
import { createError } from "../utils/createError.js"

export const createGig = async (req, res, next) => {
    //console.log('hi')
    if (!req.isSeller) return next(createError(403, "Only sellers can create a gig"))
    console.log(req.body)
    const newGig = new Gig({
        userId: req.userId,
        ...req.body
    })
    await newGig.save()

    //console.log(newGig)
    try {
        // await newGig.save()
        console.log(newGig)
        res.status(201).send(newGig)
    } catch (error) {
        next(error)
    }

}
export const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        //console.log(gig)
        //console.log(req.userId)
        if (gig.userId !== req.userId)
            return next(createError(403, "You can delete only your gig!"))

        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("Gig has been deleted")
    } catch (error) {

    }
}
export const getGig = async (req, res, next) => {
    try {
        /*  {
            "title": "Gig 3 title",
            "desc": "Gig 3 Desc",
        "cat": "design",
                         "price": 659,
                             "cover": "https://images.pexels.com/photos/15254469/pexels-photo-15254469.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
                                 "images": ["https://images.pexels.com/photos/11581859/pexels-photo-11581859.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load", "https://images.pexels.com/photos/12242010/pexels-photo-12242010.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"],
                                     "stars": 4,
                                         "shortTitle": "Gig 1 Short title",
                                             "shortDesc": "Gig 1 Short Desc",
                                                 "deliveryTime": 5,
                                                     "revisionNumber": 5,
                                                         "features": ["feature1", "feature2"]
 
         } */
        const gig = await Gig.findById(req.params.id);
        if (!gig) next(createError(404, "Gig not found"))
        //console.log(gig)
        res.status(200).send(gig)
    } catch (error) {
        next(error)
    }
}
export const getGigs = async (req, res, next) => {
    const q = req.query;
    //console.log(q)
    const filters = {
        ...(q.userId && { cat: q.userId }),

        ...(q.cat && { cat: q.cat }),
        ...((q.min || q.max) && {
            price: {
                ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max })
            }
        }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } })
    }
    try {
        const gigs = await Gig.find(filters).sort({ [q.sort]: -1 })
        //console.log(gigs)
        res.status(200).send(gigs)

    } catch (error) {
        next(error)
    }
}