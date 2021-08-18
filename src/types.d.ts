// -------------------- Interfaces ----------------------
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

interface IGetPostsQuery {
    category?: string,
    limit?: number,
    offset?: number
}

interface IGetPostsResults {
    count: number
    results: IPost[]
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