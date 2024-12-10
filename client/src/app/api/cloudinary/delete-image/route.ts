import { v2 as cloudinary } from 'cloudinary'

export async function POST(request: Request) {
	const body = await request.json()
	const { publicId } = body

	const res = await cloudinary.uploader.destroy(publicId, {
		invalidate: true
	})

	return Response.json(res)
}
