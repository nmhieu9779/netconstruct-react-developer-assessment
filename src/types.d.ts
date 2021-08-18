// -------------------- Interfaces ----------------------
interface Todo {
    text: string;
    completed: boolean;
}

interface IAuthor {
    name: string;
    avatar: string;
}

interface ICategory {
    id: string;
    name: string;
}

interface IPost {
    id: string;
    author: IAuthor;
    categories: ICategory[];
    publishDate: Date;
    summary: string;
    title: string;
}

// -------------------------- Types ---------------------------
type ButtonProps = {
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
}

type PostProps = {
    post: IPost;
}