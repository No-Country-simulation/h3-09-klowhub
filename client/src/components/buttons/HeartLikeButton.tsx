import { Heart } from 'lucide-react'

interface HeartLikeButtonProps {
	isLiked: boolean
	setIsLiked: (isLiked: boolean) => void
}

export default function HeartLikeButton({
	isLiked,
	setIsLiked
}: HeartLikeButtonProps) {
	const handleLike = () => {
		// TODO: Lógica de Like
		setIsLiked(!isLiked)
	}

	return (
		<Heart
			role="button"
			size={26}
			onClick={handleLike}
			fill={isLiked ? '#FF4D4DCC' : 'none'}
		/>
	)
}
