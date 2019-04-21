import { TopBooks } from './components/topBooks/topBook'
import { NewestBooks } from './components/newestBooks/newestBook'


export const booksRoutes = [
    { path: "/rank", name: "Bảng xếp hạng", component: TopBooks },
    { path: "/newest", name: "Mới nhất", component: NewestBooks }
]
