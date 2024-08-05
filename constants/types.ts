export interface Author {
  id: string,
  name: string,
  image: string,
}

export interface Community {
  id: string,
  name: string,
  image: string,
}

export interface Comment {
  id: string
  text: string
  author: Author
  parentId: string
  createdAt: string,
}

export interface ThreadProps {
  id: string,
  author: Author,
  comments: Comment[] | [],
  community: Community | null,
  text: string,
  createdAt: string,
  currentUserId: string,
  isComment?: boolean,
  parentId: string | null,
}

export interface ThreadTabsResult {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      id: string
  text: string
  author: Author
  parentId: string
  createdAt: string,
    }[];
  }[];
}