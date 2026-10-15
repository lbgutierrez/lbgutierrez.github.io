import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

export interface PageContent {
  contentHtml: string
  data: Record<string, unknown>
}

/** Leer una página de contenido (content/<name>.md) y convertirla a HTML */
export async function getPageContent(name: string): Promise<PageContent> {
  const file = fs.readFileSync(path.join(contentDirectory, `${name}.md`), 'utf8')
  const { data, content } = matter(file)
  const processed = await remark().use(html).process(content)

  return { contentHtml: processed.toString(), data }
}
