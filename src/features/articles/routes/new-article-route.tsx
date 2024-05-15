//#region Import
import useDispatch from "@/hooks/useDispatch"
import convertToBase64 from "@/utils/convert-to-base64"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { v4 as newId } from "uuid"

import ArticleCreationForm from "../components/article-creation-form"
import { ArticleSchemaType } from "../schema/article-schema"
import { addArticle } from "../slice"
//#endregion

const NewArticleRoute = () => {
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const handleSubmit = async ({ image, ...rest }: ArticleSchemaType) => {
		const base64Image = await convertToBase64(image)

		// Generating a new unique Id for the newly created article
		const articleId = newId()

		dispatch(addArticle({ articleId, image: base64Image, ...rest }))

		navigate("/")

		toast.success("Article Added successfully!")
	}

	return <ArticleCreationForm onSubmit={handleSubmit} />
}

export default NewArticleRoute
