import { useParams } from "react-router-dom"

export default function Profile() {
    const params = useParams()
    return (
        <>
            Your profile id is {params.id}
        </>
    )
}