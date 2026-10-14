import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface PostMeta {
  title: string
  date: string
  [key: string]: any
}

export interface PostData extends PostMeta {
  slug: string
  contentHtml: string
}

const postsDirectory = path.join(process.cwd(), 'posts')

/** 1) Obtener datos de todos los posts */
export function getSortedPostsData(): Omit<PostData, 'contentHtml'>[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data } = matter(fileContents)
    const meta = data as PostMeta

    return {
      slug,
      ...meta
    }
  })
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

/** 2) Generar lista de rutas dinámicas */
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => ({
    params: { slug: fileName.replace(/\.md$/, '') }
  }))
}

/** 3) Obtener contenido HTML de un post */
export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)
  const meta = data as PostMeta

  const processedContent = await remark()
    .use(html)
    .process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    ...meta
  }
}