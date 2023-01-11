export const list = async (req, res) => {

    try {
        console.log("🚀 ~ hello list ")

        

        res.send({success: true})
        
    } catch (error) {
        console.log("🚀 ~ list ~ error", error.message)

        res.send({success: false, error: error.message})
        
    }
}