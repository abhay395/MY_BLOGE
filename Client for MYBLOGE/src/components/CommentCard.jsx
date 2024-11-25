import moment from "moment";
import { AiFillLike } from "react-icons/ai";

const CommentCard = ({
    userImage,
    userName,
    createdAt,
    content,
    likes,
    onLike,
    isLiked,
}) => {
    return (
        <article className="p-6 mb-3 text-base bg-gray-50 border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={userImage}
                            alt={userName}
                        />
                        {userName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time title={moment(createdAt).format("MMMM Do YYYY")}>
                            {moment(createdAt).format("MMMM Do YYYY")}
                        </time>
                    </p>
                </div>
                <button
                    className="inline-flex items-center p-2 text-sm text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                >
                    <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                    >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                    <span className="sr-only">Comment settings</span>
                </button>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{content}</p>
            <div className="flex items-start justify-start">
                <AiFillLike
                    onClick={onLike}
                    className={`text-2xl mt-2 cursor-pointer ${isLiked ? "text-sky-700" : "text-opacity-50"
                        }`}
                />
                <span className="mt-2 ml-1">{likes.length}</span>
            </div>
        </article>
    );
};

export default CommentCard;
